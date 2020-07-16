<template>
  <v-app>
    <!-- appbar -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">在线考试系统-学生端</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn> -->
      <v-btn class="ma-2" outlined @click="logOutAndClearStorage">登出</v-btn>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img
        ></v-avatar>
      </v-btn>
    </v-app-bar>
    <!-- 主体内容 -->
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col sm="6" md="2"><sidebar id="sidebar"/></v-col>
          <v-col sm="6" md="10">
            <router-view id="router" :key="$route.path" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import sidebar from "../Student/studentSidebar";
export default {
  props: {
    source: String
  },
  components: {
    sidebar
  },
  methods: {
    logOutAndClearStorage() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
