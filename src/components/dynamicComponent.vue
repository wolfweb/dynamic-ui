<template>
  <fieldset class="editable" @click.stop="()=>findAndSetCurrentWidget(meta.id)" :class="{'active': currentWidget && currentWidget.id == meta.id && schemaMode != 'Preview' && schemaMode != 'Render' }">
    <legend v-if="schemaMode != 'Preview' && schemaMode != 'Render'" class="flex right-0">
      <div class="editable_handle">
        <i class="fa fa-arrows"></i>
      </div>
      <div class="editable_actions">
        <i class="fa fa-trash-o" @click="removeWidget(meta.id)"></i>
      </div>
    </legend>
    <div class="text-left">
      <component :is="meta.key" :meta="meta" />
    </div>
  </fieldset>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  import { useSchemaStore } from '@/store/modules/schemaStore';

  export default defineComponent({
    name: "EditWidget",
    props: {
      meta: null,
    },
    emits:['onRemove'],
    setup(props, context){
      const { findAndSetCurrentWidget, findAndRemoveWidget, currentWidget } = useEditModel();

      const removeWidget = (id)=>{
        let removed = findAndRemoveWidget(id)
        context.emit('onRemove', removed)
      };

      const schemaMode = useSchemaStore().Mode;

      return { 
        schemaMode,
        removeWidget,
        currentWidget,
        findAndSetCurrentWidget
      }
    }
  })
</script>
<style lang="scss" scoped>
  legend{
    float: none;
    width: unset;
    font-size: 1rem;
  }
  .editable{
    margin: 2px 4px;
    color: #cc9966;
    padding: 0.2rem!important;
    text-align: right!important;

    &_handle{
      display: none;
      padding: 2px;
      margin: 0 2px;
      cursor: grab;
    }

    &_actions{
      display: none;
      cursor: pointer;
      margin: 0 2px;
      right: 8px;
      z-index: 100;
    }

    &_body{
      padding: 20px 40px 0;
    }
  }

  .editable{
    position: relative;
    border: 1px solid transparent;

    &.active {
      border-color: rgba(18, 98, 226,0.5);
      background: rgba(0,0,0,0.02);

      & .editable_handle,
      & .editable_actions {
        display: inline-block;
      }
    }
  }
</style>