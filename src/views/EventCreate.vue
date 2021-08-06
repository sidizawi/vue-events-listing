<template>
  <div>
    <form @submit.prevent="postEvent">
      <h1>Create an Event</h1>

      <label>Select a category</label>
      <select name="category" v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <h3>Name & describe your event</h3>

      <div class="field">
        <label>Title</label>
        <input
          type="text"
          v-model="event.title"
          placeholder="Add an event title"
        />
      </div>

      <div class="field">
        <label>Description</label>
        <input
          type="text"
          v-model="event.description"
          placeholder="Add a description"
        />
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          type="text"
          v-model="event.location"
          placeholder="Add a location"
        />
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <Datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select name="times" v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradiant" />
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapState } from 'vuex'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.initEvent(),
      times
    }
  },
  methods: {
    initEvent() {
      const user = this.$store.state.user.user
      const id = parseInt(this.$store.state.event.eventsTotal) + 1
      console.log('id == ' + id)

      return {
        id,
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        organizer: user.name,
        category: '',
        attendees: [],
        user
      }
    },
    postEvent() {
      this.$store
        .dispatch('createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.initEvent()
        })
        .catch(() => {})
    }
  },
  computed: mapState(['categories'])
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
