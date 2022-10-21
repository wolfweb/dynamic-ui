<template>
  <el-form-item :label="meta.attributes.label">
    <el-tabs 
      style="width: 100%;"
      v-model="meta.attributes.active"
      :type="meta.attributes.type" 
      :closable="meta.attributes.closable" 
      :addable="meta.attributes.addable" 
      :editable="meta.attributes.editable"
      :tab-position="meta.attributes['tab-position']" 
      :stretch="meta.attributes.stretch">
      <el-tab-pane v-for="(item, index) in meta.childes" :key="index" :label="item.display" :name="item.name" style="min-height: 80px;">
        <draggable 
          animation="200" 
          @change="onChange"
          v-model="item.childes" 
          class="form-element-block"
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
      </el-tab-pane>
    </el-tabs>
  </el-form-item>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "Tabs",
    components: { draggable },
    props: {
      meta: null,
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
        onChange,
      }
    }
  })
</script>