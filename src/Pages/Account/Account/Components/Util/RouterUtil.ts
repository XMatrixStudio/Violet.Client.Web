import { History, Location } from 'history'

export default {
  GoBackAccount: (history: History, location: Location) => {
    if (history.length > 2 && location.key !== undefined) {
      history.goBack()
    } else {
      history.replace('/account')
    }
  }
}
