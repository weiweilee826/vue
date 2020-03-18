<template>
  <div>
    <b-card-group columns>
      <b-card
        :title="product.title"
        :sub-title="product.description"
        :img-src="product.imageUrl"
        img-alt="Image"
        img-top
        tag="article"
        
        class="mb-2"
        align="left"
        v-for="product in products"
        :key="product.id"
      >
        <b-card-text text-tag="del"
          >原價 {{ product.origin_price | price }} 元</b-card-text
        >
        <b-card-text text-tag="div"
          >現在只要 {{ product.price | price }} 元</b-card-text
        >
        <template v-slot:footer>
          <b-button href="#" variant="primary" class="card-link"
            >查看更多</b-button
          >
          <b-button href="#" variant="primary" class="card-link"
            >加入購物車</b-button
          >
        </template>
      </b-card>
    </b-card-group>
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
    getProduct(page) {
      this.isLoading = true;
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/products?page=${page}`;
      this.axios
        .get(API)
        .then(function(response) {
          if (response.data.success) {
            vm.products = response.data.products;
            // vm.totalPages = response.data.pagination.total_pages;
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
    this.getProduct();
  }
};
</script>

<style></style>
