<template>
  <div>
    <sign-in
      v-if="signInMode"
      :changeMode="changeMode"
    />
    <sign-up
      v-else
      :changeMode="changeMode"
    />
  </div>
</template>

<script>
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';

export default {
  components: {
    SignIn,
    SignUp,
  },
  data() {
    return {
      signInMode: true,
    };
  },
  methods: {
    changeMode() {
      this.signInMode = !this.signInMode;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ant-form-item-label > label::after {
  content: '';
}
</style>
