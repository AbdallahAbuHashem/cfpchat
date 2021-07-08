import React, { useState, useEffect } from 'react'
import {
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button
} from '@material-ui/core'
import { auth } from './firebase'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  App: {
    width: '100%',
    height: '100vh',
    display: 'flex',

  },
  content: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(6),
    paddingTop: theme.spacing(2),
  },
  text: {
    flex: 1,
  }
}));

function SignInPage({ history }) {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')

  const handleSignup = () => {
    auth.createUserWithEmailAndPassword(email, pass).then((user) => {
      auth.currentUser.updateProfile({
        displayName: name,
      })
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        history.push('/chat')
      }
    })
  }, [])

  return (
    <div className={classes.App}>
      <Grid container height={"100vh"}>
        <Grid item xs={4}></Grid>
        <Grid item container xs={4} className={classes.content}>
          <Grid item container direction='column'>
            <TextField
              id="standard-basic"
              label="Email"
              className={classes.text}
              value={email}
              onChange={(text) => setEmail(text.target.value)}/>
            <TextField
              id="standard-basic"
              label="Password"
              className={classes.text}
              value={pass}
              onChange={(text) => setPass(text.target.value)}/>
            <TextField
              id="standard-basic"
              label="Name"
              className={classes.text}
              value={name}
              onChange={(text) => setName(text.target.value)}/>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}>
              Sign up
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

export default withRouter(SignInPage);
