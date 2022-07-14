<template>
  <el-form-item :label="meta.attributes.label">
    <el-collapse v-model="meta.attributes.active" :accordion="meta.attributes.accordion" style="width: 100%;">
      <el-collapse-item v-for="(item,i) in meta.childes" :title="item.display" :name="item.name">
        <draggable 
          class="form-element-block"
          animation="200" 
          v-model="item.childes" 
          v-bind="{
            group: {
              name: 'widget',
            },
            ghostClass: 'ghost',
          }"
          :item-key='itemKey'
        >
        <template #item="{element,index}">
          <dynamic-component :meta="element" />
        </template>
      </draggable>
      </el-collapse-item>
    </el-collapse>
  </el-form-item>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: "Collapse",
    components: { draggable },
    props: {
      meta:null,
      itemKey: {
        type: String,
        default: 'id'
      },
    },
    setup(props, context) {      
      if(props.meta){
        props.meta.attributes.active = props.meta.childes[0].name
      }

      return {
      }
    }
  })
</script>