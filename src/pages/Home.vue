<template>
  <div>
    <div>首頁</div>
    <div @click="logout">登出</div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      const API = `${process.env.VUE_APP_HOST}/logout`;
      var vm = this;
      this.axios
        .post(API)
        .then(function(response) {
          if (response.data.success) {
            vm.$router.push("/login");
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
