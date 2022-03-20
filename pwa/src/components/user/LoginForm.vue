<template>
  <form v-on:submit="handleLogin" class="w-100">
    <div v-if="message !== ''" :class="`alert alert-${messageClass} pt-1 pb-1`" style="font-weight: bold">
      {{ message }}
    </div>
    <div class="mb-3">
      <label for="username">Username</label>
      <input 
        type="text" 
        class="form-control" 
        id="username"
        v-model="username"
        placeholder="Username"
        onfocus='this.placeholder=""'
        onblur='this.placeholder="Username"'
        autocomplete="off"
      />
    </div>
    <div class="mb-3">
      <label for="password">
        Password [<span class="text-primary" style="cursor: pointer" @click="showPassword = !showPassword">{{ showPassword ? 'hide' : 'show' }}</span>]
      </label>
      <input 
        :type="showPassword ? 'text' : 'password'" 
        class="form-control" 
        id="password"
        v-model="password"
        placeholder="Password"
        onfocus='this.placeholder=""'
        onblur='this.placeholder="Password"'
        autocomplete="off"
      />
     
    </div>
    <div style="text-align: right">
      <b-button type="submit" variant="primary">
        Login 
        <b-icon v-if="submitting" icon="arrow-clockwise" animation="spin"></b-icon>
        <b-icon v-else icon="arrow-right-square"></b-icon>
      </b-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      nextPath: '/',
      errorMessage: '',
      message: "",
      messageClass: "",
      showPassword: false,
      submitting: false
    };
  },
  mounted() {
    this.updateAfterLoginNextPath();
  },
  methods: {
    handleLogin(event) {
      event.preventDefault();
      this.submitting = true
      this.message = "Processing..."
      this.messageClass = "info"
      if ( !this.username || !this.password ) {
        this.message = "Please enter your username and password to login."
        this.messageClass = 'warning'
        this.submitting = false
        return
      }

      this.login({username: this.username, password: this.password})
        .then(() => {
          this.username = ""
          this.password = ""
          this.messageClass = 'success'
          this.message = "Login success. Redirecting..."
          this.$router.push(this.nextPath)
        })
        .catch(() => {
          this.messageClass = 'danger'
          this.message = "Incorrect credentials"
        })
      this.submitting = false
    },
    updateAfterLoginNextPath() {
      if ('next' in this.$route.query) {
        this.nextPath = '/';
      }
    },
    ...mapActions([
      'login',
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  max-width:400px;
  margin: 0 auto;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>