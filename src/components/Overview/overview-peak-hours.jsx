import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

export default function OverviewPeakHours(props) {
  const { seriesData = [], sx } = props;
  
  return (
    <Card sx={sx}>
      <CardHeader  title="Peak Hours" />
      <CardContent>
        <LineChart
          xAxis={[
            {
              label:'Hours',
              data: [...Array(24).keys()],
              axisLabel: {
                formatter: (value) => (`${value}AM`),
              },
            },
          ]}
          yAxis={[
            {
              label:'Vehicles Parked',
              axisLabel: {
                formatter: (value) => `${value}`,
              },
            },
          ]}
          series={seriesData}
          width={500}
          height={300}
          animation={{ duration: 800, easing: 'ease-out' }}
        />
      </CardContent>
    </Card>
  );
}
