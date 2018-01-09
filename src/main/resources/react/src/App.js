// @flow
import React, {Component} from 'react';
import './App.css';
import {adalLogOut, adalFetch} from './adal';

class App extends Component<{}> {

    constructor() {
        super();
        this.state = {
            response: null
        }
    }

    logOut() {
        console.log('logging out...');
        adalLogOut();
    }

    request = () => {
        console.log('Sending request...');
        adalFetch('http://localhost:8080/api/todolist', {
            method: "POST",
            body: JSON.stringify({
                ID: 20,
                Description: 'Test secured endpoint',
                Owner: 'TestUser'
            })
        })
            .then(response => {
                console.log('Response: ', response);
                this.setState({response})
            });
    };

    render() {
        const resp = this.state.response &&
            <div>
                <h2>API response:</h2>
                {JSON.stringify(this.state.response, null, 4)}
            </div>;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Azure AD authentication test</h1>
                </header>
                <p className="App-intro">
                    Edit <code>adal/adal-config.js</code> and change <code>tenant</code>, <code>clientId</code> and <code>endpoints</code>.
                </p>
                <button onClick={this.logOut}>Logout</button>
                <button onClick={this.request}>Make request</button>
                {resp}
            </div>
        );
    }
}

export default App;
