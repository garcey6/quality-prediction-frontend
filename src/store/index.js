import { createStore } from 'vuex'

export default createStore({
  state: {
    originalData: null,
    workingData: null
  },
  mutations: {
    setOriginalData(state, data) {
      state.originalData = data
    },
    setWorkingData(state, data) {
      state.workingData = data
    }
  },
  getters: {
    getOriginalData: state => state.originalData,
    getWorkingData: state => state.workingData
  }
})