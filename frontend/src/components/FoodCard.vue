<template>
  <a-card>
    <div class="container">
      <div class="labels">
        <div class="title">
          {{ food.name }}
        </div>
        <div class="description">
          {{ food.description }}
        </div>
        <div class="price">
          ${{ food.price }}
        </div>
      </div>
      <div
        class="image"
        v-if="food.image"
      >
        <img :src="`${imageBaseURL}/assets/${food.image}`"/>
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageBaseURL() {
      return process.env.VUE_APP_API_END_POINT;
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-card{
  --marginWidth: 12px;
  width: 445px;
  max-width: calc(100% - var(--marginWidth) * 2);
  margin: var(--marginWidth);
  &:hover {
    cursor: pointer;
    border: 1px solid #003293;
  }
   ::v-deep.ant-card-body {
    padding: 0;
    .container {
      display: flex;
      justify-content: space-between;
      height: 125px;
      .labels {
        padding: 16px;
        .title {
          font-size: 16px;
          font-weight: 600;
        }
      }
      img {
        width: 125px;
        height: 125px;
      }
    }
  }
}
</style>
