<template>
  <div class="vh-100" id="LoginPage">
      <div class="container">
        <div class="row">
          <div class="col-lg-8"></div>
          <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
            <div class="card mt-5 p-4 loginCard">
              <div class="card-body">
                <h3 class="text-center mb-4">Sign In</h3>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import LoginForm from "../components/user/LoginForm"
export default {
    components: { LoginForm },
    created() {
      if (this.$store.state.isAuthenticated) {
        this.$router.push({path: "/"})
      }
    }
}
</script>

<style scoped>
#LoginPage {
  background: url('../assets/auth-bg.jpeg') center center no-repeat;
  background-size: cover;
}

.loginCard {
  opacity: 0.95;
  border-radius: 10px;
}
</style>