<template>
  <v-app>
    <v-content>
      <v-container>Hello Nuxt Egg Vuetify</v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo,
  },
  async mounted() {
    const res = await this.$api.home.fetchList()
    console.log(res)
  },
}
</script>

<style lang="stylus">
.container
  min-height 100vh
  display flex
  justify-content center
  align-items center
  text-align center
  background #f5f5f5
</style>

