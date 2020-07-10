<template>
  <div class="container">
    <div class="header">
      <div>Food List</div>
      <div>
        <a-button
          @click="modalVisible = !modalVisible"
        >
          Add
        </a-button>
      </div>
    </div>
    <div class="content">
      <div
        class="food-list"
        v-if="!modalVisible"
      >
        <food-list/>
      </div>
      <div
        class="create-food"
        v-else
      >
        <create-food-modal
          :closeModal="() => {modalVisible = !modalVisible}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FoodList from './FoodList.vue';
import CreateFoodModal from './CreateFoodModal.vue';

export default {
  components: {
    FoodList,
    CreateFoodModal,
  },
  data() {
    return {
      modalVisible: false,
    };
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
    .food-list, .create-food {
      position: absolute;
      width: 100%;
      height: 100%;
      background: white;
      overflow: auto;
    }
    .create-food {
      top: -56px;
      padding-top: 56px;
      height: calc(100% + 56px);
    }
  }
}
</style>
