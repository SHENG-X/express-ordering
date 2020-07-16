<template>
  <div class="container">
    <a-list bordered :data-source="getFood">
      <a-list-item slot="renderItem" slot-scope="item">
        <div class="image-container">
          <img
            v-if="item.image"
            :src="`${imageBaseURL}/assets/${item.image}`"
            width="60px" height="60px"
          />
        </div>
        <div class="name">
          {{ item.name }}
        </div>
        <div>
          {{ item.description }}
        </div>
        <div class="price">
          $ {{ item.price }}
        </div>
        <div class="button-container">
          <a-button
            type="primary"
            @click="() => setCurrentFood(item)"
          >
            Edit
          </a-button>
          <a-button
            type="danger"
            @click="() => deleteFood(item)"
          >
            Delete
          </a-button>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getFood',
    ]),
    imageBaseURL() {
      return process.env.VUE_APP_API_END_POINT;
    },
  },
  methods: {
    ...mapMutations([
      'setCurrentFood',
    ]),
    ...mapActions([
      'deleteFood',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .ant-list {
    height: 100%;
    overflow: auto;
    .ant-list-item {
      display: flex;
      div {
        flex: 1;
        min-width: 120px;
      }
      .name {
        padding: 0 24px;
        width: 180px;
      }
      .price {
        max-width: 120px;
        padding: 0 24px;
      }
      .image-container {
        max-width: 80px;
      }
      .button-container {
        width: 160px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
