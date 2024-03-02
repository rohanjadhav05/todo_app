import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function DenseAppBar() {
  return (
    <div id = "header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ position: 'fixed', top: 0 }}>
          <Toolbar variant="dense">
            <IconButton href='/add-todo' edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
              <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Link to="/" rel="noopener noreferrer" style={{ color: "white" }}>
                Todo App
                </Link>
              </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
