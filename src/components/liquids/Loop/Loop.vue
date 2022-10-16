<template>
  
</template>
<script lang="ts">
  import draggable from "vuedraggable";
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Loop',
    components:{
      draggable
    },
    props: {
      meta: null
    },
    setup(props, context){

      return {

      };
    }
  });
</script>