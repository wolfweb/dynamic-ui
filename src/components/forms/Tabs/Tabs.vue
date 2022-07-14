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
      <el-tab-pane v-for="(child, index) in meta.attributes.options" :key="index" :label="child.label" :name="child.label" style="min-height: 80px;">
        
      </el-tab-pane>
    </el-tabs>
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: "Tabs",
    props: {
      meta: null
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