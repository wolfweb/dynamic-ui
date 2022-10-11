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
          :clone="cloneWidget"
          :list="filterWidgets(searchKey)"
          :item-key="itemKey"
          @start="isDrag = true"
          @end="isDrag = false"
        >
          <template #item="item">
            <div :class="styles.widget">
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
      cloneWidget(v){
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
        const widgets = Object.keys(metas).map(x=> markRaw(metas[x]) );
        return { label, name, icon , order, widgets};
      }).sort((a, b) => a.order - b.order);

      const dragOptions = computed(() => ({
        animation: 200,
        disabled: false,
        scroll: true,
        ghostClass: 'ghost'
      }));
      
      const state = reactive({
        activeName: tabs[0].name,
        widgets: tabs[0].widgets,
        isDrag: false,
      });

      const filterWidgets = (key)=>{
        if(key && key.length > 0){
          return state.widgets.filter(x=>x.display.includes(key) || x.key.toLowerCase().includes(key));
        };
        return state.widgets;
      };

      watch(()=> state.activeName, (v)=>{
        state.widgets = tabs.find(x=>x.name == v)?.widgets || []
      });

      return {
        ...toRefs(state),
        tabs,
        styles,
        searchKey,
        dragOptions,
        filterWidgets,
        Search,
      }
    }
  })
</script>