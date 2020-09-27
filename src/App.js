import React, { useEffect, useState } from 'react';
import './App.css';
import { Chat } from './components/chat/Chat';
import { SideBar } from './components/sideBar/SideBar';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, []);


  useEffect(() => {
    const pusher = new Pusher('84e6b82ef38f516fd1ee', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
        {/* Sidebar */}
        <SideBar />

        {/* chat component */}
        <Chat messages={messages} />
      </div>

    </div>
  );
}

export default App;
