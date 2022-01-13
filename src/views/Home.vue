<template>
  <div class="home">
    <div class="menu">
      <el-menu
        class="menu-navs"
        background-color="#1f2d3d"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        :router="true"
      >
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">数据管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/users">用户列表</el-menu-item>
            <el-menu-item index="/shops">商家列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item>
          <i class="el-icon-plus"></i><span slot="title">添加数据</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-star-on"></i><span slot="title">图表</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-edit"></i><span slot="title">编辑</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <div class="con-header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item,index) in crumbData" :key="item.path">
            <span v-if="index == crumbData.length-1">{{item.meta.title}}</span>
            <a v-else :href="item.path">{{item.meta.title}}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header-pic">
          <el-dropdown @command="handleDrop">
            <el-avatar
              el-dropdown-link
              :size="50"
              :src="circleUrl"
              class="user-header"
            >
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="goHome" command="home"
                >首页</el-dropdown-item
              >
              <el-dropdown-item @click="logout" command="login"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="con-body">
              <router-view />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserService from '@/controls/UserService';
export default Vue.extend({
  name: 'Home',
  data() {
    return {
      crumbData: <any>[],
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    };
  },
  components: {},
  watch: {
    $route() {
      console.log(this.$route);
      this.getBreadcrumb();

    }
  },
  async created() {
    this.getBreadcrumb();

  },
  methods: {
    getBreadcrumb(){
      this.crumbData=this.$route.matched;
      console.log(this)
    },
    handleDrop(command) {
      switch (command) {
        case 'home':
          this.goHome();
          break;
        case 'login':
          this.logout();
          break;
      }
    },
    logout() {
      UserService.logout();
      this.$router.push({
        path: '/login'
      });
    },
    goHome() {
      this.$router.push({
        path: '/'
      });
    }
  }
});
</script>

<style lang="less" scoped>
.home {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .menu {
    width: 200px;
    .el-menu-item:hover {
      background-color: #48576a !important;
    }
  }
  .content {
    flex: 1;

    .con-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding-right: 40px;
      padding-left: 20px;
      background-color: #eff2f7;
      .header-pic {
        position: relative;
        .logout-box {
          position: absolute;
          top: 100%;
          left: 0;
          .logout-item {
            padding: 0 10px;
            line-height: 36px;
            white-space: nowrap;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }

    .con-body{
      padding:20px;
    }
  }
}
</style>
