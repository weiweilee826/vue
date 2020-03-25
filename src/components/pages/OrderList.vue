<template>
  <div>
    <b-table striped hover :items="orders" :fields="fields">
      <template v-slot:cell(edit)="{ item }">
        <b-button
          size="sm"
          class="mr-2"
          @click="showInfo(item)"
          variant="outline-primary"
        >
          編輯
        </b-button>
      </template>
    </b-table>

    <!-- 詳細資訊 Modal -->
    <b-modal :hide-footer="true" ref="modal" title="訂單資訊">
      <b-form>
        <b-form-group id="input-group-2" label="姓名" label-for="input-2">
          <b-form-input id="input-2" v-model="order.user.name"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="信箱" label-for="input-1">
          <b-form-input id="input-1" v-model="order.user.email"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="電話" label-for="input-3">
          <b-form-input id="input-3" v-model="order.user.tel"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="地址" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="order.user.address"
          ></b-form-input>
        </b-form-group>
      </b-form>

      <br />
      <b-table
        striped
        hover
        :items="Object.values(order.products)"
        :fields="productsInfo"
      >
        <template v-slot:cell(qty)="{ item }">
          <b-form-spinbutton
            size="sm"
            id="demo-sb"
            v-model="item.qty"
            min="0"
            max="10"
            @change="countTotal(item)"
          />
        </template>

        <template v-slot:cell(total)="{ item }">
          {{ item.final_total }}
        </template>

        <template v-slot:custom-foot="">
          <b-tr>
            <b-td colspan="3"></b-td>
            <b-td>小計</b-td>
            <b-td>{{ order.total }}</b-td>
          </b-tr>
        </template>
      </b-table>

      <div class="text-center">
        <b-button class="mr-2" variant="primary" @click="editOrder()">
          送出
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: { products: {}, user: {} },
      orders: [],
      fields: [
        { key: "create_at", label: "訂單建立時間" },
        { key: "is_paid", label: "付款狀態" },
        { key: "paid_date", label: "付款時間" },
        { key: "total", label: "總金額" },
        { key: "edit", label: "編輯" }
      ],
      productsInfo: [
        { key: "product.title", label: "品名" },
        { key: "qty", label: "數量" },
        { key: "product.unit", label: "分類" },
        { key: "product.price", label: "單價" },
        { key: "total", label: "總計" }
      ]
    };
  },
  methods: {
    getOrderList() {
      var vm = this;
      this.axios
        .get(`${process.env.VUE_APP_HOST}/api/wwlee/orders`)
        .then(response => {
          vm.orders = response.data.orders;
        });
    },
    showInfo(item) {
      this.order = item;
      this.$refs["modal"].show();
    },
    editOrder() {
      var vm = this;
      var api = `${process.env.VUE_APP_HOST}/api/wwlee/admin/order/${vm.order.id}`;
      this.axios.put(api, { data: vm.order }).then(response => {
        console.log(response);
      });
      this.$refs["modal"].hide();
    },
    countTotal(item) {
      item.final_total = item.product.price * item.qty;
      this.order.total = 0;
      for (var key in this.order.products) {
        this.order.total += this.order.products[key].final_total;
      }
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>

<style></style>
