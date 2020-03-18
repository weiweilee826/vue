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
          <td class="align-middle text-right">{{ item.final_total }}</td>
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
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: {},
      total: 0,
      final_total: 0,
      isLoading: false
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
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style></style>
