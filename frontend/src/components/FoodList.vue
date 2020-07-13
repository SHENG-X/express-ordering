<template>
  <div class="container">
    <a-list bordered :data-source="food">
      <a-list-item slot="renderItem" slot-scope="item">
        <div class="image-container">
          <img
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
            @click="() => deleteSingleFood(item)"
          >
            Delete
          </a-button>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { getFood, deleteFood } from '@/services/foodService';

export default {
  props: {
    setCurrentFood: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      food: [],
    };
  },
  computed: {
    imageBaseURL() {
      return process.env.VUE_APP_API_END_POINT;
    },
  },
  async created() {
    const food = await getFood();
    this.food = food.data;
  },
  methods: {
    async deleteSingleFood(food) {
      try {
        await deleteFood(food);
      } catch (error) {
        if (error.response.status === 404) {
          this.food = this.food.filter((f) => f._id !== error.response.data);
        }
      }
    },
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
