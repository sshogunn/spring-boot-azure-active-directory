// @flow
import React, {Component} from 'react';
import './App.css';
import {adalLogOut, adalFetch} from './adal';

class App extends Component<{}> {

    logOut() {
        console.log('logging out...');
        adalLogOut();
    }

    request() {
        console.log('Sending request...');
        adalFetch('api/endpoint', {})
            .then(data => {
                console.log('Response: ', data);
            });
    }

    render() {
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
            </div>
        );
    }
}

export default App;
