import { ElInput, ElForm, ElFormItem } from "element-plus";
import { showDialog } from '@/hooks/web/useDialog';

class Integer implements ValidationRule {
  readonly type = "integer";
  readonly display = "整数";
  readonly message = "请输入整数";
  readonly serverType = "Integer";

  validator(rule, value, callback) {
    if (value && value.length > 0) {
      return /^\d+$/.test(value) ? callback() : callback(new Error(this.message));
    }
    return false;
  }

  clientRule() {
    return { name: "Integer", type: this.type, message: this.message, validator: this.validator, trigger: 'blur' };
  }
  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, rule: this.clientRule() };
  }
}

class MaxLength implements ValidationRule {
  max = 255;
  readonly type = "string";
  readonly display = "最大长度";
  readonly message = "请输入正确的最大长度";
  readonly serverType = "MaxLength";

  render(obj: MaxLength, confirm: (value: ValidationRule) => void) {
    showDialog({
      title: '设置',
      props: {
        width: 660
      },
      content: () => (
        <>
          <ElForm>
            <ElFormItem label="最大长度">
              <ElInput type="number" placeholder="请输入最大长度" v-model={obj.max} />
            </ElFormItem>
          </ElForm>
        </>
      ),
      onConfirm: () => {
        confirm(obj);
      }
    });
  }
  clientRule() {
    return { name: "MaxLength", type: this.type, max: this.max, message: this.message };
  }
  serverRule(): Nullable<FormElementValidation> {
    return {
      provider: this.serverType, args: { "Length": this.max }, rule: this.clientRule()
    }
  }
}

class Required implements ValidationRule {
  readonly required = true;
  readonly message = "值不能为空";
  readonly display = "必填";
  readonly serverType = "Required";

  clientRule() {
    return { name: "Required", required: this.required, message: this.message };
  }
  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, rule: this.clientRule() }
  }
}

class StringLength implements ValidationRule {
  min = 0;
  max = 255;

  readonly type = "string";
  readonly display = "内容长度";
  readonly message = "请输入正确的内容长度";
  readonly serverType = "StringLength";

  render(obj: StringLength, confirm: (value: ValidationRule) => void) {
    showDialog({
      title: '设置',
      props: {
        width: 660
      },
      content: () => (
        <>
          <ElForm>
            <ElFormItem label="最小长度">
              <ElInput type="number" placeholder="请输入最小长度" v-model={obj.min} />
            </ElFormItem>
            <ElFormItem label="最大长度">
              <ElInput type="number" placeholder="请输入最大长度" v-model={obj.max} />
            </ElFormItem>
          </ElForm>
        </>
      ),
      onConfirm: () => {
        confirm(obj);
      }
    });
  }

  clientRule() {
    return { name: "StringLength", type: this.type, min: this.min, max: this.max, message: this.message };
  }
  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, args: { "MaximumLength": this.max, "MinimumLength": this.min }, rule: this.clientRule() }
  }
}

class EmailAddress implements ValidationRule {
  readonly type = "email";
  readonly display = "邮箱";
  readonly message = "请输入正确的邮箱地址";
  readonly serverType = "EmailAddress";

  clientRule() {
    return { name: "EmailAddress", type: this.type, message: this.message };
  }
  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, rule: this.clientRule() }
  }
}

class Year implements ValidationRule {
  max: number = 0;
  min: number = 0;

  readonly type = "integer";
  readonly display = "年份";
  readonly message = "请输入正确的年份";
  readonly serverType = "Year";

  constructor() {
    this.max = new Date().getFullYear();
    this.min = 1970;
  }

  render(obj: Year, confirm: (value: ValidationRule) => void) {
    showDialog({
      title: '设置',
      props: {
        width: 660
      },
      content: () => (
        <>
          <ElForm>
            <ElFormItem label="最小年份">
              <ElInput type="number" placeholder="请输入最小年份" v-model={obj.min} />
            </ElFormItem>
            <ElFormItem label="最大年份">
              <ElInput type="number" placeholder="请输入最大年份" v-model={obj.max} />
            </ElFormItem>
          </ElForm>
        </>
      ),
      onConfirm: () => {
        confirm(obj);
      }
    });
  }

  clientRule() {
    return { name: "Year", type: this.type, min: this.min, max: this.max, message: this.message };
  }

  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, "args": { "Start": this.max, "End": this.min }, rule: this.clientRule() }
  }
}

class DateTime implements ValidationRule {
  readonly type = "date";
  readonly display = "日期";
  readonly message = "请输入正确的日期";
  readonly serverType = "Date";

  clientRule() {
    return { name: "DateTime", type: this.type, message: this.message };
  }

  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, rule: this.clientRule() }
  }
}

class Numeric implements ValidationRule {
  readonly type = "number";
  readonly display = "数字";
  readonly message = "请输入正确的数字";
  readonly serverType = "Numeric";

  clientRule() {
    return { name: "Numeric", type: this.type, message: this.message };
  }

  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, rule: this.clientRule() }
  }
}

class Range implements ValidationRule {
  max: number = 0;
  min: number = 0;

  readonly type = "number";
  readonly display = "范围";
  readonly message = "请输入有效值";
  readonly serverType = "Range";

  constructor() {
    this.max = 100;
    this.min = 0;
  }

  render(obj: Range, confirm: (value: ValidationRule) => void) {
    showDialog({
      title: '设置',
      props: {
        width: 660
      },
      content: () => (
        <>
          <ElForm>
            <ElFormItem label="最小值">
              <ElInput type="number" placeholder="请输入最小值" v-model={obj.min} />
            </ElFormItem>
            <ElFormItem label="最大值">
              <ElInput type="number" placeholder="请输入最大值" v-model={obj.max} />
            </ElFormItem>
          </ElForm>
        </>
      ),
      onConfirm: () => {
        confirm(obj);
      }
    });
  }

  clientRule() {
    return { name: "Range", type: this.type, min: this.min, max: this.max, message: this.message };
  }
  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, args: { "Minimum": this.min, "Maximum": this.max }, rule: this.clientRule() }
  }
}

class MinLength implements ValidationRule {
  min: 0;

  readonly type = "string";
  readonly display = "最小长度";
  readonly message = "最小长度{0}";
  readonly serverType = "MinLength";

  render(obj: MinLength, confirm: (value: ValidationRule) => void) {
    showDialog({
      title: '设置',
      props: {
        width: 660
      },
      content: () => (
        <>
          <ElForm>
            <ElFormItem label="最小长度">
              <ElInput type="number" placeholder="请输入最小长度" v-model={obj.min} />
            </ElFormItem>
          </ElForm>
        </>
      ),
      onConfirm: () => {
        confirm(obj);
      }
    });
  }

  clientRule() {
    return { name: "MinLength", type: this.type, min: this.min, message: this.message };
  }
  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, args: { "Length": this.min }, rule: this.clientRule() }
  }
}

class RegularExpression implements ValidationRule {
  pattern: string = "";

  readonly type = "regexp";
  readonly reused = true;
  readonly display = "正则表达式";
  readonly message = "请输入正确的格式";
  readonly serverType = "RegularExpression";

  render(obj: RegularExpression, confirm: (value: ValidationRule) => void) {
    showDialog({
      title: '设置',
      props: {
        width: 660
      },
      content: () => (
        <>
          <ElForm>
            <ElFormItem label="正则表达式">
              <ElInput type="text" placeholder="请输入正则表达式" v-model={obj.pattern} />
            </ElFormItem>
          </ElForm>
        </>
      ),
      onConfirm: () => {
        confirm(obj);
      }
    });
  }

  clientRule() {
    return { name: "RegularExpression", type: this.type, pattern: this.pattern, message: this.message };
  }
  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, args: { "Pattern": this.pattern }, rule: this.clientRule() }
  }
}

class Url implements ValidationRule {
  readonly type = "url";
  readonly display = "网址";
  readonly message = "请输入正确的网址";
  readonly serverType = "Url";
  clientRule() {
    return { name: "Url", type: this.type, message: this.message };
  }
  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, rule: this.clientRule() }
  }
}

class Phone implements ValidationRule {
  readonly type = "string";
  readonly display = "电话";
  readonly message = "请输入正确的电话号码";
  readonly serverType = "Phone";

  validator(rule, value, callback) {
    if (value && value.length > 0) {
      return /^1[3456789]\d{9}$/.test(value);
    }
    return false;
  }

  clientRule() {
    return { name: "Phone", type: this.type, message: this.message, validator: this.validator };
  }

  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, rule: this.clientRule() }
  }
}

class EnumDataType implements ValidationRule {
  enum: any[] = [];

  readonly type = "enum";
  readonly display = "枚举";
  readonly message = "请输入正确的值";
  readonly serverType = "EnumDataType";

  render(obj: EnumDataType, confirm: (value: ValidationRule) => void) {
    showDialog({
      title: '设置',
      props: {
        width: 660
      },
      content: () => (
        <>
          <ElForm>
            <ElFormItem label="枚举">
              <ElInput type="text" placeholder="请输入枚举值" v-model={obj.enum} />
            </ElFormItem>
          </ElForm>
        </>
      ),
      onConfirm: () => {
        confirm(obj);
      }
    });
  }

  clientRule() {
    return { name: "EnumDataType", type: this.type, enum: this.enum, message: this.message };
  }

  serverRule(): Nullable<FormElementValidation> {
    return { provider: null, rule: this.clientRule() }
  }
}

class CreditCard implements ValidationRule {
  readonly type = "string";
  readonly display = "信用卡";
  readonly message = "请输入正确的信用卡号";
  readonly serverType = "CreditCard";

  validator(rule, value, callback) {
    if (value && value.length > 0) {
      return /^\d{16,19}$/.test(value);
    }
    return false;
  }

  clientRule() {
    return { name: "CreditCard", type: this.type, message: this.message, validator: this.validator };
  }

  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, rule: this.clientRule() }
  }
}

class FileExtensions implements ValidationRule {
  extensions: string[] = [];
  readonly type = "array";
  readonly display = "文件类型";
  readonly message = "请输入正确的文件类型";
  readonly serverType = "FileExtensions";
  validator(rule, value, callback) {
    if (this.extensions && value && value.length > 0) {
      return this.extensions.indexOf(value) > -1;
    }
    return false;
  }

  render(obj: FileExtensions, confirm: (value: ValidationRule) => void) {
    showDialog({
      title: '设置',
      props: {
        width: 660
      },
      content: () => (
        <>
          <ElForm>
            <ElFormItem label="文件类型">
              <ElInput type="text" placeholder="请输入文件类型" v-model={obj.extensions} />
            </ElFormItem>
          </ElForm>
        </>
      ),
      onConfirm: () => {
        confirm(obj);
      }
    });
  }

  clientRule() {
    return { name: "FileExtensions", type: this.type, message: this.message, validator: this.validator };
  }

  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, args: { "Extensions": this.extensions }, rule: this.clientRule() }
  }
}

class EqualTo implements ValidationRule {
  readonly type = "string";
  readonly display = "对比";
  readonly message = "请输入正确的值";
  readonly serverType = "EqualTo";

  clientRule() {
    return { name: "EqualTo", type: this.type, message: this.message };
  }

  serverRule(): Nullable<FormElementValidation> {
    return { provider: this.serverType, rule: this.clientRule() };
  }
}

export default [
  Integer,
  MaxLength,
  Required,
  StringLength,
  EmailAddress,
  Year,
  DateTime,
  Numeric,
  Range,
  MinLength,
  RegularExpression,
  Url,
  Phone,
  CreditCard,
  FileExtensions,
  EqualTo,
  EnumDataType
].map((x) => new x());
