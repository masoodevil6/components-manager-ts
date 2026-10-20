import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreLanguage from "@/core_languages";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentLayout from "../componentLayout";
import * as ComponentForm from "../componentForm";
import * as ComponentCollapse from "../componentCollapse";
import * as ComponentCollapseLine from "../componentCollapseLine";
import * as ComponentInput from "../componentInput";
import * as ComponentWindow from "../componentWindow";
import * as ComponentWindowConfirm from "../componentWindowConfirm";
import * as ComponentInputSelectOption from "../componentInputSelectOption";
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

export class ComponentCustomForm extends ComponentCustomFormBase {
    private static _ID = 0;
    private readonly _VIEW = new CoreObservable.App<ComponentLayout.LayoutContentItem[] | null>(null);
    private readonly _DYNAMIC_CHILDREN: DisposableChild[] = [];
    private readonly _GROUP_SETTINGS_WINDOWS = new Map<string, DisposableChild>();
    private _LAYOUT: ComponentLayout.Component | null = null;
    private _DELETE_CONFIRM: ComponentWindowConfirm.Component | null = null;
    private _DELETE_CONFIRM_ELEMENT: HTMLElement | null = null;
    private _PENDING_DELETE_GROUP_ID: string | null = null;
    private _LOCAL_VALUES: Record<string, unknown> = {};
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentCustomForm>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createCustomFormStep());
        this._LOCAL_VALUES = {...(this.readValue<Record<string, unknown>>(config?.prop_customFormValues) ?? {})};
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
        this.watchProps();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
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
                this.openGroupSettings(null, event);
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
        const fields = Array.isArray(group.fields) ? group.fields : [];
        const fieldRows = fields.map((field) => this.renderEditField(group, field));
        const addFieldLabel = this.translate(Keys.category.components.fetch.form.customForm.editor.addField);
        const addFieldIcon = new ComponentIcon.Component({
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
            prop_iconTitle: addFieldLabel,
            prop_iconStyles: {display: "flex", width: "100%", height: "100%", pointerEvents: "none"},
        } as any);
        const addField = new ComponentBorder.Component({
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
            prop_content: addFieldIcon.getReactiveElement(),
        } as any, {
            CLICK_BORDER: (event) => {
                const id = this.nextId("field");
                this.updateGroup(group.id, (current) => ({
                    ...current,
                    fields: [...(current.fields ?? []), {
                        id,
                        name: id.replace(/-/g, "_"),
                        label: "New field",
                        type: CustomFormFieldType.INPUT,
                        value: "",
                    }],
                }), event);
            },
        } as any);
        const addFieldElement = addField.getElement() as HTMLElement;
        addFieldElement.setAttribute("role", "button");
        addFieldElement.setAttribute("tabindex", "0");
        addFieldElement.setAttribute("aria-label", addFieldLabel);
        addFieldElement.title = addFieldLabel;
        addFieldElement.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            addFieldElement.click();
        });
        this._DYNAMIC_CHILDREN.push(addFieldIcon, addField);
        const body = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-2", "p-2"],
            children: [...fieldRows, addField.getReactiveElement() as CoreReactive.App],
        });
        const collapse = new ComponentCollapse.Component({
            prop_collapseBodyIsOpen: group.bodyIsOpen ?? true,
            prop_collapseTitle: group.title || this.translate(Keys.category.components.fetch.form.customForm.editor.groupTitle),
            prop_collapseBody: body,
            prop_collapseMenuItems: [{
                id: `settings-${group.id}`,
                title: this.translate(Keys.category.components.fetch.form.customForm.editor.groupSettings),
                action: "group-settings",
                icon: UiIcons.Src.FileSetting.Definition,
            }, {
                id: `delete-${group.id}`,
                title: this.translate(Keys.category.components.fetch.form.customForm.editor.removeGroup),
                action: "delete-group",
                icon: UiIcons.Src.FilesDelete.Definition,
            }],
        } as any, {
            SELECT_MENU_ITEM: (event, dataArgs) => {
                if (dataArgs?.ITEM?.action === "group-settings") this.openGroupSettings(group.id, event);
                if (dataArgs?.ITEM?.action === "delete-group") this.confirmRemoveGroup(group.id, event);
            },
        } as any);
        this._DYNAMIC_CHILDREN.push(collapse);
        return collapse.getReactiveElement() as CoreReactive.App;
    }

    private renderEditField(group: CustomFormGroup, field: CustomFormField): CoreReactive.App {
        const editorKeys = Keys.category.components.fetch.form.customForm.editor;
        const fields: CoreReactive.App[] = [
            this.editorInput(this.translate(editorKeys.fieldName), field.name, (name, event) => this.updateField(group.id, field.id, {name}, event)),
            this.editorInput(this.translate(editorKeys.fieldLabel), field.label, (label, event) => this.updateField(group.id, field.id, {label}, event)),
            this.editorSelect(this.translate(editorKeys.fieldType), field.type, [
                [CustomFormFieldType.INPUT, this.translate(editorKeys.input)],
                [CustomFormFieldType.TEXTAREA, this.translate(editorKeys.textarea)],
                [CustomFormFieldType.CHECKBOX, this.translate(editorKeys.checkbox)],
                [CustomFormFieldType.RADIO, this.translate(editorKeys.radio)],
                [CustomFormFieldType.SELECT, this.translate(editorKeys.select)],
            ], (type, event) => this.updateField(group.id, field.id, {type: type as CustomFormFieldType}, event)),
            this.editorInput(this.translate(editorKeys.fieldPlaceholder), field.placeholder ?? "", (placeholder, event) => this.updateField(group.id, field.id, {placeholder: placeholder || null}, event)),
            this.editorCheckbox(this.translate(editorKeys.required), Boolean(field.required), (required, event) => this.updateField(group.id, field.id, {required}, event)),
        ];

        if (field.type === CustomFormFieldType.RADIO || field.type === CustomFormFieldType.SELECT) {
            const optionText = (field.options ?? []).map((option) => option.label).join(", ");
            fields.push(this.editorInput(this.translate(editorKeys.options), optionText, (value, event) => {
                const options = value.split(",").map((label) => label.trim()).filter(Boolean).map((label) => ({label, value: label}));
                this.updateField(group.id, field.id, {options}, event);
            }));
        }

        fields.push(this.editorButton(this.translate(editorKeys.removeField), (event) => {
            this.updateGroup(group.id, (current) => ({
                ...current,
                fields: (current.fields ?? []).filter((item) => item.id !== field.id),
            }), event);
        }));

        return CoreReactive.App.div({
            attrs: {"data-field-id": field.id},
            className: ["d-flex", "flex-wrap", "gap-2", "align-items-end", "border", "rounded", "p-2"],
            children: fields,
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
        const layoutItems = (Array.isArray(group.fields) ? group.fields : []).map((field) => ({
            content: CoreReactive.App.section({
                className: ["d-flex", "flex-column", "gap-2"],
                children: this.renderRunField(field),
            }),
        }));
        const layout = new ComponentLayout.Component({
            prop_col: column,
            prop_layoutContent: layoutItems,
        } as any);
        this._DYNAMIC_CHILDREN.push(layout);
        const body = CoreReactive.App.section({
            attrs: {"aria-label": group.title || "Form group"},
            className: ["d-flex", "flex-column", "p-2"],
            children: [layout.getReactiveElement() as CoreReactive.App],
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
        }

        this._DELETE_CONFIRM.call_open(event);
    }

    private openGroupSettings(groupId: string | null, event: Event): void {
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
        let columnsDraft = this.getGroupColumnCount(group?.columns);
        const titleInput = new ComponentInput.Component({
            prop_name: `custom-form-group-title-${settingsKey}`,
            prop_value: titleDraft,
            prop_labelTitle: this.translate(editorKeys.groupTitle),
        } as any, {
            INPUT_CHANGE: (_inputEvent, _data, args) => { titleDraft = String(args?.VALUE ?? ""); },
        } as any);
        const columnsSelect = new ComponentInputSelectOption.Component({
            prop_name: `custom-form-group-columns-${settingsKey}`,
            prop_itemSelected: columnsDraft,
            prop_labelTitle: this.translate(editorKeys.columns),
            prop_options: [1, 2, 3, 4].map((value) => ({id: value, name: value})),
        } as any, {
            SELECT_CHANGE: (_selectEvent, _data, args) => {
                const value = Number(args?.VALUE);
                if (value >= 1 && value <= 4) columnsDraft = value as 1 | 2 | 3 | 4;
            },
        } as any);
        const windowBody = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-3", "p-3"],
            children: [
                titleInput.getReactiveElement() as CoreReactive.App,
                columnsSelect.getReactiveElement() as CoreReactive.App,
            ],
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
            columnsSelect.dispose();
            if (this._GROUP_SETTINGS_WINDOWS.get(settingsKey) === resource) this._GROUP_SETTINGS_WINDOWS.delete(settingsKey);
            const childIndex = this._DYNAMIC_CHILDREN.indexOf(resource);
            if (childIndex >= 0) this._DYNAMIC_CHILDREN.splice(childIndex, 1);
        };
        const resource: DisposableChild & {call_open?: () => void} = {dispose: disposeSettings};
        windowComponent = new ComponentWindow.Component({
            prop_title: this.translate(editorKeys.groupSettings),
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
                            columns: columnsDraft,
                            fields: [],
                        }], acceptEvent);
                        return;
                    }
                    this.updateGroup(groupId, (current) => ({...current, title: titleDraft, columns: columnsDraft}), acceptEvent);
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

    private renderRunField(field: CustomFormField): CoreReactive.App[] {
        const name = field.name || field.id;
        const currentValue = this.resolveFieldValue(field, name);
        const customProps = field.props && typeof field.props === "object" ? {...field.props} : {};
        const report = (event: Event, value: unknown) => this.reportValue(field, name, value, event);

        switch (field.type) {
            case CustomFormFieldType.TEXTAREA: {
                const child = new ComponentInputDescription.Component({
                    ...customProps,
                    prop_name: name,
                    prop_value: this.stringValue(currentValue),
                    prop_labelTitle: field.label,
                    prop_placeholder: field.placeholder ?? null,
                } as any, {
                    INPUT_CHANGE: (event, _data, args) => report(event, args?.VALUE),
                } as any);
                this.trackField(child, field);
                return [child.getReactiveElement() as CoreReactive.App];
            }
            case CustomFormFieldType.CHECKBOX: {
                const hidden = this.hiddenValue(name, currentValue);
                const child = new ComponentInputCheckBox.Component({
                    ...customProps,
                    prop_name: name,
                    prop_value: currentValue ?? false,
                    prop_labelTitle: field.label,
                } as any, {
                    CLICK: (event, _data, args) => {
                        const value = args?.VALUE;
                        this.setHiddenValue(hidden, value);
                        report(event, value);
                    },
                } as any);
                this.trackField(child, field);
                return [child.getReactiveElement() as CoreReactive.App, hidden];
            }
            case CustomFormFieldType.RADIO: {
                const selected = new CoreObservable.App<string | number | null>(currentValue as string | number | null ?? null);
                const hidden = this.hiddenValue(name, currentValue);
                const child = new ComponentInputRadioBox.Component({
                    ...customProps,
                    prop_name: name,
                    prop_title: field.label,
                    prop_options: (field.options ?? []).map((option) => ({id: option.value, name: option.label})),
                    prop_itemSelected: selected as any,
                } as any, {
                    SELECT_ITEM: (event, _data, args) => {
                        const value = args?.VALUE ?? selected.get();
                        this.setHiddenValue(hidden, value);
                        report(event, value);
                    },
                } as any);
                this.trackField(child, field);
                return [child.getReactiveElement() as CoreReactive.App, hidden];
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
                const hidden = this.hiddenValue(name, initialSelected.join(","));
                const child = new ComponentInputListSelector.Component({
                    ...customProps,
                    prop_columns: columns as any,
                    prop_labelTitle: field.label,
                } as any, {
                    CALLBACK_COL_SELECTOR: (event) => {
                        const value = (columns.get() as Array<{id: string | number; selected: boolean}>)
                            .filter((option) => option.selected).map((option) => option.id);
                        this.setHiddenValue(hidden, value.join(","));
                        report(event, value);
                    },
                } as any);
                this.trackField(child, field);
                return [child.getReactiveElement() as CoreReactive.App, hidden];
            }
            case CustomFormFieldType.INPUT:
            default: {
                const child = new ComponentInput.Component({
                    ...customProps,
                    prop_name: name,
                    prop_value: this.stringValue(currentValue),
                    prop_labelTitle: field.label,
                    prop_type: (customProps as any).prop_type ?? InputSimpleTypes.STRING,
                    prop_placeholder: field.placeholder ?? null,
                } as any, {
                    INPUT_CHANGE: (event, _data, args) => report(event, args?.VALUE),
                } as any);
                this.trackField(child, field);
                return [child.getReactiveElement() as CoreReactive.App];
            }
        }
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

    private updateField(groupId: string, fieldId: string, patch: Partial<CustomFormField>, event: Event): void {
        this.updateGroup(groupId, (group) => ({
            ...group,
            fields: (group.fields ?? []).map((field) => field.id === fieldId ? {...field, ...patch} : field),
        }), event);
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

    private editorSelect(
        label: string,
        value: string,
        options: Array<[string, string]>,
        onChange: (value: string, event: Event) => void,
    ): CoreReactive.App {
        return CoreReactive.App.label({
            className: ["d-flex", "flex-column", "gap-1"],
            children: [
                CoreReactive.App.span({props: {textContent: label}}),
                CoreReactive.App.select({
                    attrs: {"aria-label": label},
                    className: ["form-select"],
                    children: options.map(([optionValue, title]) => CoreReactive.App.option({
                        attrs: {value: optionValue, selected: optionValue === value},
                        children: [title],
                    })),
                    on: {change: (event) => onChange((event.currentTarget as HTMLSelectElement).value, event)},
                }),
            ],
        });
    }

    private editorCheckbox(label: string, checked: boolean, onChange: (value: boolean, event: Event) => void): CoreReactive.App {
        return CoreReactive.App.label({
            className: ["d-flex", "align-items-center", "gap-1"],
            children: [
                CoreReactive.App.input({
                    attrs: {type: "checkbox", "aria-label": label},
                    props: {checked},
                    on: {change: (event) => onChange((event.currentTarget as HTMLInputElement).checked, event)},
                }),
                CoreReactive.App.span({props: {textContent: label}}),
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
