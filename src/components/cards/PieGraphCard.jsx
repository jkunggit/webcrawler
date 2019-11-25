import React from 'react';
import { Card } from 'react-bootstrap';
import Chart from "react-apexcharts";
import { getStatusText } from 'http-status-codes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'

function PieGraphCard(props) {
  // we need to get the status code label
  let statusCodeArray = Object.keys(props.data.data);
  let statusCodeLabelArray = [];
  for (var key in statusCodeArray) {
    let statusLabel = getStatusText(statusCodeArray[key]);
    statusCodeLabelArray.push(statusLabel);
  }

  let pieChart = {
    options: {
      labels: statusCodeLabelArray,

      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 400
          },
          legend: {
            position: 'middle'
          }
        }
      }]
    },
    series: Object.values(props.data.data),
  }

  let chartPieStyle = {
    position: 'absolute',
    left: '10px',
    color: '#008ffb',
    fontSize: '1.8rem',
    top: '10px'
  }

  return (
    <div className='pieGraphCard'>
      <Card bg="light">
        <Card.Header>
          <FontAwesomeIcon style={chartPieStyle} icon={faChartPie} />
          <Card.Title>{props.data.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Chart
            options={pieChart.options}
            series={pieChart.series}
            type="donut"
            height="285"
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default PieGraphCard;