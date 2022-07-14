declare interface Axis {
  x: number;
  y: number;
}

declare interface ContextMenuItem {
  label: string;
  icon?: string;
  hidden?: boolean;
  disabled?: boolean;
  handler?: Fn;
  divider?: boolean;
  children?: ContextMenuItem[];
}
declare interface CreateContextOptions {
  event: MouseEvent;
  icon?: string;
  styles?: any;
  items?: ContextMenuItem[];
}

declare interface ContextMenuProps {
  event?: MouseEvent;
  styles?: any;
  items: ContextMenuItem[];
  customEvent?: MouseEvent;
  axis?: Axis;
  width?: number;
  showIcon?: boolean;
}

declare interface ItemContentProps {
  showIcon: boolean | undefined;
  item: ContextMenuItem;
  handler: Fn;
}
