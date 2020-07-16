<template>
  <div>
    <!-- 用户个人信息显示  -->
    <v-card>
      <v-card-title>
        <v-icon large left>mdi-twitter</v-icon>
        <span class="title font-weight-light">个人信息</span>
      </v-card-title>
      <v-card-text class="headline font-weight-bold">
        <v-text-field
          label="账号"
          :rules="rules"
          hide-details="auto"
          disabled=""
          v-model="data.myInfo.user.number"
        ></v-text-field>
        <v-text-field
          label="角色"
          :rules="rules"
          hide-details="auto"
          disabled=""
          v-model="data.myInfo.user.role"
        ></v-text-field>
        <v-text-field
          label="姓名"
          required
          v-model="data.myInfo.user.name"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed small color="primary" @click="updateInfo"
          >修改个人信息</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  created() {
    this.getStudentInfo();
  },
  data: () => ({
    msg: null,
    data: {
      myInfo: {
        user: {
          name: null,
          number: 0,
          insertTime: null
        }
      }
    },
    rules: [
      value => !!value || "不能为空."
      // value => (value && value.length > 16) || "学号不能超过四个字符"
    ]
  }),
  methods: {
    formatDate(date) {
      return date.replace("T", " ");
    },
    // 获取用户信息
    async getStudentInfo() {
      let resp = await axios.get("/students/myInfo");
      if (resp != null) {
        console.log(resp.data);
        this.data.myInfo.user = resp.data.data.myInfo.user;
        console.log(this.data);
      } else {
        console.log("响应为空");
      }
    },
    //修改用户信息
    async updateStudentInfo(student) {
      let resp = await axios.patch("/students/myInfo", student);
      if (resp != null) {
        console.log("resp");
      } else {
        console.log("响应为空");
      }
    },
    updateInfo() {
      console.log("click updateInfo");
      console.log(this.data.myInfo);
      this.updateStudentInfo(this.data.myInfo);
    }
  }
};
</script>
