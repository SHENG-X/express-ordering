<template>
  <div class="create-food-modal">
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
          v-model="food.name"
          placeholder="name"
        />
      </a-form-model-item>

      <a-form-model-item
        has-feedback
        :label="'Description'"
        prop="description"
      >
        <a-textarea
          placeholder="Food description here."
          v-model="food.description"
          :rows="4"
        />
      </a-form-model-item>

      <a-form-model-item
        has-feedback
        :label="'Price'"
        prop="description"
      >
        <a-input-number
          :default-value="0.00"
          :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
          v-model="food.price"
        />
      </a-form-model-item>

      <a-form-model-item
        has-feedback
        :label="'Category'"
        prop="category"
      >
        <a-select
          default-value=""
          style="width: 120px"
          v-model="food.category"
        >
          <a-select-option
            v-for="category in  getCategory"
            :value="category._id"
            :key="category._id"
          >
            {{ category.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item
        has-feedback
        :label="'Picture'"
        prop="description"
        class="uploader-row"
      >
        <div class="dropbox">
          <a-upload
            name="picture"
            action="http://localhost:8081/picture"
            list-type="picture-card"
            @preview="handlePreview"
            @change="handleChange"
            accept=".jpg, .jpeg, .png"
          >
            <div v-if="fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
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
import { mapActions, mapGetters } from 'vuex';

import getBase64 from '@/util';

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
      previewVisible: false,
      previewImage: '',
      fileList: [],
      food: {
        image: '',
        name: '',
        description: '',
        category: '',
        price: '',
      },
    };
  },
  computed: {
    ...mapGetters([
      'getCategory',
    ]),
  },
  methods: {
    ...mapActions([
      'createFood',
    ]),
    async onSubmit() {
      this.createFood(this.food);
      this.closeModal();
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      if (fileList[0].status === 'done') {
        this.food.image = fileList[0].response;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-food-modal {
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
