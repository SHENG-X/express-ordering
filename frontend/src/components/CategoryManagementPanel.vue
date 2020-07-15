<template>
  <div class="container">
    <div class="header">
      <div>Category List</div>
      <div>
        <a-button
          @click="createVisible = !createVisible"
        >
          Add
        </a-button>
      </div>
    </div>
    <div class="content">
      <div
        class="category-list"
        v-if="!createVisible && !getCurrentCategory"
      >
        <category-list/>
      </div>
      <div
        class="create-category"
        v-else-if="createVisible && !getCurrentCategory"
      >
        <create-category-modal
          :closeModal="() => {createVisible = !createVisible}"
        />
      </div>
      <div
        class="update-category"
        v-else-if="!createVisible && getCurrentCategory"
      >
        <update-category-modal/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CategoryList from '@/components/CategoryList.vue';
import CreateCategoryModal from './CreateCategoryModal.vue';
import UpdateCategoryModal from './UpdateCategoryModal.vue';

export default {
  components: {
    CategoryList,
    CreateCategoryModal,
    UpdateCategoryModal,
  },
  data() {
    return {
      createVisible: false,
    };
  },
  computed: {
    ...mapGetters('categoryModule', [
      'getCurrentCategory',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .category-list, .create-category {
      position: absolute;
      width: 100%;
      height: 100%;
      background: white;
      overflow: auto;
    }
    .create-category, .update-category {
      top: -56px;
      padding-top: 56px;
      height: calc(100% + 56px);
    }
  }
}
</style>
