<template>
  <dynamic-component v-if="schema" :meta="schema" :showTools="false"></dynamic-component>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name:"FormDataList",
    props:{
      actived:{
        type: String,
        default: ''
      },
      schema: null
    },
    setup(props, context){
      return {
        
      }
    }
  });
</script>