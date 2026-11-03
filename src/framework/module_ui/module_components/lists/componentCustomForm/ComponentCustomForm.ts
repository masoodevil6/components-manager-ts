import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreEvent from "@/core_event";
import * as Core from "@/core";
import * as CoreComponents from "@/core_components";
import * as CoreLanguage from "@/core_languages";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentLayout from "../componentLayout";
import * as ComponentLayoutCreator from "../componentLayoutCreator";
import * as ComponentForm from "../componentForm";
import * as ComponentCollapse from "../componentCollapse";
import * as ComponentCollapseLine from "../componentCollapseLine";
import * as ComponentInput from "../componentInput";
import * as ComponentWindow from "../componentWindow";
import * as ComponentWindowConfirm from "../componentWindowConfirm";
import * as ComponentInputDescription from "../componentInputDescription";
import * as ComponentInputCheckBox from "../componentInputCheckBox";
import * as ComponentInputRadioBox from "../componentInputRadioBox";
import * as ComponentInputListSelector from "../componentInputListSelector";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import {InputSimpleTypes} from "../componentInputSimple/Props";
import {Keys} from "../../../module_categories/languages";
import * as UiIcons from "@/ui_icons";
import {LayoutColumn} from "../componentLayout/Props";
import {LayoutCreatorMode} from "../componentLayoutCreator/Props";
import type {LayoutCreatorContentItem, LayoutCreatorItemState} from "../componentLayoutCreator/Props";
import {ComponentCustomFormBase} from "./ComponentCustomFormBase";
import {
    CustomFormField,
    CustomFormFieldType,
    CustomFormFormOptions,
    CustomFormGroup,
    CustomFormMode,
    PropsConfigType,
} from "./Props";
import {Schemas} from "./Schemas";
import type {MethodsConfigType} from "./Methods";
import {createCustomFormStep} from "./Step";

type DisposableChild = {
    dispose?: () => void;
    getScope?: () => {dispose: () => void};
};

type EditorEvent = (event: Event) => void;

const CUSTOM_FORM_LAYOUT_ALLOWED_COMPONENTS = Object.freeze([
    ComponentInput.Component,
    ComponentInputDescription.Component,
    ComponentInputCheckBox.Component,
    ComponentInputRadioBox.Component,
    ComponentInputListSelector.Component,
] as const);

export class ComponentCustomForm extends ComponentCustomFormBase<ReturnType<typeof createCustomFormStep>>{
    private static _ID = 0;
    private readonly _VIEW = new CoreObservable.App<ComponentLayout.LayoutContentItem[] | null>(null);
    private readonly _DYNAMIC_CHILDREN: DisposableChild[] = [];
    private readonly _GROUP_SETTINGS_WINDOWS = new Map<string, DisposableChild>();
    private _LAYOUT: ComponentLayout.Component | null = null;
    private _DELETE_CONFIRM: ComponentWindowConfirm.Component | null = null;
    private _DELETE_CONFIRM_ELEMENT: HTMLElement | null = null;
    private _PENDING_DELETE_GROUP_ID: string | null = null;
    private _GROUP_SETTINGS_WORKFLOW_SOURCE: CoreEvent.TStepRef | null = null;
    private _GROUP_SETTINGS_PAGE_SETTING_ENDPOINT: CoreEvent.TStepRef | null = null;
    private _LOCAL_VALUES: Record<string, unknown> = {};
    private _SKIP_GROUPS_REBUILD = false;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentCustomForm>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createCustomFormStep());
        this._LOCAL_VALUES = {...(this.readValue<Record<string, unknown>>(config?.prop_customFormValues) ?? {})};
        this.registerGroupSettingsEndpoint();
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
        this.watchProps();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.closeGroupSettingsPageSetting();
        this._VIEW.set(null);
        this.disposeDynamicChildren();
        this._DELETE_CONFIRM_ELEMENT?.remove();
        this._DELETE_CONFIRM_ELEMENT = null;
        this._DELETE_CONFIRM?.getScope().dispose();
        this._DELETE_CONFIRM?.dispose();
        this._DELETE_CONFIRM = null;
        this._LAYOUT?.dispose();
        this._LAYOUT = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ROOT.part, {});
    }

    override renderManagerComponent(
        partName: string,
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.ROOT.part:
                return this.renderRoot(attrsDefault);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(attrsDefault: PartAttrDefault): CoreReactive.App {
        if (!this._LAYOUT) {
            this.rebuildView();
            this._LAYOUT = new ComponentLayout.Component({
                prop_layoutClass: this._COMPONENT_PROPS_BIND.prop_customFormLayoutClass as any,
                prop_layoutStyles: this._COMPONENT_PROPS_BIND.prop_customFormLayoutStyles as any,
                prop_layoutContent: this._VIEW,
            });
        }

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            children: [this._LAYOUT.getReactiveElement() as CoreReactive.App],
        });
    }

    private watchProps(): void {
        const watched = [
            "prop_customFormMode",
            "prop_customFormGroups",
            "prop_customFormValues",
            "prop_customFormFormOptions",
        ];

        for (const propName of watched) {
            this._COMPONENT_PROPS_BIND[propName]?.subscribe(() => {
                if (propName === "prop_customFormValues") {
                    this._LOCAL_VALUES = {...(this.readValue<Record<string, unknown>>(this.get(propName)) ?? {})};
                }
                if (propName === "prop_customFormGroups" && this._SKIP_GROUPS_REBUILD) {
                    this._SKIP_GROUPS_REBUILD = false;
                    return;
                }
                this.rebuildView();
            }, this.getScope());
        }
    }

    private rebuildView(): void {
        if (this._DISPOSED) return;
        this.disposeDynamicChildren();

        const mode = this.get("prop_customFormMode") === CustomFormMode.RUN
            ? CustomFormMode.RUN
            : CustomFormMode.EDIT;
        const groups = this.getGroups();

        if (mode === CustomFormMode.RUN) {
            this._VIEW.set([{content: this.renderRunMode(groups), col: null}]);
            return;
        }

        this._VIEW.set([{content: this.renderEditMode(groups), col: null}]);
    }

    private renderEditMode(groups: CustomFormGroup[]): CoreReactive.App {
        const groupViews = groups.map((group) => this.renderEditGroup(group));
        const addGroupLabel = this.translate(Keys.category.components.fetch.form.customForm.editor.addGroup);
        const addGroupIcon = new ComponentIcon.Component({
            styles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                height: "20px",
                flex: "0 0 20px",
            } as any,
            prop_structureStyles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
            },
            prop_icon: UiIcons.CreateIcon(UiIcons.Src.CalcPlus.Definition, {size: 20}),
            prop_iconTitle: addGroupLabel,
            prop_iconStyles: {display: "flex", width: "100%", height: "100%", pointerEvents: "none"},
        } as any);
        const addGroup = new ComponentBorder.Component({
            prop_borderType: ComponentBorder.BorderTypes.DASHED,
            prop_borderClass: ["w-100"],
            prop_borderStyles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "3rem",
                padding: "0.75rem",
                cursor: "pointer",
                boxSizing: "border-box",
            },
            prop_content: addGroupIcon.getReactiveElement(),
        } as any, {
            CLICK_BORDER: (event) => {
                this.openGroupSettingsWindow(null, event);
            },
        } as any);
        const addGroupElement = addGroup.getElement() as HTMLElement;
        addGroupElement.setAttribute("role", "button");
        addGroupElement.setAttribute("tabindex", "0");
        addGroupElement.setAttribute("aria-label", addGroupLabel);
        addGroupElement.title = addGroupLabel;
        addGroupElement.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            addGroupElement.click();
        });
        this._DYNAMIC_CHILDREN.push(addGroupIcon, addGroup);

        const editorContent = CoreReactive.App.section({
            attrs: {"data-mode": CustomFormMode.EDIT},
            className: ["d-flex", "flex-column", "gap-2"],
            children: [...groupViews, addGroup.getReactiveElement() as CoreReactive.App],
        });
        const options = this.getFormOptions();
        const form = new ComponentForm.Component({
            ...options,
            prop_forms: editorContent as any,
            prop_data: options.prop_data ?? groups,
            prop_controller: null,
            prop_runFetch: false,
        } as any, {
            SUBMIT: (event, dataArgs) => this.executeMethod("SUBMIT", event, dataArgs as any),
            GET_RESPONSE: (event, dataArgs) => this.executeMethod("GET_RESPONSE", event, dataArgs as any),
            RESPONSE: (event, dataArgs) => this.executeMethod("RESPONSE", event, dataArgs as any),
        } as any);
        this._DYNAMIC_CHILDREN.push(form);
        return form.getReactiveElement() as CoreReactive.App;
    }

    private renderEditGroup(group: CustomFormGroup): CoreReactive.App {
        const initialLayoutContent = this.createEditGroupLayoutContent(group);
        const groupLayout = new ComponentLayoutCreator.Component({
            prop_workflowChildName: `${Core.Dictionary.WorkflowNodeNames.customFormGroupLayout}_${group.id}`,
            prop_mode: LayoutCreatorMode.EDIT,
            prop_components: [...CUSTOM_FORM_LAYOUT_ALLOWED_COMPONENTS],
            prop_defaultColumn: this.getGroupLayoutColumn(group.columns),
            prop_initialLayoutContent: initialLayoutContent,
        } as any, {
            CONTENT_CHANGE: (event, dataArgs) => this.updateGroupFieldsFromLayout(group.id, dataArgs?.ITEMS ?? [], event),
        } as any);
        this._DYNAMIC_CHILDREN.push(groupLayout);

        const groupTitleInput = new ComponentInput.Component({
            prop_workflowChildName: `${Core.Dictionary.WorkflowNodeNames.customFormGroupTitle}_${group.id}`,
            prop_name: `custom-form-group-title-${group.id}`,
            prop_value: group.title,
            prop_labelShow: false,
            styles: {width: "100%", minWidth: "0"},
            prop_structureStyles: {width: "100%", minWidth: "0"},
        } as any, {
            INPUT_CHANGE: (event, _data, args) => this.updateGroupTitle(group.id, String(args?.VALUE ?? ""), event),
        } as any);
        (groupTitleInput.getElement() as HTMLElement).addEventListener("click", (event) => event.stopPropagation());
        this._DYNAMIC_CHILDREN.push(groupTitleInput);

        const collapse = new ComponentCollapse.Component({
            prop_workflowChildName: group.id,
            prop_collapseBodyIsOpen: group.bodyIsOpen ?? true,
            prop_collapseTitle: groupTitleInput.getReactiveElement(),
            prop_collapseBody: groupLayout.getReactiveElement() as CoreReactive.App,
            prop_collapseMenuItems: [{
                id: `delete-${group.id}`,
                title: "",
                ariaLabel: this.translate(Keys.category.components.fetch.form.customForm.editor.removeGroup),
                action: "delete-group",
                icon: UiIcons.Src.FilesDelete.Definition,
            }],
        } as any, {
            SELECT_MENU_ITEM: (event, dataArgs) => {
                if (dataArgs?.ITEM?.action === "delete-group") this.confirmRemoveGroup(group.id, event);
            },
        } as any);
        this._DYNAMIC_CHILDREN.push(collapse);
        return collapse.getReactiveElement() as CoreReactive.App;
    }

    private createEditGroupLayoutContent(group: CustomFormGroup): LayoutCreatorContentItem[] {
        return (Array.isArray(group.fields) ? group.fields : []).map((field) => {
            const rendered = this.createRunField(field, group.id, false);
            return {
                content: rendered.component as any,
                col: field.col ?? this.getGroupLayoutColumn(group.columns),
                workflowChildName: field.id,
            };
        });
    }

    private renderRunMode(groups: CustomFormGroup[]): CoreReactive.App {
        const groupViews = groups.map((group) => this.renderRunGroup(group));
        const formContent = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-2"],
            children: groupViews,
        });
        const options = this.getFormOptions();
        const form = new ComponentForm.Component({
            ...options,
            prop_forms: formContent as any,
            prop_runFetch: options.prop_runFetch ?? false,
        } as any, {
            SUBMIT: (event, dataArgs) => this.executeMethod("SUBMIT", event, dataArgs as any),
            GET_RESPONSE: (event, dataArgs) => this.executeMethod("GET_RESPONSE", event, dataArgs as any),
            RESPONSE: (event, dataArgs) => this.executeMethod("RESPONSE", event, dataArgs as any),
        } as any);
        this._DYNAMIC_CHILDREN.push(form);
        return form.getReactiveElement() as CoreReactive.App;
    }

    private renderRunGroup(group: CustomFormGroup): CoreReactive.App {
        const column = this.getGroupLayoutColumn(group.columns);
        const fields = Array.isArray(group.fields) ? group.fields : [];
        const layoutItems: LayoutCreatorContentItem[] = [];
        const auxiliaryContent: CoreReactive.App[] = [];
        for (const field of fields) {
            const rendered = this.createRunField(field, group.id);
            layoutItems.push({
                content: rendered.component as any,
                col: field.col ?? column,
                workflowChildName: this.getFieldWorkflowChildName(group.id, field),
            });
            auxiliaryContent.push(...rendered.auxiliary);
        }
        const layout = new ComponentLayoutCreator.Component({
            prop_workflowChildName: `${Core.Dictionary.WorkflowNodeNames.customFormGroupLayout}_${group.id}`,
            prop_mode: LayoutCreatorMode.RENDER,
            prop_components: [...CUSTOM_FORM_LAYOUT_ALLOWED_COMPONENTS],
            prop_initialLayoutContent: layoutItems,
        } as any);
        this._DYNAMIC_CHILDREN.push(layout);
        const body = CoreReactive.App.section({
            attrs: {"aria-label": group.title || "Form group"},
            className: ["d-flex", "flex-column", "p-2"],
            children: [layout.getReactiveElement() as CoreReactive.App, ...auxiliaryContent],
        });
        const collapse = new ComponentCollapseLine.Component({
            prop_collapseLineCanCollapse: true,
            prop_collapseLineBodyIsOpen: group.bodyIsOpen ?? true,
            prop_collapseLineTitle: group.title,
            prop_collapseLineBody: body,
        } as any);
        this._DYNAMIC_CHILDREN.push(collapse);
        return collapse.getReactiveElement() as CoreReactive.App;
    }

    private confirmRemoveGroup(groupId: string, event: Event): void {
        if (!this.getGroups().some((group) => group.id === groupId)) return;
        event.stopPropagation();
        this._PENDING_DELETE_GROUP_ID = groupId;

        if (!this._DELETE_CONFIRM) {
            const editorKeys = Keys.category.components.fetch.form.customForm.editor;
            this._DELETE_CONFIRM = new ComponentWindowConfirm.Component({
                prop_title: this.translate(editorKeys.deleteGroupTitle),
                prop_message: this.translate(editorKeys.deleteGroupMessage),
                prop_acceptText: this.translate(editorKeys.removeGroup),
                prop_cancelText: this.translate(editorKeys.cancel),
            } as any, {
                CONFIRM: (confirmEvent) => {
                    const pendingGroupId = this._PENDING_DELETE_GROUP_ID;
                    this._PENDING_DELETE_GROUP_ID = null;
                    if (!pendingGroupId) return;
                    this.updateTemplate(
                        this.getGroups().filter((group) => group.id !== pendingGroupId),
                        confirmEvent,
                    );
                },
                CANCEL: () => {
                    this._PENDING_DELETE_GROUP_ID = null;
                },
            } as any);
            this._DELETE_CONFIRM_ELEMENT = this._DELETE_CONFIRM.getElement() as HTMLElement;
            document.body.appendChild(this._DELETE_CONFIRM_ELEMENT);
            this._DELETE_CONFIRM.call_close();
            window.setTimeout(() => {
                if (!this._DISPOSED && this._DELETE_CONFIRM) this._DELETE_CONFIRM.call_open();
            }, 0);
            return;
        }

        this._DELETE_CONFIRM.call_open();
    }

    private openGroupSettings(groupId: string | null, event: Event): void {
        if (!this.openGroupSettingsInPageSetting(groupId)) {
            this.openGroupSettingsWindow(groupId, event);
        }
    }

    private openGroupSettingsInPageSetting(groupId: string | null): boolean {
        const source = this.getComponentWorkflow() as CoreEvent.TStepRef;
        if (!source) return false;

        const match = CoreEvent.findWorkflowNodes(source, Core.Dictionary.WorkflowNodeNames.setting)
            .find(({node}) =>
                CoreComponents.Tools.Workflow.Get_ComponentWorkflowMetadata(node)?.kind !== "component"
                && CoreEvent.App.hasEmit(node),
            );
        if (!match) return false;

        this.closeGroupSettingsPageSetting();
        for (const resource of [...this._GROUP_SETTINGS_WINDOWS.values()]) resource.dispose?.();

        const group = groupId === null ? null : this.getGroups().find((item) => item.id === groupId) ?? null;
        if (groupId !== null && !group) return false;

        const settingsKey = groupId ?? "new-group";
        const editorKeys = Keys.category.components.fetch.form.customForm.editor;
        let titleDraft = group?.title ?? "";
        const titleInput = new ComponentInput.Component({
            prop_workflowChildName: Core.Dictionary.WorkflowNodeNames.customFormGroupTitle,
            prop_name: `custom-form-group-title-${settingsKey}`,
            prop_value: titleDraft,
            prop_labelTitle: this.translate(editorKeys.groupTitle),
        } as any, {
            INPUT_CHANGE: (_inputEvent, _data, args) => { titleDraft = String(args?.VALUE ?? ""); },
        } as any);
        const close = (): void => {
            this.closeGroupSettingsPageSetting();
        };
        const cancelButton = this.editorButton(this.translate(editorKeys.cancel), () => {
            this.requestGroupSettingsUpdate(match.node, {action: "cancel"});
            close();
        });
        const saveButton = this.editorButton(this.translate(editorKeys.save), () => {
            const response = this.requestGroupSettingsUpdate(match.node, {
                action: "save",
                groupId,
                title: titleDraft,
            });
            if (response?.status === "success" && response.value?.applied === true) close();
        });
        const content = CoreReactive.App.section({
            attrs: {"data-custom-form-group-settings": settingsKey},
            styles: {
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                minHeight: "0",
                boxSizing: "border-box",
            },
            children: [
                CoreReactive.App.h3({
                    className: ["border-bottom", "p-3", "m-0"],
                    children: [this.translate(editorKeys.groupSettings)],
                }),
                CoreReactive.App.div({
                    className: ["d-flex", "flex-column", "gap-3", "p-3"],
                    styles: {flex: "1 1 auto", minHeight: "0", overflowY: "auto"},
                    children: [
                        titleInput.getReactiveElement() as CoreReactive.App,
                    ],
                }),
                CoreReactive.App.div({
                    className: ["border-top", "p-3"],
                    styles: {
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: "var(--marginMedium)",
                        flex: "0 0 auto",
                    },
                    children: [cancelButton, saveButton],
                }),
            ],
        });

        let disposed = false;
        const resource: DisposableChild = {
            dispose: () => {
                if (disposed) return;
                disposed = true;
                titleInput.dispose();
                if (this._GROUP_SETTINGS_WINDOWS.get(settingsKey) === resource) {
                    this._GROUP_SETTINGS_WINDOWS.delete(settingsKey);
                }
                const index = this._DYNAMIC_CHILDREN.indexOf(resource);
                if (index >= 0) this._DYNAMIC_CHILDREN.splice(index, 1);
            },
        };
        this._GROUP_SETTINGS_WINDOWS.set(settingsKey, resource);
        this._DYNAMIC_CHILDREN.push(resource);

        const openResponse = CoreEvent.App.request(
            CoreEvent.requestMap([[match.node, {content}]]),
            source,
        ).get(match.node);
        if (openResponse?.status !== "success" || openResponse.value?.opened !== true) {
            resource.dispose?.();
            return false;
        }

        this._GROUP_SETTINGS_WORKFLOW_SOURCE = source;
        this._GROUP_SETTINGS_PAGE_SETTING_ENDPOINT = match.node;
        return true;
    }

    private requestGroupSettingsUpdate(
        pageSetting: CoreEvent.TStepRef,
        payload: {action: "save" | "cancel"; groupId?: string | null; title?: string},
    ): CoreEvent.ClResponse | undefined {
        const groupSettingsStep = CoreEvent.getChild(
            this._COMPONENT_STEP as CoreEvent.TStepRef,
            Core.Dictionary.WorkflowNodeNames.customFormGroupSettings,
        );
        if (!groupSettingsStep || !CoreEvent.App.hasEmit(groupSettingsStep)) return undefined;
        return CoreEvent.App.request(
            CoreEvent.requestMap([[groupSettingsStep, payload]]),
            pageSetting,
        ).get(groupSettingsStep);
    }

    private registerGroupSettingsEndpoint(): void {
        const groupSettingsStep = this._COMPONENT_STEP
            ? CoreEvent.getChild(
                this._COMPONENT_STEP as CoreEvent.TStepRef,
                Core.Dictionary.WorkflowNodeNames.customFormGroupSettings,
            )
            : null;
        if (!groupSettingsStep) return;

        CoreEvent.App.registerEmit(groupSettingsStep, (request: CoreEvent.ClRequest) => {
            const payload = request.payload as {
                action?: string;
                groupId?: string | null;
                title?: string;
            };
            if (payload.action !== "save") return {applied: false, cancelled: payload.action === "cancel"};

            const title = String(payload.title ?? "");
            const event = new Event("custom-form-group-settings");
            if (payload.groupId == null) {
                if (!title.trim()) return {applied: false};
                const createdGroup: CustomFormGroup = {
                    id: this.nextId("group"),
                    title: title.trim(),
                    bodyIsOpen: true,
                    columns: 1,
                    fields: [],
                };
                this.updateTemplate([...this.getGroups(), createdGroup], event);
                return {applied: true, group: createdGroup};
            }

            const group = this.getGroups().find((item) => item.id === payload.groupId);
            if (!group) return {applied: false};
            this.updateGroup(payload.groupId, (current) => ({...current, title}), event);
            return {applied: true, group: {...group, title}};
        });
    }

    private closeGroupSettingsPageSetting(): void {
        const source = this._GROUP_SETTINGS_WORKFLOW_SOURCE;
        const endpoint = this._GROUP_SETTINGS_PAGE_SETTING_ENDPOINT;
        this._GROUP_SETTINGS_WORKFLOW_SOURCE = null;
        this._GROUP_SETTINGS_PAGE_SETTING_ENDPOINT = null;
        if (source && endpoint && CoreEvent.App.hasEmit(endpoint)) {
            CoreEvent.App.request(CoreEvent.requestMap([[endpoint, {close: true}]]), source);
        }
        for (const resource of [...this._GROUP_SETTINGS_WINDOWS.values()]) resource.dispose?.();
    }

    private openGroupSettingsWindow(groupId: string | null, event: Event): void {
        const settingsKey = groupId ?? "new-group";
        const existing = this._GROUP_SETTINGS_WINDOWS.get(settingsKey) as (DisposableChild & {call_open?: () => void}) | undefined;
        if (existing) {
            existing.call_open?.();
            return;
        }

        const group = groupId === null ? null : this.getGroups().find((item) => item.id === groupId) ?? null;
        if (groupId !== null && !group) return;

        const editorKeys = Keys.category.components.fetch.form.customForm.editor;
        let titleDraft = group?.title ?? "";
        const titleInput = new ComponentInput.Component({
            prop_name: `custom-form-group-title-${settingsKey}`,
            prop_value: titleDraft,
            prop_labelTitle: this.translate(editorKeys.groupTitle),
        } as any, {
            INPUT_CHANGE: (_inputEvent, _data, args) => { titleDraft = String(args?.VALUE ?? ""); },
        } as any);
        const windowBody = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-3", "p-3"],
            children: [titleInput.getReactiveElement() as CoreReactive.App],
        });

        let windowComponent!: ComponentWindow.Component;
        let cleanupTimer: number | null = null;
        let applyTimer: number | null = null;
        let isDisposed = false;
        const disposeSettings = (): void => {
            if (isDisposed) return;
            isDisposed = true;
            if (cleanupTimer !== null) window.clearTimeout(cleanupTimer);
            if (applyTimer !== null) window.clearTimeout(applyTimer);
            (windowComponent.getElement() as HTMLElement).remove();
            windowComponent.getScope().dispose();
            windowComponent.dispose();
            titleInput.dispose();
            if (this._GROUP_SETTINGS_WINDOWS.get(settingsKey) === resource) this._GROUP_SETTINGS_WINDOWS.delete(settingsKey);
            const childIndex = this._DYNAMIC_CHILDREN.indexOf(resource);
            if (childIndex >= 0) this._DYNAMIC_CHILDREN.splice(childIndex, 1);
        };
        const resource: DisposableChild & {call_open?: () => void} = {dispose: disposeSettings};
        windowComponent = new ComponentWindow.Component({
            prop_title: this.translate(groupId === null ? editorKeys.addGroup : editorKeys.groupSettings),
            prop_body: windowBody,
            prop_acceptText: this.translate(editorKeys.save),
            prop_cancelText: this.translate(editorKeys.cancel),
            prop_windowWidth: 520,
            prop_windowHeight: 300,
            prop_showBtnResize: false,
            prop_isVisible: true,
        } as any, {
            ACCEPT: (acceptEvent: Event) => {
                applyTimer = window.setTimeout(() => {
                    if (isDisposed) return;
                    if (groupId === null) {
                        const title = titleDraft.trim();
                        if (!title) return;
                        this.updateTemplate([...this.getGroups(), {
                            id: this.nextId("group"),
                            title,
                            bodyIsOpen: true,
                            columns: 1,
                            fields: [],
                        }], acceptEvent);
                        return;
                    }
                    this.updateGroup(groupId, (current) => ({...current, title: titleDraft}), acceptEvent);
                }, 225);
            },
            CLOSE: () => {
                cleanupTimer = window.setTimeout(disposeSettings, 250);
            },
        } as any);
        resource.call_open = () => windowComponent.call_open();
        this._GROUP_SETTINGS_WINDOWS.set(settingsKey, resource);
        this._DYNAMIC_CHILDREN.push(resource);
        document.body.appendChild(windowComponent.getElement() as HTMLElement);
        windowComponent.call_open(event);
    }

    private getGroupColumnCount(value: unknown): 1 | 2 | 3 | 4 {
        return value === 2 || value === 3 || value === 4 ? value : 1;
    }

    private getGroupLayoutColumn(value: unknown): LayoutColumn {
        switch (this.getGroupColumnCount(value)) {
            case 2: return LayoutColumn.COL_6;
            case 3: return LayoutColumn.COL_4;
            case 4: return LayoutColumn.COL_3;
            default: return LayoutColumn.COL_12;
        }
    }

    private updateGroupFieldsFromLayout(groupId: string, items: LayoutCreatorItemState[], event: Event): void {
        const fields = items.flatMap((item, index) => {
            const field = this.createFieldFromLayoutItem(item, index);
            return field ? [field] : [];
        });
        const groups = this.getGroups().map((group) => group.id === groupId ? {...group, fields} : group);
        this._SKIP_GROUPS_REBUILD = true;
        this.updateTemplate(groups, event);
    }

    private updateGroupTitle(groupId: string, title: string, event: Event): void {
        const groups = this.getGroups().map((group) => group.id === groupId ? {...group, title} : group);
        this._SKIP_GROUPS_REBUILD = true;
        this.updateTemplate(groups, event);
    }

    private createFieldFromLayoutItem(item: LayoutCreatorItemState, index: number): CustomFormField | null {
        const type = item.component === ComponentInput.Component
            ? CustomFormFieldType.INPUT
            : item.component === ComponentInputDescription.Component
                ? CustomFormFieldType.TEXTAREA
                : item.component === ComponentInputCheckBox.Component
                    ? CustomFormFieldType.CHECKBOX
                    : item.component === ComponentInputRadioBox.Component
                        ? CustomFormFieldType.RADIO
                        : item.component === ComponentInputListSelector.Component
                            ? CustomFormFieldType.SELECT
                            : null;
        if (!type) return null;

        const properties = item.properties ?? {};
        const sourceColumns = this.readValue<any[]>(properties.prop_columns) ?? [];
        const sourceOptions = this.readValue<any[]>(properties.prop_options) ?? sourceColumns;
        const options = sourceOptions.map((option) => {
            const value = option?.value ?? option?.id;
            return {value, label: String(option?.label ?? option?.title ?? option?.name ?? value ?? "")};
        }).filter((option) => option.value !== undefined);
        const selectedValues = sourceColumns.filter((option) => option?.selected).map((option) => option.id);
        const value = type === CustomFormFieldType.RADIO
            ? this.readValue(properties.prop_itemSelected)
            : type === CustomFormFieldType.SELECT
                ? selectedValues
                : this.readValue(properties.prop_value);
        const id = item.workflowChildName || `field-${index + 1}`;
        const name = String(this.readValue(properties.prop_name) ?? id);
        return {
            id,
            name,
            label: String(this.readValue(properties.prop_labelTitle) ?? this.readValue(properties.prop_title) ?? ""),
            type,
            value,
            placeholder: this.readValue(properties.prop_placeholder) ?? null,
            required: Boolean(this.readValue(properties.prop_required) ?? this.readValue(properties.prop_isRequired) ?? false),
            options,
            props: {...properties},
            col: item.col ?? null,
        };
    }

    private createRunField(
        field: CustomFormField,
        groupId: string,
        includeAuxiliary: boolean = true,
    ): {component: DisposableChild; auxiliary: CoreReactive.App[]} {
        const name = field.name || field.id;
        const currentValue = this.resolveFieldValue(field, name);
        const customProps = field.props && typeof field.props === "object" ? {...field.props} : {};
        const report = (event: Event, value: unknown) => this.reportValue(field, name, value, event);
        const workflowChildName = this.getFieldWorkflowChildName(groupId, field);

        switch (field.type) {
            case CustomFormFieldType.TEXTAREA: {
                const child = new ComponentInputDescription.Component({
                    ...customProps,
                    prop_workflowChildName: workflowChildName,
                    prop_name: name,
                    prop_value: this.stringValue(currentValue),
                    prop_labelTitle: field.label,
                    prop_placeholder: field.placeholder ?? null,
                } as any, {
                    INPUT_CHANGE: (event, _data, args) => report(event, args?.VALUE),
                } as any);
                this.trackField(child, field);
                return {component: child, auxiliary: []};
            }
            case CustomFormFieldType.CHECKBOX: {
                const hidden = includeAuxiliary ? this.hiddenValue(name, currentValue) : null;
                const child = new ComponentInputCheckBox.Component({
                    ...customProps,
                    prop_workflowChildName: workflowChildName,
                    prop_name: name,
                    prop_value: currentValue ?? false,
                    prop_labelTitle: field.label,
                } as any, {
                    CLICK: (event, _data, args) => {
                        const value = args?.VALUE;
                        if (hidden) this.setHiddenValue(hidden, value);
                        report(event, value);
                    },
                } as any);
                this.trackField(child, field);
                return {component: child, auxiliary: hidden ? [hidden] : []};
            }
            case CustomFormFieldType.RADIO: {
                const selected = new CoreObservable.App<string | number | null>(currentValue as string | number | null ?? null);
                const hidden = includeAuxiliary ? this.hiddenValue(name, currentValue) : null;
                const child = new ComponentInputRadioBox.Component({
                    ...customProps,
                    prop_workflowChildName: workflowChildName,
                    prop_name: name,
                    prop_title: field.label,
                    prop_options: (field.options ?? []).map((option) => ({id: option.value, name: option.label})),
                    prop_itemSelected: selected as any,
                } as any, {
                    SELECT_ITEM: (event, _data, args) => {
                        const value = args?.VALUE ?? selected.get();
                        if (hidden) this.setHiddenValue(hidden, value);
                        report(event, value);
                    },
                } as any);
                this.trackField(child, field);
                return {component: child, auxiliary: hidden ? [hidden] : []};
            }
            case CustomFormFieldType.SELECT: {
                const selectedValues = Array.isArray(currentValue) ? currentValue : currentValue == null ? [] : [currentValue];
                const columns = new CoreObservable.App((field.options ?? []).map((option) => ({
                    id: option.value,
                    title: option.label,
                    selected: selectedValues.includes(option.value),
                })));
                const initialSelected = (columns.get() as Array<{id: string | number; selected: boolean}>)
                    .filter((option) => option.selected).map((option) => option.id);
                const hidden = includeAuxiliary ? this.hiddenValue(name, initialSelected.join(",")) : null;
                const child = new ComponentInputListSelector.Component({
                    ...customProps,
                    prop_workflowChildName: workflowChildName,
                    prop_columns: columns as any,
                    prop_labelTitle: field.label,
                } as any, {
                    CALLBACK_COL_SELECTOR: (event) => {
                        const value = (columns.get() as Array<{id: string | number; selected: boolean}>)
                            .filter((option) => option.selected).map((option) => option.id);
                        if (hidden) this.setHiddenValue(hidden, value.join(","));
                        report(event, value);
                    },
                } as any);
                this.trackField(child, field);
                return {component: child, auxiliary: hidden ? [hidden] : []};
            }
            case CustomFormFieldType.INPUT:
            default: {
                const child = new ComponentInput.Component({
                    ...customProps,
                    prop_workflowChildName: workflowChildName,
                    prop_name: name,
                    prop_value: this.stringValue(currentValue),
                    prop_labelTitle: field.label,
                    prop_type: (customProps as any).prop_type ?? InputSimpleTypes.STRING,
                    prop_placeholder: field.placeholder ?? null,
                } as any, {
                    INPUT_CHANGE: (event, _data, args) => report(event, args?.VALUE),
                } as any);
                this.trackField(child, field);
                return {component: child, auxiliary: []};
            }
        }
    }

    private getFieldWorkflowChildName(groupId: string, field: CustomFormField): string {
        return field.id || `${Core.Dictionary.WorkflowNodeNames.customFormGroupLayout}_${groupId}`;
    }

    private trackField(child: DisposableChild, field: CustomFormField): void {
        this._DYNAMIC_CHILDREN.push(child);
        if (!field.required) return;
        const element = (child as any).getElement?.() as HTMLElement | undefined;
        if (!element) return;
        element.setAttribute("aria-required", "true");
        element.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select")
            .forEach((control) => {
                if ((control as HTMLInputElement).type !== "hidden") control.required = true;
            });
    }

    private hiddenValue(name: string, value: unknown): CoreReactive.App {
        return CoreReactive.App.input({
            attrs: {type: "hidden", name, "aria-hidden": "true"},
            props: {value: this.stringValue(value) ?? ""},
        });
    }

    private setHiddenValue(hidden: CoreReactive.App, value: unknown): void {
        const element = hidden.getElement() as HTMLInputElement;
        element.value = this.stringValue(value) ?? "";
    }

    private resolveFieldValue(field: CustomFormField, name: string): unknown {
        const values = this.readValue<Record<string, unknown>>(this.get("prop_customFormValues")) ?? {};
        if (Object.prototype.hasOwnProperty.call(values, name)) return values[name];
        if (Object.prototype.hasOwnProperty.call(this._LOCAL_VALUES, name)) return this._LOCAL_VALUES[name];
        return field.value;
    }

    private reportValue(field: CustomFormField, name: string, value: unknown, event: Event): void {
        this._LOCAL_VALUES = {...this._LOCAL_VALUES, [name]: value};
        this.executeMethod("VALUE_CHANGE", event, {FIELD_ID: field.id, NAME: name, VALUE: value});
    }

    private getFormOptions(): CustomFormFormOptions {
        const source = this.readValue<CustomFormFormOptions>(this.get("prop_customFormFormOptions")) ?? {};
        const allowed = [
            "prop_url", "prop_data", "prop_controller", "prop_showErrorStepper", "prop_runFetch",
            "prop_btnSubmit", "prop_btnSubmitBackground", "prop_btnSubmitBackgroundHover", "prop_btnSubmitColor",
            "prop_formClass", "prop_formStyles", "prop_formsMinHeight", "prop_btnformClass", "prop_btnformStyles",
        ] as const;
        const options: Record<string, unknown> = {};
        for (const key of allowed) {
            if (Object.prototype.hasOwnProperty.call(source, key)) options[key] = source[key];
        }
        if (options.prop_runFetch == null) options.prop_runFetch = false;
        return options as CustomFormFormOptions;
    }

    private updateTemplate(groups: CustomFormGroup[], event: Event): void {
        this.set("prop_customFormGroups", groups);
        this.executeMethod("TEMPLATE_CHANGE", event, {GROUPS: groups});
    }

    private updateGroup(groupId: string, update: (group: CustomFormGroup) => CustomFormGroup, event: Event): void {
        const groups = this.getGroups().map((group) => group.id === groupId ? update(group) : group);
        this.updateTemplate(groups, event);
    }

    private getGroups(): CustomFormGroup[] {
        const groups = this.readValue<CustomFormGroup[]>(this.get("prop_customFormGroups"));
        return Array.isArray(groups) ? groups : [];
    }

    private editorInput(label: string, value: unknown, onChange: (value: string, event: Event) => void): CoreReactive.App {
        return CoreReactive.App.label({
            className: ["d-flex", "flex-column", "gap-1"],
            children: [
                CoreReactive.App.span({props: {textContent: label}}),
                CoreReactive.App.input({
                    attrs: {type: "text", "aria-label": label},
                    props: {value: this.stringValue(value) ?? ""},
                    className: ["form-control"],
                    on: {change: (event) => onChange((event.currentTarget as HTMLInputElement).value, event)},
                }),
            ],
        });
    }

    private editorButton(title: string, onClick: EditorEvent): CoreReactive.App {
        return CoreReactive.App.button({
            attrs: {type: "button"},
            className: ["btn", "btn-outline-secondary", "align-self-start"],
            children: [title],
            on: {click: (event) => onClick(event)},
        });
    }

    private translate(key: any): string {
        const translation = CoreLanguage.App.translate(key);
        return translation?.get?.() ?? String(translation ?? "");
    }

    private nextId(prefix: string): string {
        return `${prefix}-${Date.now().toString(36)}-${++ComponentCustomForm._ID}`;
    }

    private stringValue(value: unknown): string | null {
        if (value == null) return null;
        if (typeof value === "string") return value;
        if (typeof value === "number" || typeof value === "boolean") return String(value);
        if (Array.isArray(value)) return value.map((item) => this.stringValue(item) ?? "").join(",");
        try { return JSON.stringify(value); } catch { return String(value); }
    }

    private readValue<T>(value: any): T {
        return (CoreObservable.App.isObservable(value) ? value.get() : value) as T;
    }

    private disposeDynamicChildren(): void {
        for (const child of this._DYNAMIC_CHILDREN.splice(0).reverse()) {
            child.dispose?.();
            child.getScope?.().dispose();
            if (!child.dispose) (child as any).disposeStep?.();
        }
    }
}
