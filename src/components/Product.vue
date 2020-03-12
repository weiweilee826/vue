<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal({})">
        建立新的產品
      </button>
    </div>
    <b-table striped hover :items="products" :fields="fields">
      <template v-slot:cell(is_enabled)="product">
        <div v-if="product.item.is_enabled">已啟用</div>
        <div v-else>未啟用</div>
      </template>
      <template v-slot:cell(edit)="product">
        <b-button size="sm" @click="openModal(product.item)" class="mr-2">
          編輯
        </b-button>
      </template>
    </b-table>
    <div class="overflow-auto">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="totalPage"
        use-router
      ></b-pagination-nav>
    </div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="imgLoading"></i>
                  </label>
                  <input
                    @change="uploadImg"
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt=""
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
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
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
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
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="addProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isLoading: false,
      imgLoading: false,
      fields: [
        {
          key: "category",
          label: "分類"
        },
        {
          key: "title",
          label: "產品名稱"
        },
        {
          key: "origin_price",
          label: "原價"
        },
        {
          key: "price",
          label: "售價"
        },
        {
          key: "is_enabled",
          label: "是否啟用"
        },
        {
          key: "edit",
          label: "編輯"
        }
      ],
      totalPage: 1
    };
  },
  methods: {
    openModal(product) {
      $("#productModal").modal("show");
      this.tempProduct = product;
    },
    getProducts() {
      var vm = this;
      this.isLoading = true;
      this.axios
        .get(
          `${process.env.VUE_APP_HOST}/api/wwlee/admin/products?page=${vm.$route.params.page}`
        )
        .then(response => {
          vm.totalPage = response.data.pagination.total_pages;
          if (!response.data.success) {
            this.$bus.$emit("send", "xxx", "danger");
          }
          this.products = response.data.products;
          this.isLoading = false;
        });
    },
    addProduct() {
      var vm = this;
      if (this.tempProduct.id == undefined) {
        this.axios
          .post(`${process.env.VUE_APP_HOST}/api/wwlee/admin/product`, {
            data: vm.tempProduct
          })
          .then(response => {
            $("#productModal").modal("hide");
            if (response.data.success) {
              vm.getProducts();
            } else {
              console.log("新增失敗");
            }
          });
      } else {
        this.axios
          .put(
            `${process.env.VUE_APP_HOST}/api/wwlee/admin/product/${vm.tempProduct.id}`,
            {
              data: vm.tempProduct
            }
          )
          .then(response => {
            $("#productModal").modal("hide");
            console.log(response);
          });
      }
    },
    uploadImg(event) {
      this.imgLoading = true;
      var vm = this;
      var file = new FormData();
      file.append("file-to-upload", event.target.files[0]);

      this.axios
        .post(`${process.env.VUE_APP_HOST}/api/wwlee/admin/upload`, file, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(function(response) {
          console.log(1, response);
          if (response.data.success) {
            vm.tempProduct.imageUrl = response.data.imageUrl;
          }
          vm.imgLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    linkGen(pageNum) {
      return pageNum === 1 ? `` : `/admin/product/${pageNum}`;
    }
  },
  watch: {
    $route() {
      this.getProducts();
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style></style>
