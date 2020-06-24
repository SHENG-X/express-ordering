<template>
  <div id="app">
    <a-page-header
      class="header"
      title="Express Ordering"
      sub-title="xxx Restaurant"
    >
      <template slot="extra">
        <router-link to="/">Home</router-link>
        <router-link to="/auth">Auth</router-link>
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
