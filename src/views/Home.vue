<template>
  <div class="home">首页</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getUsers } from '@/http/model/user';
export default Vue.extend({
  name: 'Home',
  components: {},
  async created() {
    const list = await getUsers();
    console.log(list);
  }
});
</script>
