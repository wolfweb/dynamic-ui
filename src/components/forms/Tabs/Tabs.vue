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
      <el-tab-pane v-for="(item, index) in meta.childes" :key="index" :label="item.display" :name="item.label" style="min-height: 80px;">
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
      </el-tab-pane>
    </el-tabs>
  </el-form-item>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  import { defineComponent } from 'vue'
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
      if (props.meta) {
        props.meta.attributes.active = props.meta.attributes.options[0].label
      }
      return {
        
      }
    }
  })
</script>