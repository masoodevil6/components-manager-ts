import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as CoreLanguage   from "@/core_languages";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
// --------------------------------
import {ComponentInputAgreementCheckBoxBase}    from "./ComponentInputAgreementCheckBoxBase";
import {Schemas}                                from "./Schemas";
import {MethodsType,
        MethodsConfigType}                      from "./Methods";
import {AgreementCheckBoxItem, Props}           from "./Props";
import {PropsConfigType}                        from "./Props";
import {createInputAgreementCheckBoxStep}      from "./Step";
import {PartAttrDefault}                        from "@/core_components";
import {ComponentStructureTrait}                from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType}        from "../componentStructure/Props";
import {Keys}                                   from "../../../module_categories/languages";
// --------------------------------
import * as ComponentInputCheckBox              from "../componentInputCheckBox";
import * as ComponentLabel                      from "../componentLabel";
import * as ComponentDraggableOrdersY           from "../componentDraggableOrdersY";


/**
 * ComponentInputAgreementCheckBox — کلاس نهایی
 *
 * Composition:
 *   ComponentInputAgreementCheckBox HAS-A ComponentLabel (for the label section)
 *   ComponentInputAgreementCheckBox HAS-A ComponentInputCheckBox (for "select all" and individual items)
 *
 * Constructor: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (CLICK_ALL, CLICK_ITEM)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 9.1 — Step داخلی در constructor ساخته می‌شود (factory function).
 * Plan 11.2 — لایه <component-input-agreement-checkbox> + <section> از Schema پایه رندر می‌شود.
 */
export class ComponentInputAgreementCheckBox extends ComponentInputAgreementCheckBoxBase {

    private _CHECK_BOX_ALL: ComponentInputCheckBox.Component | null = null;
    private _dragJustFinished = false;


    constructor(
        config?:  Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentInputAgreementCheckBox>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createInputAgreementCheckBoxStep();

        super("input-agreement-checkbox", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    dispose(): void {
        this.disposeStep();
    }


    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.MAIN.part, {});
    }


    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.MAIN.part:
                return this.renderMain(attrsDefault, data, extra);
            case Schemas.MAIN_INPUT_ORDER.part:
                return this.renderMainInputOrder(attrsDefault, data, extra);
            case Schemas.MAIN_CHECK_BOX_ALL.part:
                return this.renderMainCheckBoxAll(attrsDefault, data, extra);
            case Schemas.MAIN_CHECK_BOX_LIST.part:
                return this.renderMainCheckBoxList(attrsDefault, data, extra);
            case Schemas.MAIN_CHECK_BOX_LIST_CHECK_BOX_ITEM.part:
                return this.renderMainCheckBoxListCheckBoxItem(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderMain — container section
    --------------------------------------------- */
    protected renderMain(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.part("section", {
            attrs: { ...attrsDefault },
            className: ["p-0", "m-0", "mt-1"],
            styles: {
                display: "flow-root",
            },
            children: [
                this.executeSchemaPart(Schemas.MAIN_INPUT_ORDER.part, {}),
                this.executeSchemaPart(Schemas.MAIN_CHECK_BOX_ALL.part, {}),
                this.executeSchemaPart(Schemas.MAIN_CHECK_BOX_LIST.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderMainInputOrder — hidden input for form submission
    --------------------------------------------- */
    protected renderMainInputOrder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_checkBoxList  = data?.["prop_checkBoxList"]  ?? bind.prop_checkBoxList;
        const prop_checkBoxOrder = data?.["prop_checkBoxOrder"] ?? bind.prop_checkBoxOrder;

        return CoreReactive.App.part("input", {
            attrs: {
                ...attrsDefault,
                type: "hidden",
            },
            attrsBind: {
                value: CoreObservable.App.computed(
                    (list, order) => {
                        const newList = this.pr_getListOrdered(list, order);
                        return JSON.stringify(newList.map(item => item.id));
                    },
                    [prop_checkBoxList, prop_checkBoxOrder],
                    this.getScope(),
                ),
            },
        });
    }


    /* ---------------------------------------------
       renderMainCheckBoxAll — "select all" checkbox
    --------------------------------------------- */
    protected renderMainCheckBoxAll(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_isDisable       = data?.["prop_isDisable"]       ?? bind.prop_isDisable;
        const prop_checkBoxAllTitle = data?.["prop_checkBoxAllTitle"] ?? bind.prop_checkBoxAllTitle;
        const prop_checkBoxList    = data?.["prop_checkBoxList"]    ?? bind.prop_checkBoxList;
        const prop_value           = data?.["prop_value"]           ?? bind.prop_value;
        const prop_labelShow       = data?.["prop_labelShow"]       ?? bind.prop_labelShow;

        const prop_labelTooltipDescription = data?.["prop_labelTooltipDescription"] ?? bind.prop_labelTooltipDescription;

        const translatedAllTitle = CoreLanguage.App.translate(
            Keys.category.components.inputAgreementCheckBox.texts.checkBoxAllTitle,
        );

        // عنوان متفاوت برای برچسب (label)
        const translatedAllLabel = CoreLanguage.App.translate(
            Keys.category.components.inputAgreementCheckBox.texts.checkBoxAllLabel,
        );

        const checkBoxAllTitle = CoreObservable.App.computed(
            (title, translated) => {
                console.log("[DEBUG checkBoxAllTitle]", { title, translated, result: title != null ? title : translated });
                return title != null ? title : translated;
            },
            [prop_checkBoxAllTitle, translatedAllTitle],
            this.getScope(),
        );

        this._CHECK_BOX_ALL = new ComponentInputCheckBox.Component(
            {
                classList:                  ["d-flow-root", "mb-1"],
                prop_isDisable:             prop_isDisable,
                prop_labelShow:             prop_labelShow,
                // استفاده از عبارت متفاوت برای عنوان برچسب
                prop_labelTitle:            translatedAllLabel,
                prop_labelTooltipDescription: prop_labelTooltipDescription,
                prop_title:                 checkBoxAllTitle,
                // نمایش b اصلی (main title)
                prop_titleShow:             true,
                prop_value:                 CoreObservable.App.computed(
                    (listValue, listCheckBox) => {
                        return listCheckBox.length > 0 && listCheckBox.every(item => listValue.includes(item.id));
                    },
                    [prop_value, prop_checkBoxList],
                    this.getScope(),
                ),
            } as any,
            {
                CLICK: (event: Event, dataArgs: any, componentArgs: any) => {
                    const value = componentArgs?.VALUE;
                    const isDisable = componentArgs?.IS_DISABLE;
                    if (!isDisable) {
                        this.pr_onClickCheckBoxAll(event, value);
                    }
                },
            } as any,
        );

        const reactiveEl = this._CHECK_BOX_ALL.getReactiveElement() as CoreReactive.App;
        setTimeout(() => {
            const el = reactiveEl.element;
            const bElements = el?.querySelectorAll("b");
            bElements?.forEach((b, i) => {
                const cs = window.getComputedStyle(b);
                console.log(`[DEBUG B#${i}]`, {
                    text: b.textContent,
                    visible: cs.display !== "none" && cs.visibility !== "hidden" && cs.opacity !== "0",
                    display: cs.display,
                    visibility: cs.visibility,
                    opacity: cs.opacity,
                    color: cs.color,
                    fontSize: cs.fontSize,
                    parentTag: b.parentElement?.tagName,
                    parentDisplay: b.parentElement ? window.getComputedStyle(b.parentElement).display : null,
                });
            });
            const spans = el?.querySelectorAll("span");
            spans?.forEach((s, i) => {
                const cs = window.getComputedStyle(s);
                console.log(`[DEBUG SPAN#${i}]`, {
                    text: s.textContent?.substring(0, 50),
                    display: cs.display,
                    offsetWidth: s.offsetWidth,
                    offsetHeight: s.offsetHeight,
                });
            });
        }, 100);
        return reactiveEl;
    }


    /* ---------------------------------------------
       renderMainCheckBoxList — list of individual checkboxes
    --------------------------------------------- */
    protected renderMainCheckBoxList(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_checkBoxList       = data?.["prop_checkBoxList"]       ?? bind.prop_checkBoxList;
        const prop_checkBoxOrderStatus = data?.["prop_checkBoxOrderStatus"] ?? bind.prop_checkBoxOrderStatus;
        const prop_checkBoxOrder      = data?.["prop_checkBoxOrder"]      ?? bind.prop_checkBoxOrder;
        const prop_maxHeightItems     = data?.["prop_maxHeightItems"]     ?? bind.prop_maxHeightItems;

        return CoreReactive.App.part("section", {
            attrs: { ...attrsDefault },
            className: ["col-12", "border-top", "pt-1"],
            stylesBind: {
                maxHeight: prop_maxHeightItems,
            },
            styles: {
                overflowY: "auto",
            },
            children: CoreObservable.App.computed(
                (orderStatus, listCheckBox, order) => {
                    const newList = this.pr_getListOrdered(listCheckBox, order);

                    if (orderStatus) {
                        const items: ComponentDraggableOrdersY.DraggableItem[] = [];
                        if (newList && Array.isArray(newList)) {
                            for (let i = 0; i < newList.length; i++) {
                                const itemCheckBox = newList[i];
                                if (itemCheckBox != null && itemCheckBox.hasOwnProperty("id")) {
                                    items.push({
                                        id:    itemCheckBox.id,
                                        body:  this.executeSchemaPart(
                                            Schemas.MAIN_CHECK_BOX_LIST_CHECK_BOX_ITEM.part,
                                            { itemCheckBox },
                                        ) as CoreReactive.App,
                                        isPin: itemCheckBox.isPin ?? false,
                                    });
                                }
                            }
                        }
                        const draggable = new ComponentDraggableOrdersY.Component(
                            {
                                prop_draggableOrders:      order ?? [],
                                prop_draggableItems:       items,
                                prop_draggableOrderStatus: true,
                            } as any,
                            {
                                UPDATE: (event: Event, _dataArgs: any, componentArgs: any) => {
                                    event.preventDefault();
                                    const newOrder = componentArgs?.ORDER ?? [];
                                    const list     = componentArgs?.LIST ?? [];
                                    this._dragJustFinished = true;
                                    setTimeout(() => { this._dragJustFinished = false; }, 0);
                                    this.pr_updateValueAfterOrder(newOrder, list, event);
                                },
                            } as any,
                        );
                        return [draggable.getReactiveElement() as CoreReactive.App];
                    }

                    let list: CoreReactive.App[] = [];
                    if (newList && Array.isArray(newList)) {
                        for (let i = 0; i < newList.length; i++) {
                            const itemCheckBox = newList[i];
                            if (itemCheckBox != null && itemCheckBox.hasOwnProperty("id")) {
                                list.push(
                                    this.executeSchemaPart(
                                        Schemas.MAIN_CHECK_BOX_LIST_CHECK_BOX_ITEM.part,
                                        { itemCheckBox },
                                    ) as CoreReactive.App,
                                );
                            }
                        }
                    }
                    return list;
                },
                [prop_checkBoxOrderStatus, prop_checkBoxList, prop_checkBoxOrder],
                this.getScope(),
            ),
        });
    }


    /* ---------------------------------------------
       renderMainCheckBoxListCheckBoxItem — individual checkbox item
    --------------------------------------------- */
    protected renderMainCheckBoxListCheckBoxItem(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        if (extra?.itemCheckBox) {
            const itemCheckBox: AgreementCheckBoxItem = extra.itemCheckBox;
            const bind = this._COMPONENT_PROPS_BIND;

            const prop_isDisable = data?.["prop_isDisable"] ?? bind.prop_isDisable;
            const prop_value     = data?.["prop_value"]     ?? bind.prop_value;

            if (itemCheckBox && itemCheckBox.id) {
                return CoreReactive.App.part("section", {
                    attrs: { ...attrsDefault },
                    children: [
                        new ComponentInputCheckBox.Component(
                            {
                                classList:      ["d-flow-root", "mb-1"],
                                prop_value:     CoreObservable.App.computed(
                                    (listValue) => listValue.includes(itemCheckBox.id),
                                    [prop_value],
                                    this.getScope(),
                                ),
                                prop_isDisable: prop_isDisable,
                                prop_labelShow: false,
                                prop_title:     itemCheckBox.title ?? null,
                            } as any,
                            {
                                CLICK: (event: Event, dataArgs: any, componentArgs: any) => {
                                    event.preventDefault();
                                    if (this._dragJustFinished) return;
                                    const value = componentArgs?.VALUE;
                                    const isDisable = componentArgs?.IS_DISABLE;
                                    if (!isDisable) {
                                        this.pr_onClickCheckBoxItem(event, itemCheckBox.id, value);
                                    }
                                },
                            } as any,
                        ).getReactiveElement() as CoreReactive.App,
                    ],
                });
            }
        }

        return CoreReactive.App.part("section", {
            attrs: { ...attrsDefault },
            styles: {},
            children: [],
        });
    }


    /* ---------------------------------------------
       FUNCTIONs — Private methods
    --------------------------------------------- */

    private pr_onClickCheckBoxAll(event: Event, checkBoxValue: any): void {
        event.preventDefault();
        const prop_checkBoxList  = this.get("prop_checkBoxList");
        const prop_checkBoxOrder = this.get("prop_checkBoxOrder");
        const prop_value         = this.get("prop_value");

        const allSelected = Array.isArray(prop_checkBoxList) &&
            prop_checkBoxList.length > 0 &&
            prop_checkBoxList.every((item: any) => Array.isArray(prop_value) && prop_value.includes(item.id));

        let newValue: any[] = [];
        if (!allSelected) {
            const newList = this.pr_getListOrdered(prop_checkBoxList, prop_checkBoxOrder);
            newValue = newList.map(item => item.id);
        }
        this.set("prop_value", newValue);

        this.executeMethod("CLICK_ALL", event, {});
    }


    private pr_onClickCheckBoxItem(event: Event, checkBoxId: string | number, checkBoxValue: any): void {
        event.preventDefault();
        const prop_checkBoxOrder = this.get("prop_checkBoxOrder");
        const prop_value = this.get("prop_value");

        const isSelected = Array.isArray(prop_value) && prop_value.includes(checkBoxId);

        if (isSelected) {
            const newValue = prop_value.filter((id: any) => id !== checkBoxId);
            this.set("prop_value", newValue);
        } else {
            const newValue = this.pr_insertByOrder(prop_checkBoxOrder, prop_value, checkBoxId);
            this.set("prop_value", newValue);
        }

        this.executeMethod("CLICK_ITEM", event, {});
    }


    private pr_getListOrdered(list: any[], order: any[], full = true): any[] {
        if (!Array.isArray(list)) return [];

        const map = new Map(list.map(item => [item.id, item]));

        const orderedItems = (order || [])
            .map(id => map.get(id))
            .filter(Boolean);

        const orderedSet = new Set(order);

        const rest = list.filter(item => !orderedSet.has(item.id));

        return [...orderedItems, ...rest];
    }


    private pr_insertByOrder(order: any[], value: any[], newId: string | number): any[] {
        if (value.includes(newId)) return [...value];

        const orderIndex = order.indexOf(newId);

        const orderMap = new Map(order.map((id, index) => [id, index]));

        if (orderIndex === -1) {
            return [...value, newId];
        }

        let insertIndex = value.length;
        for (let i = 0; i < value.length; i++) {
            const currentId = value[i];
            let currentOrderIndex = orderMap.get(currentId) ?? Infinity;

            if (currentOrderIndex > orderIndex) {
                insertIndex = i;
                break;
            }
        }

        return [
            ...value.slice(0, insertIndex),
            newId,
            ...value.slice(insertIndex),
        ];
    }


    private pr_updateValueAfterOrder(newOrder: any[], list: any[], event: Event): void {
        const prop_checkBoxList = this.get("prop_checkBoxList");
        const currentValue     = this.get("prop_value");

        const dragMap = new Map(
            list.map((item: any) => [item.id, item.isPin]),
        );

        const newList = prop_checkBoxList.map((item: any) => ({
            ...item,
            isPin: dragMap.get(item.id) ?? item.isPin,
        }));

        const valueSet = new Set(currentValue);
        const newValue = newOrder.filter((id: any) => valueSet.has(id));
        // Preserve pinned items that are in currentValue but not in newOrder
        const newOrderSet = new Set(newOrder);
        for (const id of currentValue) {
            if (!newOrderSet.has(id)) {
                newValue.push(id);
            }
        }

        this.set("prop_checkBoxOrder", newOrder);
        this.set("prop_value", newValue);
        this.set("prop_checkBoxList", newList);

        this.executeMethod("CLICK_ITEM", event, {});
    }

}
