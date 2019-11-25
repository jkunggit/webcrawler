import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showModal } from '../../actions/';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'


class InfoCard extends Component {

  constructor(props) {
    super(props);
  }

  showModal() {
    this.props.showModal({ visible: true, modalType: 'table', modalData: this.props.data });
  }

  render() {
    return (
      <div className='InfoCard'>
        <Card bg="light" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{this.props.data.title}</Card.Title>
            <Card.Text>
              {this.props.data.value}
            </Card.Text>
          </Card.Body>
          <Card.Footer className='viewBtn' onClick={this.showModal.bind(this)}>
            <FontAwesomeIcon icon={faBullseye} />
            <span style={{marginLeft: '10px'}}>View</span>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (obj) => dispatch(showModal(obj))
  };
};

export default connect(null, mapDispatchToProps)(InfoCard);