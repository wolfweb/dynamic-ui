<template>
  <div class="edit-main">
    <el-tabs type="card" v-model="activeName" style="min-width: 70%;">
      <el-tab-pane :label="tabView.label" :name="tabView.name" @click.stop="clearCurrentElement" style="height:100%;">
        <el-form label-width="16%" style="height:100%;">
          <draggable
            class="editMainContent"
            v-model="viewSchema"
            v-bind="{ group: 'widget', ...dragOptions }"
            :item-key="itemKey"
            @change="onChange"
          >
            <template #item="{ element }">
              <dynamic-component :meta="element" @onRemove="onRemoveElement" />
            </template>    
          </draggable>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-for="(view, index) in tabView.extendViews" :label="view.label" :name="view.name" lazy>
        <transition name="fade">
          <keep-alive>
            <component :is="view.type" :actived="activeName" :schema="view.schema" />
          </keep-alive>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, reactive, computed, toRefs, ref, watch } from 'vue';
  export default defineComponent({
    name: "EditorMain",
    components: { 
      draggable,
    },
    props:{
      itemKey: {
        type: String,
        default: 'id'
      },
    },
    methods:{
      onChange(e){
        if(e.added){
          this.appendElementToSchema(e.added.element, e.added.newIndex)
        }else if(e.moved){
          this.sortViewSchema(e.moved.element, e.moved.oldIndex, e.moved.newIndex)
        }
        else if(e.removed){
          this.findAndRemoveElement(e.removed.element.id)
        }
      }
    },
    setup(props, context) {
      const state = reactive({
        isDrag: false,
      });

      const { appendElementToSchema, findAndRemoveElement, sortViewSchema, setCurrentElement, viewSchema, editerModel } = useEditModel();
      
      const tabView = reactive({
        label: '',
        name: '',
        extendViews: []
      });
      
      editerModel.emitter.emit("onSchemaLoading", tabView);
      
      const activeName = ref(tabView.name);

      if(tabView.extendViews.length > 0){
        watch(
          ()=> activeName.value,
          (v)=>{
            editerModel.emitter.emit("onOtherCommand", v);
          }
        )
      }

      const dragOptions = computed(() => ({
        animation: 200,
        disabled: false,
        scroll: true,
        ghostClass: 'ghost'
      }))

      const clearCurrentElement = () => {
        setCurrentElement(null);
      }
      
      const onRemoveElement = (v) =>{
        console.log(`remove element=>${v.id}`);
      }

      return {
        ...toRefs(state),
        appendElementToSchema,
        findAndRemoveElement,
        clearCurrentElement,
        onRemoveElement,
        sortViewSchema,
        dragOptions,
        viewSchema,
        activeName,
        tabView
      }
    }
  })
</script>
<style lang="scss" scoped>
  .editMainContent{
    flex: 1;
    height: 100%;
    transform: translate(0);
    box-shadow: 0 8px 12px #ebedf0;

    .ghost {
      background: #c8ebfb;
      opacity: 0.5;
    }

    &_preview {
      
    }
  }

  .fade-enter-active, 
  .fade-leave-active {
    transition: opacity .9s ease;
  }
  .fade-enter-from, 
  .fade-leave-to {
    opacity: 0;
  }
</style>