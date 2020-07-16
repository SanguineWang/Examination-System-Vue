<template>
  <div class="teacherInfo">
    <v-form v-model="valid">
      <v-container>
        <v-row align="center" class="mx-auto" justify="center">
          <v-toolbar-title><h3>个人信息</h3> </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="myInfo.user.number"
              label="账号"
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="myInfo.user.role"
              label="角色"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="myInfo.user.name"
              :rules="nameRules"
              :counter="16"
              label="姓名"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              class="ma-2"
              outlined
              @click="updateMyInfo()"
              :disabled="!valid"
            >
              <v-icon left dark>replay</v-icon>
              更新
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  name: "teacherInfo",
  data() {
    return {
      valid: false,
      nameRules: [
        v => v.length <= 16 || "Name must be less than 16 characters",
        v => v != "" || "不能为空"
      ],
      myInfo: {
        user: {
          name: ""
        }
      }
    };
  },
  components: {},
  created() {
    this.getMyInfo();
  },
  mounted() {},
  methods: {
    //获取个人信息
    async getMyInfo() {
      let resp = await axios.get("teacher/myInfo");
      this.myInfo = resp.data.data.myInfo;
    },
    //更新个人信息
    async updateMyInfo() {
      let resp = await axios.patch("teacher/myInfo", this.myInfo.user);
      this.myInfo = resp.data.data.myInfo;
    }
  }
};
</script>
<style scoped></style>
