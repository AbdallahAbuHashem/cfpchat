import React, { useState, useEffect } from 'react'
import { firestore, auth } from './firebase'
import {
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button
} from '@material-ui/core'
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

function ChatPage({ history }) {
  const classes = useStyles()

  const [messages, setMessages] = useState([])
  const [currentMsg, setCurrentMsg] = useState('')

  const handleSendMessage = async () => {
    await firestore.collection('messages').add({
      msg: currentMsg,
    })
    // setMessages([...messages, currentMsg])
    setCurrentMsg('')
  }

  useEffect(() => {
    firestore.collection('messages').onSnapshot((docs) => {
      let temp = []
      docs.forEach(doc => {
        temp.push(doc.data().msg)
      })
      setMessages(temp)
    })

    if (!auth.currentUser) {
      history.push('/')
    }
  }, [])

  return (
    <div className={classes.App}>
      <Grid container height={"100vh"}>
        <Grid item xs={4}></Grid>
        <Grid item container xs={4} className={classes.content}>
          <List component="nav">
            {messages.map(msg => (
              <ListItem>
                <ListItemText primary={msg} />
              </ListItem>
            ))}
          </List>
          <Grid item container>
            <TextField
              id="standard-basic"
              label="Type your message here"
              className={classes.text}
              value={currentMsg}
              onChange={(text) => setCurrentMsg(text.target.value)}/>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}>
              Send
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

export default withRouter(ChatPage);
