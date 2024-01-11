// NodeCard.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';

const NodeCard = ({ nodeId, title, description, tags = [] }) => {

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete node with ID:', nodeId);
      await window.electron.deleteNode(nodeId);
      // Refresh your node list or use a state management solution
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  return (
    <Card style={{ cursor: 'pointer', position: 'relative' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          {tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              onDelete={() => console.log(`Removing tag ${tag}...`)} 
              style={{ marginRight: '4px' }} 
            />
          ))}
          <IconButton size="small" onClick={() => console.log('Opening TagManagement...')}>
            <AddIcon />
          </IconButton>
        </div>
      </CardContent>
      <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
        <IconButton onClick={() => console.log('Edit node...')}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default NodeCard;
