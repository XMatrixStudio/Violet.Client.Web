import { observable, action, IReactionDisposer, autorun } from 'mobx'

export interface IUIState {
  title: React.ReactNode
  extTitle: React.ReactNode
  subTitle: React.ReactNode
  shrinkTitle: React.ReactNode
  back?: (() => void) | string
}

export interface IUI {
  sideMenu: boolean
  topBanner: boolean
}

class UIStore {
  @observable state: IUIState
  @observable ui: IUI
  autoSave: IReactionDisposer

  constructor() {
    this.state = {
      title: '',
      extTitle: '',
      subTitle: '',
      shrinkTitle: ''
    }
    const ui = localStorage.getItem('ui_state')
    if (ui && ui !== undefined && ui !== 'undefined') {
      try {
        this.ui = JSON.parse(ui)
      } catch (error) {
        console.log('非法本地存储', error)
      }
    } else {
      this.ui = {
        sideMenu: false,
        topBanner: true
      }
    }

    this.autoSave = autorun(() => {
      localStorage.setItem('ui_state', JSON.stringify(this.ui))
    })
  }

  @action setSideMenu(extend: boolean) {
    this.ui.sideMenu = extend
  }

  @action setTopBanner(extend: boolean) {
    this.ui.topBanner = extend
  }

  @action setTitle(
    title: React.ReactNode,
    subTitle?: React.ReactNode,
    shrinkTitle?: React.ReactNode
  ) {
    console.log('set title ', title)
    this.state.title = title
    if (subTitle !== undefined) {
      this.state.subTitle = subTitle
    }
    if (shrinkTitle !== undefined) {
      this.state.shrinkTitle = shrinkTitle
    } else {
      this.state.shrinkTitle = title
    }
    this.state.back = undefined
  }

  @action setBack(back: (() => void) | string) {
    this.state.back = back
  }

  @action setSubTitle(element: React.ReactNode) {
    this.state.subTitle = element
  }

  @action setShrinkTitle(element: React.ReactNode) {
    this.state.shrinkTitle = element
  }
}

export default UIStore
