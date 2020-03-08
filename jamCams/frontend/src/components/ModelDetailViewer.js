import React from 'react';
import Button from 'react-bootstrap/Button';
import ModelDetail from './Models/ModelDetail';

import "./AttachmentViewer.css"

const ModelDetailViewer = (props) =>{

return (
  <div className="attachmentViewerBg">
    <div className="attachmentViewer">
    <Button variant="danger" className="attachmentViewerCloseButton" onClick={props.onHideModelDetail}>
      x
    </Button>

    <ModelDetail
      authId={props.authId}
      model={props.model}
    />

    </div>
  </div>
)

}


export default ModelDetailViewer;
