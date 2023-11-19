import { useState } from 'react';
import './App.css';
import Login from './Login';
import WebPlayback from './Player';

function App() {
  const [ token, setToken ] = useState('');

    return (
        <div className="App">
            <header className="App-header">
              <Login token={token} setToken={setToken}/>
              {!token ?
                  <h3>no token!</h3>
                  : <WebPlayback token={token} />
              }
            </header>
        </div>
    );
}

export default App;