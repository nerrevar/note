<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (!this.$cookie.get('login') || !this.$cookie.get('name'))
      if (this.$router.currentRoute.path !== '/login')
        this.$router.push({ path: '/login' })
  },
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0

.wrapper
  width: 100%
  height: 100%
  display: flex
  flex-direction: column

.textRed
  font-color: red
</style>
