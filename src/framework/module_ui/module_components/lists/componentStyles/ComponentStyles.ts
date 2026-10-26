import * as CoreComponents from "@/core_components";
import * as CoreLanguage from "@/core_languages";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UtilConst from "@/util_consts";
import * as UtilOptionsStd from "@/util_options_std";
import * as UtilStyle from "@/util_styles";
import * as ComponentStructure from "../componentStructure";
import * as ComponentInputGroup from "../componentInputGroup";
import * as ComponentInputSelectOption from "../componentInputSelectOption";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentSelectCustomSimple from "../componentSelectCustomSimple";
import * as ComponentInputColor from "../componentInputColor";
import * as ComponentBorder from "../componentBorder";
import * as ComponentCollapse from "../componentCollapse";
import {colorSelector} from "../componentInputColor/Props";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {Props, PropsType, PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {Definition} from "./Definition";

type ComponentStylesPropsType = StructurePropsType & PropsType;
type ComponentStylesConfigType = StructurePropsType & PropsConfigType;
const STYLE_GROUP_SIZE_ELEMENT_KEY = UtilOptionsStd.Group.ElementSize.Key;
const INPUT_COMPONENTS = {
  InputGroup: ComponentInputGroup.Component,
  InputSimple: ComponentInputSimple.Component,
  SelectCustomSimple: ComponentSelectCustomSimple.Component,
};

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

  private readonly _STYLE_GROUP_EDITORS: any[] = [];
  private readonly _STYLE_GROUP_BORDERS: InstanceType<typeof ComponentBorder.Component>[] = [];
  private readonly _STYLE_GROUP_COLLAPSES = new Map<string, ComponentCollapse.Component>();
  private _PREVIEW_MARGIN_BOX: InstanceType<typeof ComponentBorder.Component> | null = null;
  private _PREVIEW_BORDER_BOX: InstanceType<typeof ComponentBorder.Component> | null = null;
  private _PREVIEW_PADDING_BOX: InstanceType<typeof ComponentBorder.Component> | null = null;
  private _PREVIEW_CONTENT_BOX: InstanceType<typeof ComponentBorder.Component> | null = null;

  constructor(
    config?: Partial<ComponentStylesConfigType>,
    methods?: Record<string, any>,
    identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
  ) {
    super("componentStyles", null, identity as any);
    this.renderComponent(config ?? {} as any, methods as any, identity?.events ?? null);
  }

  dispose(): void {
    for (const editor of this._STYLE_GROUP_EDITORS) editor?.dispose?.();
    this._STYLE_GROUP_EDITORS.length = 0;
    for (const collapse of this._STYLE_GROUP_COLLAPSES.values()) collapse.dispose();
    this._STYLE_GROUP_COLLAPSES.clear();
    for (const border of this._STYLE_GROUP_BORDERS) border.dispose();
    this._STYLE_GROUP_BORDERS.length = 0;
    this._PREVIEW_CONTENT_BOX?.dispose();
    this._PREVIEW_CONTENT_BOX = null;
    this._PREVIEW_PADDING_BOX?.dispose();
    this._PREVIEW_PADDING_BOX = null;
    this._PREVIEW_BORDER_BOX?.dispose();
    this._PREVIEW_BORDER_BOX = null;
    this._PREVIEW_MARGIN_BOX?.dispose();
    this._PREVIEW_MARGIN_BOX = null;
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
        return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
      case ComponentStructureTrait.schemas.STRUCTURE.part:
        return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
      case Schemas.STYLES.part:
        return this.renderStyles(attrsDefault, data);
      default:
        return super.renderManagerComponent(partName, attrsDefault, data, extra);
    }
  }

  private renderStyles(
    attrsDefault: CoreComponents.PartAttrDefault,
    data: Record<string, CoreObservable.App<any>>,
  ): CoreReactive.App {
    const bind = this._COMPONENT_PROPS_BIND;
    const selectionObservable = data?.prop_styleGroups ?? bind.prop_styleGroups;
    const valuesObservable = data?.prop_value ?? bind.prop_value;
    const selectedProperties = this.readStyleGroups(selectionObservable);
    const values = this.readValues(valuesObservable);
    const collapses = this.getStyleGroupCollapses(selectedProperties, values);
    const boxModelGroupKeys = new Set<string>([
      UtilOptionsStd.Group.Margin.Key,
      UtilOptionsStd.Group.Padding.Key,
      UtilOptionsStd.Group.ElementSize.Key,
    ]);
    const styles = CoreObservable.App.computed(
      (
        flatValues: Record<string, any> | null | undefined,
        selected: string[] | null | undefined,
      ) => ({
        borderStyle: "solid",
        borderColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_2),
        borderWidth: "1px",
        padding: "0.75rem 1.25rem",
        ...UtilOptionsStd.Group.CreateCssStyles(Object.fromEntries(
          (selected ?? []).filter((property) => {
            const resolved = UtilOptionsStd.Group.ResolveProperty(property);
            return resolved != null
              && !boxModelGroupKeys.has(resolved.groupKey)
              && Object.prototype.hasOwnProperty.call(flatValues ?? {}, property);
          })
            .map((property) => [property, flatValues?.[property]]),
        )),
      }),
      [valuesObservable, selectionObservable],
      this.getScope(),
    );

    const collapseElements = collapses.map(
      (collapse) => collapse.getReactiveElement() as CoreReactive.App,
    );
    const previewValues = (property: string) => CoreObservable.App.computed(
      (currentValues: Record<string, any> | null | undefined) => {
        const value = currentValues?.[property];
        return value == null || value === "" ? "—" : String(value);
      },
      [valuesObservable],
      this.getScope(),
    );
    const makeBoxLayer = (
      title: string,
      properties: Array<{title: string; property: string}>,
      content: CoreReactive.App,
    ) => CoreReactive.App.div({
      styles: {display: "flex", flexDirection: "column", gap: "0.4rem", minWidth: "0"},
      children: [
        CoreReactive.App.div({
          styles: {fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em"},
          children: [title],
        }),
        CoreReactive.App.div({
          styles: {display: "grid", gridTemplateColumns: `repeat(${properties.length}, minmax(0, 1fr))`, gap: "0.25rem", minWidth: "0"},
          children: properties.map(({title: side, property}) => CoreReactive.App.div({
            styles: {display: "flex", flexDirection: "column", alignItems: "center", minWidth: "0", lineHeight: "1.2"},
            children: [
              CoreReactive.App.div({styles: {fontSize: "0.6rem", opacity: "0.75"}, children: [side]}),
              CoreReactive.App.div({styles: {fontSize: "0.7rem", fontWeight: "600", maxWidth: "100%", overflowWrap: "anywhere"}, children: [previewValues(property)]}),
            ],
          })),
        }),
        content,
      ],
    });
    const directions = (prefix: "margin-" | "padding-", sides: Array<"top" | "right" | "bottom" | "left">) =>
      sides.map((side) => ({title: side, property: `${prefix}${side}`}));
    const marginBoxColor = this.getStyleGroupBorderPalette(UtilOptionsStd.Group.Margin.Key)!;
    const borderBoxColor = this.getStyleGroupBorderPalette(UtilOptionsStd.Group.Border.Key)!;
    const paddingBoxColor = this.getStyleGroupBorderPalette(UtilOptionsStd.Group.Padding.Key)!;

    this._PREVIEW_CONTENT_BOX ??= new ComponentBorder.Component({
      prop_content: makeBoxLayer("content", [
        {title: "width", property: "width"},
        {title: "height", property: "height"},
      ], CoreReactive.App.div({
        styles: {display: "flex", alignItems: "center", justifyContent: "center", minHeight: "2.5rem", padding: "0.5rem"},
        children: [CoreReactive.App.div({
          styles: {fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", width: "100%", minWidth: "6rem", minHeight: "2.5rem", display: "grid", alignItems: "center", boxSizing: "border-box"},
          stylesBind: styles as any,
          children: ["preview"],
        })],
      })),
      prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.INFO, UtilConst.ColorGrad.GRADE_5),
      prop_contentColor: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
      prop_borderColor: UtilStyle.Css_Color(UtilConst.ColorMain.INFO, UtilConst.ColorGrad.GRADE_2),
      prop_borderClass: ["w-100"],
      prop_borderStyles: {padding: "0.5rem", boxSizing: "border-box"},
    } as any);
    this._PREVIEW_PADDING_BOX ??= new ComponentBorder.Component({
      prop_content: makeBoxLayer("padding", directions("padding-", ["top", "right", "bottom", "left"]), this._PREVIEW_CONTENT_BOX.getReactiveElement() as CoreReactive.App),
      prop_contentBackgroundColor: paddingBoxColor.background,
      prop_contentColor: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
      prop_borderColor: paddingBoxColor.border,
      prop_borderClass: ["w-100"],
      prop_borderStyles: {padding: "0.5rem", boxSizing: "border-box"},
    } as any);
    this._PREVIEW_BORDER_BOX ??= new ComponentBorder.Component({
      prop_content: makeBoxLayer("border", [
        {title: "top", property: UtilOptionsStd.Group.Border.Direction.TOP},
        {title: "right", property: UtilOptionsStd.Group.Border.Direction.RIGHT},
        {title: "bottom", property: UtilOptionsStd.Group.Border.Direction.BOTTOM},
        {title: "left", property: UtilOptionsStd.Group.Border.Direction.LEFT},
      ], this._PREVIEW_PADDING_BOX.getReactiveElement() as CoreReactive.App),
      prop_contentBackgroundColor: borderBoxColor.background,
      prop_contentColor: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
      prop_borderColor: borderBoxColor.border,
      prop_borderClass: ["w-100"],
      prop_borderStyles: {padding: "0.5rem", boxSizing: "border-box"},
    } as any);
    this._PREVIEW_MARGIN_BOX ??= new ComponentBorder.Component({
      prop_content: makeBoxLayer("margin", directions("margin-", ["top", "right", "bottom", "left"]), this._PREVIEW_BORDER_BOX.getReactiveElement() as CoreReactive.App),
      prop_contentBackgroundColor: marginBoxColor.background,
      prop_contentColor: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
      prop_borderType: ComponentBorder.BorderTypes.DASHED,
      prop_borderColor: marginBoxColor.border,
      prop_width: "100%",
      prop_borderClass: ["w-100"],
      prop_borderStyles: {padding: "0.5rem", boxSizing: "border-box"},
    } as any);

    return CoreReactive.App.section({
      attrs: {...attrsDefault},
      className: ["d-flex", "flex-column", "gap-3"],
      styles: {width: "100%", height: "100%", minHeight: "0", overflow: "hidden"},
      children: [
        CoreReactive.App.section({
          attrs: {"data-part-name": "part-component-styles-preview"},
          styles: {width: "100%", flex: "0 0 auto"},
          children: [this._PREVIEW_MARGIN_BOX.getReactiveElement() as CoreReactive.App],
        }),
        CoreReactive.App.section({
          attrs: {"data-part-name": "part-component-styles-editor"},
          styles: {width: "100%", minHeight: "0", flex: "1 1 auto", overflowY: "auto", overflowX: "hidden"},
          children: collapseElements,
        }),
      ],
    });
  }

  private getStyleGroupCollapses(
    selectedProperties: string[],
    values: Record<string, any>,
  ): ComponentCollapse.Component[] {
    const selectedByGroup = new Map<string, string[]>();
    for (const property of selectedProperties) {
      const resolved = UtilOptionsStd.Group.ResolveProperty(property);
      if (!resolved) continue;
      const groupProperties = selectedByGroup.get(resolved.groupKey) ?? [];
      groupProperties.push(property);
      selectedByGroup.set(resolved.groupKey, groupProperties);
    }

    for (const [groupKey, properties] of selectedByGroup) {
      const isSizeElementGroup = groupKey === STYLE_GROUP_SIZE_ELEMENT_KEY;
      const collapseKey = groupKey;
      if (this._STYLE_GROUP_COLLAPSES.has(collapseKey)) continue;

      let editors: any[] = [];
      if (isSizeElementGroup) {
        editors = this.createElementSizeEditors(properties, values);
      } else if (groupKey === UtilOptionsStd.Group.Text.Key) {
        editors = this.createTextStyleEditors(properties, values);
      } else if (groupKey === UtilOptionsStd.Group.Colors.Key) {
        editors = this.createColorEditors(properties, values);
      } else if (groupKey === UtilOptionsStd.Group.Border.Key) {
        const borderWidthProperties = properties.filter((property) =>
          Object.values(UtilOptionsStd.Group.Border.Direction).includes(property as UtilOptionsStd.BorderDirection),
        ) as UtilOptionsStd.BorderDirection[];
        let borderWidthEditors: any[] = [];
        if (borderWidthProperties.length > 0) {
          borderWidthEditors = UtilOptionsStd.Group.Border.createDirectionEditors(
            INPUT_COMPONENTS,
            this.pickValues(borderWidthProperties, values),
            {
              directions: borderWidthProperties,
              directionTitles: {
                [UtilOptionsStd.Group.Border.Direction.TOP]: this.label(Keys.category.components.basic.styles.props.borderTop.name, "Border top"),
                [UtilOptionsStd.Group.Border.Direction.RIGHT]: this.label(Keys.category.components.basic.styles.props.borderRight.name, "Border right"),
                [UtilOptionsStd.Group.Border.Direction.BOTTOM]: this.label(Keys.category.components.basic.styles.props.borderBottom.name, "Border bottom"),
                [UtilOptionsStd.Group.Border.Direction.LEFT]: this.label(Keys.category.components.basic.styles.props.borderLeft.name, "Border left"),
              },
              labels: this.borderInputLabels(),
              onChange: (property, value) => this.setPropValue(property, value),
            },
          );
        }
        const borderColorEditors = this.createBorderColorEditors(properties, values);
        const borderStyleProperties = properties.filter((property) =>
          Object.values(UtilOptionsStd.Group.Border.Style.Direction).includes(property as UtilOptionsStd.BorderStyleDirection),
        ) as UtilOptionsStd.BorderStyleDirection[];
        const borderStyleEditors = UtilOptionsStd.Group.Border.Style.createDirectionEditors(
          this.pickValues(borderStyleProperties, values) as UtilOptionsStd.BorderStyleGroupValue<string | null>,
          {
            selector: ComponentInputSelectOption.Component,
            directions: borderStyleProperties,
            directionTitles: {
              [UtilOptionsStd.Group.Border.Style.Direction.TOP]: this.label(Keys.category.components.basic.styles.props.borderTopStyle.name, "Border top style"),
              [UtilOptionsStd.Group.Border.Style.Direction.RIGHT]: this.label(Keys.category.components.basic.styles.props.borderRightStyle.name, "Border right style"),
              [UtilOptionsStd.Group.Border.Style.Direction.BOTTOM]: this.label(Keys.category.components.basic.styles.props.borderBottomStyle.name, "Border bottom style"),
              [UtilOptionsStd.Group.Border.Style.Direction.LEFT]: this.label(Keys.category.components.basic.styles.props.borderLeftStyle.name, "Border left style"),
            },
            onChange: (property, value) => this.setPropValue(property, value),
          },
        );
        const editorsBySide = new Map<string, any[]>();
        for (const editor of [...borderWidthEditors, ...borderStyleEditors, ...borderColorEditors]) {
          const side = editor.direction.split("-")[1];
          const sideEditors = editorsBySide.get(side) ?? [];
          sideEditors.push(editor);
          editorsBySide.set(side, sideEditors);
        }
        editors = ["top", "right", "bottom", "left"].flatMap((side) => editorsBySide.get(side) ?? []);
      } else if (groupKey === UtilOptionsStd.Group.Margin.Key) {
        editors = UtilOptionsStd.Group.Margin.createDirectionEditors(
          this.pickValues(properties, values) as UtilOptionsStd.MarginGroupValues,
          {
            components: INPUT_COMPONENTS,
            directions: properties as UtilOptionsStd.MarginDirection[],
            directionTitles: {
              [UtilOptionsStd.Group.Margin.Direction.TOP]: this.label(Keys.category.components.basic.styles.props.marginTop.name, "Margin top"),
              [UtilOptionsStd.Group.Margin.Direction.RIGHT]: this.label(Keys.category.components.basic.styles.props.marginRight.name, "Margin right"),
              [UtilOptionsStd.Group.Margin.Direction.BOTTOM]: this.label(Keys.category.components.basic.styles.props.marginBottom.name, "Margin bottom"),
              [UtilOptionsStd.Group.Margin.Direction.LEFT]: this.label(Keys.category.components.basic.styles.props.marginLeft.name, "Margin left"),
            },
            labels: this.inputLabels("margin"),
            onChange: (property, value) => this.setPropValue(property, value),
          },
        );
      } else if (groupKey === UtilOptionsStd.Group.Padding.Key) {
        editors = UtilOptionsStd.Group.Padding.createDirectionEditors(
          this.pickValues(properties, values) as UtilOptionsStd.PaddingGroupValues,
          {
            components: INPUT_COMPONENTS,
            directions: properties as UtilOptionsStd.PaddingDirection[],
            directionTitles: {
              [UtilOptionsStd.Group.Padding.Direction.TOP]: this.label(Keys.category.components.basic.styles.props.paddingTop.name, "Padding top"),
              [UtilOptionsStd.Group.Padding.Direction.RIGHT]: this.label(Keys.category.components.basic.styles.props.paddingRight.name, "Padding right"),
              [UtilOptionsStd.Group.Padding.Direction.BOTTOM]: this.label(Keys.category.components.basic.styles.props.paddingBottom.name, "Padding bottom"),
              [UtilOptionsStd.Group.Padding.Direction.LEFT]: this.label(Keys.category.components.basic.styles.props.paddingLeft.name, "Padding left"),
            },
            labels: this.inputLabels("padding"),
            onChange: (property, value) => this.setPropValue(property, value),
          },
        );
      } else if (groupKey === UtilOptionsStd.Group.BorderRadius.Key) {
        editors = UtilOptionsStd.Group.BorderRadius.createCornerEditors(
          this.pickValues(properties, values) as UtilOptionsStd.BorderRadiusGroupValues,
          {
            components: INPUT_COMPONENTS,
            corners: properties as UtilOptionsStd.BorderRadiusCorner[],
            cornerTitles: {
              [UtilOptionsStd.Group.BorderRadius.Corner.TOP_LEFT]: this.label(Keys.category.components.basic.styles.props.borderRadiusTopLeft.name, "Border radius top left"),
              [UtilOptionsStd.Group.BorderRadius.Corner.TOP_RIGHT]: this.label(Keys.category.components.basic.styles.props.borderRadiusTopRight.name, "Border radius top right"),
              [UtilOptionsStd.Group.BorderRadius.Corner.BOTTOM_RIGHT]: this.label(Keys.category.components.basic.styles.props.borderRadiusBottomRight.name, "Border radius bottom right"),
              [UtilOptionsStd.Group.BorderRadius.Corner.BOTTOM_LEFT]: this.label(Keys.category.components.basic.styles.props.borderRadiusBottomLeft.name, "Border radius bottom left"),
            },
            labels: this.inputLabels("borderRadius"),
            onChange: (property, value) => this.setPropValue(property, value),
          },
        );
      }

      if (editors.length === 0) continue;
      const controls = editors.map(({component}: any) => {
        this._STYLE_GROUP_EDITORS.push(component);
        return CoreReactive.App.div({
          className: ["col-12"],
          children: [component.getReactiveElement() as CoreReactive.App],
        });
      });
      const titleKey = isSizeElementGroup
        ? Keys.category.components.basic.styles.groups.elementSize.name
        : groupKey === UtilOptionsStd.Group.Text.Key
          ? Keys.category.components.basic.styles.groups.text.name
          : groupKey === UtilOptionsStd.Group.Colors.Key
            ? Keys.category.components.basic.styles.groups.colors.name
          : groupKey === UtilOptionsStd.Group.Border.Key
            ? Keys.category.components.basic.styles.groups.border.name
            : groupKey === UtilOptionsStd.Group.Margin.Key
              ? Keys.category.components.basic.styles.groups.margin.name
              : groupKey === UtilOptionsStd.Group.Padding.Key
                ? Keys.category.components.basic.styles.groups.padding.name
                : Keys.category.components.basic.styles.groups.borderRadius.name;
      const standardGroup = UtilOptionsStd.Group.Resolve(groupKey);
      const bodyContent = CoreReactive.App.div({className: ["row", "g-3"], children: controls});
      const groupPalette = this.getStyleGroupBorderPalette(groupKey);
      let collapseBody: any = bodyContent;
      if (groupPalette) {
        const bodyBorder = new ComponentBorder.Component({
          prop_content: bodyContent as any,
          prop_contentBackgroundColor: groupPalette.background,
          prop_contentColor: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
          prop_borderColor: groupPalette.border,
          prop_borderType: ComponentBorder.BorderTypes.SOLID,
          prop_borderClass: ["w-100"],
          prop_borderStyles: {padding: "0.75rem", boxSizing: "border-box"},
        } as any);
        this._STYLE_GROUP_BORDERS.push(bodyBorder);
        collapseBody = bodyBorder.getReactiveElement();
      }
      const collapse = new ComponentCollapse.Component({
        prop_collapseTitle: this.translate(titleKey, isSizeElementGroup ? "Element size" : standardGroup?.Title ?? "Text"),
        prop_collapseBody: collapseBody as any,
        prop_collapseBodyIsOpen: false,
        prop_collapseBorderClass: ["w-100"],
        ...(groupPalette ? {
          prop_collapseBorderBackground: groupPalette.background,
          prop_collapseBorderColor: groupPalette.border,
          prop_collapseTitleColor: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
        } : {}),
      });
      this._STYLE_GROUP_COLLAPSES.set(collapseKey, collapse);
    }
    const groupOrder = [
      UtilOptionsStd.Group.Margin.Key,
      UtilOptionsStd.Group.Border.Key,
      UtilOptionsStd.Group.Padding.Key,
      UtilOptionsStd.Group.ElementSize.Key,
      UtilOptionsStd.Group.BorderRadius.Key,
      UtilOptionsStd.Group.Colors.Key,
      UtilOptionsStd.Group.Text.Key,
    ];
    const groupOrderIndex = new Map<string, number>(groupOrder.map((groupKey, index) => [groupKey, index]));
    return [...this._STYLE_GROUP_COLLAPSES.entries()]
      .sort(([groupA], [groupB]) =>
        (groupOrderIndex.get(groupA) ?? Number.MAX_SAFE_INTEGER)
        - (groupOrderIndex.get(groupB) ?? Number.MAX_SAFE_INTEGER),
      )
      .map(([, collapse]) => collapse);
  }

  private getStyleGroupBorderPalette(groupKey: string): {background: string; border: string} | null {
    const palettes: Record<string, {background: string; border: string}> = {
      [UtilOptionsStd.Group.Margin.Key]: {
        background: UtilStyle.Css_Color(UtilConst.ColorMain.WARNING, UtilConst.ColorGrad.GRADE_5),
        border: UtilStyle.Css_Color(UtilConst.ColorMain.WARNING, UtilConst.ColorGrad.GRADE_2),
      },
      [UtilOptionsStd.Group.Border.Key]: {
        background: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_4),
        border: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
      },
      [UtilOptionsStd.Group.Padding.Key]: {
        background: UtilStyle.Css_Color(UtilConst.ColorMain.SUCCESS, UtilConst.ColorGrad.GRADE_5),
        border: UtilStyle.Css_Color(UtilConst.ColorMain.SUCCESS, UtilConst.ColorGrad.GRADE_2),
      },
    };
    return palettes[groupKey] ?? null;
  }

  private createTextStyleEditors(properties: string[], values: Record<string, any>): any[] {
    const editors: any[] = [];
    const fontSize = UtilOptionsStd.Group.Text.FontSize;
    if (properties.includes(fontSize.Key)) {
      editors.push(...fontSize.createEditors({value: values[fontSize.Key]}, {
        components: INPUT_COMPONENTS,
        title: this.label(Keys.category.components.basic.styles.props.fontSize.name, "Font size"),
        labels: this.inputLabels("fontSize"),
        onChange: (value) => this.setPropValue(fontSize.Key, value),
      }));
    }
    const lineHeight = UtilOptionsStd.Group.Text.LineHeight;
    if (properties.includes(lineHeight.Key)) {
      editors.push(...lineHeight.createEditors({value: values[lineHeight.Key]}, {
        components: INPUT_COMPONENTS,
        title: this.label(Keys.category.components.basic.styles.props.lineHeight.name, "Line height"),
        labels: this.inputLabels("lineHeight"),
        onChange: (value) => this.setPropValue(lineHeight.Key, value),
      }));
    }
    const textProps = Keys.category.components.basic.styles.props;
    const selectDefinitions = [
      {definition: UtilOptionsStd.Group.Text.Align, title: this.label(textProps.textAlign.name, "Text align")},
      {definition: UtilOptionsStd.Group.Text.Weight, title: this.label(textProps.fontWeight.name, "Font weight")},
      {definition: UtilOptionsStd.Group.Text.Decoration, title: this.label(textProps.textDecoration.name, "Text decoration")},
      {definition: UtilOptionsStd.Group.Text.Transform, title: this.label(textProps.textTransform.name, "Text transform")},
    ];
    for (const {definition, title} of selectDefinitions) {
      if (!properties.includes(definition.Key)) continue;
      const component = new ComponentInputSelectOption.Component({
        prop_name: definition.Key,
        prop_itemSelected: values[definition.Key] ?? null,
        prop_options: definition.Values.map((value) => ({id: value, name: value})),
        prop_labelShow: true,
        prop_labelTitle: title,
        prop_structureStyles: {width: "100%"},
      } as any, {
        SELECT_CHANGE: (_event, _dataArgs, componentArgs) => {
          const value = componentArgs?.VALUE == null ? null : String(componentArgs.VALUE);
          this.setPropValue(definition.Key, value);
        },
      } as any);
      editors.push({component});
    }
    return editors;
  }

  private createColorEditors(properties: string[], values: Record<string, any>): any[] {
    const colors = UtilOptionsStd.Group.Colors;
    const editors: any[] = [];
    const definitions = [
      {
        property: colors.BackgroundColor.Key,
        title: this.label(Keys.category.components.basic.styles.props.backgroundColor.name, "Background color"),
      },
      {
        property: colors.TextColor.Key,
        title: this.label(Keys.category.components.basic.styles.props.textColor.name, "Text color"),
      },
    ];

    for (const {property, title} of definitions) {
      if (!properties.includes(property)) continue;
      editors.push(this.createColorEditor(property, title, values[property]));
    }

    return editors;
  }

  private createBorderColorEditors(properties: string[], values: Record<string, any>): any[] {
    const border = UtilOptionsStd.Group.Border;
    const labels = Keys.category.components.basic.styles.props;
    const definitions = [
      {property: border.Color.TOP, title: this.label(labels.borderTopColor.name, "Border top color")},
      {property: border.Color.RIGHT, title: this.label(labels.borderRightColor.name, "Border right color")},
      {property: border.Color.BOTTOM, title: this.label(labels.borderBottomColor.name, "Border bottom color")},
      {property: border.Color.LEFT, title: this.label(labels.borderLeftColor.name, "Border left color")},
    ];
    return definitions
      .filter(({property}) => properties.includes(property))
      .map(({property, title}) => ({
        direction: property,
        ...this.createColorEditor(property, title, values[property]),
      }));
  }

  private createColorEditor(property: string, title: string, value: unknown): any {
    const initialColor = this.resolveColorEditorValue(value);
    const colorValue = new CoreObservable.App<string | null>(initialColor);
    const selectedColor = new CoreObservable.App<string | null>(initialColor);
    const component = new ComponentInputColor.Component({
      prop_name: property,
      prop_value: colorValue,
      prop_colorSelected: selectedColor,
      prop_colorSelector: colorSelector.Full,
      prop_labelTitle: title,
      prop_structureStyles: {width: "100%"},
    } as any);
    // The full editor commits the selected color after picker confirmation.
    colorValue.subscribe((updatedValue) => {
      console.log("[ComponentStyles] color observable updated", {property, value: updatedValue});
      this.setPropValue(property, updatedValue);
    }, this.getScope());
    return {component};
  }

  private resolveColorEditorValue(value: unknown): string | null {
    if (typeof value !== "string" || typeof document === "undefined" || !document.body) {
      return typeof value === "string" ? value : null;
    }
    const probe = document.createElement("span");
    probe.style.color = value;
    if (!probe.style.color) return value;
    document.body.appendChild(probe);
    const resolved = window.getComputedStyle(probe).color;
    probe.remove();
    const channels = resolved.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (!channels) return value;
    return `#${channels.slice(1, 4).map((channel) => Number(channel).toString(16).padStart(2, "0")).join("")}`;
  }

  private createElementSizeEditors(properties: string[], values: Record<string, any>): any[] {
    const editors: any[] = [];
    if (properties.includes(UtilOptionsStd.Group.ElementSize.Height.Key)) {
      editors.push(...UtilOptionsStd.Group.ElementSize.Height.createEditors({value: values.height}, {
        components: INPUT_COMPONENTS,
        title: this.label(Keys.category.components.basic.styles.groups.height.name, "Height"),
        labels: this.inputLabels("height"),
        onChange: (value) => this.setPropValue("height", value),
      }));
    }
    if (properties.includes(UtilOptionsStd.Group.ElementSize.Width.Key)) {
      editors.push(...UtilOptionsStd.Group.ElementSize.Width.createEditors({value: values.width}, {
        components: INPUT_COMPONENTS,
        title: this.label(Keys.category.components.basic.styles.groups.width.name, "Width"),
        labels: this.inputLabels("width"),
        onChange: (value) => this.setPropValue("width", value),
      }));
    }
    return editors;
  }

  private inputLabels(prefix: string): Record<string, string> {
    const props = Keys.category.components.basic.styles.props as any;
    return {
      size: this.label(props[`${prefix}Size`]?.name, "Preset size"),
      numberUnit: this.label(props[`${prefix}NumberUnit`]?.name, "Number + unit"),
      custom: this.label(props[`${prefix}Custom`]?.name, "Custom CSS"),
    };
  }

  private borderInputLabels(): Record<string, string> {
    const props = Keys.category.components.basic.styles.props;
    return {
      size: this.label(props.borderSize.name, "Preset size"),
      numberUnit: this.label(props.borderNumberUnit.name, "Number + unit"),
      custom: this.label(props.borderCustom.name, "Custom CSS"),
    };
  }

  private pickValues(properties: string[], values: Record<string, any>): Record<string, any> {
    return Object.fromEntries(properties.map((property) => [property, values[property]]));
  }

  private readStyleGroups(value: any): string[] {
    const resolved = typeof value?.get === "function" ? value.get() : value;
    if (Array.isArray(resolved)) return resolved.filter((item): item is string => typeof item === "string");
    return [];
  }

  private readValues(value: any): Record<string, any> {
    const resolved = typeof value?.get === "function" ? value.get() : value;
    return resolved && typeof resolved === "object" && !Array.isArray(resolved) ? resolved : {};
  }

  private setPropValue(property: string, value: string | number | null): void {
    const current = this.readValues(this.get("prop_value"));
    const next = {...current, [property]: value};
    console.log("[ComponentStyles] prop_value write", {property, value, next});
    this.set("prop_value", next);
  }

  private label(key: any, fallback: string): string {
    return this.translate(key, fallback);
  }

  private translate(key: any, fallback: string): string {
    if (typeof key !== "symbol") return String(key ?? fallback);
    const translated = CoreLanguage.App.translate(key as any).get();
    return typeof translated === "string" && translated.length > 0 ? translated : fallback;
  }

  override getElement(): HTMLElement {
    return super.getElement() as HTMLElement;
  }
}
