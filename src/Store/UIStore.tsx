import { observable, action } from 'mobx'

export interface IUIState {
  title: string
  extTitle: string
  subTitle: string
}

class UIStore {
  @observable state: IUIState
  constructor() {
    this.state = {
      title: '',
      extTitle: '',
      subTitle: ''
    }
  }

  @action setTitle(title: string, extTitle: string, subTitle: string) {
    this.state.title = title
    this.state.extTitle = extTitle
    this.state.subTitle = subTitle
  }
}

export default UIStore
