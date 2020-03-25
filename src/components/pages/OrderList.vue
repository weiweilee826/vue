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
          訂單資訊
        </b-button>
      </template>
    </b-table>

    <!-- 詳細資訊 Modal -->
    <b-modal :hide-footer="true" ref="modal" title="訂單資訊">
      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <b-table
        striped
        hover
        :items="Object.values(products)"
        :fields="productsInfo"
      ></b-table>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        { key: "total", label: "單價" }
      ],
      products: {},
      user: {}
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
      this.user = item.user;
      console.log(item);
      var vm = this;
      this.axios
        .get(`${process.env.VUE_APP_HOST}/api/wwlee/order/${item.id}`)
        .then(response => {
          vm.products = response.data.order.products;
        });
      this.$refs["modal"].show();
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>

<style></style>
