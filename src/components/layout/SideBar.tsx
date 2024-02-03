import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront'; // Icon for the extension market

interface SidebarProps {
  toggleNodeLibrary: () => void;
  openWorldMapVisualization: () => void;
  openUserDashboard: () => void;
  openExtensionMarket: () => void; // New prop for opening extension market
}

function Sidebar({ toggleNodeLibrary, openWorldMapVisualization, openUserDashboard, openExtensionMarket }: SidebarProps) {
  return (
    <Box className="sidebar" sx={{ width: 50, bgcolor: 'gray.200' }}>
      <Stack spacing={2} direction="column" alignItems="stretch">
        <IconButton aria-label="Open User Dashboard" onClick={openUserDashboard}>
          <DashboardIcon />
        </IconButton>
        <IconButton aria-label="Toggle Node Library" onClick={toggleNodeLibrary}>
          <LibraryBooksIcon />
        </IconButton>
        <IconButton aria-label="Open World Map Visualization" onClick={openWorldMapVisualization}>
          <MapIcon />
        </IconButton>
        <IconButton aria-label="Open Extension Market" onClick={openExtensionMarket}>
          <StorefrontIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default Sidebar;
