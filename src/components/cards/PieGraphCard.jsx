import React from 'react';
import { Card } from 'react-bootstrap';
import Chart from "react-apexcharts";
import { getStatusText } from 'http-status-codes';

function PieGraphCard(props) {
  console.log(props)
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
    series: Object.values(props.data.data)
  }

  return (
    <div className='pieGraphCard'>
      <Card bg="light">
        <Card.Header>{props.data.title}</Card.Header>
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