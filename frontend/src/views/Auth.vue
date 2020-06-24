<template>
  <a-form-model :model="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
    <a-form-model-item label="First name">
      <a-input v-model="form.fname" />
    </a-form-model-item>

    <a-form-model-item label="Last name">
      <a-input v-model="form.lname" />
    </a-form-model-item>

    <a-form-model-item label="Phone number">
      <a-input v-model="form.phone" />
    </a-form-model-item>

    <a-form-model-item label="Email address">
      <a-input v-model="form.email" />
    </a-form-model-item>

    <a-form-model-item label="Password">
      <a-input v-model="form.password" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
      <a-button type="primary" @click="onSubmit">
        Create
      </a-button>
      <a-button style="margin-left: 10px;" @click="onCancel">
        Cancel
      </a-button>
    </a-form-model-item>

  </a-form-model>
</template>
<script>
import axios from 'axios';

const form = {
  fname: '',
  lname: '',
  phone: '',
  email: '',
  password: '',
};

export default {
  data() {
    return {
      form: { ...form },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await axios.post('http://localhost:8080/user', { ...this.form });
        console.log(response);
        if (response.status === 201) {
          this.form = { ...form };
          // TODO: user created load user id and redirect user to home page
        } else {
          // TODO: display error message.
        }
      } catch (err) {
        console.log(err);
      }
    },
    onCancel() {
      // reset form on cancel
      this.form = { ...form };
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
