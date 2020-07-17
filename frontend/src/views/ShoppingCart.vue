<template>
  <div
    v-if="getOrder.length"
  >
    <div
      v-for="item in getOrder"
      :key="item._id"
    >
      {{ item._id }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getOrder',
    ]),
  },
};
</script>

<style lang="scss" scoped>

</style>
