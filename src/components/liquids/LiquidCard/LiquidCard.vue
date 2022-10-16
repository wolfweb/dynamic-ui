<template>
  <div class="card mb-3" :class="meta.attributes.class" style="max-width: 20rem;">
    <div class="card-header">{{meta.attributes.title}}</div>
    <div class="card-body">
      <draggable animation="200" class="stage" v-model="meta.childes" item-key="id" v-bind="{
        group: {
          name: 'widget',
        },
        ghostClass: 'sortable__ghost',
        handle: '.editable_handle',
      }">
        <template #item="{ element, index }">
          <dynamic-component :meta="element" />
        </template>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts">
  import draggable from "vuedraggable";
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LiquidCard',
    components: {
      draggable
    },
    props: {
      meta: null
    },
    setup(props, context) {

    }
  });
</script>