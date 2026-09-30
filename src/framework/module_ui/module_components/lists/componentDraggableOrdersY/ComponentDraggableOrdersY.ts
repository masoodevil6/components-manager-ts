import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import {PartAttrDefault} from "@/core_components";
import {ComponentDraggableOrdersYBase} from "./ComponentDraggableOrdersYBase";
import {Schemas} from "./Schemas";
import type {PropsType} from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {createDraggableOrdersStep} from "./Step";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import * as UiIcons from "@/ui_icons";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as CoreLanguage from "@/core_languages";
import {Keys} from "../../../module_categories/languages";

export class ComponentDraggableOrdersY extends ComponentDraggableOrdersYBase {

    private _drag: any = null;
    private _dragOverId = new CoreObservable.App<any>(null);
    private _dragOverIndex = new CoreObservable.App<number | null>(null);

    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: Record<string, any>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createDraggableOrdersStep();
        super("draggable-orders-y", null, identity, step);
        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
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
            case Schemas.MAIN_LIST_ITEM.part:
                return this.renderMainListItem(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    protected renderMain(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND as unknown as Record<keyof PropsType, CoreObservable.App<any>>;
        const prop_items  = data?.["prop_draggableItems"]  ?? bind.prop_draggableItems;
        const prop_orders = data?.["prop_draggableOrders"] ?? bind.prop_draggableOrders;

        const children = CoreObservable.App.computed(
            (items, orders, overIndex) => {
                const pinned = (items ?? []).filter((el: any) => el?.isPin);
                const unpinned = (items ?? []).filter((el: any) => !el?.isPin);
                const map: Record<string | number, any> = Object.fromEntries(unpinned.map((el: any) => [el.id, el]));
                const orderedSet = new Set(orders ?? []);
                const sorted: any[] = [
                    ...pinned,
                    ...((orders ?? []).map((id: any) => map[id]).filter(Boolean)),
                    ...unpinned.filter((el: any) => !orderedSet.has(el.id)),
                ];

                const nodes: any[] = [];
                const placeholderText = CoreLanguage.App.translate(
                    Keys.category.components.draggableOrdersY.texts.placeholderInsertHere,
                );
                const placeholderContent = CoreReactive.App.b({
                    children: [ placeholderText ],
                });
                const placeholder = new ComponentBorder.Component({
                    prop_borderClass: ["mb-2", "text-center", "w-100"],
                    prop_borderStyles: CoreObservable.App.computed((sizeName) => ({
                        paddingInlineStart: UtilStyle.Css_Padding(sizeName),
                        paddingInlineEnd: UtilStyle.Css_Padding(sizeName),
                    }), [CoreConfig.Settings.SizeName.observable()], this.getScope()) as any,
                    prop_content: placeholderContent as any,
                    prop_borderType: ComponentBorder.BorderTypes.DASHED,
                    prop_contentColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
                    prop_borderColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
                } as any, {} as any).getReactiveElement();
                let unpinnedIndex = 0;
                for (const it of sorted) {
                    // فقط قبل از آیتم‌های ناپین placeholder را قرار بده
                    if (!it?.isPin && it?.id !== this._drag?.id && overIndex === unpinnedIndex) {
                        nodes.push(placeholder);
                    }
                    nodes.push(this.executeSchemaPart(Schemas.MAIN_LIST_ITEM.part, {item: it, isDragging: it?.id === this._drag?.id}));
                    if (!it?.isPin && it?.id !== this._drag?.id) unpinnedIndex++;
                }
                if (overIndex != null && overIndex === unpinnedIndex) nodes.push(placeholder);
                return nodes;
            },
            [prop_items, prop_orders, this._dragOverIndex],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: { display: "flex", flexDirection: "column" },
            className: ["position-relative"],
            children: [children],
        });
    }

    protected renderMainListItem(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        const item = extra?.item;
        const itemsObs  = (this._COMPONENT_PROPS_BIND as any).prop_draggableItems as CoreObservable.App<any>;
        const pinStatus = (this._COMPONENT_PROPS_BIND as any).prop_draggablePinStatus as CoreObservable.App<any>;

        const isPinned = CoreObservable.App.computed(
            (list) => {
                const it = (list ?? []).find((x: any) => x?.id === item?.id);
                return !!it?.isPin;
            },
            [itemsObs],
            this.getScope(),
        );

        // نشان‌دادن آیکون سنجاق فقط هنگام hover (مثل نسخه قدیمی)
        const iconHover = new CoreObservable.App<boolean>(false);
        const iconOpacity = CoreObservable.App.computed(
            (hover, st) => (st ? (hover ? "1" : "0") : "0"),
            [iconHover, pinStatus],
            this.getScope(),
        );

        const iconDef = CoreObservable.App.computed(
            (p) => UiIcons.CreateIcon(
                p ? UiIcons.Src.StatusPinOpen.Definition : UiIcons.Src.StatusPinClose.Definition,
                { size: 20 },
            ),
            [isPinned],
            this.getScope(),
        );

        const iconStyles = CoreObservable.App.computed(
            (op) => ({
                width:  "20px",
                height: "20px",
                cursor: "pointer",
                position: "absolute",
                top:    "50%",
                transform: "translate(0, -50%)",
                right:  "10px",
                opacity: op,
            }),
            [iconOpacity],
            this.getScope(),
        );

        const pinIcon = new ComponentIcon.Component({
            prop_icon:       iconDef as any,
            prop_iconTitle:  "pin",
            prop_iconStyles: iconStyles as any,
        } as any, {
            CLICK: (event: Event) => {
                event.preventDefault();
                this.pr_togglePin(event as any as MouseEvent, item);
            },
        } as any).getReactiveElement();

        const content = CoreReactive.App.section({
            className: ["position-relative"],
            on: {
                mouseenter: () => iconHover.set(true),
                mouseleave: () => iconHover.set(false),
            },
            children: [
                item?.body,
                pinIcon,
            ],
        });

        // رنگ پس‌زمینه مطابق legacy: پین‌شده → SUCCESS، حالت درگ → SECONDARY، پیش‌فرض → SHAN
        const bgColor = CoreObservable.App.computed(
            (pinned, overId) => {
                if (pinned) return UtilStyle.Css_Color(UtilConst.ColorMain.SUCCESS, UtilConst.ColorGrad.GRADE_5);
                if (overId === item?.id) return UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_5);
                return UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);
            },
            [isPinned, this._dragOverId],
            this.getScope(),
        );

        const borderColor = CoreObservable.App.computed(
            (pinned, overId) => {
                if (pinned) return UtilStyle.Css_Color(UtilConst.ColorMain.SUCCESS, UtilConst.ColorGrad.GRADE_3);
                if (overId === item?.id) return UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);
                return UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4);
            },
            [isPinned, this._dragOverId],
            this.getScope(),
        );

        const ordersStatus = (this._COMPONENT_PROPS_BIND as any).prop_draggableOrderStatus as CoreObservable.App<any>;

        const border = new ComponentBorder.Component({
            prop_borderClass: ["mb-2"],
            prop_borderStyles: CoreObservable.App.computed((sizeName) => ({
                cursor: "pointer",
                "user-select": "none",
                transition: "transform 180ms ease, opacity 180ms ease, background-color 180ms ease, border-color 180ms ease",
                opacity: extra?.isDragging ? "0.4" : "1",
                transform: extra?.isDragging ? "scale(0.98)" : "scale(1)",
                paddingInlineStart: UtilStyle.Css_Padding(sizeName),
                paddingInlineEnd: UtilStyle.Css_Padding(sizeName),
            }), [CoreConfig.Settings.SizeName.observable()], this.getScope()) as any,
            prop_content: content,
            prop_borderType: ComponentBorder.BorderTypes.DASHED,
            prop_contentBackgroundColor: bgColor as any,
            prop_borderColor: borderColor as any,
        } as any, {
            MOUSE_DOWN_BORDER: (event: Event) => {
                const target = event.target as HTMLElement;
                if (target && (target.closest("svg") || target.closest("i"))) return;
                const enable = ordersStatus?.get?.() ?? true;
                const pinned = isPinned.get();
                if (enable && !pinned) {
                    this.pr_startDrag(event as any as MouseEvent, item);
                } else if (enable && pinned) {
                    const up = (ev: MouseEvent) => {
                        window.removeEventListener('mouseup', up, true);
                        this.executeMethod('UPDATE', ev as any, {} as any);
                    };
                    window.addEventListener('mouseup', up, true);
                }
            },
        } as any).getReactiveElement();

        return CoreReactive.App.section({
            attrs: { ...attrsDefault, "data-order": item?.id },
            children: [
                border,
            ],
        });
    }

    private pr_startDrag(e: MouseEvent, item: any) {
        const bind = this._COMPONENT_PROPS_BIND as any;
        const enable = bind.prop_draggableOrderStatus?.get?.() ?? true;
        if (!enable) return;
        if (item?.isPin) return;

        const containerId = this.getPartId(Schemas.MAIN.part);
        const container = document.getElementById(containerId);
        if (!container) return;

        const itemsObs = bind.prop_draggableItems;
        const list: any[] = (itemsObs?.get?.() ?? []) as any[];
        const rects: any[] = [];
        const nodes = Array.from(container.querySelectorAll('[data-order]')) as HTMLElement[];
        for (const n of nodes) {
            const idAttr = n.getAttribute('data-order');
            const id = isNaN(Number(idAttr)) ? idAttr as any : Number(idAttr);
            const it = list.find((x: any) => x?.id === id);
            const r = n.getBoundingClientRect();
            rects.push({ id, top: r.top, mid: r.top + r.height / 2, isPin: !!it?.isPin });
        }

        const move = (ev: MouseEvent) => this.pr_handleMove(ev, item, rects);
        const up   = (ev: MouseEvent) => this.pr_handleUp(ev, item, rects, move, up);

        window.addEventListener('mousemove', move, true);
        window.addEventListener('mouseup', up, true);

        this._drag = { id: item?.id, overIndex: this.pr_computeOverIndex(e.clientY, rects, item?.id), rects, container };
        this._dragOverIndex.set(this._drag.overIndex);
        this._dragOverId.set(this.pr_getUnpinnedIdByIndex(this._drag.overIndex, rects, item?.id));
        (document.body as any).style.userSelect = 'none';
        e.preventDefault();
    }

    private pr_handleMove(e: MouseEvent, item: any, rects: any[]) {
        if (!this._drag) return;
        const idx = this.pr_computeOverIndex(e.clientY, rects, this._drag.id);
        if (idx === this._drag.overIndex) return;
        this.pr_animateReorderPreview(this._drag.container);
        this._drag.overIndex = idx;
        this._dragOverIndex.set(idx);
        this._dragOverId.set(this.pr_getUnpinnedIdByIndex(idx, rects, this._drag.id));
    }

    private pr_animateReorderPreview(container: HTMLElement): void {
        const before = new Map<string, DOMRect>();
        for (const node of Array.from(container.querySelectorAll<HTMLElement>("[data-order]"))) {
            const id = node.getAttribute("data-order");
            if (id != null) before.set(id, node.getBoundingClientRect());
        }
        requestAnimationFrame(() => {
            for (const node of Array.from(container.querySelectorAll<HTMLElement>("[data-order]"))) {
                const previous = before.get(node.getAttribute("data-order") ?? "");
                if (!previous) continue;
                const offsetY = previous.top - node.getBoundingClientRect().top;
                if (Math.abs(offsetY) < 1) continue;
                node.style.transition = "none";
                node.style.transform = `translateY(${offsetY}px)`;
                node.getBoundingClientRect();
                node.style.transition = "transform 180ms ease";
                node.style.transform = "";
            }
        });
    }

    private pr_handleUp(e: MouseEvent, item: any, rects: any[], move: any, up: any) {
        window.removeEventListener('mousemove', move, true);
        window.removeEventListener('mouseup', up, true);

        const suppressClick = (ev: MouseEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            window.removeEventListener('click', suppressClick, true);
        };
        window.addEventListener('click', suppressClick, true);

        const drag = this._drag;
        if (drag) this.pr_animateReorderPreview(drag.container);
        this._drag = null;
        this._dragOverId.set(null);
        this._dragOverIndex.set(null);
        (document.body as any).style.userSelect = '';
        if (!drag) return;

        const bind = this._COMPONENT_PROPS_BIND as any;
        const items: any[] = (bind.prop_draggableItems?.get?.() ?? []) as any[];
        const orders: any[] = (bind.prop_draggableOrders?.get?.() ?? []) as any[];

        const pinned = items.filter(x => !!x?.isPin);
        const unpinned = items.filter(x => !x?.isPin);

        const set = new Set(orders);
        const currentUnpinned = [
            ...orders.map(id => unpinned.find(x => x.id === id)).filter(Boolean) as any[],
            ...unpinned.filter(x => !set.has(x.id)),
        ];

        const fromIdx = currentUnpinned.findIndex(x => x.id === drag.id);
        let toIdx = drag.overIndex;
        if (fromIdx < 0) return;
        if (toIdx < 0) toIdx = 0;
        if (toIdx >= currentUnpinned.length) toIdx = currentUnpinned.length - 1;

        if (toIdx === fromIdx) return;

        const moved = currentUnpinned.slice();
        const [el] = moved.splice(fromIdx, 1);
        moved.splice(toIdx, 0, el);

        const newOrders = moved.map(x => x.id);
        this.set('prop_draggableOrders', newOrders);
        this.executeMethod('UPDATE', e, {} as any);
    }

    private pr_computeOverIndex(y: number, rects: any[], draggedId?: string | number): number {
        const unpinnedRects = rects.filter(r => !r.isPin && r.id !== draggedId);
        for (let i = 0; i < unpinnedRects.length; i++) {
            if (y < unpinnedRects[i].mid) return i;
        }
        return unpinnedRects.length;
    }

    private pr_getUnpinnedIdByIndex(index: number, rects: any[], draggedId?: string | number): any {
        const unpinnedRects = rects.filter(r => !r.isPin && r.id !== draggedId);
        const r = unpinnedRects[Math.max(0, Math.min(index, unpinnedRects.length - 1))];
        return r ? r.id : null;
    }

    private pr_togglePin(e: MouseEvent, item: any) {
        const bind = this._COMPONENT_PROPS_BIND as any;
        const itemsObs = bind.prop_draggableItems;
        const ordersObs = bind.prop_draggableOrders;
        const list: any[] = (itemsObs?.get?.() ?? []) as any[];
        const idx = list.findIndex(x => x?.id === item?.id);
        if (idx < 0) return;
        const current = list[idx];
        const next = { ...current, isPin: !current.isPin };
        const nextList = list.slice();
        nextList[idx] = next;
        this.set('prop_draggableItems', nextList);

        if (next.isPin) {
            const orders: any[] = (ordersObs?.get?.() ?? []) as any[];
            const filtered = orders.filter((id: any) => id !== item.id);
            if (filtered.length !== orders.length) this.set('prop_draggableOrders', filtered);
        }

        this.executeMethod('UPDATE', e, {} as any);
    }
}
