<template>
  <el-form-item :label="meta.attributes.label">
    <el-collapse v-model="meta.attributes.active" :accordion="meta.attributes.accordion" style="width: 100%;">
      <el-collapse-item v-for="(item, index) in meta.childes" :key="index" :title="item.display" :name="item.name">
        <draggable 
          class="form-element-block"
          animation="200" 
          @change="onChange"
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
  import { useEditModel } from '@/models/schema';
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
      const { editerModel } = useEditModel();

      props.meta.attributes.active = props.meta.childes[0].name;

      const onChange = (e) =>{
        if(e.added){
          editerModel.emitter.emit("onElementAdded", e.added.element);
        }
      };

      return {
        onChange
      }
    }
  })
</script>