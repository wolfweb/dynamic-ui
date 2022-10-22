<template>  
  <div :class="containerStyle()">
    <div :class="[styles.floatingActionBtn]" @click="()=>isOpen = !isOpen">
      <el-icon>
        <DArrowLeft v-if="isOpen" />
        <DArrowRight v-else />
      </el-icon>
    </div>
    <div :class="[styles.attrs]">
      <el-tabs v-model="activeName" type="border-card" :class="[styles.tabs]" stretch>
        <el-tab-pane v-for="(setting,i) in settings" :label="getElementSettingName(setting['name'])" :name="setting['name']">
          <keep-alive>
            <component :is="setting['name']" />
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="tsx">
  import { isEmpty } from "lodash-es";
  import styles from './index.module.scss';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, reactive, toRefs, watch } from 'vue';
  import { findElementSettings, getElementSettingName } from '@/components/component.config';

  export default defineComponent({
    name: "RightPanel",
    setup(props, context) {
      const { currentElement, editerModel } = useEditModel();

      const state = reactive({
        activeName: '',
        element: null,
        isOpen: false,
        settings: []
      })

      const containerStyle  = () => [styles.drawer, { [styles.isOpen]: state.isOpen }];
      watch(
        ()=> currentElement.value,
        (v)=>{
          if(v && v && !isEmpty(v)){
            if(state.element && v.id == state.element.id) return;

            state.isOpen = true;
            state.element = v;
            state.settings = findElementSettings(v);
            state.activeName = state.settings[0]['name'];
          }else{
            state.isOpen = false;
            state.settings = [];
            state.element = null;
            state.activeName = '';
          }
        }
      );

      // editerModel.emitter.on('onElementSelected', v=> {
                  
      // });

      return { 
        ...toRefs(state),
        getElementSettingName,
        containerStyle,
        styles,
      }
    }
  })
</script>