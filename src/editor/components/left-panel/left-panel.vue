<template>
  <el-tabs v-model="activeName" tab-position="left" type="border-card" :style="{height:'100%'}">
    <el-tab-pane v-for="(tab,i) in tabs" :name="tab.name" :label="tab.label" lazy style="height: 100%;">
      <template #label>
        <div class="tab-item">
          <el-icon :title="tab.label"><component :is="tab.icon" /></el-icon>
        </div>
      </template>
      <el-input v-model="searchKey" :prefix-icon="Search" size="small" />
      <el-divider style="margin: 6px 0;" />
      <el-scrollbar>
        <draggable
          class="dragArea list-group"
          v-bind="{ group: { name: 'widget', pull: 'clone', put: false }, sort: false, ...dragOptions }"
          :clone="cloneElement"
          :list="filterElements(searchKey)"
          :item-key="itemKey"
          @start="isDrag = true"
          @end="isDrag = false"
        >
          <template #item="item">
            <div :class="styles.element">
              <component :is="item.element.attributes.icon"></component>
              <span> {{item.element.display}} </span>
            </div>
          </template>
        </draggable>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
  import styles from './index.module.scss'

  import draggable from 'vuedraggable';
  import { cloneDeep } from 'lodash-es';

  import * as icons from '@icon-park/vue-next';
  import { nanoid, customAlphabet } from 'nanoid';
  import { Search } from '@element-plus/icons-vue'
  import { getPlugins } from '@/components/component.config';
  import { useSchemaStore } from '@/store/modules/schemaStore';
  import { defineComponent, reactive, toRefs, watch, computed, ref, markRaw } from 'vue';
  export default defineComponent({
    components: { draggable, ...icons },
    props:{
      drag: {
        type: Boolean,
        default: false
      },
      itemKey: {
        type: String,
        default: 'id'
      },
      group: {
        type: Object,
        default: () => ({ name: 'components' })
      }
    },
    methods:{
      generateKey(){
        return customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz_$', 6)()
      },
      cloneElement(v){
        const res = cloneDeep(v)
        res.id = nanoid()
        if(res.dataBinder) res.dataBinder.name = `${res.key}_${this.generateKey()}`
        return res
      }
    },
    async setup(props, context) {
      const searchKey = ref('');
      const schemaStore = useSchemaStore();
      const plugins = await getPlugins(schemaStore.Mode);
      
      const tabs = Object.keys(plugins).map((name) => {
        const { label, icon, order, metas} = plugins[name];
        const elements = Object.keys(metas).map(x=> markRaw(metas[x]) );
        return { label, name, icon , order, elements};
      }).sort((a, b) => a.order - b.order);

      const dragOptions = computed(() => ({
        animation: 200,
        disabled: false,
        scroll: true,
        ghostClass: 'ghost'
      }));
      
      const state = reactive({
        activeName: tabs[0].name,
        elements: tabs[0].elements,
        isDrag: false,
      });

      const filterElements = (key)=>{
        if(key && key.length > 0){
          return state.elements.filter(x=>x.display.includes(key) || x.key.toLowerCase().includes(key));
        };
        return state.elements;
      };

      watch(()=> state.activeName, (v)=>{
        state.elements = tabs.find(x=>x.name == v)?.elements || []
      });

      return {
        ...toRefs(state),
        tabs,
        styles,
        searchKey,
        dragOptions,
        filterElements,
        Search,
      }
    }
  })
</script>