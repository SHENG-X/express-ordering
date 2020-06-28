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
          v-if="$store.state.user.admin"
          to="/dashboard"
        >
          {{ 'Dashboard' }}
        </router-link>
        <router-link to="/auth">{{ 'Sign In' }}</router-link>
      </template>
    </a-page-header>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
.header{
  border: 1px solid rgb(235, 237, 240);
}
.ant-page-header-heading-extra {
  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 18px;

    &.router-link-exact-active {
      color: #1890ff;
    }
  }
}
</style>
