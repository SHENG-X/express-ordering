<template>
  <div id="app">

    <a-page-header
      class="header"
      :title="$t('company')"
      :sub-title="$t('business')"
    >
      <template slot="extra">
        <router-link to="/">{{ $t('pages.home.label') }}</router-link>
        <router-link
          to="/cart"
        >
          {{ 'Shopping Cart' }}
        </router-link>
        <router-link
          v-if="$store.state.user && $store.state.user.admin"
          to="/dashboard"
        >
          {{ 'Dashboard' }}
        </router-link>
        <router-link
          v-if="!$store.state.user"
          to="/auth"
        >
          {{ 'Sign In' }}
        </router-link>
        <a
          v-else
          @click="handleSignOut"
        >
          {{ 'Sign Out' }}
        </a>
      </template>
    </a-page-header>

    <div class="main">
      <router-view/>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { signInByToken } from './services/userService';
import { removeToken } from './util/token';

export default {
  async beforeCreate() {
    const response = await signInByToken();
    if (response) {
      this.setUser(response.data.user);
    }
  },
  methods: {
    ...mapMutations([
      'setUser',
    ]),
    handleSignOut() {
      removeToken();
      this.setUser(null);
      this.$router.go(0);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  .header {
    border-bottom: 1px solid rgb(235, 237, 240);
  }
  .ant-page-header-heading-extra {
    a {
      font-weight: bold;
      color: #2c3e50;
      font-size: 18px;
      &:hover {
        cursor: pointer;
      }

      &.router-link-exact-active {
        color: #1890ff;
      }
    }
  }
  .main {
    height: calc(100% - 65px);
  }
}
</style>
