<template>
  <div class="spa-nav container-fluid px-0">

    <nav class="navbar text-center navbar-expand-sm pb-2 mb-3 bg-light">
      <div class="mx-auto mb-md-0 mb-2">

      </div>
      <div class="navbar-collapse justify-content-end">
        <div class="nav navbar-nav justify-content-center nav-pills">
          <router-link
            to="/"
            class="nav-item nav-link"
            active-class="active"
            role="link">Home
          </router-link> <!-- .nav-item -->
          <router-link
            to="/news"
            class="nav-item nav-link"
            active-class="active"
            role="link">News
          </router-link> <!-- .nav-item -->

        </div> <!-- .nav -->
      </div> <!-- .navbar-collapse -->
    </nav> <!-- navbar -->

  </div><!-- #spa-nav -->
</template>

<script>
  export default {

    /*global wpData:true*/
    /*eslint no-undef: "error"*/
    data() {
      return {
        vueLogo: `../assets/images/vue-logo.png`
      };
    }
  };
</script>

<style scoped>
  .spa-nav .nav-pills .nav-link.active,
  .spa-nav .nav-pills .show > .nav-link {
    background-color: #42b883;
    border-radius: 0;
  }

  .spa-nav a {
    color: #35495e;
  }
</style>
