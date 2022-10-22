<template>
  <fieldset class="editable" @click.stop="()=>findAndSetCurrentElement(meta.id)" :class="{'active': currentElement && currentElement.id == meta.id && schemaMode != 'Preview' && schemaMode != 'Render' }">
    <legend v-if="showTools" class="flex right-0">
      <div class="editable_handle">
        <move theme="outline" size="18" fill="#333"/>
      </div>
      <div class="editable_actions">
        <delete theme="outline" size="18" fill="#333" @click="removeElement(meta.id)"/>
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
  import { Move, Delete } from '@icon-park/vue-next';
  import { useSchemaStore } from '@/store/modules/schemaStore';

  export default defineComponent({
    name: "dynamicComponent",
    components: {
      Move, Delete
    },
    props: {
      meta: null,
      showTools: {
        type: Boolean,
        default: true
      }
    },
    emits:['onRemove'],
    setup(props, context){
      const { findAndSetCurrentElement, findAndRemoveElement, currentElement } = useEditModel();

      const removeElement = (id)=>{
        let removed = findAndRemoveElement(id)
        context.emit('onRemove', removed)
      };

      const schemaMode = useSchemaStore().Mode;

      return { 
        schemaMode,
        removeElement,
        currentElement,
        findAndSetCurrentElement
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

    legend {
      display: none;
    }

    &_handle{
      display: inline-block;
      padding: 2px;
      margin: 0 2px;
      cursor: grab;
    }

    &_actions{
      display: inline-block;
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

      > legend:first-child {
        display: block;
      }
    }
  }
</style>