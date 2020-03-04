<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th width="120">產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled">已啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td><button class="btn btn-outline-primary btn-sm">編輯</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/weiwei/admin/products`;
      this.axios
        .get(API)
        .then(function(response) {
          console.log(response);
          vm.products = response.data.products;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getProduct();
  }
};
</script>

<style></style>
