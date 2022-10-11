<template>
  <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
    <div class="card-header">{{meta.attributes.title}}</div>
    <div class="card-body">
      
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'CardView',
    props:{
      meta: null
    },
    setup(props, context){

    }
  });
</script>