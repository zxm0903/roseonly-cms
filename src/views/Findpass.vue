<template>
  <div class="findpass">
    <div id="findpass">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机验证码" prop="verify" id="verify">
          <el-input type="text" v-model="ruleForm.verify" autocomplete="off"></el-input>
          <el-button @click="getMobileVerify" id="hBtn">获取验证码</el-button>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="submitForm('ruleForm') " class="btn">提交</el-button>
          <el-button @click="resetForm('ruleForm')" class="btn">重置</el-button>
        </el-form-item>
      </el-form>
   
</template>

<script>
export default {
  data() {
    var mobileVerify = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        if (value != 1234) {
          alert("验证码输入有误");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
        verify: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        verify: [{ validator: mobileVerify, trigger: "blur" }]
      },
      state: {
        open: 1
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.$refs[formName].validate);
      this.$refs[formName].validate(valid => {
        if (valid) {
         open3()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getMobileVerify() {
      console.log(this.ruleForm.pass);
      console.log("获取手机验证码");
    }
    
  }
};
</Script>

<style>
.findpass {
  height: 600px;
  width: 100%;
  background: antiquewhite;
  position: relative;
}
#findpass {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 350px;
  border: 2px solid rgba(95, 29, 29, 0.719);
  background: rgba(159, 41, 41, 0.596);
  padding: 25px;
}
#verify {
  position: relative;
}
#hBtn {
  color: aliceblue;
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid rgba(95, 29, 29, 0.719);
  border-radius: 0;
  background: rgba(80, 11, 11, 0.719);
}
#hBtn:hover {
  background-color: rgb(220, 227, 233);
  color: rgb(98, 98, 199);
}
.btn {
  color: aliceblue;
  border: 1px solid rgba(95, 29, 29, 0.719);
  border-radius: 0;
  background: rgba(80, 11, 11, 0.719);
}
</style>
