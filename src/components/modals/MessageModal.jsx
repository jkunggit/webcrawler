import React from 'react';
import { Modal } from 'react-bootstrap';

const MessageModal = (props) => {

  let messageSettings = {
    errorMsg: {
      title: 'Error',
      style: {
        header: {
          background: 'red'
        }
      }
    },
    infoMsg: {
      title: 'Info',
      style: {
        header: {
          background: 'green'
        }
      }
    }
  };


  let headerStyle = messageSettings[props.modalType].style.header;
  let title = messageSettings[props.modalType].title;
  return (
    <React.Fragment>
      <Modal.Header closeButton style={headerStyle}>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.message}
      </Modal.Body>
    </React.Fragment>
  );
}

export default MessageModal;