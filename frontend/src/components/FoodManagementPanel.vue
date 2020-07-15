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
        v-if="!createVisible && !getCurrentFood"
      >
        <food-list/>
      </div>
      <div
        class="create-food"
        v-else-if="createVisible && !getCurrentFood"
      >
        <create-food-modal
          :closeModal="() => {createVisible = !createVisible}"
        />
      </div>
      <div
        class="update-food"
        v-else-if="!createVisible && getCurrentFood"
      >
        <update-food-modal/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentFood',
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
    .food-list, .create-food {
      position: absolute;
      width: 100%;
      height: 100%;
      background: white;
      overflow: auto;
    }
    .create-food, .update-food {
      margin-top: -56px;
      padding-top: 56px;
      height: calc(100% + 56px);
      background: white;
    }
  }
}
</style>
