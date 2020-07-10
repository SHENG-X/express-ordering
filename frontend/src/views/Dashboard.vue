<template>
  <div id="dashboard">
    <a-layout>
      <a-layout-sider>
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
        >
          <a-menu-item key="1">
            Food Management
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <create-food-modal/>
          <!-- <food-list/> -->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import CreateFoodModal from '@/components/CreateFoodModal.vue';
// import FoodList from '@/components/FoodList.vue';

export default {
  components: {
    CreateFoodModal,
    // FoodList,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
#dashboard {
  height: 100%;
  .ant-layout {
    height: 100%;
    .ant-layout-sider {
      background: white;
      .ant-menu li {
        margin: 0;
      }
    }
    .ant-layout-content {
    }
  }
}
</style>
