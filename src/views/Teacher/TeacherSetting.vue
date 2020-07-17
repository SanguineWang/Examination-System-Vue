<template>
  <div class="setting">
    <v-row align="center" class="mx-auto" justify="center">
      <v-toolbar-title><h3>修改密码</h3> </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-row>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="oldpw"
            :rules="oldpwRules"
            type="password"
            label="旧密码"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="newpw"
            :rules="newpwRules"
            type="password"
            label="新密码"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="mx-auto">
          <v-btn class="mx-auto" :disabled="!valid" @click="updatepw" outlined>
            <v-icon>cached</v-icon>更新
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  name: "setting",
  data() {
    return {
      valid: false,
      oldpw: "",
      newpw: "",
      oldpwRules: [v => v != "" || "不能为空"],
      newpwRules: [v => v != "" || "不能为空"]
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    updatepw() {
      this.uppw().then(() => {
        this.$router.push("/");
      });
    },
    async uppw() {
      await axios.patch("teacher/updatePassword", [this.oldpw, this.newpw]);
    }
  }
};
</script>
<style scoped></style>
