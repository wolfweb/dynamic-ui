<template>
  <div>
    {{meta.attributes.content}}
    <!-- <component :is="meta.attributes.tagType">
    </component> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';

  export default defineComponent({
    name: "Title",
    props: {
      meta: null
    },
    setup(props, context){
      return {

      }
    }
  });
</script>