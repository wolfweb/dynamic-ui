<template>
  <el-tabs v-model="activeName" tab-position="left" type="border-card" :style="{height:'100%'}">
    <el-tab-pane v-for="(tab,i) in tabs" :name="tab.name" :label="tab.label" lazy>
      <template #label>
        <div class="tab-item">
          <i :class="tab.icon"></i>
          {{ tab.label }}
        </div>
      </template>
      <draggable
        class="dragArea list-group"
        v-bind="{ group: { name: 'widget', pull: 'clone', put: false }, sort: false, ...dragOptions }"
        :clone="cloneWidget"
        :list="widgets"
        :item-key="itemKey"
        @start="isDrag = true"
        @end="isDrag = false"
      >
        <template #item="item">
          <div :class="styles.widget">
            <i :class="`${item.element.attributes.icon}`"></i>
            <span> {{item.element.display}} </span>
          </div>
        </template>
      </draggable>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
  import styles from './index.module.scss'

  import draggable from 'vuedraggable';
  import { cloneDeep } from 'lodash-es';
  import { nanoid, customAlphabet } from 'nanoid';
  import { getWidgets } from '@/components/component.config';
  import { useSchemaStore } from '@/store/modules/schemaStore';
  import { defineComponent, reactive, toRefs, watch, computed } from 'vue';
  export default defineComponent({
    components: { draggable },
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
    setup(props, context) {
      var schemaStore = useSchemaStore();
      const plugins = getWidgets(schemaStore.Mode);
      const tabs = Object.keys(plugins)
      .map((name) => {
        const { label, icon, order, metas} = plugins[name]
        const widgets = Object.keys(metas).map(x=>metas[x])
        return { label, name, icon , order, widgets}
      })
      .sort((a, b) => a.order - b.order)

      const dragOptions = computed(() => ({
        animation: 200,
        disabled: false,
        scroll: true,
        ghostClass: 'ghost'
      }))
      
      const state = reactive({
        activeName: tabs[0].name,
        widgets: tabs[0].widgets,
        isDrag: false,
      })

      watch(()=> state.activeName, (v)=>{
        state.widgets = tabs.find(x=>x.name == v)?.widgets || []
      })      

      return {
        ...toRefs(state),
        dragOptions,
        tabs,
        styles
      }
    }
  })
</script>