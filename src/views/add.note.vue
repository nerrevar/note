<template>
  <div class="wrapper centeredItems">
    <router-link :to="{ name: 'Main' }">&#x2190; Back</router-link>
    <div class="centeredItems">
      <div class="innerWrapper">
        <label for="title">Note title:</label>
        <input type="title" name="title" id="title" />
        <label for="text">Note text:</label>
        <input type="text" name="text" id="text" />
        <button
          @click="add"
        >
          Add
        </button>
        <div
          class="textRed"
          v-if="message !== ''"
        >
          Error: {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddNote',
  data () {
    return {
      message: '',
    }
  },
  methods: {
    add () {
      const title = document.getElementById('title').value.trim()
      const text = document.getElementById('text').value.trim()

      if (!title) {
        alert('Title can\'t be empty')
        return
      }
      if (!text) {
        alert('Text can\'t be empty')
        return
      }

      this.$fetch(
        'add_note',
        {
          login: this.$cookie.get('login'),
          title: title,
          text: text,
        }
      ).then(
        response => response.json()
      ).then(
        response => {
          if (response.status)
            this.$router.push({ path: '/' })
          else
            this.message = response.message
          setTimeout(
            () => {
              this.message = ''
            },
            10000
          )
        }
      )
    },
  },
}
</script>

<style lang="sass" scoped>
.centeredItems
  display: flex
  flex: 1 0
  flex-flow: column nowrap
  align-items: center

.innerWrapper
  display: flex
  flex: 0 0
  flex-flow: column nowrap

input, label, .result, button
  display: flex
  flex: 1 0

button
  background: #13aa13
  padding: 10px
  justify-content: center
</style>
