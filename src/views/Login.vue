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
        label-position="top"
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
      >
        <h1>用户登录</h1>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
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
import Vue from 'vue';
import qs from 'qs';
import { Form } from 'element-ui';
import store from '@/store/index';
export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      address: '',
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 6, message: '6位字符', trigger: 'blur' }
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
        this.$http
          .post(
            '/admin/login',
            qs.stringify(this.form) // axios 默认发送的是application/json格式的数据
          )
          .then((data: any) => {
            if (data.code == 0) {
              store.commit('setToken', data.token);
              this.$router.push('/');
            } else {
              this.$message(data.msg);
            }
          });
      } catch (error) {
        console.log('登录失败', error);
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
  }
}
</style>
