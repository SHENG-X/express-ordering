<template>
  <div class="form-container">
    <a-card
      class="card"
      title="Sign In"
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
            type="primary"
            @click="changeMode"
          >
            {{ $t('pages.auth.signUp.label') }}
          </a-button>
        </div>
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
        <a-form-model-item class="button-item">
          <a-button type="primary" @click="handleSignIn">
            {{ $t('pages.auth.signIn.label') }}
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { signIn } from '../apis/index';
import { validateEmail, validatePassword } from '../util/validators';

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
        email: '',
        password: '',
      },
      rules: {
        password: [
          { validator: validatePassword, trigger: 'change' },
        ],
        email: [
          { validator: validateEmail, trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    async handleSignIn() {
      this.$refs.ruleForm.validate(async (valid) => {
        this.error = false;
        if (valid) {
          const response = await signIn({ ...this.user });
          if (response && response.status === 200) {
            this.$router.push('/');
          } else {
            alert('email or password wrong!');
          }
        }
        return false;
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
      .button-item {
        button {
          width: 100%;
        }
      }
    }
  }
}
</style>
