<template>
  <div class="wrapper centeredItems">
    <div
      class="networkError textRed"
      v-if="!this.network"
    >
      Network error! Please refresh page or wait.
    </div>
    <div
      class="greeting"
    >
      Hello {{ $cookie.get('name') }} !
    </div>
    <div class="noteList">
      <div
        class="note"
        v-for="(note, index) in notes"
        :key="index"
      >
        <input
          type="checkbox"
          class="checkbox"
          :checked="note.checked"
        >
        <div class="time">{{ note.created.toLocaleString('UTC') }} UTC</div>
        <div class="wrapper">
          <div class="title">{{ note.title }}</div>
          <div class="text">{{ note.text }}</div>
        </div>
        <div class="timeElapsed">{{ note.timeElapsed }}</div>
      </div>
      <button
        @click="$router.push({ path: '/add_note' })"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: ['propNotes'],
  data () {
    return {
      interval: '',
      network: true,
      notes: [],
    }
  },
  methods: {
    updateNotes () {
      this.$fetch(
        'note_list',
        {
          login: this.$cookie.get('login'),
        }
      ).then(
        response => response.json()
      ).then(
        response => {
          if (response.status) {
            this.network = true
            this.notes = response.notes.map(n => {
              n.timeElapsed = this.timeElapsed(n.created)
              n.created = new Date(n.created)
              return n
            })
          }
          else
            this.network = false
        }
      ).catch(
        e => {
          this.network = false
        }
      )
    },
    timeElapsed (created) {
      let timeElapsed = (Date.now() - created) / 1000 // time in seconds
      let timeElapsedObj = {
        s: Math.floor(timeElapsed % 60),
      }
      timeElapsed = Math.floor(timeElapsed / 60) // time in minutes
      if (timeElapsed > 0) {
        timeElapsedObj.m = timeElapsed % 60
        timeElapsed = Math.floor(timeElapsed / 60) // time in hours
        if (timeElapsed > 0) {
          timeElapsedObj.h = timeElapsed % 24
          timeElapsed = Math.floor(timeElapsed / 24) // time in days
          if (timeElapsed > 0) {
            timeElapsedObj.D = timeElapsed % 30 // TODO: Fix with days in month
            timeElapsed = Math.floor(timeElapsed / 30) // time in months TODO: Fix with days in month
            if (timeElapsed > 0) {
              timeElapsedObj.M = timeElapsed % 12
              timeElapsedObj.Y = Math.floor(timeElapsed / 12)
            }
          }
        }
      }
      return this.timeElapsedString(timeElapsedObj)
    },
    timeElapsedString (time) {
      if (!time.Y && !time.M && !time.D && !time.h && !time.m && !time.s)
        return 'Just now'
      if (time.Y)
        return time.Y + ' year(s) ago'
      if (time.M)
        return time.M + ' month(s) ago'
      if (time.D)
        return time.D + ' day(s) ago'
      if (time.h)
        return time.h + ' hour(s) ago'
      if (time.m)
        return time.m + ' minute(s) ago'
      if (time.s)
        return time.s + ' second(s) ago'
    },
  },
  created () {
    if (this.propNotes) // after login
      this.notes = this.propNotes
    else // authorised by cookies
      this.updateNotes()

    this.interval = setInterval(
      this.updateNotes,
      15000
    )
  },
  beforeDestroy () {
    if (this.interval)
      clearInterval(this.interval)
  },
}
</script>

<style lang="sass" scoped>
.centeredItems
  align-items: center

.noteList
  display: flex
  flex: 1 0
  flex-flow: column nowrap
  background-color: wheat

.note
  display: flex
  flex: 1 0
  flex-flow: row nowrap
  justify-content: space-between
  padding: 0.3rem

  *
    display: flex
    flex: 1 0
    margin: 0.3rem

.checkbox
  flex-grow: 0
  align-self: center

.time, .timeElapsed
  align-items: center
  white-space: nowrap
  font-size: 0.7em
  color: grey
  flex: 0

.title
  white-space: nowrap
  font-size: 1.3em

button
  background: #13aa13
  padding: 10px
  justify-content: center
</style>
