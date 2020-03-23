<template>
  <div>
    <div class="text-right m-4">
      <button type="button" class="btn btn-primary" v-b-modal.modal-1>
        新增優惠券
      </button>
    </div>

    <!-- 優惠券列表 -->
    <b-table striped hover :fields="fields" :items="coupons">
      <template v-slot:cell(edit)="coupon">
        <b-button size="sm" @click="openModal(coupon.item)" class="mr-2">
          編輯
        </b-button>
        <b-button size="sm" @click="deleteModal(coupon.item.id)" class="mr-2 btn btn-danger">
          刪除
        </b-button>
      </template>
    </b-table>

    <!-- 優惠券 Modal -->
    <b-modal id="modal-1" ref="my-modal" :title="'優惠券'" :hide-footer="true">
      <b-form @submit="submit()">
        <!-- 標題 -->
        <b-form-group id="input-group-1" label="標題" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.title"
            required
            placeholder="請輸入標題"
          ></b-form-input>
        </b-form-group>

        <!-- 已啟用 -->
        <b-form-group id="input-group-2" label="啟用狀態">
          <b-form-radio v-model="form.is_enabled" name="some-radios" :value="1"
            >已啟用</b-form-radio
          >
          <b-form-radio v-model="form.is_enabled" name="some-radios" :value="0"
            >未啟用</b-form-radio
          >
        </b-form-group>

        <!-- 打折 -->
        <b-form-group id="input-group-3" label="折扣" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.percent"
            required
            placeholder="請輸入折扣"
          ></b-form-input>
        </b-form-group>

        <!-- 到期日 -->
        <label for="example-datepicker">到期日</label>
        <b-form-datepicker
          id="example-datepicker"
          v-model="datepicker"
          class="mb-2"
          value-as-date
        ></b-form-datepicker>

        <!-- 折扣碼 -->
        <b-form-group id="input-group-4" label="折扣碼" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.code"
            required
            placeholder="請輸入折扣碼"
          ></b-form-input>
        </b-form-group>

        <div class="text-right mt-4">
          <b-button type="submit" variant="primary">送出</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        is_enabled: 1,
        percent: "",
        due_date: '',
        code: ""
      },
      datepicker: '',
      coupons: [],
      fields: [
        {
          key: "title",
          label: "產品名稱"
        },
        {
          key: "percent",
          label: "打折"
        },
        {
          key: "due_date",
          label: "到期日"
        },
        {
          key: "code",
          label: "折扣碼"
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
      show: true,
      id: ""
    };
  },
  methods: {
    addCoupon() {
      var vm = this;
      this.axios
        .post(`${process.env.VUE_APP_HOST}/api/wwlee/admin/coupon`, {
          data: vm.form
        })
        .then(response => {
          this.getCoupons();
          this.$refs["my-modal"].hide();
          console.log(response);
        });
    },
    getCoupons() {
      var vm = this;
      this.axios
        .get(`${process.env.VUE_APP_HOST}/api/wwlee/admin/coupons`)
        .then(response => {
          vm.coupons = response.data.coupons;
        });
    },
    openModal(coupon) {
      this.form = coupon;
      this.datepicker = new Date(coupon.due_date * 1000);
      this.$refs["my-modal"].show();
    },
    submit() {
      if (this.form.id == undefined) {
        this.addCoupon();
      } else {
        var vm = this;
        this.axios
          .put(
            `${process.env.VUE_APP_HOST}/api/wwlee/admin/coupon/${vm.form.id}`,
            {
              data: vm.form
            }
          )
          .then(response => {
            console.log(response);
          });
      }
    },
    deleteModal(id) {
      // var vm = this;
      this.axios
        .delete(`${process.env.VUE_APP_HOST}/api/wwlee/admin/coupon/${id}`)
        .then(response => {
          console.log(response);
          this.getCoupons();
        });
    }
  },
  watch: {
    datepicker: function() {
      this.form.due_date = this.datepicker.getTime() / 1000;
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>

<style></style>
