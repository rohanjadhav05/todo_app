import  { useState,  FormEvent, MouseEvent  } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserDto } from "./TodoComponent";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
    paper: {
      margin: theme.spacing(8, 4),
      display: "content",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
}));


export const SignIn = () => {

  const classes = useStyles();
  const [useremail, SetUserEmail] = useState('');
  const [password, SetPassword] = useState('');
  const navigator = useNavigate();

  function loginUser(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    const loginUserDto : UserDto = { userId : 0, userName : "", userPass : password, userEmail : useremail}
    console.log('Object:', loginUserDto);
    if(useremail.length == 0){
        toast.warning("Please Enter UserName");
    }
    else if(password.length == 0){
        toast.warning("Please Enter Password");
    }
    else{
        axios.post("http://localhost:7070/user/login", loginUserDto).then((response) => {
            const result = response.data
            console.log("Result : "+result);
            if(result['status'] == 'success'){
               const payload = result['data'].jwtToken;
                localStorage['id'] = result['data'].id;
                console.log(result['data'].id);
                localStorage['jwt'] = result['data'].jwtToken
                localStorage['loginStatus'] = 1
                console.log('JWT : ', result['data'].jwtToken)
                const message = 'Welcome to Atharva Classes '
                if (result['data'].roles == 'ROLE_ADMIN') {
                    navigator('/Admin', { state: { message } })
                } else if (result['data'].roles == 'ROLE_USER') {
                    navigator('/User', { state: { message } })
                }
            }
           // toast.success("Login Successfully");
        }).catch(err => {
            toast.error("InCorrect Username or Password");
        })
    } 
  }

  return (
    <div id = 'signin' style={{ display: '-webkit-box'}}>
    <Grid2 container component="main" maxWidth="xs" >
      <CssBaseline />
      <Grid item xs={false} sm={7} md={4}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
            <Typography component="h1" variant="h5" style={{alignItems : 'center'}}>
              Sign in
            </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => loginUser(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="useremail"
                autoFocus
                onChange={(e) => {
                  SetUserEmail(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  SetPassword(e.target.value)
                }}
              />
              </Grid>
              <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/ForgetPassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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
}
  