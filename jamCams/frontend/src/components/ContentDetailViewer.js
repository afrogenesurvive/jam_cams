import React from 'react';
import Button from 'react-bootstrap/Button';
import ContentDetail from './Content/ContentDetail';

import "./AttachmentViewer.css"

const ContentDetailViewer = (props) =>{

return (
  <div className="attachmentViewerBg">
    <div className="attachmentViewer">
    <Button variant="danger" className="attachmentViewerCloseButton" onClick={props.onHideContentDetail}>
      x
    </Button>

    <ContentDetail
      authId={props.authId}
      content={props.content}
      canDelete={props.canDelete}
      onDelete={props.onDelete}
    />

    </div>
  </div>
)

}


export default ContentDetailViewer;
