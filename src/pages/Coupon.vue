<template>
  <div>
    <b-button v-b-modal.modal-1>新增優惠券</b-button>

    <b-modal id="modal-1" title="BootstrapVue" hide-footer>
      <b-form @submit.prevent="submit">
        <b-form-group
          id="input-group-1"
          label="Title:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.title"
            required
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4">
          <b-form-checkbox
            id="checkbox-1"
            v-model="form.is_enabled"
            name="checkbox-1"
            :value="1"
            :unchecked-value="0"
            >enabled
          </b-form-checkbox>
        </b-form-group>
        <b-form-group id="input-group-2" label="Percent:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="number"
            v-model="form.percent"
            required
            placeholder="Enter percent"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Due Date:" label-for="input-3">
          <b-form-datepicker
            id="example-datepicker"
            v-model="form.datepicker"
            class="mb-2"
            value-as-date
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group id="input-group-5" label="Code:" label-for="input-5">
          <b-form-input
            id="input-5"
            type="text"
            v-model="form.code"
            required
            placeholder="Enter code"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>

    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(button)="data">
        <b-button class="mr-2" size="sm" @click="editModal(data.item)"
          >編輯</b-button
        >
        <b-button class="mr-2" size="sm" @click="del(data.item.id)"
          >刪除</b-button
        >
      </template>
    </b-table>
    <b-pagination-nav
      :link-gen="linkGen"
      :number-of-pages="totalPage"
      use-router
    ></b-pagination-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      form: {
        title: "title",
        is_enabled: 1,
        due_date: Math.floor(new Date().getTime() / 1000),
        datepicker: new Date(),
        code: "aaa",
        percent: 100
      },
      fields: [
        {
          key: "title",
          label: "標題"
        },
        {
          key: "code",
          label: "號碼"
        },
        {
          key: "due_date",
          label: "有效日期",
          // formatter: value =>
          //   new Date(value * 1000).toISOString().replace(/(?=T).*/g, "")
        },
        {
          key: "percent",
          label: "折扣%"
        },
        {
          key: "is_enabled",
          label: "是否啟用",
          formatter: value => (value ? "已啟用" : "未啟用")
        },
        {
          key: "button",
          label: "操作"
        }
      ],
      totalPage: 1
    };
  },
  methods: {
    getCoupons(page) {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/admin/coupons?page=${page}`;
      this.axios
        .get(API)
        .then(function(response) {
          vm.items = response.data.coupons;
          vm.totalPage = response.data.pagination.total_pages;
          if (!response.data.success) {
            vm.$bus.$emit("pop", response.data.message, "danger");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    add() {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/admin/coupon`;
      this.axios
        .post(API, { data: vm.form })
        .then(function(response) {
          vm.$bvModal.hide("modal-1");
          vm.getCoupons(vm.$route.params.page);
          if (!response.data.success) {
            vm.$bus.$emit("pop", response.data.message, "danger");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    linkGen(pageNum) {
      return `/dashboard/coupon${pageNum === 1 ? `` : `/${pageNum}`}`;
    },
    editModal(item) {
      this.$bvModal.show("modal-1");
      this.form = item;
    },
    edit() {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/admin/coupon/${this.form.id}`;
      this.axios
        .put(API, { data: this.form })
        .then(function(response) {
          vm.$bvModal.hide("modal-1");
          vm.getCoupons(vm.$route.params.page);
          vm.form = {
            title: "title",
            is_enabled: 1,
            due_date: Math.floor(new Date().getTime() / 1000),
            datepicker: new Date(),
            code: "aaa",
            percent: 100
          };
          if (!response.data.success) {
            vm.$bus.$emit("pop", response.data.message, "danger");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    del(id) {
      const vm = this;
      const API = `${process.env.VUE_APP_HOST}/api/wwlee/admin/coupon/${id}`;
      this.axios
        .delete(API)
        .then(function(response) {
          vm.getCoupons(vm.$route.params.page);
          if (!response.data.success) {
            vm.$bus.$emit("pop", response.data.message, "danger");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit() {
      if (this.form.id) {
        this.edit();
      } else {
        this.add();
      }
    }
  },
  created() {
    this.getCoupons(this.$route.params.page);
  },
  watch: {
    $route() {
      this.getCoupons(this.$route.params.page);
    },
    "form.due_date": function() {
      var datepicker = new Date(this.form.due_date * 1000);
      if (datepicker !== this.form.datepicker) {
        this.form.datepicker = datepicker;
      }
    },
    "form.datepicker": function() {
      var due_date = Math.floor(this.form.datepicker.getTime() / 1000);
      if (due_date !== this.form.due_date) {
        this.form.due_date = due_date;
      }
    }
  }
};
</script>

<style></style>
