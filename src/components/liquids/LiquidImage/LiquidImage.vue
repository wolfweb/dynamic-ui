<template>
  <img :class="meta.attributes.class" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LiquidImage',
    props: {
      meta: null
    },
    setup(props, context){

      return {

      }
    }
  });
</script>