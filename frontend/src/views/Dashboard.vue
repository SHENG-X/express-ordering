<template>
  <div id="dashboard">
    <a-layout>
      <a-layout-sider>
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          @click="handleClick"
        >
          <a-menu-item key="1">
            Food Management
          </a-menu-item>
          <a-menu-item key="2">
            Category Management
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <component :is="panelName"/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import FoodManagementPanel from '@/components/FoodManagementPanel.vue';
import CategoryManagementPanel from '@/components/CategoryManagementPanel.vue';

export default {
  components: {
    FoodManagementPanel,
    CategoryManagementPanel,
  },
  data() {
    return {
      panelName: 'FoodManagementPanel',
    };
  },
  methods: {
    handleClick(e) {
      switch (e.key) {
        case '1':
          this.panelName = 'FoodManagementPanel';
          break;
        case '2':
          this.panelName = 'CategoryManagementPanel';
          break;
        default:
          this.panelName = 'FoodManagementPanel';
      }
    },
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
