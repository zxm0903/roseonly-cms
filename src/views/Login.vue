<template>
  <div class="login">
    <div class="login">
      <div class="login_input">
        <div class="login_input_size">
          <!-- 手机号码 -->
          <div class="login_input_tel">
            <input
              type="text"
              placeholder="请输入手机号码"
              name="username"
              id="username"
              v-model="username"
            >
            <div class="login_input_tel_86">+86</div>
          </div>
          <div class="warn_text" style="text-align:center"></div>
          <!-- <TestCode></TestCode> -->
          <!-- 密码 -->
          <div class="login_input_password">
            <input
              type="password"
              placeholder="请输入密码"
              name="userpass"
              id="userpass"
              v-model="userpass"
            >
          </div>
          <div class="register_findpassword">
            <span class="find_possword">
              <a href="/findPass">忘记密码</a>
            </span>
          </div>
          <div class="loginBtn">
            <input type="button" value="登录" id="loginBtn" @click="login">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import TestCode from "@/components/TestCode";
export default {
  name: "login",

  data() {
    return {
      username: "",
      userpass: ""
    }
  },
  methods: {
    login() {
      var that = this;
      this.axios
        .post("/login", {
          username: that.username,
          userpass: that.userpass
        })
        .then(res => {
          if (res.data.state == 200) {
            // 保存登录状态
            localStorage.setItem("token", res.data.token);
            // 使用 this.$router 对象
            this.$router.push("/home")
          } else {
            // 模态框
            alert("账号或者密码错误")
          }
        })
        .catch(err => {
          console.log(err)
          alert("登录失败")
        });
    }
  }
};
</script>

<style  scoped>
/* 登录框 */
.login {
  background-color: antiquewhite;
  width: 100%;
  height: 800px;
  position: relative;
}

.login_input {
  height: 355px;
  width: 300px;
  border: 2px solid rgba(100, 15, 15, 0.808);
  position: absolute;
  right: 100px;
  top: 20px;
  background: rgba(159, 41, 41, 0.596);
}
/* 内框间隔 */
.login_input_size {
  padding: 25px;
}
/* 地址选择框 */
.selectpicker {
  width: 100%;
  height: 50px;
}
/* 手机号码框 */
.login_input_tel {
  width: 100%;
  display: table;
  position: relative;
  margin: 20px 0 0 0;
  height: 50px;
}
.warn_text {
  height: 20px;
}
.login_input_tel_86 {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  line-height: 50px;
  text-align: center;
  border-right: 1px solid rgb(133, 125, 125);
}
#username {
  text-indent: 50px;
  width: 100%;
  height: 100%;
}
/* 密码框 */
.login_input_password {
  width: 100%;
  height: 50px;
}
#userpass {
  text-indent: 10px;
  width: 100%;
  height: 100%;
}
/*  */
/* 登录 */
.loginBtn {
  width: 100%;
  height: 50px;
}
#loginBtn {
  text-indent: 10px;
  width: 100%;
  height: 100%;
  color: rgb(243, 241, 241);
  background-color: rgba(80, 11, 11, 0.719);
  border: none;
}
/* 快速注册忘记密码 */
.register_findpassword {
  margin: 10px 0;

  font-size: 16px;
}
.register_findpassword a {
  color: rgb(232, 241, 241);
}
.find_possword {
  margin-left: 100px;
  font-size: 16px;
}
.find_possword a {
  color: rgb(232, 241, 241);
}
/* 提示语 */
.verifyText {
  color: red;
  font-size: 12px;
}

</style>