<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>if</span>
      </div>
    </template>
  </el-card>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>else</span>
      </div>
    </template>
  </el-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "IfElse",
    setup(props, context){
      return {
        
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