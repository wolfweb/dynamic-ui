<template>
  <component :is="meta.attributes.tagType">
    {{meta.attributes.content}}
  </component>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "Title",
    props: {
      meta: null
    },
    setup(props, context){
      return {}
    }
  });
</script>