<template>
  <div class="container">
    <a-list bordered :data-source="categories">
      <a-list-item slot="renderItem" slot-scope="item">
        <div class="name">
          {{ item.name }}
        </div>
        <div>
          {{ item.description }}
        </div>
        <div class="button-container">
          <a-button
            type="primary"
            @click="() => setCurrentCategory(item)"
          >
            Edit
          </a-button>
          <a-button
            type="danger"
            @click="() => deleteSingleCategory(item)"
          >
            Delete
          </a-button>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { getCategory, deleteCategory } from '@/services/categoryService';

export default {
  props: {
    setCurrentCategory: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    const categories = await getCategory();
    this.categories = categories.data;
  },
  methods: {
    async deleteSingleCategory(category) {
      try {
        await deleteCategory(category);
      } catch (error) {
        if (error.response.status === 404) {
          this.categories = this.categories.filter((c) => c._id !== error.response.data);
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
