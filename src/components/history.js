import React from 'react';
import { withRouter } from 'react-router';

// variable which will point to react-router history
let globalHistory = null;

// component which we will mount on top of the app
class Spy extends React.Component {
  constructor(props) {
    super(props)
    globalHistory = props.history;
  }

  componentDidUpdate() {
    globalHistory = this.props.history;
  }

  render(){
    return null;
  }
}

export const GlobalHistory = withRouter(Spy);

// export react-router history
export default function getHistory() {
  return globalHistory;
}
