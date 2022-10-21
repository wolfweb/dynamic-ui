<template>
  <el-descriptions 
    :title="meta.attributes.title" 
    :column="meta.attributes.column"
    :border="meta.attributes.border"
    :direction="meta.attributes.direction"
  >
  <template v-for="(item,index) in meta.attributes.columns">
    <el-descriptions-item v-if="item.enable" :label="item.label">
      {{ formModel[item.name] }}
    </el-descriptions-item>
  </template>
  </el-descriptions>
</template>
<script lang="ts">
  import { defineComponent }  from 'vue';
  import { useEditModel } from '@/models/schema';

  export default defineComponent({
    name: "FormDetail",
    props: {
      meta:null
    },
    setup(props, context) {
      console.log(props.meta);
      
      const { editerModel } = useEditModel();

      const formModel = editerModel.attributes.formViewAttr.model;

      return {
        formModel
      }
    }
  });
</script>