<template>
  <!-- <v-app> -->
  <div>
    <router-view id="firstRouter" />
    <!-- </v-app> -->
    <!-- 异常捕获 -->
    <Exception />
  </div>
</template>

<script>
export default {
  name: "App",

  components: {
    Exception: () => import("@/components/Exception.vue")
  },

  data: () => ({
    //
  })
};
</script>
