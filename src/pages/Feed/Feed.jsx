import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { camfeed } from '../../data/camfeed';

const Feed = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList centered onChange={handleChange} aria-label="lab API tabs example">
            {camfeed.map((cam) => (
              <Tab key={cam.id} label={`Camera ${cam.id}`} value={cam.id.toString()} />
            ))}
          </TabList>
        </Box>
        {camfeed.map((cam) => (
          <TabPanel key={cam.id} value={cam.id.toString()}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <video loop autoPlay src={cam.src}></video>
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Feed;
