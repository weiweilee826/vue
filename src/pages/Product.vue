<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <b-button @click="edit({})">建立新的產品</b-button>
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
          <td>
            <b-button v-b-modal.modal-1 @click="edit(product)">編輯</b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal id="modal-1" :title="title" @ok="editOk">
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">輸入圖片網址</label>
              <input
                type="text"
                class="form-control"
                id="image"
                placeholder="請輸入圖片連結"
                v-model="tempProduct.imageUrl"
              />
            </div>
            <div class="form-group">
              <label for="customFile"
                >或 上傳圖片
                <i class="fas fa-spinner fa-spin" v-if="imgLoading"></i>
              </label>
              <input
                type="file"
                id="customFile"
                class="form-control"
                ref="files"
                @change="upload"
              />
            </div>
            <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="請輸入標題"
                v-model="tempProduct.title"
              />
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input
                  type="text"
                  class="form-control"
                  id="category"
                  placeholder="請輸入分類"
                  v-model="tempProduct.category"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input
                  type="unit"
                  class="form-control"
                  id="unit"
                  placeholder="請輸入單位"
                  v-model="tempProduct.unit"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                <input
                  type="number"
                  class="form-control"
                  id="origin_price"
                  placeholder="請輸入原價"
                  v-model="tempProduct.origin_price"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  placeholder="請輸入售價"
                  v-model="tempProduct.price"
                />
              </div>
            </div>
            <hr />

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea
                type="text"
                class="form-control"
                id="description"
                placeholder="請輸入產品描述"
                v-model="tempProduct.description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea
                type="text"
                class="form-control"
                id="content"
                placeholder="請輸入產品說明內容"
                v-model="tempProduct.content"
              ></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  v-model="tempProduct.is_enabled"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      title: "",
      isLoading: false,
      imgLoading: false
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/weiwei/admin/products`;
      this.axios
        .get(API)
        .then(function(response) {
          if (response.data.success) {
            vm.products = response.data.products;
          } else {
            vm.$bus.$emit("pop", response.data.messages, "danger");
          }
          vm.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editOk() {
      var vm = this;
      if (this.tempProduct.id) {
        // 修改
        const API = `${process.env.VUE_APP_HOST}/api/weiwei/admin/product/${this.tempProduct.id}`;
        this.axios
          .put(API, {
            data: this.tempProduct
          })
          .then(function(response) {
            if (response.data.success) {
              vm.getProduct();
            } else {
              vm.$bus.$emit("pop", response.data.message, "danger");
            }
            vm.$bvModal.hide("modal-1");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        // 新增
        const API = `${process.env.VUE_APP_HOST}/api/weiwei/admin/product`;
        this.axios
          .post(API, {
            data: this.tempProduct
          })
          .then(function(response) {
            if (response.data.success) {
              vm.getProduct();
            } else {
              vm.$bus.$emit("pop", response.data.message, "danger");
            }
            vm.$bvModal.hide("modal-1");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    edit(product) {
      this.$bvModal.show("modal-1");
      this.tempProduct = product;
      this.title = product.id ? "修改產品" : "新增產品";
    },
    upload(event) {
      this.imgLoading = true;
      var formData = new FormData();
      formData.append("file-to-upload", event.target.files[0]);

      var vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/weiwei/admin/upload`;
      this.axios
        .post(API, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(function(response) {
          console.log(response)
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            vm.$bus.$emit("pop", response.data.message, "danger");
          }
          vm.imgLoading = false;
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
