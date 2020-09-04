import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Input } from '@material-ui/core';
import Message from './components/Message';
import db from './firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send'
import { IconButton } from '@material-ui/core'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([]);
  const [usernameActual, setUsernameActual] = useState('')

  useEffect(()=>{
    db.collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  },[])


  useEffect(()=>{
    setUsernameActual(prompt('Please enter your name')) 
  },[])

  const sendMessage = (event)=>{
    event.preventDefault();
    db.collection('messages').add({
      username: usernameActual,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <>
      <div className="App">
        <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="messenger" className="app__image" />
        <h1>Facebook Messenger Clone</h1>
        <h2>Welcome {usernameActual}</h2>
        <FlipMove>
        {
          messages.map(({ message, id}) => (
            <Message key={id} usernameActual={usernameActual} message={message} />
          ))
        }
        </FlipMove>
      </div>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </>
  );
}

export default App;
