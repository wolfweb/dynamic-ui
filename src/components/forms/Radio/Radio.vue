<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-radio-group v-model="formModel[meta.dataBinder.name]" style="width: 100%;">
      <template v-for="(item, index) in meta.attributes.options">
        <el-radio-button v-if="meta.attributes.useButton" :label="item.value" :border="meta.attributes.border">
          {{ item.label }}
        </el-radio-button>
        <el-radio v-else :label="item.value" :border="meta.attributes.border">
          {{ item.label }}
        </el-radio>
      </template>
    </el-radio-group>
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "Radio",
    props: {
      meta:null
    },
    computed:{
      descriptor(){
        return this.meta.validation.map(x=>x.rule);
      }
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel();

      if(props.meta){
        ensureFormModelInit(props.meta);
      }

      return {
        formModel,
      }
    }
  })
</script>