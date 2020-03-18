<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr" href="#">Company name</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <router-link to="/cart"
        ><i class="fas fa-shopping-cart nav-link" style="color:white"></i
      ></router-link>

      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click="signout">Log out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    signout() {
      var vm = this;
      this.$http.post(`${process.env.VUE_APP_HOST}/logout`).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style></style>
