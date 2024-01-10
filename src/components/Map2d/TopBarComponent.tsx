import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import '../../styles/TopBarComponent.scss';

const TopBarComponent: React.FC = () => {
  const [themeInput, setThemeInput] = useState('');
  const [precisionInput, setPrecisionInput] = useState('');
  const [showThemesDropdown, setShowThemesDropdown] = useState(false);
  const [showPrecisionDropdown, setShowPrecisionDropdown] = useState(false);

  const themes = ['Literature', 'Politics', 'Science', 'Art', 'Economics'];
  const precisions = ['1000', '500', '100', '50', '10'];

  return (
    <Box className="top-bar" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
      {/* Theme Selector */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Theme"
          value={themeInput}
          onChange={(e) => setThemeInput(e.target.value)}
          onFocus={() => setShowThemesDropdown(true)}
          onBlur={() => setTimeout(() => setShowThemesDropdown(false), 150)}
          variant="outlined"
          size="small"
        />
        <IconButton onClick={() => setShowThemesDropdown(!showThemesDropdown)}>
          <ArrowDropDownIcon />
        </IconButton>
      </Box>

      {/* Precision Selector */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Precision"
          value={precisionInput}
          onChange={(e) => setPrecisionInput(e.target.value)}
          onFocus={() => setShowPrecisionDropdown(true)}
          onBlur={() => setTimeout(() => setShowPrecisionDropdown(false), 150)}
          variant="outlined"
          size="small"
        />
        <IconButton onClick={() => setShowPrecisionDropdown(!showPrecisionDropdown)}>
          <ArrowDropDownIcon />
        </IconButton>
      </Box>

      {/* Timeline Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
       <Button variant="contained">-2000 - -1000</Button>
       <Button variant="contained">-1000 - 0</Button>
       <Button variant="contained">0 - 1000</Button>
        <Button variant="contained">1000-2000</Button>
        <Button variant="contained">2000-3000</Button>
        {/* ... more buttons */}
      </Box>
    </Box>
  );
};

export default TopBarComponent;
