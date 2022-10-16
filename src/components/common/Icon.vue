<template>
  <component :is="icon" width="1em" height="1em" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'icon',

  props: {
    name: String,
  },
  setup(props, context){
    const path = `../../assets/${props.name}.svg?component`;
    const icon = defineAsyncComponent(() => import(/* @vite-ignore */ path));
    return {
      icon
    };
  }
});
</script>
