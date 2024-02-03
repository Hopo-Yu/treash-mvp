import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InnerSidebar from './InnerSidebar';
import Profile from './Profile';
import Settings from './Settings';
import Subscriptions from './Subscriptions';
import ManageExtensions from './ManageExtensions';
import CustomizeSidebar from './CustomizeSidebar';

const Dashboard = () => {
  const [selectedModule, setSelectedModule] = useState('Profile');

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const renderSelectedModule = () => {
    switch (selectedModule) {
      case 'Profile':
        return <Profile />;
      case 'Settings':
        return <Settings />;
      case 'Subscriptions':
        return <Subscriptions />;
      case 'Manage Extensions':
        return <ManageExtensions />;
      case 'Customize Sidebar':
        return <CustomizeSidebar />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
      <Grid item xs={3}>
        <InnerSidebar onModuleSelect={handleModuleSelect} selectedModule={selectedModule} />
      </Grid>
        <Grid item xs={9}>
          {renderSelectedModule()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
