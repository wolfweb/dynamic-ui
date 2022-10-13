<template>
  <dynamic-component v-if="schema" :meta="schema"></dynamic-component>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name:"ViewDetail",
    props:{
      actived:{
        type: String,
        default: ''
      },
      schema: null
    },
    setup(props, context){
      console.log(props.schema);
      return {
        
      }
    }
  });
</script>