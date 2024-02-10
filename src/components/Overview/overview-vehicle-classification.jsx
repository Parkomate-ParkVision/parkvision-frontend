import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon
} from '@mui/material';

export default function OverviewVehicleClassification(props) {
    const { data = [], sx } = props;
    return (
        <Card sx={sx}>
            <CardHeader
                
                title="Vehicle Classification"
            />
            <CardContent>
                <PieChart
                    margin={{
                        right: 200
                    }}
                    series={[
                        {
                            data: data.map((item, index) => ({ id: index, value: item.value, label: item.label })),
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    width={600}
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
