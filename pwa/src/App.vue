<template>
  <main>
    <div id="app" class="container-fluid">
      <div class="row">
        <Header />
      </div>
      <div class="row">
        <div class="bg-dark p-2 text-center text-light" style="font-size: 0.9rem" v-if="updateExists">
          <strong>
              An update is available,
              <span @click="refreshApp" style="text-decoration: underline; cursor: progress">update now</span>!
          </strong>
      </div>
      </div>
      <div class="row">
        <router-view/>
      </div>
    </div>
  </main>
</template>

<script>
import Header from './components/core/Header.vue'
import updateApp from './mixins/update'

export default {
  components: { Header },
  mixins: [updateApp]
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  background-color: #f0f0f0!important;;
}
</style>
