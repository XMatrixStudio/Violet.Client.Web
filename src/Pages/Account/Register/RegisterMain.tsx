import * as React from 'react'
import './RegisterMain.less'
import { Switch, Route } from 'react-router';
import ValidForm from './ValidForm/ValidForm';

export interface IRegisterMainProps {
}

export default function RegisterMain (props: IRegisterMainProps) {
  return (
    <div className="layout-register-main">
      <Switch>
        <Route path="/account/register" component={ValidForm} />
      </Switch>
    </div>
  );
}
