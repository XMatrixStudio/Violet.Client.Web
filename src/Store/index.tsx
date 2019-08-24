import { History } from 'history'
import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore,
  SynchronizedHistory
} from 'mobx-react-router'

class RouterStore extends BaseRouterStore {
  public history: SynchronizedHistory
  constructor(history?: History) {
    super()
    if (history) {
      this.history = syncHistoryWithStore(history, this)
    }
  }
}

export default RouterStore
