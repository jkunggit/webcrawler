import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { hideModal } from '../../actions';
import TableModal from './TableModal';
import MessagModal from './MessageModal';

class RootModal extends Component {
  constructor() {
    super();
  }

  getModalContent() {
    switch (this.props.modalType) {
      case 'table':
        return <TableModal {...this.props} />
      case 'errorMsg':
        return <MessagModal {...this.props} />
      default:
        return null;
    }
  }

  render() {
    console.log(this.props.dataArray);

    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.hideModal}
        size={this.props.modalSize}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.getModalContent()}
      </Modal >
    )
  }
}


const mapStateToProps = (state) => {
  return {
    showModal: state.modal.visible,
    id: state.modal.modalData.id,
    headerTitle: state.modal.modalData.title,
    modalType: state.modal.modalType,
    dataArray: state.modal.modalData.data,
    message: state.modal.message,
    modalSize: state.modal.modalSize
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootModal);