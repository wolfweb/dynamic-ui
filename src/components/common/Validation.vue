<template>
  <el-row v-for="(item,index) in element.validation">
    <el-form-item v-if="item.provider !=='Required'">
      <el-tag closable @close="validationRemove(item)"> 
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
  import validators from '@/utils/validators';
  import { useEditModel } from '@/models/schema';
  import { filter, some, isEqual } from 'lodash-es';
  import { defineComponent, watch, reactive, computed } from 'vue';
  export default defineComponent({
    name: "Validation",
    setup(props, context) {
      const { currentElement, addValidation, removeValidation } = useEditModel();

      const validatorRules = reactive(validators.filter(x=>x.serverType!=='Required').map(x=>{
        // @ts-ignore
        let valid = some(currentElement.value.validation, m=>x.serverType === m.provider);
        return {
          // @ts-ignore
          reused: x.reused || false,
          display: x.display,
          disabled: valid,
          serverType: x.serverType,
        }
      }));

      const handleCommand = (command) => {
        let rule = validators.find(x=>x.serverType===command);
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

      const validationRemove = (rule) => {
        removeValidation(validation=> {
          let res = validation.provider === rule.provider;
          if(validation.args){
            res = res && isEqual(validation.args, rule.args);
          }

          return res;
        });
      }

      const element = computed(()=> {
        // @ts-ignore
        return currentElement as IFormElementMetadata;
      }).value;

      watch(
        // @ts-ignore
        () => currentElement.value.validation, 
        (newValue) => {
          if (newValue) {
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
        element,
        getValidator,
        handleCommand,
        validatorRules,
        validationRemove,
      }
    }
  })
</script>