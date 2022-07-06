import React, { useEffect } from 'react';
import './App.css';
import Auth from './Api/Auth';
import CodeModel from './Model/User/CodeModel';
import Model from './Model/Model';

function App () {
    useEffect(() => {
        console.log('Logging in...');

        Auth.login('admin', 'qwerty123')
            .then(() => {
                console.log(Auth.getCurrentUser());

                CodeModel.get(1)
                    .then((model: Model) => model as CodeModel)
                    .then((code: CodeModel) => {
                        console.log(code);
                    });
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
