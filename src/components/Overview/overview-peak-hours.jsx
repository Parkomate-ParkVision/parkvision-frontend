import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

export default function OverviewPeakHours({seriesData}) {
  return (
    <Card sx={{ maxWidth: 700, marginRight: 2 }}>
      <CardHeader title="Peak Hours" />
      <CardContent>
        <LineChart
          xAxis={[
            {
              label:'Hours',
              data: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
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
