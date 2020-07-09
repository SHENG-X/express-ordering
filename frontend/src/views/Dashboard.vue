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
                @change="onChange"
              />
            </a-form-model-item>

            <a-form-model-item
              has-feedback
              :label="'Picture'"
              prop="description"
              class="uploader-row"
            >
              <div class="dropbox">
                <a-upload
                  list-type="picture-card"
                  @preview="handlePreview"
                  @change="handleChange"
                  :before-upload="handleBeforeUpload"
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
              <a-button type="primary" @click="onSubmit">
                Create
              </a-button>
            </a-form-model-item>

          </a-form-model>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
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
        price: '',
      },
    };
  },
  methods: {
    onChange(val) {
      this.food.price = val;
    },
    onSubmit() {
      console.log('onSubmit');
    },
    handleBeforeUpload(e) {
      console.log(e);
      return false;
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
  }
}
</style>
