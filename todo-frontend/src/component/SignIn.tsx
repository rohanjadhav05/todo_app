import  { useState,  FormEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
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
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


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
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    container: {
      display: "flex !important",
      alignItems: "center !important",
    }
}));


export const SignIn = () => {

  const classes = useStyles();
  const [useremail, SetUserEmail] = useState('');
  const [password, SetPassword] = useState('');
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  function validatePassword(password : string) : boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    return passwordRegex.test(password);
  }

  function loginUser(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    const loginUserDto : UserDto = { userId : 0, userName : "", userPass : password, userEmail : useremail}
    if(useremail.length == 0){
        toast.warning("Please Enter UserName");
    }
    else if(password.length == 0){
        toast.warning("Please Enter Password");
    }
    else if(!validatePassword(password)){
      toast.warning("Password should should contain atleast 1 uppercase, 1 lowercase and 1 symbol and 1 number")
    }
    else{
        axios.post("http://localhost:8080/user/login", loginUserDto).then((response) => {
            const result = response.data;
            console.log('Result :', result);
            if(result['status'] == 'success'){
                localStorage['userId'] = result['data'].userId;
                console.log(result['data'].userId);
                toast.success("Login Successfully");
                navigator('/todo')
            }
            else{
              toast.error("InCorrect Username or Password");
            }
            
        }).catch(err => {
          if(err.response){
            console.error(err.response);
            toast.error(err.response.data);
          }else{
            console.error(err);
          }
        })
    } 
  }

  return (
    <div id = 'signin' style={{ display: 'flex', justifyContent : 'center'}}>
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
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  SetPassword(e.target.value)
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => {
                        setShowPassword((prevShowPassword) => !prevShowPassword);
                      }} edge="end" style={{ marginRight: '-10px' }}>
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
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
  