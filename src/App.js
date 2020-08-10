import React, {useRef,useState,useEffect} from 'react'
import './firebase_config';
import LockIcon from '@material-ui/icons/Lock';
import * as firebase from 'firebase';
import GoogleLogin from 'react-google-login'
import Divider from '@material-ui/core/Divider';
import Home from './components/Home'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PhoneIcon from '@material-ui/icons/Phone';
import Dialog from '@material-ui/core/Dialog';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {loginRedux} from './action'

import axios from 'axios'

//import './App.css'

import {useSelector,useDispatch} from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

function App() {

  const isAuth=useSelector(state=>state.isLogged)
  const dispatch=useDispatch()

  const classes = useStyles();

  const emailRef=useRef();
  const passRef=useRef();

  const [loading,setLoading]=useState(true)
  const [auth,setAuth]=useState(false)
  const [notification,setNotification]=useState(false)
  const [message,setMessage]=useState('')
  const [dialogState,setDialogState]=useState(1)

  const notify=message=>{
    setMessage(message)
    setNotification(true)
  }

  useEffect(() => {
      checkAuth()
      loginRedux(dispatch)



  }, []);


  const google=res=>{
    console.log(res)
  }

  const checkAuth=()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setAuth(true)
      } else {
        setAuth(false)
      }
      setLoading(false)
    });
  }

  const loginClick=()=>{
    if(emailRef.current.value.trim().length==0)
      notify('Enter a valid email')
    else if(passRef.current.value.trim().length==0)
      notify('Enter a valid password')
    else login()

  }

  const FbButton = withStyles({
    root: {
      background: '#4267B2',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 36,
      padding: '0 8px',
      boxShadow: '0 3px 8px 2px rgba(0, 145, 255, .3)',
    },
  })(Button);

  const GButton = withStyles({
    root: {
      background: '#DB4437',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 36,
      padding: '0 8px',
      boxShadow: '0 3px 8px 2px rgba(255, 105, 135, .3)',
    },
  })(Button);

  const googleAuth=()=>{
    setLoading(true)
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      setLoading(false)
    }).catch(function(error) {
      setLoading(false)
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(error)
    });



  }


  const fbAuth=()=>{

        var provider = new firebase.auth.FacebookAuthProvider();


        firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error)
          // ...
        });

  }

  const login=()=>{
    setLoading(true)
    firebase.auth().signInWithEmailAndPassword(emailRef.current.value,passRef.current.value ).then(res=>{
      setLoading(false)
    }).catch(error=> {
      setLoading(false)
      notify(error.message)
    });
  }

  if(!loading){
    if(auth)
      return (
        <Home/>
      )
    else {
      return(
        <div>

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={notification}
            onClose={()=>{setNotification(false)}}
            autoHideDuration={4000}
            message={message}
          />
          <Dialog open={true} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">
                {
                  dialogState==1?(<div>Register</div>):(<div>Login</div>)
                }
              </DialogTitle>
              <DialogContent className={classes.root}>
              {
                dialogState==1?(
                  <TextField
                    inputRef={emailRef}
                    style={{marginTop:'8px'}}

                    margin="dense"
                    id="name"
                    label="Name"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon color='primary'/>
                        </InputAdornment>
                      ),
                      style: {
                         padding: 2
                       }
                    }}
                  />
                ):(
                  <div/>
                )
              }
                <TextField
                  inputRef={emailRef}
                  style={{marginTop:'8px'}}
                  margin="dense"
                  id="name"
                  label="Phone"
                  type="tel"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color='primary'/>
                      </InputAdornment>
                    ),
                    style: {
                       padding: 2
                     }
                  }}
                />

                <TextField
                  inputRef={passRef}
                  style={{marginTop:'8px'}}
                  margin="dense"
                  id="name"
                  label="Password"
                  type="password"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color='primary'/>
                      </InputAdornment>
                    ),
                    style: {
                       padding: 2
                     }
                  }}
                />

                {
                  dialogState==1?(
                    <TextField
                      inputRef={passRef}
                      style={{marginTop:'8px'}}
                      margin="dense"
                      id="name"
                      label="Retype Password"
                      type="password"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenIcon color='primary'/>
                          </InputAdornment>
                        ),
                        style: {
                           padding: 2
                         }
                      }}
                    />
                  ):(
                    <div/>
                  )
                }

                {
                  dialogState==1?(
                    <div>
                    <center><Button  style={{marginTop:'8px'}} variant="outlined" color="primary" >
                      Register
                    </Button></center>
                      <center style={{marginTop:'8px'}}>or Already Have An Account ?</center>
                      <center><Button onClick={()=>{setDialogState(2)}} style={{marginTop:'8px',marginBottom:'8px'}} variant="outlined" color="secondary" >
                        Login to existing account
                      </Button></center>
                    </div>
                  ):(
                    <div>
                    <center><Button  style={{marginTop:'8px'}} variant="outlined" color="primary" >
                      Login
                    </Button></center>
                      <center style={{marginTop:'8px'}}>or Need An Account ?</center>
                      <center><Button onClick={()=>{setDialogState(1)}} style={{marginTop:'8px',marginBottom:'8px'}} variant="outlined" color="secondary" >
                        Create A New Account
                      </Button></center>
                    </div>
                  )
                }

                  <Divider/>

                  <FbButton startIcon={<img src={require('./assets/fb.png')} height='24px' />} onClick={fbAuth}  style={{marginTop:'8px'}} variant="contained" color="primary" >
                    Sign In using Facebook
                  </FbButton>
                  <GButton startIcon={<img src={require('./assets/google.png')} height='20px' />} onClick={googleAuth}  style={{marginTop:'5px',marginBottom:'8px'}} variant="contained" color="primary" >
                    Sign In using Google
                  </GButton>
                  <GoogleLogin
                    clientId='384400786106-o39npgl3i7r4c0sffkql9ms7kli2lg5g.apps.googleusercontent.com'
                    buttonText='Login Using Google !!!'
                    onSuccess={google}
                    onFailure={google}
                    cookiePolicy={'single_host_origin'}
                    />
              </DialogContent>

            </Dialog>

          </div>
      )
    }
  }else{
    return(
      <div  style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>
        <Loader
           type="Bars"
           color="#0090ff"
           height={120}
           width={120}/>
      </div>
    )
  }
}

export default App;
