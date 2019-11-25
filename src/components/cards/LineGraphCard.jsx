import React from 'react';
import { Card } from 'react-bootstrap';
import Chart from "react-apexcharts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'

function LineGraphCard(props) {

  let lineGraph = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: Object.keys(props.data.data),
        title: {
          text: 'Seconds'
        },
      },
      yaxis: {
        title: {
          text: 'Frequency'
        }
      }
    },
    series: [
      {
        name: props.data.yaxisLabel,
        data: Object.values(props.data.data),
      }
    ],

    legend: {
      onItemClick: {
        toggleDataSeries: true
      },
    }
  };

  let chartLineStyle = {
    position: 'absolute',
    left: '10px',
    color: '#008ffb',
    fontSize: '1.8rem',
    top: '10px'
  }

  return (
    <div className='lineGraphCard'>
      <Card bg="light">
        <Card.Header>
          <FontAwesomeIcon style={chartLineStyle} icon={faChartLine} />
          <Card.Title>{props.data.title}: {props.data.value}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Chart
            options={lineGraph.options}
            series={lineGraph.series}
            type="line"
            width="600"
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default LineGraphCard;