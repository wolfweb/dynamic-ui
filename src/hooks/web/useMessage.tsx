import { isString } from "lodash-es";
import { DialogOptions, showDialog } from "./useDialog";
import { ElAlert, ElNotification, ElMessage, ElMessageBox, ElPopconfirm } from "element-plus";

export interface ConfirmOptions extends DialogOptions {
  icon: string;
}

function createConfirm(options: ConfirmOptions) {
  return () => (
    <>
      <div>
        <ElPopconfirm
        icon = {options.icon}
        title = {options.title}
        onConfirm = {options.onConfirm}
        >
          {{
            reference: () => options.content,
          }}
        </ElPopconfirm>
      </div>
    </>
  );
}

function renderContent({ content }: Pick<DialogOptions, "content">) {
  if (isString(content)) {
    return () => <div innerHTML={`<div>${content as string}</div>`}></div>;
  } else {
    return content;
  }
}

function createModalOptions(
  options: DialogOptions,
  title: string
): DialogOptions {
  return {
    title: title,
    content: renderContent(options),
  };
}

function createSuccessModal(options: DialogOptions) {
  return showDialog(createModalOptions(options, "success"));
}

function createErrorModal(options: DialogOptions) {
  return showDialog(createModalOptions(options, "error"));
}

function createInfoModal(options: DialogOptions) {
  return showDialog(createModalOptions(options, "info"));
}

function createWarningModal(options: DialogOptions) {
  return showDialog(createModalOptions(options, "warning"));
}

export function useMessage() {
  return {
    message: ElMessage,
    messageBox: ElMessageBox,
    notification: ElNotification,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  };
}
