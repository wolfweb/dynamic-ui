<template>

</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name:'LiquidImageAttr',
    setup(props, context){
      const imgStyle = [
        {key:'rounded', value: 'rounded'},
        {key:'circle', value: 'rounded-circle'},
        {key:'thumbnail', value: 'img-thumbnail'},
      ]
      return {
        imgStyle
      }
    }
  });
</script>