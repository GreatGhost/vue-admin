<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  created() {
    this.$logger('测试环境');
  }
});
</script>
<style lang="less">
@import url('style/base.less');
.body {
  width: 20px;
  height: 30px;
  background: blue;
}
</style>
