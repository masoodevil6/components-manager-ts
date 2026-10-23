import * as CoreComponents from "@/core_components";
import * as CoreLanguage from "@/core_languages";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as ComponentStructure from "../componentStructure";
import * as ComponentInputSelectOption from "../componentInputSelectOption";
import * as ComponentCardViewInfo from "../componentCardViewInfo";
import { ComponentStructureTrait } from "../../traits/componentStructureTrait";
import type { PropsType as StructurePropsType } from "../componentStructure/Props";
import { Props, PropGroups, PropsType, PropsConfigType } from "./Props";
import { Schemas } from "./Schemas";
import { Definition } from "./Definition";

type ComponentStylesPropsType = StructurePropsType & PropsType;
type ComponentStylesConfigType = StructurePropsType & PropsConfigType;

export class ComponentStyles extends ComponentStructure.Component {
  protected override _COMPONENT_DEFINITION = Definition;
  protected override _COMPONENT_PATTERN: any = CoreComponents.DefineProp<
    ComponentStylesPropsType & Record<string, any>
  >({
    ...ComponentStructureTrait.props,
    ...Props,
  } as any);
  protected override _COMPONENT_SCHEMA: any = CoreComponents.DefineSchema<
    any,
    ComponentStylesPropsType & Record<string, any>
  >({
    ...ComponentStructureTrait.schemas,
    ...Schemas,
  } as any);

  private readonly _MARGIN_SELECTORS = new Map<
    string,
    ComponentInputSelectOption.Component
  >();
  private _MARGIN_CARD: ComponentCardViewInfo.Component | null = null;
  private _PREVIEW_CARD: ComponentCardViewInfo.Component | null = null;

  constructor(
    config?: Partial<ComponentStylesConfigType>,
    methods?: Record<string, any>,
    identity?: {
      unique?: any;
      emit?: any;
      events?: Record<string, any> | null;
    },
  ) {
    super("componentStyles", null, identity as any);
    this.renderComponent(
      (config ?? {}) as any,
      methods as any,
      identity?.events ?? null,
    );
  }

  dispose(): void {
    for (const selector of this._MARGIN_SELECTORS.values()) selector.dispose();
    this._MARGIN_SELECTORS.clear();
    this._MARGIN_CARD?.dispose();
    this._PREVIEW_CARD?.dispose();
    this._MARGIN_CARD = null;
    this._PREVIEW_CARD = null;
    this.getScope().dispose();
  }

  override renderContentComponent(
    _attrsDefault: CoreComponents.PartAttrDefault,
    _data: Record<string, CoreObservable.App<any>>,
  ): CoreReactive.App {
    return this.executeSchemaPart(Schemas.STYLES.part, {});
  }

  override renderManagerComponent(
    partName: string,
    attrsDefault: CoreComponents.PartAttrDefault,
    data: Record<string, CoreObservable.App<any>>,
    extra?: any,
  ): CoreReactive.App {
    switch (partName) {
      case ComponentStructureTrait.schemas.COMPONENT.part:
        return ComponentStructureTrait.renderComponentSchema(
          this,
          attrsDefault,
          data,
        );
      case ComponentStructureTrait.schemas.STRUCTURE.part:
        return ComponentStructureTrait.renderStructureSchema(
          this,
          attrsDefault,
          data,
        );
      case Schemas.STYLES.part:
        return this.renderStyles(attrsDefault, data);
      default:
        return super.renderManagerComponent(
          partName,
          attrsDefault,
          data,
          extra,
        );
    }
  }

  private renderStyles(
    attrsDefault: CoreComponents.PartAttrDefault,
    data: Record<string, CoreObservable.App<any>>,
  ): CoreReactive.App {
    const bind = this._COMPONENT_PROPS_BIND;
    const marginProps = [
      ["prop_marginTop", "Top"],
      ["prop_marginRight", "Right"],
      ["prop_marginBottom", "Bottom"],
      ["prop_marginLeft", "Left"],
    ] as const;
    const marginControls = marginProps.map(([propName, fallback]) =>
      CoreReactive.App.div({
        className: ["col-12", "col-md-6"],
        children: [
          this.getMarginSelector(
            propName,
            fallback,
          ).getReactiveElement() as CoreReactive.App,
        ],
      }),
    );
    const styles = CoreObservable.App.computed(
      (
        top: UtilConst.Sizes,
        right: UtilConst.Sizes,
        bottom: UtilConst.Sizes,
        left: UtilConst.Sizes,
      ) => {
        const result: Record<string, string> = {};
        const setMargin = (property: string, size: UtilConst.Sizes) => {
          if (size !== UtilConst.Sizes.DEFAULT)
            result[property] = UtilStyle.Css_Margin(size);
        };
        setMargin("marginTop", top);
        setMargin("marginRight", right);
        setMargin("marginBottom", bottom);
        setMargin("marginLeft", left);
        return result;
      },
      [
        data?.prop_marginTop ?? bind.prop_marginTop,
        data?.prop_marginRight ?? bind.prop_marginRight,
        data?.prop_marginBottom ?? bind.prop_marginBottom,
        data?.prop_marginLeft ?? bind.prop_marginLeft,
      ],
      this.getScope(),
    );

    this._MARGIN_CARD ??= new ComponentCardViewInfo.Component({
      classList: ["col-12"],
      prop_title: this.translate(PropGroups.margin.name, "Margin"),
      prop_content: CoreReactive.App.div({
        className: ["row", "g-3"],
        children: marginControls,
      }) as any,
    });
    this._PREVIEW_CARD ??= new ComponentCardViewInfo.Component({
      classList: ["col-12"],
      prop_title: this.translate(Schemas.STYLES.name, "Preview"),
      prop_content: CoreReactive.App.div({
        className: ["border", "rounded", "p-2"],
        stylesBind: styles as any,
        children: ["Hello World"],
      }) as any,
    });

    return CoreReactive.App.section({
      attrs: { ...attrsDefault },
      className: ["d-flex", "flex-column", "gap-3"],
      children: [
        this._MARGIN_CARD.getReactiveElement() as CoreReactive.App,
        this._PREVIEW_CARD.getReactiveElement() as CoreReactive.App,
      ],
    });
  }

  private getMarginSelector(
    propName:
      | "prop_marginTop"
      | "prop_marginRight"
      | "prop_marginBottom"
      | "prop_marginLeft",
    fallback: string,
  ): ComponentInputSelectOption.Component {
    const existing = this._MARGIN_SELECTORS.get(propName);
    if (existing) return existing;

    const definition = Props[propName];
    const selector = new ComponentInputSelectOption.Component(
      {
        prop_name: `component-styles-${propName}`,
        prop_itemSelected: this._COMPONENT_PROPS_BIND[propName] as any,
        prop_options: Object.values(UtilConst.Sizes).map((size) => ({
          id: size,
          name: size,
        })),
        prop_labelTitle: this.translate(
          definition.name,
          `Margin ${fallback.toLowerCase()}`,
        ),
        prop_labelTooltipDescription: this.translate(
          definition.description,
          "Choose a margin size.",
        ),
        prop_structureStyles: { width: "100%" },
      } as any,
      {
        SELECT_CHANGE: (_event, _data, args) => {
          if (args?.VALUE != null) this.set(propName, args.VALUE);
        },
      } as any,
    );
    this._MARGIN_SELECTORS.set(propName, selector);
    return selector;
  }

  private translate(key: any, fallback: string): string {
    if (typeof key !== "symbol") return String(key ?? fallback);
    const translated = CoreLanguage.App.translate(key as any).get();
    return typeof translated === "string" && translated.length > 0
      ? translated
      : fallback;
  }

  override getElement(): HTMLElement {
    return super.getElement() as HTMLElement;
  }
}
