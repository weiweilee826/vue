<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <router-link to="/cart">
        <i class="fas fa-shopping-cart nav-link" style="color:white"
      /></router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signOut">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods:{
    signOut(){
      const API = `${process.env.VUE_APP_HOST}/logout`;
      var vm = this;
      this.axios
        .post(API)
        .then(function(response) {
          if (response.data.success) {
            vm.$router.push("/login");
          } else {
            vm.$bus.$emit('pop',response.data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
