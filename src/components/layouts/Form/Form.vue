<template>
  <el-form
    :model="formModel"
    :size="meta.attributes.size"
    :inline="meta.attributes.inline"
    :label-position="meta.attributes['label-position']"
    :label-width="meta.attributes['label-width'] + 'px'"
    :label-suffix="meta.attributes['label-suffix']"
  >
  <draggable
      animation="200" 
      class="stage"
      item-key="id"
      @change="onChange"
      v-model="meta.childes"
      v-bind="{
        group: {
          name: 'widget',
        },
        ghostClass: 'sortable__ghost',
        handle: '.editable_handle',
      }"
    >
    <template #item="{ element, index }">
      <dynamic-component :meta="element" />
    </template>
    </draggable>
  </el-form>
</template>
<script lang="ts">
  import draggable from "vuedraggable";
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "Form",
    components: {
      draggable
    },
    props: {
      meta:null
    },
    setup(props, context) {
      const { editerModel } = useEditModel();

      const formModel = editerModel.attributes.formViewAttr.model;

      const onChange = (e) =>{
        if(e.added){
          editerModel.emitter.emit("onElementAdded", e.added.element);
        }
      };

      return {
        onChange,
        formModel
      }
    }
  })
</script>
<style>
  .stage {
    width: 100%;
    min-height: 30px;
    border: 1px dashed #ccc;
  }

  .el-form--inline .stage{
    display: flex;
  }
</style>