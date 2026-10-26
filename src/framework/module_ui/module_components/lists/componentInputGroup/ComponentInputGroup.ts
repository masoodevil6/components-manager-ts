import * as CoreComponents from "@/core_components";
import * as CoreConfig from "@/core_configs";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UtilStyle from "@/util_styles";
import { PartAttrDefault } from "@/core_components";
import { ComponentInputBase } from "../componentInput/ComponentInputBase";
import { ComponentStructureTrait } from "../../traits/componentStructureTrait";
import { ComponentLabelTrait } from "../../traits/componentLabelTrait";
import type { PropsType as StructurePropsType } from "../componentStructure/Props";
import {
  Props,
  InputGroupItemType,
  type InputGroupItem,
  type InputGroupDefinition,
  type PropsConfigType,
} from "./Props";
import { LayoutColumn } from "../componentLayout/Props";
import { Methods, MethodsConfigType } from "./Methods";
import { Schemas } from "./Schemas";
import { Definition } from "./Definition";
import { createInputGroupStep } from "./Step";

type DisposableChild = { dispose?: () => void; disposeStep?: () => void };
type CreatedInput = { factory: Function; instance: any };
type InputRowPosition = { first: boolean; last: boolean };
type InputChangeHook = {
  method: any;
  previous: any;
  handler: (...args: any[]) => any;
};
type InputValueBinding = {
  name: CoreObservable.App<any>;
  value: CoreObservable.App<any>;
  unsubscribeName: () => void;
  unsubscribeValue: () => void;
  changeHooks: InputChangeHook[];
};

const INPUT_RADIUS_PROPS = [
  "prop_inputBorderRadius",
  "prop_inputBorderTopLeftRadiusHas",
  "prop_inputBorderTopRightRadiusHas",
  "prop_inputBorderBottomLeftRadiusHas",
  "prop_inputBorderBottomRightRadiusHas",
  "prop_selectBorderTopLeftRadiusHas",
  "prop_selectBorderTopRightRadiusHas",
  "prop_selectBorderBottomLeftRadiusHas",
  "prop_selectBorderBottomRightRadiusHas",
];

export class ComponentInputGroup extends ComponentInputBase<ReturnType<typeof createInputGroupStep>>{
  protected override _COMPONENT_DEFINITION = Definition;
  protected override _COMPONENT_PATTERN: any = CoreComponents.DefineProp<
    Record<string, any>
  >({
    ...ComponentStructureTrait.props,
    ...ComponentLabelTrait.props,
    ...Props,
  } as any);
  protected override _COMPONENT_SCHEMA: any = CoreComponents.DefineSchema<
    any,
    Record<string, any>
  >({
    ...ComponentStructureTrait.schemas,
    ...ComponentLabelTrait.schemas,
    ...Schemas,
  } as any);
  protected override _COMPONENT_METHODS: any = CoreComponents.DefineMethod<any, any>(
    { ...Methods } as any,
  );

  private readonly _CHILDREN: DisposableChild[] = [];
  private readonly _INPUT_COMPONENTS = new Set<DisposableChild>();
  private _ACTIVE_INPUTS = new Set<DisposableChild>();
  private readonly _INPUT_VALUE_BINDINGS = new Map<DisposableChild, InputValueBinding>();
  private readonly _CREATED_INPUTS = new Map<object, CreatedInput>();
  private readonly _ITEM_RADIUS_DEFAULTS = new WeakMap<object, Record<string, any>>();
  private _DISPOSED = false;

  constructor(
    config?: Partial<StructurePropsType & PropsConfigType>,
    methods?: MethodsConfigType<ComponentInputGroup>,
    identity?: {
      unique?: any;
      emit?: any;
      events?: Record<string, any> | null;
    },
  ) {
    super(identity, createInputGroupStep(), "input-group");
    this.renderComponent(
      { ...config } as any,
      methods as any,
      identity?.events ?? null,
    );
  }

  dispose(): void {
    if (this._DISPOSED) return;
    this._DISPOSED = true;
    for (const input of [...this._INPUT_VALUE_BINDINGS.keys()]) {
      this.removeInputValueBinding(input);
    }
    for (const child of this._CHILDREN) {
      if (child.dispose) child.dispose();
      else child.disposeStep?.();
    }
    this._CHILDREN.length = 0;
    for (const child of this._INPUT_COMPONENTS) {
      if (child.dispose) child.dispose();
      else child.disposeStep?.();
    }
    this._INPUT_COMPONENTS.clear();
    this._CREATED_INPUTS.clear();
    this.getScope().dispose();
    this.disposeStep();
  }

  override renderContentComponent(
    attrsDefault: PartAttrDefault,
    _data: Record<string, CoreObservable.App<any>>,
  ): CoreReactive.App {
    return CoreReactive.App.section({
      attrs: { ...attrsDefault },
      children: [
        this.executeSchemaPart(ComponentLabelTrait.schemas.LABEL.part, {}),
        this.executeSchemaPart(Schemas.FORM.part, {}),
      ],
    });
  }

  override renderManagerComponent(
    partName: string,
    attrsDefault: PartAttrDefault,
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
      case ComponentLabelTrait.schemas.LABEL.part:
        return this.renderLabel(data);
      case Schemas.FORM.part:
        return this.renderForm(attrsDefault, data);
      default:
        return super.renderManagerComponent(
          partName,
          attrsDefault,
          data,
          extra,
        );
    }
  }

  private renderLabel(
    data: Record<string, CoreObservable.App<any>>,
  ): CoreReactive.App {
    const bind = this._COMPONENT_PROPS_BIND;
    const title = data?.prop_labelTitle ?? bind.prop_labelTitle;
    const description =
      data?.prop_labelTooltipDescription ?? bind.prop_labelTooltipDescription;
    const show = data?.prop_labelShow ?? bind.prop_labelShow;
    const inputs = data?.prop_inputs ?? bind.prop_inputs;

    return CoreObservable.App.conditionWhen(
      [show, title, description],
      (isShown, labelTitle, labelDescription) =>
        !!isShown &&
        ((labelTitle != null && labelTitle !== "") ||
          (labelDescription != null && labelDescription !== "")),
      () => {
        const labelProps: Record<string, any> = {};
        for (const propName of Object.keys(ComponentLabelTrait.props)) {
          labelProps[propName] = data?.[propName] ?? bind[propName];
        }
        labelProps.prop_labelGroups = CoreObservable.App.computed(
          (groupList: InputGroupDefinition[] | null | undefined) =>
            (Array.isArray(groupList) ? groupList : []).map(({ id, title }) => ({ id, title, action: id })),
          [inputs],
          this.getScope(),
        );
        labelProps.prop_labelGroupSelected = data?.prop_groupSelected ?? bind.prop_groupSelected;
        labelProps.classList = ["d-block"];
        labelProps.styles = {
          marginBlockEnd: UtilStyle.Css_Margin(
            CoreConfig.Settings.SizeName.get(),
          ),
        };
        const label = ComponentLabelTrait.createLabel(labelProps, {
          CHANGE_GROUP: (event: Event, dataArgs: any) => {
            this.executeMethod("CHANGE_GROUP", event, { GROUP: dataArgs?.GROUP });
          },
        });
        this._CHILDREN.push(label as any);
        return label.getReactiveElement() as CoreReactive.App;
      },
      () => null,
      this.getScope(),
    ) as any;
  }

  private renderForm(
    attrsDefault: PartAttrDefault,
    data: Record<string, CoreObservable.App<any>>,
  ): CoreReactive.App {
    const bind = this._COMPONENT_PROPS_BIND;
    const background =
      data?.prop_backgroundColorForm ?? bind.prop_backgroundColorForm;
    const radius = data?.prop_formBorderRadius ?? bind.prop_formBorderRadius;
    const inputs = data?.prop_inputs ?? bind.prop_inputs;
    const selectedGroup = data?.prop_groupSelected ?? bind.prop_groupSelected;
    const directionRtl = CoreConfig.Settings.DirectionRtl.observable();
    const styles = CoreObservable.App.computed(
      (backgroundColor, borderRadius) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        backgroundColor,
        borderRadius: UtilStyle.Css_BorderRadius(borderRadius),
      }),
      [background, radius],
      this.getScope(),
    );
    const renderedInputs = CoreObservable.App.computed(
      (
        groupList: InputGroupDefinition[] | null | undefined,
        selectedId: string | null,
        isRtl: boolean,
      ) => {
        const groups = Array.isArray(groupList) ? groupList : [];
        let group = groups.find((candidate) => candidate.id === selectedId);
        if (!group && groups.length > 0) {
          group = groups[0];
          this.set("prop_groupSelected", group.id);
        }
        return this.renderInputs(group?.inputs ?? [], isRtl, groups);
      },
      [inputs, selectedGroup, directionRtl],
      this.getScope(),
    );

    return CoreReactive.App.section({
      attrs: { ...attrsDefault },
      styles: { display: "flex", flexDirection: "row", alignItems: "stretch" },
      stylesBind: styles,
      children: [renderedInputs as any],
    });
  }

  private renderInputs(
    inputs: InputGroupItem[] | null | undefined,
    isRtl: boolean,
    groups: InputGroupDefinition[] = [],
  ): CoreReactive.App {
    const list = Array.isArray(inputs) ? inputs : [];
    const rowPositions = this.getInputRowPositions(list);
    const activeInputs = new Set<DisposableChild>();
    const children = list.map((item, index) => {
      if (!item) return null;
      const type = item.type ?? InputGroupItemType.INPUT;
      if (type !== InputGroupItemType.INPUT && type !== InputGroupItemType.LABEL) return null;
      const position = rowPositions.get(index) ?? { first: true, last: true };
      const resolvedInput = this.resolveInput(item, type, activeInputs, position, isRtl);
      const width = this.resolveWidth(item.width);
      return CoreReactive.App.div({
        className: width.className,
        styles: { minWidth: "0", ...width.styles },
        children: [resolvedInput],
      });
    });

    this._ACTIVE_INPUTS = activeInputs;
    const configuredInputs = this.getConfiguredInputComponents(groups);
    for (const configured of configuredInputs) this._INPUT_COMPONENTS.add(configured);
    for (const previous of this._INPUT_COMPONENTS) {
      if (activeInputs.has(previous) || configuredInputs.has(previous)) continue;
      this.removeInputValueBinding(previous);
      if (previous.dispose) previous.dispose();
      else previous.disposeStep?.();
      this._INPUT_COMPONENTS.delete(previous);
      for (const [key, created] of this._CREATED_INPUTS) {
        if (created.instance === previous) this._CREATED_INPUTS.delete(key);
      }
    }
    for (const child of activeInputs) this._INPUT_COMPONENTS.add(child);
    this.syncInputGroupValue();

    return CoreReactive.App.div({
      className: ["row", "g-0"],
      styles: { width: "100%", minWidth: "0" },
      children,
    });
  }

  private getConfiguredInputComponents(
    groups: InputGroupDefinition[],
  ): Set<DisposableChild> {
    const configured = new Set<DisposableChild>();
    for (const group of groups) {
      for (const item of group?.inputs ?? []) {
        const input = item?.input;
        if (typeof input === "function") {
          const created = this._CREATED_INPUTS.get(item as object);
          if (created) configured.add(created.instance);
          continue;
        }
        if (
          input &&
          typeof input === "object" &&
          (typeof (input as any).getElement === "function" ||
            typeof (input as any).getReactiveElement === "function")
        ) {
          configured.add(input as DisposableChild);
        }
      }
    }
    return configured;
  }

  private resolveInput(
    item: InputGroupItem,
    type: InputGroupItemType,
    activeInputs: Set<DisposableChild>,
    position: InputRowPosition,
    isRtl: boolean,
  ): any {
    if (!item || item.input == null) return null;
    let input: any = item.input;

    if (typeof input === "function") {
      const key = item as object;
      let created = this._CREATED_INPUTS.get(key);
      if (!created || created.factory !== input) {
        const factory: any = input;
        const config = {};
        try {
          input = factory(config, {});
        } catch {
          input = null;
        }
        if (!input || (!input.getElement && !input.getReactiveElement)) {
          try {
            input = new factory(config, {});
          } catch {
            input = null;
          }
        }
        if (!input) return null;
        created = { factory, instance: input };
        this._CREATED_INPUTS.set(key, created);
      } else {
        input = created.instance;
      }
    }

    if (input instanceof CoreReactive.App) return input;
    if (typeof HTMLElement !== "undefined" && input instanceof HTMLElement) return input;
    if (typeof input?.getReactiveElement === "function") {
      if (type === InputGroupItemType.INPUT) {
        this.applyInputBorderRadius(input, position, isRtl);
        this.bindInputValue(input);
      } else if (type === InputGroupItemType.LABEL) {
        this.applyLabelBorderRadius(input, position, isRtl);
      }
      activeInputs.add(input);
      return input.getReactiveElement();
    }
    if (typeof input?.getElement === "function") {
      if (type === InputGroupItemType.INPUT) {
        this.applyInputBorderRadius(input, position, isRtl);
        this.bindInputValue(input);
      } else if (type === InputGroupItemType.LABEL) {
        this.applyLabelBorderRadius(input, position, isRtl);
      }
      activeInputs.add(input);
      return input.getElement();
    }
    return null;
  }

  private bindInputValue(input: any): void {
    const props = input?._COMPONENT_PROPS_BIND;
    if (!props) return;

    const getObservable = (names: string[]) =>
      names.map((name) => props[name]).find(
        (observable: any) =>
          observable &&
          typeof observable.get === "function" &&
          typeof observable.subscribe === "function",
      ) as CoreObservable.App<any> | undefined;

    const name = getObservable(["prop_inputName", "prop_name", "prop_selectName"]);
    const value = getObservable(["prop_inputValue", "prop_value", "prop_selectValue"]);
    if (!name || !value) return;

    const existing = this._INPUT_VALUE_BINDINGS.get(input);
    if (existing?.name === name && existing.value === value) return;
    if (existing) this.removeInputValueBinding(input);

    const binding: InputValueBinding = {
      name,
      value,
      unsubscribeName: () => undefined,
      unsubscribeValue: () => undefined,
      changeHooks: [],
    };

    const methods = input._COMPONENT_METHODS;
    for (const methodName of ["INPUT_CHANGE", "SELECT_CHANGE", "CHANGE"]) {
      const method = methods?.[methodName];
      if (!method || typeof method !== "object") continue;
      const previous = method.destination;
      const handler = (event: Event, dataArgs: any, componentArgs: any) => {
        const result = typeof previous === "function"
          ? previous.call(input, event, dataArgs, componentArgs)
          : undefined;
        this.handleInputValueChange(event);
        return result;
      };
      method.destination = handler;
      binding.changeHooks.push({ method, previous, handler });
    }

    if (binding.changeHooks.length === 0) {
      binding.unsubscribeName = name.subscribe(() => this.handleInputValueChange());
      binding.unsubscribeValue = value.subscribe(() => this.handleInputValueChange());
    }
    this._INPUT_VALUE_BINDINGS.set(input, binding);
  }

  private removeInputValueBinding(input: DisposableChild): void {
    const binding = this._INPUT_VALUE_BINDINGS.get(input);
    if (!binding) return;
    binding.unsubscribeName();
    binding.unsubscribeValue();
    for (const hook of binding.changeHooks) {
      if (hook.method.destination === hook.handler) {
        hook.method.destination = hook.previous;
      }
    }
    this._INPUT_VALUE_BINDINGS.delete(input);
  }

  private readInputGroupValue(): Record<string, any> {
    const value: Record<string, any> = {};
    for (const input of this._ACTIVE_INPUTS) {
      const binding = this._INPUT_VALUE_BINDINGS.get(input);
      if (!binding) continue;
      const name = binding.name.get();
      if (typeof name !== "string" || name.trim() === "") continue;
      value[name] = binding.value.get();
    }
    return value;
  }

  private syncInputGroupValue(): Record<string, any> {
    const value = this.readInputGroupValue();
    const current = this.get("prop_value");
    const currentKeys = current && typeof current === "object" ? Object.keys(current) : [];
    const valueKeys = Object.keys(value);
    const isUnchanged =
      currentKeys.length === valueKeys.length &&
      valueKeys.every(
        (key) =>
          Object.prototype.hasOwnProperty.call(current, key) &&
          Object.is(current[key], value[key]),
      );
    if (!isUnchanged) this.set("prop_value", value);
    return value;
  }

  private handleInputValueChange(event: Event = new Event("change")): void {
    const value = this.syncInputGroupValue();
    this.executeMethod("INPUT_CHANGE", event, { VALUE: value });
  }

  private applyInputBorderRadius(
    input: any,
    position: InputRowPosition,
    isRtl: boolean,
  ): void {
    if (typeof input?.set !== "function") return;
    const props = input._COMPONENT_PROPS_BIND;
    if (!props) return;

    let defaults = this._ITEM_RADIUS_DEFAULTS.get(input);
    if (!defaults) {
      defaults = {};
      this._ITEM_RADIUS_DEFAULTS.set(input, defaults);
    }

    for (const propName of INPUT_RADIUS_PROPS) {
      if (!props[propName]) continue;
      if (!(propName in defaults)) {
        defaults[propName] = props[propName].get?.();
      }

      if (propName === "prop_inputBorderRadius") {
        input.set(propName, !position.first && !position.last ? null : defaults[propName]);
        continue;
      }

      const corner = propName.match(/(Top|Bottom)(Left|Right)RadiusHas$/);
      if (!corner) continue;
      const side = corner[2].toLowerCase();
      const isInnerSide = isRtl
        ? (!position.first && side === "right") || (!position.last && side === "left")
        : (!position.first && side === "left") || (!position.last && side === "right");
      input.set(propName, isInnerSide ? false : defaults[propName]);
    }
  }

  private applyLabelBorderRadius(
    label: any,
    position: InputRowPosition,
    isRtl: boolean,
  ): void {
    const props = label?._COMPONENT_PROPS_BIND;
    if (typeof label?.set !== "function" || !props) return;

    let defaults = this._ITEM_RADIUS_DEFAULTS.get(label);
    if (!defaults) {
      defaults = {};
      this._ITEM_RADIUS_DEFAULTS.set(label, defaults);
    }

    const isMiddle = !position.first && !position.last;
    const radiusProp = "prop_labelRadius";
    if (props[radiusProp]) {
      if (!(radiusProp in defaults)) defaults[radiusProp] = props[radiusProp].get?.();
      label.set(radiusProp, isMiddle ? null : defaults[radiusProp]);
    }

    for (const propName of [
      "prop_labelBorderTopLeftRadiusHas",
      "prop_labelBorderTopRightRadiusHas",
      "prop_labelBorderBottomLeftRadiusHas",
      "prop_labelBorderBottomRightRadiusHas",
    ]) {
      if (!props[propName]) continue;
      if (!(propName in defaults)) defaults[propName] = !!props[propName].get?.();
      const corner = propName.match(/(Top|Bottom)(Left|Right)RadiusHas$/);
      if (!corner) continue;
      const side = corner[2].toLowerCase();
      const isInnerSide = isRtl
        ? (!position.first && side === "right") || (!position.last && side === "left")
        : (!position.first && side === "left") || (!position.last && side === "right");
      label.set(propName, isInnerSide ? false : defaults[propName]);
    }
  }

  private getInputRowPositions(inputs: InputGroupItem[]): Map<number, InputRowPosition> {
    const positions = new Map<number, InputRowPosition>();
    let row: number[] = [];
    let usedColumns = 0;

    const finishRow = () => {
      row.forEach((index, position) => {
        positions.set(index, {
          first: position === 0,
          last: position === row.length - 1,
        });
      });
      row = [];
      usedColumns = 0;
    };

    inputs.forEach((item, index) => {
      if (!item?.input) return;
      const type = item.type ?? InputGroupItemType.INPUT;
      if (type !== InputGroupItemType.INPUT && type !== InputGroupItemType.LABEL) return;
      const span = this.getWidthColumnSpan(item.width);
      if (span == null) {
        finishRow();
        row = [index];
        finishRow();
        return;
      }
      if (span > 0 && row.length > 0 && usedColumns + span > 12) finishRow();
      row.push(index);
      usedColumns += span;
      if (usedColumns >= 12) finishRow();
    });

    finishRow();
    return positions;
  }

  private getWidthColumnSpan(width: InputGroupItem["width"]): number | null {
    if (width == null || width === "") return 12;
    if (typeof width === "number") {
      return Number.isInteger(width) && width >= 1 && width <= 12 ? width : null;
    }
    if (width === LayoutColumn.CUSTOM) return 0;
    const column = width.match(/^(?:COL_|col-(?:[a-z]+-)?)(1[0-2]|[1-9])$/)?.[1];
    if (column) return Number(column);
    const percentage = width.match(/^(\d+(?:\.\d+)?)%$/)?.[1];
    if (percentage) return Math.max(1, Math.min(12, Math.round((Number(percentage) / 100) * 12)));
    return null;
  }

  private resolveWidth(width: InputGroupItem["width"]): {
    className: string[];
    styles: Record<string, string>;
  } {
    if (width == null || width === "") {
      return { className: ["col-12"], styles: {} };
    }

    if (typeof width === "number") {
      if (Number.isInteger(width) && width >= 1 && width <= 12) {
        return { className: [`col-${width}`], styles: {} };
      }
      const cssWidth = `${width}px`;
      return { className: [], styles: { width: cssWidth, flex: `0 0 ${cssWidth}`, maxWidth: cssWidth } };
    }

    const column = width.match(/^COL_(1[0-2]|[1-9])$/)?.[1];
    if (column) return { className: [`col-${column}`], styles: {} };
    if (/^col(?:-[a-z]+)?-\d+(?:\s+col(?:-[a-z]+)?-\d+)*$/.test(width)) {
      return { className: width.split(/\s+/), styles: {} };
    }
    if (width === LayoutColumn.CUSTOM) {
      return { className: [], styles: { flex: "1 1 0" } };
    }
    return { className: [], styles: { width, flex: `0 0 ${width}`, maxWidth: width } };
  }
}
