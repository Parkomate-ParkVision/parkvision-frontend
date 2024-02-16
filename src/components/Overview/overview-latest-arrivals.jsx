import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import { FaCarAlt } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";


export const OverviewLatestArrivals = (props) => {
  const { vehicles = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Arrivals" />
      <List>
        {vehicles.map((vehicle, index) => {
          const hasDivider = index < vehicles.length - 1;
          const entry = new Date(vehicle.entry_time)
          const ago = formatDistanceToNow(entry);
          const numberPlate = vehicle.number_plate;
          return (
            <ListItem
              divider={hasDivider}
              key={vehicle.id}
            >
              <ListItemAvatar>
                <FaCarAlt/>
              </ListItemAvatar>
              <ListItemText
                primary={numberPlate.slice(0, 2) + " " + numberPlate.slice(2, 4) + " " + numberPlate.slice(4)}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Arrived ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              {/* <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton> */}
            </ListItem>
          );
        })}
      </List>
      {/* <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions> */}
    </Card>
  );
};

OverviewLatestArrivals.propTypes = {
  vehicles: PropTypes.array,
  sx: PropTypes.object
};
