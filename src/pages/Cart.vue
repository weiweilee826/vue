<template>
  <div class="my-5 row justify-content-center">
    <loading :active.sync="isLoading"></loading>

    <table class="table">
      <thead>
        <th></th>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
      </thead>
      <tbody>
        <tr v-for="item in carts" :key="item.id">
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="delCart(item.id)"
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
          <td class="align-middle text-right">{{ item.total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ total }}</td>
        </tr>
        <tr v-if="final_total !== total">
          <td colspan="3" class="text-right text-success">折扣價</td>
          <td class="text-right text-success">{{ final_total }}</td>
        </tr>
        <tr>
          <td colspan="4">
            <b-input-group prepend="折扣碼">
              <b-form-input v-model="code" />
              <b-input-group-append>
                <b-button variant="success" @click="useCoupon">套用</b-button>
              </b-input-group-append>
            </b-input-group>
          </td>
        </tr>
      </tfoot>
    </table>
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <b-form @submit.prevent="handleSubmit(order)">
        <ValidationProvider
          name="姓名"
          rules="required"
          v-slot="{ errors, valid }"
        >
          <b-form-group id="input-group-1" label="姓名:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.user.name"
              placeholder="請輸入姓名"
              :state="valid"
            ></b-form-input>
            <b-form-invalid-feedback id="input-1">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
          name="email"
          rules="required|email"
          v-slot="{ errors, valid }"
        >
          <b-form-group id="input-group-2" label="email" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.user.email"
              placeholder="請輸入email"
              :state="valid"
            ></b-form-input>
            <b-form-invalid-feedback id="input-2">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
          name="電話"
          rules="required"
          v-slot="{ errors, valid }"
        >
          <b-form-group id="input-group-3" label="電話:" label-for="input-3">
            <b-form-input
              id="input-3"
              type="tel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
              :state="valid"
            ></b-form-input>
            <b-form-invalid-feedback id="input-3">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
          name="地址"
          rules="required"
          v-slot="{ errors, valid }"
        >
          <b-form-group id="input-group-4" label="地址:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.user.address"
              placeholder="請輸入地址"
              :state="valid"
            ></b-form-input>
            <b-form-invalid-feedback id="input-4">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider name="留言" rules="" v-slot="{ errors, valid }">
          <b-form-group id="input-group-5" label="留言:" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="form.message"
              placeholder="請留言"
              :state="valid"
            ></b-form-input>
            <b-form-invalid-feedback id="input-1">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b-button :disabled="invalid" type="submit" variant="primary"
          >Submit</b-button
        >
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: {},
      total: 0,
      final_total: 0,
      isLoading: false,
      code: "",
      form: {
        user: {
          name: "test",
          email: "test@gmail.com",
          tel: "0912346768",
          address: "kaohsiung"
        },
        message: "這是留言"
      }
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/cart`;
      this.axios
        .get(API)
        .then(function(response) {
          var res = response.data.data;
          vm.carts = res.carts;
          vm.total = res.total;
          vm.final_total = res.final_total;
          if (!response.data.success) {
            vm.$bus.$emit("pop", response.data.message, "danger");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    delCart(id) {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/cart/${id}`;
      vm.isLoading = true;
      this.axios
        .delete(API)
        .then(function(response) {
          if (response.data.success) {
            vm.getCart();
          } else {
            vm.$bus.$emit("pop", response.data.message, "danger");
          }
          vm.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    useCoupon() {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/coupon`;
      this.axios
        .post(API, {
          data: {
            code: vm.code
          }
        })
        .then(function(response) {
          if (response.data.success) {
            vm.getCart();
          } else {
            vm.$bus.$emit("pop", response.data.message, "danger");
          }
          vm.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onSubmit() {
      console.log(this.form);
    },
    order() {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/order`;
      this.axios
        .post(API, { data: vm.form })
        .then(function(response) {
          if (response.data.success) {
            vm.$router.push(`/checkout/${response.data.orderId}`)
          } else {
            vm.$bus.$emit("pop", response.data.message, "danger");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style></style>
