<template>
  <div class="edit-main">
    <el-tabs type="card" v-model="activeName" style="min-width: 70%;">
      <el-tab-pane label="表单" name="forms" @click.stop="clearCurrentWidget" style="height:100%;">
        <el-form label-width="16%" style="height:100%;">
          <draggable
            class="editMainContent"
            v-model="formSchema"
            v-bind="{ group: 'widget', ...dragOptions }"
            :item-key="itemKey"
            @change="onChange"
          >
            <template #item="{ element }">
              <dynamic-component :meta="element" @onRemove="onRemoveWidget" />
            </template>    
          </draggable>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="详情" name="detail">
        <viewDetail :actived="activeName" :schema="detailSchema" />
      </el-tab-pane>
      <el-tab-pane label="列表" name="list">
        <viewList :actived="activeName" :schema="listSchema" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, reactive, computed, toRefs, ref, watch } from 'vue';
  import { createAsyncComponent } from '@/components/createAsyncComponent';
  export default defineComponent({
    name: "EditorMain",
    components: { 
      draggable,
      viewList: createAsyncComponent(()=> import('./list.vue')),
      viewDetail: createAsyncComponent(()=> import('./detail.vue')),
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
          this.appendFormSchema(e.added.element, e.added.newIndex)
        }else if(e.moved){
          this.sortFormSchema(e.moved.element, e.moved.oldIndex, e.moved.newIndex)
        }
        else if(e.removed){
          this.findAndRemoveWidget(e.removed.element.id)
        }
      }
    },
    setup(props, context) {
      const state = reactive({
        isDrag: false,
      });

      const activeName = ref('forms');

      const { appendFormSchema, findAndRemoveWidget, sortFormSchema, setCurrentWidget, formSchema, detailSchema, listSchema } = useEditModel();

      watch(
        ()=> activeName.value,
        (v)=>{
          if(v === 'detail'){
            setCurrentWidget(detailSchema.value);
          }else if(v === 'list'){
            setCurrentWidget(listSchema.value);
          }else{
            setCurrentWidget(null);
          }
        }
      )

      const dragOptions = computed(() => ({
        animation: 200,
        disabled: false,
        scroll: true,
        ghostClass: 'ghost'
      }))

      const clearCurrentWidget = () => {
        setCurrentWidget(null);
      }
      
      const onRemoveWidget = (v) =>{
        console.log(`remove widget=>${v.id}`);
      }

      return {
        ...toRefs(state),
        findAndRemoveWidget,
        clearCurrentWidget,
        appendFormSchema,
        onRemoveWidget,
        sortFormSchema,
        dragOptions,
        detailSchema,
        listSchema,
        formSchema,
        activeName,
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
</style>