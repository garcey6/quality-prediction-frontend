import { createStore } from 'vuex'

export default createStore({
  state: {
    originalData: null,
    workingData: null,
    selectedFeatures: [],
    modelType: '',
  },
  mutations: {
    setOriginalData(state, data) {
      state.originalData = data
    },
    setWorkingData(state, data) {
      state.workingData = data
    },
    setSelectedFeatures(state, features) {
      state.selectedFeatures = features
    },
    setModelType(state, modelType) {  // 新增
      state.modelType = modelType
    }
  },
  getters: {
    getOriginalData: state => state.originalData,
    getWorkingData: state => state.workingData,
    getSelectedFeatures: state => state.selectedFeatures,
    getModelType: state => state.modelType  // 新增
  }
})