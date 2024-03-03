// Signup.jsx
import { useState, FormEvent} from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from 'react-toastify' 
import { useNavigate } from 'react-router-dom';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { UserDto } from "./TodoComponent";
import { createUser } from '../service/TodoService';
import { Paper } from '@mui/material';


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  container: {
    display: "flex !important",
    alignItems: "center !important",
  },
}));

const Signup = () => {
  const [name, SetName] = useState('');
  const [email, SetEmail ] = useState('');
  const [password, SetPassword] = useState('');
  const classes = useStyles();
  const navigator = useNavigate();

  function saveUser(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const UserDto : UserDto = { userId : 0, userName : name, userPass : password, userEmail : email}
    if(name.length == 0){
      toast.warning("Please Enter UserName");
    }
    else if(email.length == 0){
      toast.warning("Please Enter Email");
    }
    else if(password.length == 0){
      toast.warning("Please Enter Password");
    }
    else{
      createUser(UserDto).then((response) => {
        console.log(response.data);
        toast.success("User Registor Successfully");
        navigator("/");
      }).catch(err => {
        toast.error("User with same UserName or Email is register");
        console.error(err);
      })
    }
  }
  
  return (
    <div id = 'signup' style={{ display: 'flex', justifyContent : 'center'}}>
    <Grid2 container component="main" maxWidth="xs" >
        <CssBaseline />
      <Grid item xs={false} sm={7} md={4}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{alignItems : 'center'}}>
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => saveUser(e)}>
            <Grid container spacing={2} style={{padding : '30px'}}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={(e) => {
                    SetName(e.target.value)
                  }}
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    SetEmail(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    SetPassword(e.target.value)
                  }}
                />
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/LogIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
          </form>
        </div>
        </Grid>
      </Grid2>
      </div>
  );
};

export default Signup;
