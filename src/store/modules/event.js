import EventService from '@/services/EventService.js'

export default {
  state: {
    events: [],
    event: {},
    eventsTotal: 0
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTSTOTAL(state, total) {
      state.eventsTotal = total
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    ADD_EVENTSTOTAL(state) {
      state.eventsTotal += 1
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then((res) => {
          commit('ADD_EVENT', res.data)
          commit('ADD_EVENTSTOTAL')
        })
        .catch(() => {})
    },
    fetchEvents({ commit }, { limit, page }) {
      EventService.getEvents(limit, page)
        .then((res) => {
          commit('SET_EVENTS', res.data)
          console.log(res.headers['x-total-count'])
          commit('SET_EVENTSTOTAL', res.headers['x-total-count'])
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then((res) => {
            commit('SET_EVENT', res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id == id)
    }
  }
}
