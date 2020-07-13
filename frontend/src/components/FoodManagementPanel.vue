<template>
  <div class="container">
    <div class="header">
      <div>Food List</div>
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
        class="food-list"
        v-if="!createVisible && !updateVisible"
      >
        <food-list
          :setCurrentFood="setCurrentFood"
        />
      </div>
      <div
        class="create-food"
        v-else-if="createVisible && !updateVisible"
      >
        <create-food-modal
          :closeModal="() => {createVisible = !createVisible}"
        />
      </div>
      <div
        class="update-food"
        v-else-if="!createVisible && updateVisible"
      >
        <update-food-modal
          :food="currentFood"
          :closeModal="() => {updateVisible = !updateVisible}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FoodList from './FoodList.vue';
import CreateFoodModal from './CreateFoodModal.vue';
import UpdateFoodModal from './UpdateFoodModal.vue';

export default {
  components: {
    FoodList,
    CreateFoodModal,
    UpdateFoodModal,
  },
  data() {
    return {
      createVisible: false,
      updateVisible: false,
      currentFood: null,
    };
  },
  methods: {
    setCurrentFood(food) {
      this.currentFood = food;
      this.updateVisible = true;
    },
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
    .create-food, .update-food {
      top: -56px;
      padding-top: 56px;
      height: calc(100% + 56px);
    }
  }
}
</style>
