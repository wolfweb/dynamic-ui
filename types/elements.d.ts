interface IElementMetadata {
  id: string;
  key: string;
}

interface IFormElementMetadata extends IElementMetadata {
  display: string;
  attributes: Dictionary<any>;
  dataBinder: Nullable<FormElementDataBinder>;
  validation: Array<FormElementValidation>;
  childes?: Array<IFormElementChildGroupMetadata>;
}

interface ILayoutElementMetadata extends IElementMetadata {
  display: string;
  attributes: Dictionary<any>;
  childes: Array<IFormElementChildGroupMetadata>;
}

interface IDisplayElementMetadata extends IElementMetadata {
  display: string;
  attributes: Dictionary<any>;
} 

interface IChartDisplayElementMetadata extends IDisplayElementMetadata{
  title: string;
  chartType: string;
  series?: SeriesOption$1 | SeriesOption$1[];
}

declare interface ILiquidElementMetadata extends IElementMetadata {
  display: string;
  attributes: Dictionary<any>;
  childes?: Array<any>;
}

declare interface IFormElementChildGroupMetadata {
  name: string;
  display: string;
  childes: Array<IFormElementMetadata | ILayoutElementMetadata>;
}

declare interface FormElementDataBinder {
  name: string;
  value: any | Array<any>;
  isSort?: boolean;
  bindType?: string;
  isFilter?: boolean;
  uniqueKey?: boolean
  primaryKey?: boolean;
  defaultValue?: string;
}

declare interface FormElementValidation {
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
  serverRule(): Nullable<FormElementValidation>;
  render?(entity : ValidationRule, confirm: (value: ValidationRule) => void);
  validator?(...args: any): boolean;
}

declare interface Tree {
  label: string;
  value: string;
  children?: Tree[];
}
