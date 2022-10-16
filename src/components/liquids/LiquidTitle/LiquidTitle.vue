<template>
    <component :is="meta.attributes.tagType" :class="meta.attributes.align">
      {{meta.attributes.content}}
    </component>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';

  export default defineComponent({
    name: "LiquidTitle",
    props: {
      meta: null
    },
    setup(props, context){
      console.log("title");
      return {

      }
    }
  });
</script>