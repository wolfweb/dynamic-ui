<template>
    <a :class="meta.attributes.class">
      {{meta.attributes.content}}
    </a>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';

  export default defineComponent({
    name: "Link",
    props: {
      meta: null
    },
    setup(props, context){
      return {

      }
    }
  });
</script>