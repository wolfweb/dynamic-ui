<script lang="tsx">
  import { Icons } from '@/models/common';
  import { FunctionalComponent, CSSProperties, PropType } from 'vue';
  import { ElMenu, ElMenuItem, ElSubMenu , ElDivider, ElIcon } from 'element-plus';
  import { defineComponent, nextTick, onMounted, computed, ref, unref, onUnmounted, createVNode } from 'vue';

  const prefixCls = 'context-menu';

  const props = {
    width: { type: Number, default: 156 },
    customEvent: { type: Object as PropType<Event>, default: null },
    styles: { type: Object as PropType<CSSProperties> },
    showIcon: { type: Boolean, default: true },
    axis: {
      type: Object as PropType<Axis>,
      default() {
        return { x: 0, y: 0 };
      },
    },
    items: {
      type: Array as PropType<ContextMenuItem[]>,
      default() {
        return [];
      },
    },
  };

  const ItemContent: FunctionalComponent<ItemContentProps> = (props) => {
    const { item } = props;
    return (
      <>
      {props.showIcon && item.icon && <ElIcon>{createVNode(Icons[item.icon], { style: { width:'14px' } })}</ElIcon>}
      <span>{item.label}</span>
      </>
    );
  };

  export default defineComponent({
    name: 'ContextMenu',
    props,
    setup(props) {
      const wrapRef = ref(null);
      const showRef = ref(false);

      const getStyle = computed((): CSSProperties => {
        const { axis, items, styles, width } = props;
        const { x, y } = axis || { x: 0, y: 0 };
        const menuHeight = (items || []).length * 40;
        const menuWidth = width;
        const body = document.body;

        const left = body.clientWidth < x + menuWidth ? x - menuWidth : x;
        const top = body.clientHeight < y + menuHeight ? y - menuHeight : y;
        return {
          ...styles,
          position: 'absolute',
          width: `${width}px`,
          left: `${left + 1}px`,
          top: `${top + 1}px`,
          zIndex: 9999,
          border: '1px solid #ccc',
          'border-radius': '5px'
        };
      });

      onMounted(() => {
        nextTick(() => (showRef.value = true));
      });

      onUnmounted(() => {
        const el = unref(wrapRef);
        el && document.body.removeChild(el);
      });

      function handleAction(item: ContextMenuItem, e: Nullable<MouseEvent>) {
        const { handler, disabled } = item;
        if (disabled) {
          return;
        }
        showRef.value = false;
        e?.stopPropagation();
        e?.preventDefault();
        handler?.();
      }

      function renderMenuItem(items: ContextMenuItem[]) {
        const visibleItems = items.filter((item) => !item.hidden);
        return visibleItems.map((item) => {
          const { disabled, label, children, divider = false } = item;

          const contentProps = {
            item,
            handler: handleAction,
            showIcon: props.showIcon,
          };

          if (!children || children.length === 0) {
            return (
              <>
                <ElMenuItem disabled={disabled} class={`${prefixCls}__item`} key={label} onClick={(e)=>{handleAction(item, null)}}>
                  <ItemContent {...contentProps} />
                </ElMenuItem>
                {divider ? <ElDivider key={`d-${label}`} /> : null}
              </>
            );
          }
          if (!unref(showRef)) return null;

          return (
            <ElSubMenu key={label} disabled={disabled} popupClassName={`${prefixCls}__popup`} onClick={contentProps.handler.bind(null, item)}>
              {{
                title: () => <ItemContent {...contentProps} />,
                default: () => renderMenuItem(children),
              }}
            </ElSubMenu>
          );
        });
      }
      return () => {
        if (!unref(showRef)) {
          return null;
        }
        const { items } = props;
        return (
          <div class={prefixCls}>
            <ElMenu inlineIndent={12} mode="vertical" ref={wrapRef} style={unref(getStyle)}>
              {renderMenuItem(items)}
            </ElMenu>
          </div>
        );
      };
    },
  });
</script>
<style lang="less">
  @default-height: 42px !important;

  @small-height: 36px !important;

  @large-height: 36px !important;

  @item-hover-bg: #fff;

  .item-style() {
    li {
      display: inline-block;
      width: 100%;
      height: @default-height;
      margin: 0 !important;
      line-height: @default-height;

      span {
        line-height: @default-height;
      }

      > div {
        margin: 0 !important;
      }

      &:not(.ant-menu-item-disabled):hover {
        color: '#c9d1d9';
        background-color: @item-hover-bg;
      }
    }
  }

  .context-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: block;
    width: 156px;
    margin: 0;
    list-style: none;
    background-color: '#151515';
    border: 1px solid rgb(0 0 0 / 8%);
    border-radius: 0.25rem;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 10%),
      0 1px 5px 0 rgb(0 0 0 / 6%);
    background-clip: padding-box;
    user-select: none;

    &__item {
      margin: 0 !important;
    }
    .item-style();

    .ant-divider {
      margin: 0;
    }

    &__popup {
      .ant-divider {
        margin: 0;
      }

      .item-style();
    }

    .ant-menu-submenu-title,
    .ant-menu-item {
      padding: 0 !important;
    }
  }
</style>
