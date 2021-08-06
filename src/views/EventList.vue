<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page > 1">
      <router-link
        :to="{
          name: 'event-list',
          query: {
            page: page - 1
          }
        }"
        rel="prev"
      >
        Prev Page
      </router-link>
      <template v-if="displayNext"> | </template>
    </template>
    <template v-if="displayNext">
      <router-link
        :to="{
          name: 'event-list',
          query: {
            page: page + 1
          }
        }"
      >
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      limit: 3
    }
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      limit: this.limit,
      page: this.page
    })
  },
  computed: {
    displayNext() {
      return this.page * this.limit < this.event.eventsTotal
    },
    page() {
      return this.$route.query.page || 1
    },
    ...mapState(['user', 'event'])
  }
}
</script>
