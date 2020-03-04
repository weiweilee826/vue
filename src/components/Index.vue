<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button type="button" class="btn btn-primary" @click="logout">
      Log out
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      var vm = this;
      this.axios
        .post(`${process.env.VUE_APP_HOST}/logout`)
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

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
