import React from 'react';
import { Card } from 'react-bootstrap';
import Chart from "react-apexcharts";

function LineGraphCard(props) {
  console.log(props)
  let lineGraph = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: Object.keys(props.data.data)
      }
    },
    series: [
      {
        name: props.data.axisLabel,
        data: Object.values(props.data.data)
      }
    ]
  };

  return (
    <div className='lineGraphCard'>
      <Card bg="light">
        <Card.Header>{props.data.title}: {props.data.value}</Card.Header>
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