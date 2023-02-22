
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';

// pages
import Home from './pages/Home';
import Form from './pages/Form';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
             <Route path="/" element={<Home/>} />
             <Route path="/form" element={<Form/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
