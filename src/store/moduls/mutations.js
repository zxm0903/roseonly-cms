

export default {
  changeSelectData(state, payload) {
    state.selectData = payload.amount
  },
  changecheckimgs(state, data) {
    state.checkimgs = data
  },
  changeisuploads(state, bool) {
    state.isuploads = bool
  },
  pushimgdata(state, data) {
    state.imgdatas.push(data)
  },
  changeimgdata(state,data){
    state.imgdatas = data
  }
}