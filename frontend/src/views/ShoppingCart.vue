<template>
  <div>
    <div v-if="getOrder._id">
      Your order is placed.
      Tracking number: {{ getOrder._id }}
    </div>
    <div
      class="container"
      v-else-if="getOrderItems.length && !getOrder._id"
    >
      <div
        class="order-item"
        v-for="item in getOrderItems"
        :key="item.food._id"
      >
        <div>
          <a-button key="increase" @click="() => handleFoodCount(1, item)">
            +
          </a-button>
          <a-input-number
            :min="1"
            :max="1000"
            :default-value="1"
            v-model="item.count"
          />
          <a-button key="decrease" @click="() => handleFoodCount(-1, item)">
            -
          </a-button>
        </div>
        <div class="item-detail">
          <div class="heading">
            <div>
              {{ item.food.name }}
            </div>
            <div>
              ${{ (item.count * item.food.price).toFixed(2) }}
            </div>
          </div>
          <div class="body">
            {{ item.extra }}
          </div>
        </div>
      </div>
      <div ref="card"/>
      <div class="controller">
        <a-button
          type="danger"
          @click="() => setOrder([])"
        >
          Cancel
        </a-button>
        <a-button
          class="place-order"
          type="primary"
          @click="handlePayment"
        >
          Pay
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

import { payOrder } from '@/services/paymentService';
import { placeOrder } from '@/services/orderService';

const stripe = window.Stripe(process.env.VUE_APP_STRIPE_PK);
/* ------- Set up Stripe Elements to use in checkout form ------- */
const elements = stripe.elements();
const style = {
  base: {
    color: '#32325d',
    fontFamily: '\'Helvetica Neue\', Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
  },
};
const card = elements.create('card', style);

export default {
  computed: {
    ...mapGetters([
      'getOrder',
      'getOrderItems',
    ]),
  },
  methods: {
    ...mapMutations([
      'removeOrderItem',
      'setOrder',
    ]),
    ...mapActions([
      'placeOrder',
    ]),
    handlePayment() {
      const orderData = {
        order: this.getOrder,
        currency: 'cad',
      };
      stripe
        .createPaymentMethod('card', card)
        .then((result) => {
          // Access the token with result.token
          if (result.error) {
            console.log('Payment error', result.error.message);
          } else {
            payOrder({ ...orderData, paymentMethodId: result.paymentMethod.id })
              .then((response) => {
                if (response.data.error) {
                  console.log('response.error', response.data.error);
                } else if (response.data.requiresAction) {
                  console.log('response.requiresAction', response.data.requiresAction);
                  stripe
                    .handleCardAction(response.data.clientSecret)
                    .then((data) => {
                      if (data.error) {
                        console.log('Your card was not authenticated, please try again');
                      } else if (data.paymentIntent.status === 'requires_confirmation') {
                        payOrder({ ...orderData, paymentIntentId: data.paymentIntent.id })
                          .then((rslt) => {
                            if (rslt.data.error) {
                              console.log('result.error', rslt.error);
                            } else {
                              stripe.retrievePaymentIntent(rslt.data.clientSecret)
                                .then((paymentResult) => {
                                  const { paymentIntent } = paymentResult;
                                  placeOrder({ ...orderData.order, payment: paymentIntent });
                                  const paymentItentJson = JSON.stringify(paymentIntent, null, 2);
                                  console.log('payment success', paymentItentJson);
                                });
                            }
                          });
                      }
                    });
                } else {
                  // TODO: handle error
                  console.log('order complete');
                }
              });
          }
        });
    },
    handleFoodCount(base, item) {
      if (item.count === 1 && base < 1) {
        // remove order item if it's count less than 1
        this.removeOrderItem(item);
        return;
      }
      item.count += base * 1;
    },
  },
  mounted() {
    card.mount(this.$refs.card);
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 12px;
  .order-item {
    display: flex;
    margin: 24px 0;
    .item-detail {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0 12px;
      .heading {
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  .controller {
    display: flex;
    justify-content: flex-end;
    .place-order {
      margin-left: 12px;
    }
  }
}
.StripeElement {
  height: 36px;
}
</style>
