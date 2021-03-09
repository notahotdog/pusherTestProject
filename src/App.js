import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      username: "",
      chats: [],
    };
  }

  componentDidMount() {
    const username = window.prompt("Username: ", "Anonymous");
    this.setState({ username });
    const pusher = new Pusher("3208d14fa83564075d3c", {
      cluster: "ap1",
      encrypted: true,
    });
    const channel = pusher.subscribe("chat"); //subscribes to a part channel
    channel.bind("message", (data) => {
      this.setState({ chats: [...this.state.chats, data], test: "" }); //not too sure why theres a test
    });

    //Create a new event to listen to, which will console log the data
    channel.bind("testEvent", (data) => {
      console.log(data);
    });

    this.handleTextChange = this.handleTextChange.bind(this);
    //bind the function within this local scope
    this.onPressTestEvent = this.onPressTestEvent.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text,
      };
      axios.post("http://localhost:5000/message", payload);
    } else {
      this.setState({ text: e.target.value });
    }
  }

  //if they type something it will console log
  onPressTestEvent(e) {
    if (e.keyCode === 187) {
      const payload = {
        testData: this.state.text,
      };
      axios.post("http://localhost:5000/testEvent", payload);
    } else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React-Pusher Chat</h1>
        </header>
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
        </section>
      </div>
    );
  }
}
export default App;
