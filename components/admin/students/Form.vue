<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm pt-10">
        <el-form-item label="Name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item> 
        <el-form-item>
            <el-select v-model="ruleForm.classID" placeholder="Class">
                <el-option
                    v-for="item in dataClass"
                    :key="item.ID"
                    :label="item.name"
                    :value="item.ID">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
  import cloneDeep from 'lodash/cloneDeep';

  const modelForm = {
    name: '',
    classID: ''
  };
  export default {
    props: {
      dataClass: {
          type: Array,Object,
          require: true,
      },
      dataStudent: {
          type: Array,
          require: true,
      },
    },
    data() {
      const ruleForm = this.dataStudent ? cloneDeep(this.dataStudent) : cloneDeep(modelForm);
      return {
        ruleForm,
        rules: {
          name: [
            { required: true, message: 'Không được để trống!', trigger: 'blur' },
            { min: 3, max: 50, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          class: [
            { required: true, message: 'Không được để trống!', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$emit('submitForm', this.ruleForm);
            } else {
                console.log('error submit!!');
                return false;
            }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>