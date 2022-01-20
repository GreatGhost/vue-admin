<template>
  <div class="login">
    <!-- 注释内容 -->

    <img
      class="bg-img"
      src="https://img.js.design/assets/Resources/background/login-bg-5.jpg"
    />
    <div class="login-box">
      <el-form
        class="login-form"
        label-position="left"
        ref="form"
        :model="form"
        label-width="60px"
        :rules="rules"
      >
        <h1>用户登录</h1>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <p class="a-link">
          <router-link to="/resetPwd">忘记密码</router-link>
          <router-link to="/register">用户注册</router-link>
        </p>
        <el-button
          class="login-btn"
          type="primary"
          @click="onSubmit"
          :loading="isLoginLoading"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import qs from "qs";
import { Form } from "element-ui";
import store from "@/store/index";
import UserService from "@/controls/UserService";
export default Vue.extend({
  name: "LoginIndex",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      address: "",
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 6, message: "6位字符", trigger: "blur" }
        ]
      },
      isLoginLoading: false
    };
  },
  methods: {
    async onSubmit() {
      try {
        // 1. 表单验证
        await (this.$refs.form as Form).validate(); // 若不传入回调函数，则返回一个promise
        // 2. 验证通过 -> 提交表单
        this.isLoginLoading = true;
        UserService.login(this.form).then((res) => {
          this.$router.push({
            path: "/"
          });
        });
      } catch (error) {
        console.log("登录失败", error);
      }
      this.isLoginLoading = false;
    }
  }
});
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0px;
  height: 100vh;

  .bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }

  .login-box {
    h1 {
      font-size: 30px;
      line-height: 32px;
      text-align: center;
    }
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    box-sizing: border-box;
    width: 478px;
    padding: 46px;
    background-color: #fff;
    border-radius: 22px;
    transform: translate(-50%, -50%);
  }

  .login-btn {
    width: 100%;
    margin-top: 30px;
  }
  .a-link {
    text-align: right;
    a + a {
      margin-left: 5px;
    }
  }
}
</style>
