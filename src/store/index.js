import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import event from '@/store/modules/event.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  modules: {
    user,
    event
  }
})
