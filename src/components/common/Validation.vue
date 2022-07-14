<template>
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
</template>
<script lang="ts">
  import { filter, some } from 'lodash-es';
  import validators from '@/utils/validators';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, watch, reactive } from 'vue';
  export default defineComponent({
    name: "Validation",
    setup(props, context) {
      const { currentWidget, addValidation } = useEditModel();

      const validatorRules = reactive(validators.map(x=>{
        let valid = some(currentWidget.value.validation, m=>x.serverType === m.provider);
        return {
          display: x.display,
          disabled: valid,
          serverType: x.serverType,
        }
      }));

      const handleCommand = (command) => {
        var rule = validators.find(x=>x.serverType===command);
        if(rule){
          if(rule.render){
            rule.render(reactive(rule), invalidate=>{
              addValidation(invalidate.serverRule());
            });
          }else{
            addValidation(rule.serverRule());
          }
        }
      }

      watch(
        () => currentWidget.value.validation, 
        (newValue, oldValue) => {
          if (newValue && newValue.length > 0) {
            newValue.forEach(x=>{
              const rule = validatorRules.find(y=>y.serverType === x.provider);
              if (rule) {
                rule.disabled = true;
              }
            });
          }
      },{ deep: true });

      return {
        handleCommand,
        validatorRules
      }
    }
  })
</script>