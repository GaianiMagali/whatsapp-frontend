import React from 'react';
import './App.css';
import { Chat } from './components/chat/Chat';
import { SideBar } from './components/sideBar/SideBar';

function App() {

  return (
    <div className="app">
      <div className="app_body">
        {/* Sidebar */}
        <SideBar />

        {/* chat component */}
        <Chat />
      </div>

    </div>
  );
}

export default App;
