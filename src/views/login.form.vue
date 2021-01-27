<template>
  <div class="wrapper">
    <div class="centeredForm">
      <label for="login">Login</label>
      <input type="text" name="login" id="login" placeholder="Login" />
      <label for="password">Password</label>
      <input type="password" name="password" id="password" placeholder="Password" />
      <button
        @click="login"
      >
        Log in
      </button>
      <span
        class="errorText textRed"
        v-if="error !== ''"
      >
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      error: '',
    }
  },
  methods: {
    login () {
      let login = document.getElementById('login').value
      let password = document.getElementById('password').value

      this.$fetch(
        'login',
        {
          login: login,
          password: password,
        }
      ).then(
        response => response.json()
      ).then(
        response => {
          if (!response.status) {
            this.error = response.message
            setTimeout(
              () => {
                this.error = ''
              },
              10000
            )
          }
          else
            this.$router.push({ path: '/', params: { propNotes: response.notes } })
        }
      )
    },
  },
}
</script>

<style lang="sass" scoped>
.centeredForm
  display: flex
  flex-flow: column nowrap
  align-self: center
  margin: 15% auto
  padding: 20px

input, label, button, .errorText
  display: flex
  flex: 0 0
  margin: 5px

button
  background: #13aa13
  padding: 10px
  justify-content: center
</style>
