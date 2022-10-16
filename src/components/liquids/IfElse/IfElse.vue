<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="if" name="if">
      <draggable animation="200" class="stage" v-model="meta.attributes.trueChilds" item-key="id" v-bind="{
        group: {
          name: 'widget',
        },
        ghostClass: 'sortable__ghost',
        handle: '.editable_handle',
      }">
        <template #item="{ element, index }">
          <dynamic-component :meta="element" />
        </template>
      </draggable>
    </el-collapse-item>
    <el-collapse-item title="else" name="else">
      <draggable animation="200" class="stage" v-model="meta.attributes.falseChilds" item-key="id" v-bind="{
        group: {
          name: 'widget',
        },
        ghostClass: 'sortable__ghost',
        handle: '.editable_handle',
      }">
        <template #item="{ element, index }">
          <dynamic-component :meta="element" />
        </template>
      </draggable>
    </el-collapse-item>
  </el-collapse>
</template>
<script lang="ts">
  import draggable from "vuedraggable";
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    name: "IfElse",
    components: {
      draggable
    },
    setup(props, context){
      const activeNames = ref(null);
      return {
        activeNames
      }
    }
  });
</script>
<style lang="less" scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>