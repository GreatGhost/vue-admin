<template>
  <div class="register">
    <div class="register-group">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="register-form"
        label-position="left"
        label-width="80px"
      >
        <h3 class="title">注册</h3>
        <el-form-item class="register-input-item" label="账号" prop="username">
          <el-input placeholder="请输入账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item class="register-input-item" label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="btn"
          @click="onSubmit"
          :loading="isLoginLoading"
          >确定</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Form } from "element-ui";
import dayjs from "dayjs";
import UserService from "@/controls/UserService";
export default Vue.extend({
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
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
        await (this.$refs.ruleForm as Form).validate(); // 若不传入回调函数，则返回一个promise
        this.isLoginLoading = true;
        let params = Object.assign(this.form, {
          date: dayjs().format("yyyy-mm-dd hh:mm:ss")
        });
        UserService.register(params).then((res) => {
          this.$router.push("/");
        });
      } catch (err) {
        console.log(err);
      }
      this.isLoginLoading = false;
    }
  }
});
</script>

<style scoped lang="less">
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url("https://img.js.design/assets/Resources/background/login-bg-5.jpg")
    no-repeat;
  background-size: cover;
  .register-group {
    width: 380px;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    .title {
      margin: 0 auto 20px;
      font-size: 30px;
      line-height: 1;
      text-align: center;
    }
    .btn {
      display: block;
      width: 100%;
      margin-top: 24px;
    }
  }
}
</style>
