<template>
  <div></div>
</template>
<script>
import { mapState } from "vuex";
export default {
  watch: {
    exp() {
      alert(`${this.exp.message}`);
    }
  },
  computed: {
    ...mapState({ exp: state => state.exception })
  }
};
</script>
