import { useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <h1>Electron + Vite + React</h1>
                    <p>
                        Edit <code>src/App.jsx</code> and save to reload.
                    </p>
                    <div className="card">
                        <button onClick={() => setCount((count) => count + 1)}>
                            Count is {count}
                        </button>
                    </div>
                    <p>
                        <a
                            className="App-link"
                            href="https://vitejs.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn Vite
                        </a>
                        {' | '}
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            React Docs
                        </a>
                        {' | '}
                        <a
                            className="App-link"
                            href="https://www.electronjs.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Electron Docs
                        </a>
                    </p>
                </header>
            </div>
        </>
    )
}

export default App