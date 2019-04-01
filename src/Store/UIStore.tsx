import { observable, action } from 'mobx'

export interface IUIState {
  extTitle: string
  subTitle: string
}

class UIStore {
  @observable state: IUIState
  constructor() {
    this.state = {
      extTitle: '',
      subTitle: ''
    }
  }

  @action setTitle(extTitle: string, subTitle: string) {
    this.state.extTitle = extTitle
    this.state.subTitle = subTitle
  }
}

export default UIStore
