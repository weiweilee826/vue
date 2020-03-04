<template>
  <div>
    <Nav />
    <div class="container-fluid">
      <div class="row">
        <Side />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
import Side from "./Side.vue";
export default {
  components: {Nav, Side}
};
</script>

<style></style>
