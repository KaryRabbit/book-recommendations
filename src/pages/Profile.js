import { Avatar, Box, Button, Typography } from '@mui/joy';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alignCenter } from '../commonStyles';
import EditProfileDialog from '../components/EditProfileDialog';
import { selectCurrentUser, updateUserData } from '../store/reducers/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { id, name, email, date, myLibrary } = useSelector(selectCurrentUser);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userData = {
    name: name,
    email: email,
    joinedDate: date,
    library: `${myLibrary.length} ${
      myLibrary.length === 1 ? 'book' : 'books'
    }  added`,
  };

  const handleSave = (updatedData) => {
    const result = { ...updatedData, ...{ id: id } };
    if (result) {
      dispatch(updateUserData(result));
    }
  };

  return (
    <Box sx={alignCenter}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar
          alt={userData.name}
          src={userData.avatarUrl}
          sx={{ width: 100, height: 100, marginBottom: '1rem' }}
        />
        <Typography level="h4" textColor="white">
          {userData.name}
        </Typography>
        <Typography level="body-lg" textColor="white">
          {userData.email}
        </Typography>
        <Typography level="body-md" textColor="white">
          {userData.joinedDate}
        </Typography>
        <Typography level="body-xs" textColor="white" sx={{ margin: '1rem 0' }}>
          {userData.library}
        </Typography>

        <Button
          sx={{
            margin: 'auto auto 3rem auto',
            ...alignCenter,
          }}
          onClick={() => setIsDialogOpen(true)}
          size="lg"
          variant="soft"
          color="neutral"
        >
          Edit Profile
        </Button>
        <EditProfileDialog
          isOpen={isDialogOpen}
          onSave={handleSave}
          onClose={() => setIsDialogOpen(false)}
          userData={userData}
        />
      </Box>
    </Box>
  );
};

export default ProfilePage;
