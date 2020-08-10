import React,{useState,useEffect,useRef,forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { Line, Circle } from 'rc-progress';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Drawer from '@material-ui/core/Drawer';
import * as firebase from 'firebase'
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BoardView from './BoardView'
import './Home.css'
import './elimination.css'

const history = createBrowserHistory();
var profileData=null




var N=0;
function count(n){
  N+=n;
  ////console.log(N)
}

const id='rG9R46jVmIWKknNgGCDS';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
  stepperRoot: {
    width: '100%',
  },
  canvasPaper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2,1),
  },
  root1:{
    height:'100%'
  },
  eliminationGrid : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));

function Home(props) {

  const timeConverter=UNIX_timestamp=>{
    var a = new Date(UNIX_timestamp );
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '-' + month + '-' + year + ' at ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profile,setProfile]=useState(null)

  useEffect(() => {
    firebase.firestore().collection('profile').doc(firebase.auth().currentUser.uid).onSnapshot(function(doc) {
        setProfile(doc.data())
        profileData=doc.data()
    });
 },[]);



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>


      {profile==null?(
        <LinearProgress />
      ):(<div>
        <div className={classes.toolbar} />
          <center>
            <Avatar className={classes.orange} src={profile.image} style={{marginBottom:'20px',marginTop:'-20px',height:'80px',width:'80px'}} >{'name' in profile ? profile.name.substr(0,1):'N'}</Avatar>
            <Typography variant="h6" noWrap>
              {profile.name}
            </Typography>

            <Divider style={{marginTop:'20px'}}/>

            <Typography style={{marginTop:'24px'}} variant="body2" color="textSecondary" component="p">
              Submitted -> {'t' in profile?(<font>{profile.t}</font>):(<font>0</font>)}
            </Typography>
            <Typography style={{marginTop:'10px'}}  variant="body2" color="textSecondary" component="p">
              Correct -> {'r' in profile?(<font>{profile.r}</font>):(<font>0</font>)}
            </Typography>
            <Typography style={{marginTop:'10px'}}  variant="body2" color="textSecondary" component="p">
              Success -> {'r' in profile?(<font>{(profile.r*100.0/profile.t).toFixed(2)+'%'}</font>):(<font>0%</font>)}
            </Typography>
            <Circle style={{width:'50%',marginTop:'20px'}}  percent={'r' in profile?((profile.r*100.0/profile.t).toFixed(2)):(0)} strokeWidth="20" trailWidth='20' strokeLinecap='square' strokeColor="limegreen" trailColor="#D5D5D5" />

            <Divider style={{marginTop:'20px'}}/>
            <Button onClick={()=>{firebase.auth().signOut()}} style={{marginTop:'20px'}} variant="contained" color="primary" >
              Logout
            </Button>


          </center>


        </div>
      )}


    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Interactive Problem Solving
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          profile!=null?(
            <Grid container spacing={1}>
              <BrowserRouter history={history}>
                <Switch>
                   <Route path="/" exact component={Topics}/>
                   <Route path="/topic/:id" exact render={(props) => <Serieses profile={profile} {...props}/>}/>
                   <Route path="/series/:series_id/:problem_sl" render={(props) => <Series {...props}/>} />
                   <Route path="/series1/:series_id/:problem_sl" render={(props) => <Series {...props}/>} />

                 </Switch>
                 <Grid item xs={12} md={4}>
                   <Path data={profile}/>
                   <Feed data={profile}/>
                 </Grid>
                 </BrowserRouter>


            </Grid>
          ):(
            <div/>
          )
        }

      </main>
    </div>
  );
}

Home.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Topics=props=>{
  const classes = useStyles();
  const [topics,setTopics]=useState(null)
  useEffect(() => {
      firebase.firestore().collection('data').where('type','==','topic').orderBy('serial').get().then(res=>{
        setTopics(res.docs)
        count(res.docs.length)
      })
  },[]);
  return(
    <Grid item xs={12} md={8}>
      {
        topics==null?(
          <LinearProgress />
        ):(
          <div>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" to="/" >
                Topics
              </Link>
            </Breadcrumbs><br/>
            <Grid direction='row' alignItems="stretch" container spacing={1} className={classes.grid}>

              {
                topics.map((topic,ind)=>{
                  return(
                    <Grid style={{height:'100%'}} item xs={6} md={4}>
                      <Link color="inherit" to={'/topic/'+topic.id+'/'} onClick={(e) => {e.stopPropagation();}}>
                        <Card className={classes.root1}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={topic.data().logo}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {topic.data().name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                {topic.data().nSeries} Serieses<br/>
                                {topic.data().nProblem} Problems<br/>
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Link>
                    </Grid>
                  )
                })
              }
              </Grid>
            </div>
        )
      }


    </Grid>
  )
}


const Path=props=>{
  const classes = useStyles();




  return(
    <div>
      {
        props.data==null?(
          <LinearProgress />
        ):(

          <div>
          <Typography style={{marginBottom:'24px'}} variant="body" color="textSecondary" component="p">
            Recent Activity
          </Typography>
            {
              'series' in props.data && props.data.series!=null?(
                <Link color="inherit" to={'/series/'+props.data.series+'/'+props.data[props.data.series]+'/'} >

                <Card className={classes.root1}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={require('./assets/icons/pr.png')}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                            <div>{props.data.series_name}</div>

                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">

                             <center><Circle  strokeLinecap='square' percent={(props.data[props.data.series]-1)*100/props.data.n}  strokeWidth="16" trailWidth='16'  strokeColor="limegreen" trailColor="#D5D5D5" style={{marginBottom:'16px',width:'40%'}} /></center>
                             <div>Continue your journey with {props.data.series_name}</div>

                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                </Link>

              ):(
                <Link color="inherit" to="/" >
                <Card className={classes.root1}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={require('./assets/icons/pr.png')}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">

                            <div>Start your journey</div>

                      </Typography>

                    </CardContent>
                  </CardActionArea>
                </Card>

                </Link>
              )
            }
          </div>
        )
      }
    </div>
  )
}

const Feed=props=>{
  const classes = useStyles();

  const [feed,setFeed]=useState(null)

  return(
    <div style={{marginTop:'10px'}}>
      {
        feed==null?(
          <div />

        ):(
          <Paper  className={classes.paper}>

          </Paper>
        )
      }
    </div>

  )
}


const Serieses=props=>{
  const topicID=props.match.params.id
  const classes = useStyles();
  const [serieses,setSerieses]=useState(null)
  useEffect(() => {
    //////console.log(props.profile)
      firebase.firestore().collection('data').where('type','==','series').where('topic_id','==',topicID).orderBy("serial").get().then(res=>{
        setSerieses(res.docs)
        count(res.docs.length)
      })
  },[]);
  return(
    <Grid item xs={12} md={8}>
      {
        serieses==null?(
          <LinearProgress />
        ):(
          <div>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" to="/" >
                Topics
              </Link>
              <Link color="inherit" to={'/topic/'+topicID+'/'}>
                {serieses[0].data().topic_name}
              </Link>
            </Breadcrumbs><br/>
            <Grid direction='row' alignItems="stretch" container spacing={1} className={classes.grid}>

              {
                serieses.map((series,ind)=>{
                  return(
                    <Grid style={{height:'100%'}} item xs={6} md={4}>
                      <Link color="inherit" to={series.id in props.profile?('/series/'+series.id+'/'+props.profile[series.id]+'/'):('/series/'+series.id+'/1/')}>
                        <Card style={{height:'100%'}} className={classes.root1}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={series.data().logo}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {series.data().name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                {series.data().topic_name}<br/>
                                {series.data().nProblem} Problems<br/>

                              </Typography>
                              {
                                props.profile!=null && (series.id+'done') in props.profile && props.profile[series.id+'done']?(
                                  <center><img style={{width:'36%',marginTop:'10px'}} src={require('./assets/icons/tick.jpg')}/>
                                  </center>
                                ):(
                                  <center><Circle style={{width:'50%',marginTop:'10px'}} percent={series.id in props.profile?(((props.profile[series.id]-1)*100)/series.data().nProblem):(0)}   strokeWidth="20" trailWidth='20' strokeLinecap='square' strokeColor="#0090ff" trailColor="#D5D5D5" /></center>

                                )
                              }


                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Link>
                    </Grid>
                  )
                })
              }
              </Grid>
            </div>
        )
      }


    </Grid>
  )
}

const Series=props=>{

  const seriesID=props.match.params.series_id

  //////console.log(seriesID)
  //////console.log(probSl)
  const classes = useStyles();
  const [problem,setProblem]=useState(null)
  const [steps,setSteps]=useState(null)
  const [topic,setTopic]=useState(null)
  const [n,setN]=useState(null)
  const [serial,setSerial]=useState(parseInt(props.match.params.problem_sl))

  const stepClick=i=>{
    ////console.log('hi')
  }

  const redirect=()=>{
    //props.history.push('/path
    if(parseInt(serial)<parseInt(n)){
      history.push('/series/'+seriesID+'/'+(serial+1)+'/')
      setSerial(serial+1)
      if((seriesID+'done') in profileData)
        firebase.firestore().collection('profile').doc(firebase.auth().currentUser.uid).update({
          [seriesID+'done']:false
        })
      firebase.firestore().collection('profile').doc(firebase.auth().currentUser.uid).update({
        series:seriesID,
        series_name:problem.series_name,
        [seriesID]:serial+1,
        t:firebase.firestore.FieldValue.increment(1),
        r:firebase.firestore.FieldValue.increment(1),
        n:problem.nProblem
      })
    }else{
      history.push('/topic/'+topic+'/')
      firebase.firestore().collection('profile').doc(firebase.auth().currentUser.uid).update({
        series:null,
        [seriesID]:1,
        [seriesID+'done']:true,
        t:firebase.firestore.FieldValue.increment(1),
        r:firebase.firestore.FieldValue.increment(1),
        n:problem.nProblem
      }).then(()=>{

          window.location.reload()
      })

    }



  }

  const goto=sl=>{
    history.push('/series1/'+seriesID+'/'+sl+'/')

    setSerial(sl)
    //window.location.reload()
  }



  const loadProblem=sl=>{




  }

  useEffect(() => {
    console.log(serial)
    setProblem(null)
    //console.log(serial1)
    fetchProblem()

  },[serial]);

  useEffect(() => {


    fetchProblem()

  },[]);

  const fetchProblem=()=>{
    //console.log(serial1)
    firebase.firestore().collection('data').where('type','==','problem').where('series_id','==',seriesID).where('serial','==',serial).get().then(res=>{
      //////console.log(res.docs[0].data())
      var stepObj={
        n:res.docs[0].data().nProblem
      },stepsArr=[]
      for(var i=0;i<stepObj.n;i++){
        var step={
          title:'',
          href:'/series/'+seriesID+'/'+(i+1)+'/',
          active:true
        }
        if(i==parseInt(serial-1))step['title']=res.docs[0].data().title
        stepsArr.push(step)
      }
      stepObj['steps']=stepsArr
      setSteps(stepObj)
      setProblem(res.docs[0].data())
      console.log(res.docs[0].id)
      //////console.log(res.docs[0].data())
      count(res.docs.length)
      setTopic(res.docs[0].data().topic_id)
      setN(res.docs[0].data().nProblem)
    })
  }





  return(
    <Grid item xs={12} md={8}>
      {
        problem==null?(
          <LinearProgress />
        ):(
          <div>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" to="/" >
                Topics
              </Link>
              <Link color="inherit" to={'/topic/'+problem.topic_id+'/'}>
                {problem.topic_name}
              </Link>
              <Link color="inherit">
                {problem.series_name}
              </Link>
            </Breadcrumbs>

               <Stepper style={{marginTop:'12px',marginBottom:'-12px',padding:'10px'}} activeStep={problem.serial-1} alternativeLabel>
                {
                  Array(problem.nProblem).fill().map((_, i) =>{
                    return(
                      <Step onClick={()=>{goto(i+1)}} key={'asas'}>
                        <StepLabel></StepLabel>

                      </Step>
                    )
                  })
                }

                </Stepper>
               <br/>

            {
              'prob_schema' in problem?(
                <Problem1 profile={props.profile} callBack={redirect} key={Date.now()} seriesID={seriesID} probSl={serial} data={problem}/>
              ):(
                <br/>
              )
            }

          </div>
        )
      }


    </Grid>
  )
}


const Problem1=forwardRef((props,ref)=>{

  const classes = useStyles();
  const [loading,setLoading]=useState(true)
  const [problem,setProblem]=useState(null)
  const [key,setKey]=useState(Date.now())
  const [dialog,setDialog]=useState(false)
  const [verdict,setVerdict]=useState(null)
  const [ans,setAns]=useState(null)
  const [serial,setSerial]=useState(props.probSl)

  const ansRef=useRef()


  useEffect(() => {
    setSerial(props.probSl)
    ////console.log(props.data)
 });

  const timeConverter=UNIX_timestamp=>{
    var a = new Date(UNIX_timestamp );
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '-' + month + '-' + year + ' at ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  const submitAnswer=()=>{
    /*////console.log(ansRef.current.getVerdict())
    setVerdict(ansRef.current.getVerdict())
    setDialog(true)*/
    //////console.log(ansRef.current)
    var isCorrect=false;
    ////console.log(props.data.ans_type)
    if(props.data.ans_type==0){
      isCorrect=ansRef.current.getVerdict()
    }else if(props.data.ans_type==1){
      if(ansRef.current.value.trim()==props.data.answer.trim())
        isCorrect=true
    }else{
      if(ans==props.data.answer)
        isCorrect=true
    }
    setVerdict(isCorrect)
    setDialog(true)
    //////console.log(isCorrect)
  }

  const mcqChange=event=>{
    setAns(event.target.value)
  }

  const redirect=()=>{
    setDialog(false)
    if(verdict){
      props.callBack()
    }else{
      if((props.seriesID+'done') in profileData)
        firebase.firestore().collection('profile').doc(firebase.auth().currentUser.uid).update({
          [props.seriesID+'done']:false
        })
      firebase.firestore().collection('profile').doc(firebase.auth().currentUser.uid).update({
        t:firebase.firestore.FieldValue.increment(1),
        n:props.data.nProblem,
        series:props.seriesID,
        series_name:props.data.series_name,
        [props.seriesID]:parseInt(serial)
      })
    }
  }


  useImperativeHandle(ref, () => ({

 }));

 return(
   <div>
   <Dialog open={dialog} onClose={redirect} aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title">
         {
           verdict?(
             <div>Correct Answer !!!</div>
           ):(
             <div>Wrong Answer ,Solution : </div>
           )
         }
       </DialogTitle>
       <DialogContent>
       {verdict?(
         <div>Congratulations, your answer is correct</div>
       ):(
         <Typography style={{padding:'12px',marginBottom:'20px'}} variant="body2" color="textSecondary" component="p">


           {
             props.data.ans_type==0?(
               <BoardView type='eval' iEval={0} key={0} data={props.data}/>
             ):(
               props.data.ans_type==1?(
                 <div>Correct Answer : {props.data.answer}</div>
               ):(
                 <div>Correct Answer : {props.data.options[props.data.answer]}</div>
               )
             )
           }
           {props.data.explanation}

           {
             'ans_images' in props.data?(
               props.data.ans_images.map(img=>{
                 return(
                   <div style={{width:'100%'}}>
                     <img style={{width:'100%'}} src={img}/>
                   </div>
                 )
               })
             ):(
               <div/>
             )

           }

         </Typography>
       )
     }
       </DialogContent>
       <DialogActions>
         <Button color="primary" onClick={redirect}>

           Ok
         </Button>
       </DialogActions>
     </Dialog>
   <Grid container spacing={1} className={classes.grid}>

     <Grid item xs={12} md={6}>
       <Paper>
         <CardHeader
           avatar={
             <Avatar src={props.data.icon} aria-label="recipe" className={classes.avatar}>
               {props.data.author.substr(0,1)}
             </Avatar>
           }

           title={props.data.title}
           titleTypographyProps={{variant:'h6' }}
           subheader={'-by '+props.data.author+' on '+timeConverter(props.data.timestamp)}
         />
         <Typography style={{padding:'12px'}} variant="body2" color="textSecondary" component="p">
           {props.data.description}
         </Typography>
         {
           'des_images' in props.data?(
             props.data.des_images.map(image=>{
               return(
                 <img src={image} style={{width:'100%',margin:'12px'}}/>
               )
             })
           ):(
             <div/>
           )
         }

       </Paper>

     </Grid>
     <Grid item xs={12} md={6}>
       <Paper className={classes.canvasPaper}>

       <Typography style={{padding:'12px'}} variant="body2" color="textSecondary" component="p">
         {props.data.statement}
       </Typography>
       <div>
       {
         props.data.ans_type==0?(
           <Typography style={{padding:'12px'}} variant="body2" color="textSecondary" component="p">
             {'Draw the figure on the figure-board and click on submit'}
           </Typography>
         ):(
           props.data.ans_type==1?(
             <Typography style={{padding:'12px'}} variant="body2" color="textSecondary" component="p">

             নিচের টেক্সটবক্সে অ্যান্সার সাবমিট কর
             </Typography>
           ):(
             <Typography style={{padding:'12px'}} variant="body2" color="textSecondary" component="p">

             নিচের যেকোন একটি অপশন সিলেক্ট কর
             </Typography>
           )
         )
       }
       {
         'restrictions' in props.data?(
           <Typography style={{padding:'12px'}} variant="body2" color="textSecondary" component="p">
             {'['+props.data.restrictions+']'}
           </Typography>
         ):(
           <div/>
         )
       }
       </div>

        {!dialog &&(!('justImage' in props.data) || props.data.justImage==false)?(
            props.data.ans_type==0?(
              <BoardView ref={ansRef}  data={props.data}/>

            ):(
              <BoardView  data={props.data}/>

            )
         ):(
           <div/>
         )}

         {
           props.data.ans_type==2?(
             <RadioGroup onChange={mcqChange}>
                {
                  props.data.options.map((option,index)=>{
                    return(
                      <FormControlLabel value={index+''} control={<Radio />} label={option} />
                    )
                  })
                }

             </RadioGroup>
           ):(
             props.data.ans_type==1?(
               <TextField
                  inputRef={ansRef}
                 style={{marginTop:'8px'}}

                 fullWidth
                 margin="dense"
                 id="name"
                 label="Answer"
                 variant="outlined"
                 InputProps={{

                   style: {
                      padding: 2
                    }
                 }}
               />
             ):(
               <div/>
             )
           )
         }

         <center><Button onClick={submitAnswer} style={{marginTop:'20px'}} variant="contained" color="primary" >
           Submit Answer
         </Button></center>
       </Paper>
     </Grid>

   </Grid>
   </div>
 )

})

export default Home;
