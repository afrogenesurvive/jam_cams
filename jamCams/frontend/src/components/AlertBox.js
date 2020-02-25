
import React from 'react';
import Alert from 'react-bootstrap/Alert'

import './alertBox.css'

const AlertBox = (props) => {
  let alert = "Alerts shown here";

  if (props.alert !== null) {
    alert = '"'+props.alert+'"';
  }

return (
  <div className="alertBox">
  <Alert variant="warning">
  {alert}
  </Alert>
  </div>
)

}

export default AlertBox;
