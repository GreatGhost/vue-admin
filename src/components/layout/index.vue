<template>
  <el-container>
    <el-aside width="200px"> </el-aside>
    <el-container>
      <el-header height="40px">我是头部</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
