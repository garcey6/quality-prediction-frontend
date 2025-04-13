import { createStore } from 'vuex'

export default createStore({
  state: {
    originalData: null,
    workingData: null,
    selectedFeatures: []  // 新增已选特征
  },
  mutations: {
    setOriginalData(state, data) {
      state.originalData = data
    },
    setWorkingData(state, data) {
      state.workingData = data
    },
    setSelectedFeatures(state, features) {  // 新增
      state.selectedFeatures = features
    }
  },
  getters: {
    getOriginalData: state => state.originalData,
    getWorkingData: state => state.workingData,
    getSelectedFeatures: state => state.selectedFeatures  // 新增
  }
})