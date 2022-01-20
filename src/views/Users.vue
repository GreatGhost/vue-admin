<template>
  <div class="users">
    <template>
      <el-table :data="result.data" style="width: 100%" stripe>
        <el-table-column prop="id" label="序号" width="180"> </el-table-column>

        <el-table-column prop="date" label="注册日期"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="result.total"
      >
      </el-pagination>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getUsers } from "@/http/model/user";

export default Vue.extend({
  data() {
    return {
      result: {},
      page: 1,
      pagesize: 10
    };
  },
  computed: {
    currentPage(): number {
      return this.page - 1;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const result = await getUsers(this.page, this.pagesize);
      this.page++;
      result.data = result.data.map((item, index) => {
        return {
          id: index + 1,
          username: item.user_name,
          date: "2020年11月3号 11:30:35",
          address: "深圳"
        };
      });
      this.result = result;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    }
  }
});
</script>
