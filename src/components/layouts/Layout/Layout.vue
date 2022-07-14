<template>
  <div :class="[meta.attributes.fluid ? styles.containerFluid : styles.container,  schemaMode == 'Layout' || schemaMode == 'Design' ? styles.preview : '' ]">
    <draggable 
      :class="styles.block"
      animation="300" 
      v-model="meta.childes" 
      :item-key='itemKey'
      v-bind="{
        group: {
          name: 'widget',
        },
        ghostClass: 'sortable__ghost'
      }">
        <template #item="{element,index}">
          <dynamic-component :meta="element" />
        </template>
    </draggable>
  </div>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  import styles from '../index.module.scss'

  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  import { useSchemaStore } from '@/store/modules/schemaStore';

  export default defineComponent({
    name: "Layout",
    components: { draggable },
    props: {
      meta:null,
      itemKey: {
        type: String,
        default: 'id'
      },
    },
    setup(props, context) {
      const { formModel } = useEditModel();
      const schemaMode = useSchemaStore().Mode;

      return {
        schemaMode,
        formModel,
        styles
      }
    }
  })
</script>