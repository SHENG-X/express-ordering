<template>
  <div class="create-category-modal">
    <a-form-model
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
    >

      <a-form-model-item
        has-feedback
        :label="'Name'"
        prop="name"
      >
        <a-input
          type="text"
          v-model="category.name"
          placeholder="name"
        />
      </a-form-model-item>

      <a-form-model-item
        has-feedback
        :label="'Description'"
        prop="description"
      >
        <a-textarea
          placeholder="Category description here."
          v-model="category.description"
          :rows="4"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          :style="{'margin-right': '12px'}"
          @click="onSubmit"
        >
          Create
        </a-button>
        <a-button
          type="danger"
          @click="closeModal"
        >
          Cancel
        </a-button>
      </a-form-model-item>

    </a-form-model>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    closeModal: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      category: {
        name: '',
        description: '',
      },
    };
  },
  methods: {
    ...mapActions([
      'createCategory',
    ]),
    async onSubmit() {
      this.createCategory(this.category);
      this.closeModal();
    },
    handleCancel() {
      this.previewVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.create-category-modal {
  width: 100%;
  height: 100%;
  .ant-input-number {
    width: 50%;
    min-width: 132px;
    max-width: 260px;
  }
  .uploader-row {
    height: 127px;
    margin-bottom: 0;
  }
}
</style>
