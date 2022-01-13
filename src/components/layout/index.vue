<template>
  <el-container>
    <el-header class="index-header">
      <div class="logo">OnePiece</div>
      <div class="user-group">
        <img
          src="../../assets/images/header.jpeg"
          alt=""
          class="header-img"
        /><span class="user-name">{{ username }}</span
        ><i class="el-icon-arrow-down"></i>
        <div class="user-setting-menu">
          <ul class="menu-list">
            <li class="menu-item" @click="logout">
              <i class="el-icon-delete"></i
              ><span class="btn-txt">{{ $t('headerMenu.logout') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </el-header>
    <el-container class="body">
      <el-aside></el-aside>
      <el-main></el-main>
      <el-footer>网页模板</el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      username: ''
    };
  },

  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      console.log(this.$store.state);
      this.username = this.$store.state.username;
      console.log(this);
    }
  }
});
</script>

<style scoped lang="less">
.index-header {
  display: flex;
  align-items: center;
  .logo {
    flex: 1;
    color: #333;
    font-size: 20px;
  }
  .user-group {
    position: relative;
    cursor: pointer;
    .header-img,
    .user-name,
    .el-icon-arrow-down {
      vertical-align: middle;
    }
    &:hover {
      color: rgb(71, 114, 217);
    }
  }
  .header-img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
  .user-name {
    margin: 0 10px;
    font-size: 18px;
  }
  .user-setting-menu {
    position: absolute;
  }
}
</style>
