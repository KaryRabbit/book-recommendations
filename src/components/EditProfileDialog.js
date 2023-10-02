import {
  Avatar,
  Button,
  FormControl,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy';
import { InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { whiteText } from '../commonStyles';

export default function EditProfileDialog({
  isOpen,
  onClose,
  userData,
  onSave,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
      setProfileImage(userData.profileImage || null);
    }
  }, [userData]);

  const handleSubmit = () => {
    const updatedData = {
      name,
      email,
      profileImage,
    };

    onSave(updatedData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Edit Profile
        </Typography>
        <Avatar
          alt={name}
          sx={{ width: '100px', height: '100px', margin: '0 auto' }}
        />
        <Stack spacing={2}>
          <FormControl color="neutral">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl color="neutral">
            <InputLabel htmlFor="name">Email</InputLabel>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Button
            sx={{
              backgroundColor: 'black',
              ...whiteText,
              ':hover': {
                color: 'black',
                backgroundColor: '#DDE7EE',
              },
            }}
            variant="soft"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
