// Sidebar.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; // Icon for the node library toggle
import MapIcon from '@mui/icons-material/Map';

interface SidebarProps {
  toggleNodeLibrary: () => void;
  openWorldMapVisualization: () => void; // New prop
}

function Sidebar({ toggleNodeLibrary, openWorldMapVisualization }: SidebarProps) {
  return (
    <Box className="sidebar" sx={{ width: 50, bgcolor: 'gray.200' }}>
      <Stack spacing={2} direction="column" alignItems="stretch">
        <IconButton aria-label="Toggle Node Library" onClick={toggleNodeLibrary}>
          <LibraryBooksIcon />
        </IconButton>
        <IconButton aria-label="Open World Map Visualization" onClick={openWorldMapVisualization}>
          <MapIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default Sidebar;
