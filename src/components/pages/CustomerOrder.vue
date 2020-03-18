<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${product.imageUrl}` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              product.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ product.title }}</a>
            </h5>
            <!-- <p class="card-text">內容</p> -->
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6"
                >原價 {{ product.origin_price | toThousands }} 元</del
              >
              <div class="h5">
                現在只要 {{ product.price | toThousands }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              v-b-modal.modal-1
              @click="getProduct(product.id)"
              class="btn btn-outline-secondary btn-sm"
            >
              <!-- <i class="fas fa-spinner fa-spin"></i> -->
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(product.id, product.num)"
            >
              <!-- <i class="fas fa-spinner fa-spin"></i> -->
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <b-modal id="modal-1" :title="product.title">
      <!-- body -->
      <template v-slot:default>
        <img :src="product.imageUrl" class="img-fluid" alt="" />
        <blockquote class="blockquote mt-3">
          <!-- <p class="mb-0">{{ product.content }}</p> -->
          <footer class="blockquote-footer text-right">
            {{ product.description }}
          </footer>
        </blockquote>
        <div class="d-flex justify-content-between align-items-baseline">
          <del class="h6" v-if="product.price"
            >原價 {{ product.origin_price | toThousands }} 元</del
          >
          <div class="h4" v-if="product.price">
            現在只要 {{ product.price | toThousands }} 元
          </div>
        </div>
        <select name="" class="form-control mt-3" v-model="product.qty">
          <option :value="num" v-for="num in 10" :key="num">
            選購 {{ num }} {{ product.unit }}
          </option>
        </select>
      </template>

      <!-- footer -->
      <template v-slot:modal-footer>
        <div class="text-muted text-nowrap mr-3">
          小計
          <strong>{{ (product.qty * product.price) | toThousands }}</strong> 元
        </div>
        <button
          type="button"
          class="btn btn-primary"
          @click="addToCart(product.id, product.num)"
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
      isLoading: false,
      product: {}
    };
  },
  methods: {
    getProducts() {
      var vm = this;
      this.isLoading = true;
      this.axios
        .get(`${process.env.VUE_APP_HOST}/api/wwlee/products?page=:page`)
        .then(response => {
          vm.products = response.data.products;
          vm.isLoading = false;
        });
    },
    getProduct(id) {
      var vm = this;
      this.axios
        .get(`${process.env.VUE_APP_HOST}/api/wwlee/product/${id}`)
        .then(response => {
          vm.product = response.data.product;
          vm.$set(vm.product, "qty", 1);
        });
    },
    addToCart(id, qty) {
      // var vm = this;
      this.axios
        .post(`${process.env.VUE_APP_HOST}/api/wwlee/cart`, {
          data: { 'product_id': id, 'qty': qty }
        })
        .then(response => {
          console.log(response);
        });
    }
  },

  created() {
    this.getProducts();
  }
};
</script>
