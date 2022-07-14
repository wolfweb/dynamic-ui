interface IElementMetadata {
  id: string;
}

interface IFormElementMetadata extends IElementMetadata {
  key: string;
  display: string;
  attributes: Dictionary<any>;
  dataBinder: Nullable<WidgetDataBinder>;
  validation: Array<WidgetValidation>;
  childes?: Array<IFormElementChildGroupMetadata>;
}

interface ILayoutElementMetadata extends IElementMetadata {
  key: string;
  display: string;
  attributes: Dictionary<any>;
  childes: Array<IFormElementChildGroupMetadata>;
}

interface IDisplayElementMetadata extends IElementMetadata {
  key: string;
  display: string;
  attributes: Dictionary<any>;
}

interface IChartDisplayElementMetadata extends IDisplayElementMetadata{
  title: string;
  chartType: string;
  series?: SeriesOption$1 | SeriesOption$1[];
}

interface ILiquidElementMetadata extends IElementMetadata {

}

declare interface IFormElementChildGroupMetadata {
  name: string;
  display: string;
  childes: Array<IFormElementMetadata | ILayoutElementMetadata>;
}

declare interface WidgetDataBinder {
  name: string;
  value: any | Array<any>;
  isSort?: boolean;
  bindType?: string;
  isFilter?: boolean;
  uniqueKey?: boolean
  primaryKey?: boolean;
  defaultValue?: string;
}

declare interface WidgetValidation {
  provider: string | null;
  args?: Nullable<Dictionary<any>>;
  rule?: any;
}

declare interface ValidationRule {
  type?: string;
  reused?: boolean;
  message: string;
  display: string;
  serverType: string;
  clientRule() : object;
  serverRule(): Nullable<WidgetValidation>;
  render?(entity : ValidationRule, confirm: (value: ValidationRule) => void);
  validator?(...args: any): boolean;
}

declare interface EditModelContext {
  setCurrentWidget(block: FormElementMetadata | null): void;
  findAndSetCurrentWidget(id: string): void;
  findAndRemoveWidget(id: string): FormElementMetadata;
  appendFormSchema(widget: FormElementMetadata, idx: number = -1): void;
  sortFormSchema(widget: FormElementMetadata, oidx: number, nidx: number): void;
  ensureFormModelInit(widget: FormElementMetadata): void;
  addValidation(validation: WidgetValidation): void;
  removeValidation(provider: string): void;
  requireChangeHandler(v: boolean): void;
}

declare interface Tree {
  label: string;
  value: string;
  children?: Tree[];
}
