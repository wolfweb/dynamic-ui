<template>
  <el-form ref="form" :model="element!" label-width="20%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="标签" prop="attributes.label">
          <el-input v-model="element!.attributes.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="字段名" prop="dataBinder.name">
          <el-input v-model="element!.dataBinder!.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="类型" prop="attributes.type">
          <el-select v-model="element!.attributes.type" placeholder="请选择" style="width: 100%;" @change="typeChangeHandle">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="element!.attributes.type!='hidden'">
      <el-col :span="24">
        <el-form-item label="占位文本" prop="attributes.placeholder">
          <el-input v-model="element!.attributes.placeholder"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="element!.attributes.type!='hidden'">
      <el-col :span="24">
        <el-form-item label="是否可清空" prop="attributes.clearable">
          <el-switch v-model="element!.attributes.clearable" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="element!.attributes.type!='hidden'">
      <el-col :span="24">
        <el-form-item label="显示字限" prop="attributes['show-word-limit']">
          <el-switch v-model="element!.attributes['show-word-limit']" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="element!.attributes.type=='password'">
      <el-col :span="24">
        <el-form-item label="显示密码" prop="attributes['show-password']">
          <el-switch v-model="element!.attributes['show-password']" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="element!.attributes.type!='hidden'">
      <el-col :span="24">
        <el-form-item label="最大长度" prop="attributes.maxlength">
          <el-input-number style="width: 100%;" v-model="element!.attributes.maxlength" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="element!.attributes.type!='hidden'">
      <el-col :span="24">
        <el-form-item label="最小长度" prop="attributes.minlength">
          <el-input-number style="width: 100%;" v-model="element!.attributes.minlength" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="element!.attributes.type!='hidden'">
      <el-col :span="24">
        <el-form-item label="前置图标" prop="attributes['prefix-icon']">
          <el-select v-model="element!.attributes['prefix-icon']" filterable placeholder="请选择" style="width: 100%;">
            <el-option key="" value="">无</el-option>
            <el-option v-for="item in ElIcons" :value="item.name">
              <span>
                <el-icon>
                  <component :is="item.name" style="color: gainsboro;" />
                </el-icon>
                {{item.name}}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="element!.attributes.type!='hidden'">
      <el-col :span="24">
        <el-form-item label="后置图标" prop="attributes['suffix-icon']">
          <el-select v-model="element!.attributes['suffix-icon']" filterable placeholder="请选择" style="width: 100%;">
            <el-option key="" value="">无</el-option>
            <el-option v-for="item in ElIcons" :value="item.name">
              <span>
                <el-icon>
                  <component :is="item.name" />
                </el-icon>
                {{item.name}}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider>验证</el-divider>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="是否必填" prop="attributes.required">
          <el-switch v-model="element!.attributes.required" @change="requireChangeHandler" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <validation />
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { ElIcons } from '@/models/common';
  import { useEditModel } from '@/models/schema';
  import { defineComponent } from 'vue';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "InputAttr",
    components:{
      Validation
    },
    methods:{
      typeChangeHandle(v){
        if(v != 'password'){
          this.element.attributes['show-password'] = false;
          this.element.attributes['show-word-limit'] = false;
        }
      }
    },
    setup(props, context) {
      const { currentElement, requireChangeHandler } = useEditModel();

      const typeList = [
        { value: "text"    , label: "文字"   },
        { value: "email"   , label: "邮箱"   },
        { value: "password", label: "密码"   },
        { value: "color"   , label: "颜色"   },
        { value: "url"     , label: "URL"    },
        { value: "number"  , label: "数字"   },
        { value: "hidden"  , label: "隐藏域" },
      ];

      const element = currentElement.value as IFormElementMetadata;;

      return {
        element,
        ElIcons,
        typeList,
        requireChangeHandler
      }
    }
  })
</script>