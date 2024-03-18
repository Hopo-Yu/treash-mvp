// EditNodeModal.tsx
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


interface EditNodeModalProps {
  open: boolean;
  onClose: () => void;
  nodeId: number; // Assuming nodeId is a number. Adjust accordingly if it's not.
  currentTitle: string;
  currentDescription: string;
  onEditSuccess?: () => void; // Optional prop
}


const EditNodeModal: React.FC<EditNodeModalProps> = ({
  open,
  onClose,
  nodeId,
  currentTitle,
  currentDescription,
  onEditSuccess,
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);

  const handleSave = async () => {
    try {
      await window.electron.editNode(nodeId, title, description);

      if (onEditSuccess) {
        onEditSuccess();
      }

      onClose();
    } catch (error) {
      console.error('Error updating node:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Node</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Node Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Node Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNodeModal;
