import React from 'react';
import { Card } from 'react-bootstrap';

function InfoCard2(props) {
  return (
    <div className='InfoCard'>
      <Card bg="light" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.data.title}</Card.Title>
          <Card.Text>
            {props.data.value}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default InfoCard2;