
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedState } from '../store/atoms/logged';
import { isLoggedSelector } from '../store/selectors/logged';
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';

export default function DenseAppBar() {
  const navigator = useNavigate();
  const setLoggedState = useSetRecoilState(loggedState);
  const isLogged = useRecoilValue(isLoggedSelector);

  useEffect(() => {
    if(localStorage['userId']){
      setLoggedState({isLogged : true});
    }
  }, [localStorage['userId']]);

  function logOutUser() {
    localStorage.removeItem("userId");
    setLoggedState({isLogged : false})
    navigator("/");
  }
  const handleLogoClick = () => {
    console.log(isLogged +" inside handleLogoClick ")
    if (!isLogged) {
      // If logged in, redirect to the home page
      navigator("/");
    } else {
      // If not logged in, handle accordingly (e.g., show login modal, etc.)
      toast.error('You need to log out first.');
    }
  };

  return (
    <div id = "header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ position: 'fixed', top: 0 }}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
              <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={handleLogoClick}>
                 Todo App
              </Typography>
              {
                isLogged &&  <AccountCircleIcon fontSize='medium' href="/profile"/>
              }
              {
                isLogged && <Button color="inherit" onClick={logOutUser}>LogOut</Button>
              }
              {
                !isLogged && <Button color="inherit" href='/Signup'>Sign Up</Button>
              }
              {
                !isLogged && <Button color="inherit" href='/LogIn'>Log In</Button>
              }
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
