<template>
  <div class="container">
    <a-list bordered :data-source="getCategory">
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
            @click="() => setCurrent(item)"
          >
            Edit
          </a-button>
          <a-button
            type="danger"
            @click="() => deleteCategory(item)"
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
    ...mapGetters('categoryModule', [
      'getCategory',
    ]),
  },
  methods: {
    ...mapMutations('categoryModule', [
      'setCurrent',
    ]),
    ...mapActions('categoryModule', [
      'deleteCategory',
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
