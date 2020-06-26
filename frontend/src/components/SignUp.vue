<template>
  <div class="form-container">
    <a-card
      class="card"
      title="Sign Up"
      :bordered="false"
    >
      <a-form-model
        :model="user"
        class="form"
        ref="ruleForm"
        :rules="rules"
      >
        <div class="account-exit">
          <span>{{ $t('pages.auth.signIn.helper') }}</span>
          <a-button
            @click="changeMode"
            type="primary"
          >
            {{ $t('pages.auth.signIn.label') }}
          </a-button>
        </div>
        <div class="name-container">
          <a-form-model-item
            has-feedback
            :label="$t('pages.auth.fname')"
            prop="fname"
          >
            <a-input
              v-model="user.fname"
              placeholder="Joe"
            />
          </a-form-model-item>
          <a-form-model-item
            has-feedback
            :label="$t('pages.auth.lname')"
            prop="lname"
          >
            <a-input
              v-model="user.lname"
              placeholder="Doe"
            />
          </a-form-model-item>
        </div>
        <a-form-model-item
          has-feedback
          :label="$t('pages.auth.phone')"
          prop="phone"
        >
          <a-input
            type="tel"
            v-model="user.phone"
            placeholder="2507671234"
          />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('pages.auth.email')"
          prop="email"
        >
          <a-input
            type="email"
            v-model="user.email"
            placeholder="joedoe@gmail.com"
          />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('pages.auth.password')"
          prop="password"
        >
          <a-input
            type="password"
            v-model="user.password"
            placeholder="password"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleSignUp">
            {{ $t('pages.auth.signUp.label') }}
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { signUp } from '../apis/index';
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateEmailExist,
} from '../util/validators';

export default {
  props: {
    changeMode: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      user: {
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
      },
      rules: {
        fname: [
          { required: true, message: 'Please enter your first name', trigger: 'change' },
        ],
        lname: [
          { required: true, message: 'Please enter your last name', trigger: 'change' },
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'change' },
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'change' },
          { validator: validateEmailExist, trigger: 'change' },
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    async handleSignUp() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const response = await signUp({ ...this.user });
          if (response && response.status === 201) {
            this.$router.push('/');
          } else {
            alert('An issue was occurred while creating a new account');
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;
  .card {
    width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ::v-deep .ant-card-head {
      width: 100%;
      .ant-card-head-wrapper{
        display: flex;
        justify-content: center;
        .ant-card-head-title{
          flex: unset;
        }
      }
    }
    .form {
      width: 300px;
      .account-exit {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          margin-right: 12px;
        }
      }
      ::v-deep .ant-form-item-label {
        line-height: unset;
      }
      .name-container {
        display: flex;
        justify-content: space-between;
      }
      .ant-form-item-control {
        button {
          width: 100%;
        }
      }
    }
  }
}
</style>
