<template>
  <div>
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
          <a-button type="danger">
            Delete
          </a-button>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { getFood } from '@/services/foodService';

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
};
</script>

<style lang="scss" scoped>
</style>
