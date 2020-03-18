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
          <b-button
            href="#"
            variant="primary"
            class="card-link"
            @click="getProduct(product.id)"
            >查看更多</b-button
          >
          <b-button href="#" variant="primary" class="card-link"
            >加入購物車</b-button
          >
        </template>
      </b-card>
    </b-card-group>

    <b-modal id="modal" :title="product.title">
      <template v-slot:default>
        <img :src="product.imageUrl" class="img-fluid" alt="" />
        <blockquote class="blockquote mt-3">
          <p class="mb-0">{{ product.content }}</p>
          <footer class="blockquote-footer text-right">
            {{ product.description }}
          </footer>
        </blockquote>
        <div class="d-flex justify-content-between align-items-baseline">
          <del class="h6" v-if="product.price"
            >原價 {{ product.origin_price | price }} 元</del
          >
          <div class="h4" v-if="product.price">
            現在只要 {{ product.price | price }} 元
          </div>
        </div>
        <select name="" class="form-control mt-3" v-model="product.qty">
          <option :value="num" v-for="num in 10" :key="num">
            選購 {{ num }} {{ product.unit }}
          </option>
        </select>
      </template>
      <template v-slot:modal-footer>
        <div class="text-muted text-nowrap mr-3">
          小計 <strong>{{ (product.qty * product.price) | price }}</strong> 元
        </div>
        <button
          type="button"
          class="btn btn-primary"
          @click="addtoCart(product.id, product.num)"
        >
          <i class="fas fa-spinner fa-spin"></i>
          加到購物車
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      product: {}
    };
  },
  methods: {
    getProducts(page) {
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
    },
    getProduct(id) {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/product/${id}`;
      this.axios
        .get(API)
        .then(function(response) {
          if (response.data.success) {
            // response.data.product.qty = 1;
            vm.product = response.data.product;
            vm.$set(vm.product, 'qty', 1)
            vm.$bvModal.show("modal");
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
    this.getProducts();
  }
};
</script>

<style></style>
