import { observable, action } from 'mobx'

export interface IUIState {
  title: string
  extTitle: string
  subTitle: string
  shrinkTitle: string
  subElement?: React.ReactNode
}

class UIStore {
  @observable state: IUIState
  constructor() {
    this.state = {
      title: '',
      extTitle: '',
      subTitle: '',
      shrinkTitle: ''
    }
  }

  @action setTitle(
    title: string,
    extTitle?: string,
    subTitle?: string,
    shrinkTitle?: string
  ) {
    this.state.title = title
    if (extTitle !== undefined) {
      this.state.extTitle = extTitle
    }
    if (subTitle !== undefined) {
      this.state.subTitle = subTitle
      this.state.subElement = undefined
    }
    if (shrinkTitle !== undefined) {
      this.state.shrinkTitle = shrinkTitle
    } else {
      this.state.shrinkTitle = title
    }
  }

  @action setShrinkTitle(title: string) {
    this.state.shrinkTitle = title
  }

  @action setSubTitle(title: string) {
    this.state.subTitle = title
  }

  @action setSubElement(element: React.ReactNode) {
    this.state.subElement = element
  }
}

export default UIStore
