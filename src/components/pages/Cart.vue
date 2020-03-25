<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="my-5 row justify-content-center">
      <table class="table">
        <thead>
          <th></th>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteCart(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{ item.product.title }}
              <!-- <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div> -->
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>

      <!-- 套用優惠碼 -->
      <div class="input-group mb-2">
        <input
          type="text"
          class="form-control "
          placeholder="請輸入優惠碼"
          aria-describedby="basic-addon2"
          v-model="discountCode"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-success"
            type="button"
            @click="discount"
          >
            套用優惠碼
          </button>
        </div>
      </div>

      <!-- 個人資訊 -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(orderInfo)">
          <!-- 姓名 -->
          <ValidationProvider
            name="姓名"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <b-form-group
              id="input-group-1"
              label="姓名"
              label-for="input-1"
              :state="valid"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                v-model="form.name"
                placeholder="請輸入姓名"
                :state="valid"
              ></b-form-input>
            </b-form-group>
          </ValidationProvider>

          <!-- 郵件 -->
          <ValidationProvider
            name="郵件"
            rules="email|required"
            v-slot="{ errors, valid }"
          >
            <b-form-group id="input-group-2" label="郵件" label-for="input-2">
              <b-form-input
                v-model="form.email"
                id="input-2"
                placeholder="請輸入郵件"
                :state="valid"
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-2">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <!-- 電話 -->
          <ValidationProvider
            name="電話"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <b-form-group id="input-group-3" label="電話" label-for="input-3">
              <b-form-input
                v-model="form.tel"
                id="input-3"
                placeholder="請輸入電話"
                :state="valid"
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-3">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <!-- 地址 -->
          <ValidationProvider
            name="地址"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <b-form-group id="input-group-4" label="地址" label-for="input-4">
              <b-form-input
                v-model="form.address"
                id="input-4"
                placeholder="請輸入地址"
                :state="valid"
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-4">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <b-form-group id="input-group-5" label="備註" label-for="input-5">
            <b-form-input id="input-5" v-model="message"></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">送出</b-button>
        </b-form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "lee",
        email: "wlee@gmail.com",
        tel: "564148614",
        address: "三民路8號"
      },
      message: "",
      cart: {},
      discountCode: "",
      isLoading: false,
      personalInfo: {}
    };
  },
  methods: {
    getCartProducts() {
      var vm = this;
      this.axios
        .get(`${process.env.VUE_APP_HOST}/api/wwlee/cart`)
        .then(response => {
          vm.cart = response.data.data;
          this.isLoading = false;
        });
    },
    deleteCart(id) {
      this.isLoading = true;
      this.axios
        .delete(`${process.env.VUE_APP_HOST}/api/wwlee/cart/${id}`)
        .then(response => {
          console.log(response);
          this.getCartProducts();
        });
    },
    discount() {
      var vm = this;
      this.axios
        .post(`${process.env.VUE_APP_HOST}/api/wwlee/coupon`, {
          data: {
            code: vm.discountCode
          }
        })
        .then(response => {
          console.log(response);
          this.getCartProducts();
        });
    },
    orderInfo() {
      var vm = this;
      this.axios
        .post(`${process.env.VUE_APP_HOST}/api/wwlee/order`, {
          data: {
            user: vm.form,
            message: vm.message
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.success) {
            vm.$router.push(`/admin/order/${response.data.orderId}`);
          }
        });
    }
  },
  created() {
    this.getCartProducts();
  }
};
</script>

<style></style>
