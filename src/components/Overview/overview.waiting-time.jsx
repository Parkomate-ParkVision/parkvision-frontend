import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, CardHeader, Stack, SvgIcon, Typography } from '@mui/material';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const OverviewWaitingTime = (props) => {
  const { difference, positive = true, value, sx } = props;

  return (
    <Card sx={sx}>
        <div style={{display:'flex',  justifyContent:'space-between'}}>
            <CardHeader title="Estimated Waiting Time"/>
            <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  height: 56,
                  width: 56, 
                  marginRight:5,
                  marginTop:3

                }}
              >
                <SvgIcon>
                  <AccessTimeIcon />
                </SvgIcon>
              </Avatar>
        </div>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          
          </Stack>

          {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
          <Stack
            alignItems="center"
            direction="row"
            spacing={0.5}
          >
          <SvgIcon
            color={positive ? 'success' : 'error'}
            fontSize="small"
          >
          {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </SvgIcon>
          <Typography
            color={positive ? 'success.main' : 'error.main'}
            variant="body2"
          >
            {difference}%
          </Typography>
        </Stack>
        <Typography
          color="text.secondary"
          variant="caption"
        >
          Since last week
        </Typography>
        </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewWaitingTime.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
