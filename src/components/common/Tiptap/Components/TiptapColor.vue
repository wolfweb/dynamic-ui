<template>
  <chrome v-model="color" />
</template>
<script lang="ts">
  import { Chrome } from '@lk77/vue3-color';
  import { defineComponent, ref, watch } from "vue";
  export default defineComponent({
    name:"TiptapColor",
    components:{
      Chrome
    },
    emits:['onUpdate'],
    setup(props, context){
      const color = ref('#ffffff');

      watch(
        ()=>color.value,
        (v)=>{
          // @ts-ignore
          context.emit('onUpdate', v);
        }
      );

      return {
        color
      }
    }
  });
</script>