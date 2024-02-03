import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ExtensionIcon from '@mui/icons-material/Extension';
import CustomizeIcon from '@mui/icons-material/Tune'; // You can choose an appropriate icon
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

const moduleIcons = {
  Profile: <AccountCircleIcon />,
  Settings: <SettingsIcon />,
  Subscriptions: <SubscriptionsIcon />,
  'Manage Extensions': <ExtensionIcon />,
  'Customize Sidebar': <CustomizeIcon />,
};

const InnerSidebar = ({ onModuleSelect, selectedModule }) => {
  const theme = useTheme();
  const modules = Object.keys(moduleIcons);

  return (
    <List component="nav" sx={{ width: '100%', maxWidth: 360, bgcolor: theme.palette.background.paper }}>
      {modules.map((module) => (
        <React.Fragment key={module}>
          <ListItem
            button
            selected={selectedModule === module}
            onClick={() => onModuleSelect(module)}
          >
            <ListItemIcon>
              {moduleIcons[module]}
            </ListItemIcon>
            <ListItemText primary={module} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default InnerSidebar;
