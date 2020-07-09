<template>
  <div>
    <a-list bordered :data-source="foods">
      <a-list-item slot="renderItem" slot-scope="item">
        <div>{{ item.picture }}</div>
        <div>{{ item.name }}</div>
        <div>{{ item.description }}</div>
        <div>{{ item.price }}</div>
        <div>
          <a-button type="primary">
            Edit
          </a-button>
          <a-button type="danger">
            Delete
          </a-button>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foods: [
        {
          name: 'food 1',
          description: 'description',
          price: '3.22',
          picture: 'image-here',
        },
        {
          name: 'food 2',
          description: 'description',
          price: '3.22',
          picture: 'image-here',
        },
        {
          name: 'food 3',
          description: 'description',
          price: '3.22',
          picture: 'image-here',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
