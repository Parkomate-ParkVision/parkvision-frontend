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

export default function ParkingTimes({ seriesData }) {
  return (
    <Card sx={{ }}>
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