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

  computed: {
    icon() {
      return defineAsyncComponent(() => import(`../../assets/${this.name}.svg?component`));
    },
  },
});
</script>
