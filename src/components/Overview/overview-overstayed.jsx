import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, Card, CardContent,ListItemText ,IconButton , CardHeader,ListItemAvatar, Stack, SvgIcon, Typography, ListItem, List } from '@mui/material';
// import { MdTaxiAlert } from 'react-icons/md';
// import { FaCarAlt } from 'react-icons/fa';
// import { RiMotorbikeFill } from 'react-icons/ri';

export const OverviewOverstayed = (props) => {
  const { vehicles = [], sx } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Automatically slide every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
    }, 2000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [vehicles.length]);

  return (
    <Card sx={sx}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <CardHeader title="Vehicles Overstayed" />
            <SvgIcon style={{ marginRight: '2.5rem', marginTop:0,marginBottom:15,alignSelf: 'flex-end' }}>
              {/* <MdTaxiAlert /> */}
            </SvgIcon>
        </div>
      <CardContent>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <List
            style={{
              display: 'flex',
              transition: 'transform 0.5s',
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {vehicles.map((vehicle, index) => {
              const hasDivider = index < vehicles.length - 1;
              const ago = formatDistanceToNow(vehicle.entry_time.subHours(now, 25).getTime());

              return (
                <ListItem
                //   divider={hasDivider}
                  key={product.id}
                  style={{ flex: '0 0 100%' }}
                >
                  <ListItemAvatar>
                    {/* {product.wheels === 4 ? <FaCarAlt /> : <RiMotorbikeFill />} */}
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                    secondary={`Parked ${ago} ago`}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </CardContent>
      
    </Card>
  );
};

OverviewOverstayed.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
