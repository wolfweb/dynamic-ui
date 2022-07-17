<template>
  <el-row v-for="(item,index) in widget.validation">
    <el-form-item v-if="item.provider !=='Required'">
      <el-tag closable @close="tagRemove(item)"> 
        {{getValidator(item.provider).display}}
      </el-tag>      
    </el-form-item>
  </el-row>
  <el-row>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        添加规则<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="validation in validatorRules" :command="validation.serverType" :disabled="validation.disabled">{{validation.display}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-row>
</template>
<script lang="ts">
  import { filter, some } from 'lodash-es';
  import validators from '@/utils/validators';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, watch, reactive } from 'vue';
  export default defineComponent({
    name: "Validation",
    computed: {
      widget() {
        return this.currentWidget as IFormElementMetadata;
      }
    },
    setup(props, context) {
      const { currentWidget, addValidation, removeValidation } = useEditModel();

      const validatorRules = reactive(validators.filter(x=>x.serverType!=='Required').map(x=>{
        // @ts-ignore
        let valid = some(currentWidget.value.validation, m=>x.serverType === m.provider);
        return {
          // @ts-ignore
          reused: x.reused || false,
          display: x.display,
          disabled: valid,
          serverType: x.serverType,
        }
      }));

      const handleCommand = (command) => {
        var rule = validators.find(x=>x.serverType===command);
        if(rule){
          // @ts-ignore
          if(rule.render){
            // @ts-ignore
            rule.render(reactive(rule), invalidate=>{
              addValidation(invalidate.serverRule());
            });
          }else{
            // @ts-ignore
            addValidation(rule.serverRule());
          }
        }
      }
 
      const getValidator = (provider) => {
        return filter(validators, x=>x.serverType===provider)[0];
      }

      const tagRemove = (rule) => {
        removeValidation(rule.provider);
      }

      watch(
        // @ts-ignore
        () => currentWidget.value.validation, 
        (newValue) => {
          if (newValue && newValue.length > 0) {
            validatorRules.forEach(x=>{
              const rule = newValue.find(m=>m.provider===x.serverType);
              if( rule && !x.reused) {
                x.disabled = true;
              }else{
                x.disabled = false;
              }
            });
          }
      },{ deep: true });

      return {
        tagRemove,
        getValidator,
        currentWidget,
        handleCommand,
        validatorRules
      }
    }
  })
</script>