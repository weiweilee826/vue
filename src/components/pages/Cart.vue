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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {},
      isLoading: false
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
    }
  },
  created() {
    this.getCartProducts();
  }
};
</script>

<style></style>
