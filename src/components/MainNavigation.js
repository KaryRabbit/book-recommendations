import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/joy';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DISABLED_COLOR } from '../colors';
import { background } from '../commonStyles';
import { logoutUser, selectCurrentUser } from '../store/reducers/userSlice';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const navLinks = [
    { path: '/my-library', label: ' My Library' },
    { path: 'search-and-add', label: 'Search & Add' },
    { path: 'recommendations', label: 'Recommendations' },
    ...(user ? [{ path: 'profile', label: 'Profile' }] : []),
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleLogout = () => {
    if (user) {
      dispatch(logoutUser());
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ background: 'transparent' }}>
      <Container maxWidth={false} sx={{ padding: 0 }} disableGutters>
        <Toolbar className={classes.toolbar}>
          <NavLink className={classes.menu} to="/">
            <AutoStoriesIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{
                '.MuiPaper-root': {
                  ...background,
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {navLinks.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  disabled={!user && page.label !== 'Search & Add'}
                >
                  <Typography textAlign="center">
                    <NavLink
                      className={
                        user || page.label === 'Search & Add'
                          ? classes.menu
                          : classes.disabledMenu
                      }
                      to={page.path}
                    >
                      {page.label}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((page) => (
              <Button
                key={page.label}
                disabled={!user && page.label !== 'Search & Add'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                <NavLink
                  className={
                    user || page.label === 'Search & Add'
                      ? classes.menu
                      : classes.disabledMenu
                  }
                  to={page.path}
                >
                  {page.label}
                </NavLink>
              </Button>
            ))}
          </Box>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'white',
              color: 'black',
              '&:hover': {
                border: '1px solid' + DISABLED_COLOR,
              },
            }}
            onClick={handleLogout}
          >
            <NavLink to={user ? '' : '/login'} className={classes.menu} end>
              {user ? 'Logout' : 'Login'}
            </NavLink>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainNavigation;
