<template>
  <div class="">

    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-4 mb-5">
          <Profile :loading='loading' />
        </div>
        <div class="col-lg-8 mt-1">
          <h1>Vue PWA</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from "../components/user/Profile"

export default {
  name: 'Home',
  components: { Profile },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    let vm = this
    setTimeout(function(vm){
      vm.loading = false
    }, 1500, vm)
  }
}
</script>

<style scoped>
label {
  font-weight: bold!important;
  margin-bottom: 5px!important;
}
.actionIcon {
    box-shadow: none!important;
    background: transparent!important;;
}
option, select {
  font-weight: bold!important;
  color: #575656;
}
select {
  border: 2px solid #575656;
}
</style>