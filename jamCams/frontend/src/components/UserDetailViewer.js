import React from 'react';
import Button from 'react-bootstrap/Button';
import UserDetail from './Users/UserDetail';

import "./AttachmentViewer.css"

const UserDetailViewer = (props) =>{

return (
  <div className="attachmentViewerBg">
    <div className="attachmentViewer">
    <Button variant="danger" className="attachmentViewerCloseButton" onClick={props.onHideUserDetail}>
      x
    </Button>

    <UserDetail
      authId={props.authId}
      user={props.user}
    />

    </div>
  </div>
)

}


export default UserDetailViewer;
