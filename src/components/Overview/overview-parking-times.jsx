import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon
  } from '@mui/material';

export default function ParkingTimes(props) {
  const { seriesData = [], sx } = props;
  return (
    <Card sx={sx}>
    <CardHeader

      title="Average Parking Times"
    />
    <CardContent>
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Economy Vehicles', 'Mid-range vehicles', 'Premium Vehicles'] }]}
      yAxis={[{label:"Average Parking time (hours)"}]}
      series={seriesData}
      width={500}
      height={300}
    />
    
    
    </CardContent>
  </Card>

  );
}