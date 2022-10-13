<template>
  <div :class="[styles.row, schemaMode == 'Layout' || schemaMode == 'Form' ? styles.rowPreview : '']">
    <div v-for="(item, index) in meta.attributes.cols" :class="computedStyle(item)" :data-bind="item.label">
      <draggable 
          :class="styles.block"
          animation="200" 
          :list="getColChilds(item)" 
          v-bind="{
            group: {
              name: 'widget',
            },
            ghostClass: 'ghost',
          }"
          :item-key='itemKey'
          @add="addChild"
          @change="onChange"
        >
        <template #item="{element,index}">
          <dynamic-component :meta="getChildElement(element)" @onRemove="onRemoveElement" />
        </template>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts">
  import styles from '../index.module.scss'
  
  import draggable from 'vuedraggable';
  import { remove, clone } from 'lodash-es';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, reactive, ref } from 'vue';
  import { useSchemaStore } from '@/store/modules/schemaStore';
  export default defineComponent({
    name: "Row",
    components:{ draggable },
    props: {
      meta:null,
      itemKey: {
        type: String,
        default: 'id'
      },
    },
    setup(props, context) {
      const stateKeep = reactive({
        element: null
      });

      const getColChilds = (col) => {
        return clone(col.childes);
      };
      
      const onRemoveElement = (v) =>{
        for(var i=0;i<props.meta.attributes.cols.length;i++){
          const col = props.meta.attributes.cols[i];
          if(col.childes){
            remove(col.childes, x=> x == v.id);
          }
        }
      }

      const addChild = (e) => {
        let id = e.to.parentElement.dataset.bind
        let col = props.meta.attributes.cols.find(x=>x.label == id)
        if(col && stateKeep.element) {
          //@ts-ignore
          col.childes.push(stateKeep.element.id);
        }
      }

      const onChange = (e) => {
        if(e.added){
          stateKeep.element = e.added.element;
          props.meta.childes.push(e.added.element);
        }
      }

      const computedStyle = (col) => {
        if(col.width){
          return styles['col-'+col.width];
        }
        return styles['col'];
      }

      const getChildElement = (ele)=>{
        return props.meta.childes.find(x=>x.id == ele);
      }

      const schemaMode = useSchemaStore().Mode;

      return {
        getChildElement,
        onRemoveElement,
        computedStyle,
        getColChilds,
        schemaMode,
        addChild,
        onChange,
        styles
      }
    }
  })
</script>