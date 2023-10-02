import { LockOutlined, PersonAddOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  ToggleButtonGroup,
  Typography,
} from '@mui/joy';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { stylesForInput, whiteText } from '../commonStyles';
import useInput from '../hooks/useInput';
import {
  createUser,
  loginUser,
  selectUsers,
} from '../store/reducers/userSlice';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [value, setValue] = React.useState('signIn');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const isEmail = (value) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(value);
  };

  const isNotEmpty = (value) => value.trim() !== '';

  const checkLocalStorageForUser = (value) => {
    const user = users?.find((user) => user.email === value);
    if (user) {
      return true;
    }

    return false;
  };

  const checkPassword = (value) => {
    const user = users?.find((user) => user.email === emailValue);

    if (user && user.password !== value) {
      return false;
    }

    return true;
  };

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassord,
  } = useInput(isNotEmpty);

  let formIsValid = passwordIsValid && emailIsValid;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    if (isSignUp) {
      if (checkLocalStorageForUser(emailValue)) {
        setFormError('User already exist');
        return;
      }
      dispatch(createUser({ email: emailValue, password: passwordValue }));
    } else {
      if (
        !checkPassword(passwordValue) ||
        !checkLocalStorageForUser(emailValue)
      ) {
        setFormError('Invalid User Data');
        return;
      }
      dispatch(loginUser({ email: emailValue, password: passwordValue }));
    }

    reset();
    navigate('/');
  };

  const reset = () => {
    resetPassord();
    resetEmail();
    setFormError('');
  };

  const icon = isSignUp ? (
    <PersonAddOutlined fontSize="large" />
  ) : (
    <LockOutlined fontSize="large" />
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Box sx={{ mb: 2 }}>{icon}</Box>

        <Typography component="h1" level="body-lg" sx={whiteText}>
          {isSignUp ? 'Create A New User' : 'Sign In'}
        </Typography>

        <ToggleButtonGroup
          sx={{ paddingTop: '1rem' }}
          variant="soft"
          color="neutral"
          value={value}
          onChange={(event, newValue) => {
            if (newValue) {
              setIsSignUp(!isSignUp);
              setValue(newValue);
              reset();
            }
          }}
        >
          <Button value="signIn">Sign In</Button>
          <Button value="signUp">Sign Up</Button>
        </ToggleButtonGroup>

        <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmit}>
          <TextField
            sx={stylesForInput}
            margin="normal"
            required
            fullWidth
            value={emailValue}
            id="email"
            label="Email Address"
            error={emailHasError}
            helperText={emailHasError ? 'Invalid email value' : ''}
            name="email"
            autoComplete="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            autoFocus
          />
          <TextField
            sx={stylesForInput}
            margin="normal"
            required
            fullWidth
            value={passwordValue}
            name="password"
            label="Password"
            type="password"
            id="password"
            error={passwordHasError}
            helperText={passwordHasError ? 'Invalid password value' : ''}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="soft"
            color="neutral"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? 'Create' : 'Sign In'}
          </Button>
          {formError && (
            <Typography color="danger" level="body-xs">
              {formError}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
