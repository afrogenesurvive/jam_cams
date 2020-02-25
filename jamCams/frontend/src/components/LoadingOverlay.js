import React from 'react';
import Button from 'react-bootstrap/Button';

import "./AttachmentViewer.css"

const LoadingOveray = (props) =>{

return (
  <div className="attachmentViewerBg">
    <div className="loadingOverlay">
      <h5 className="attachmentViewerTitle">status : {props.status} ...</h5>
    </div>
  </div>
)

}


export default LoadingOveray;
