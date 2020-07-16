<template>
  <div>
    <h1>考试详情{{ eid }}</h1>
    <router-link></router-link>
    <!-- <div v-if="homework">
    <h1>{{ homework.name }}</h1>
    <p>{{ homework.dealline }}</p>
  </div> -->
  </div>
</template>
<script>
// import { GET_HOMEWORK } from "@/store/types.js";
// import { mapState } from "vuex";
export default {
  props: ["eid"]
  //   created() {
  //     this.$store.dispatch(GET_HOMEWORK, { hid: this.hid });
  //   },
  //   computed: {
  //     ...mapState(["homework"])
  //   }
};
</script>
