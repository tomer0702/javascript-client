import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, CssBaseline, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import localStorage from 'local-storage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const handleLogout = () => {
  localStorage.remove('token');

function NavBar() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root} style={{ margin: 0 }}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Trainee Portal
            </Typography>
            <Button component={Link} to="/Trainee" color="inherit">TRAINEE</Button>
            <Button component={Link} to="/TextFieldDemo" color="inherit">TEXTFIELD DEMO</Button>
            <Button component={Link} to="/InputDemo" color="inherit">INPUT DEMO</Button>
            <Button component={Link} to="/ChildrenDemo" color="inherit">CHILDREN DEMO</Button>
            <Button color="inherit" href="/login" onClick={() => handleLogout()}>LOGOUT</Button>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
export default NavBar;
