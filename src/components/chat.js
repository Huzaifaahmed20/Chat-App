import React, { Component } from 'react';
import { changeRecipientUID } from '../store/action/action'
import { connect } from 'react-redux';
// import ChatBox from './chatbox';
import '../App.css'
import firebase from 'firebase';

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUserMsg: ""
        }
    }
    setRecipient(recUid) {
        console.log('recipient', recUid);
        this.props.changeRecUID(recUid);
    }
    inputHandler(ev) {
        this.setState({
            currentUserMsg: ev.target.value
        })
        // console.log(ev.target.value)
    }
    sendMessage() {
        var msgObj = {
            msg: this.state.currentUserMsg,
            senderID: this.props.currentUser,
            receiverID: this.props.recipientID
        }
        firebase.database().ref("messages/").push(msgObj)
    }

    render() {
        // console.log(this.props.currentUser, '////////////////');
        // console.log(this.props.allUsers, '******************');
        // console.log(this.props.allMessages, '----------');
        return (
            <div>
                <h1>Hello Chat</h1>
                <div className="col1of2">
                    {
                        this.props.allUsers.map((user, index) => {
                            return (
                                <h2 key={index} onClick={this.setRecipient.bind(this, user.uid)}>{user.username}</h2>

                            )
                        })
                    }
                </div>
                <div className="col2of2">
                    <h1>messages</h1>
                    <input type="text" onChange={this.inputHandler.bind(this)} />
                    <button onClick={this.sendMessage.bind(this)}>Send Messages</button>
                    {
                        this.props.allMessages.map((msg, ind) => {

                            // console.log(msg, "map msg");
                            return (
                                (msg.receiverID === this.props.recipientID && msg.senderID === this.props.currentUser) ? (
                                    <div key={ind}>
                                        <p>{msg.msg}</p>
                                    </div>
                                ) : (null)
                            )
                        })
                    }
                </div>
            </div>

        )
    }
}

function mapStateToProp(state) {
    // console.log(state, "state")
    return ({
        currentUser: state.root.currentUser,
        allUsers: state.root.users,
        allMessages: state.root.message,
        recipientID: state.root.recipientID


    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        changeRecUID: (recID) => {
            dispatch(changeRecipientUID(recID));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Chat);