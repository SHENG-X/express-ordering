<template>
  <div class="container">
    <a-list bordered :data-source="food">
      <a-list-item slot="renderItem" slot-scope="item">
        <div>
          <img :src="`http://localhost:8081/assets/${item.image}`" width="60px"/>
        </div>
        <div>{{ item.name }}</div>
        <div>{{ item.description }}</div>
        <div>$ {{ item.price }}</div>
        <div>
          <a-button type="primary">
            Edit
          </a-button>
          <a-button
            type="danger"
            @click="() => deleteSingleFood(item._id)"
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
  data() {
    return {
      food: [],
    };
  },
  async created() {
    const food = await getFood();
    this.food = food.data;
  },
  methods: {
    async deleteSingleFood(id) {
      try {
        await deleteFood(id);
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 404) {
          this.food = this.food.filter((food) => food._id !== error.response.data);
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
  }
}
</style>
