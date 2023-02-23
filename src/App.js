
import { Routes, Route } from 'react-router-dom';
import './App.css';

// pages
import Home from './pages/Home';
import Form from './pages/Form';
import VegyInfo from './pages/VegyInfo';
import VegyInfoList from './pages/VegyInfoList';

function App() {
  return (
  
        <Routes>
          <Route>
             <Route path="/" element={<Home/>} />
             <Route path="/form" element={<Form/>} />
             <Route path="/infoList" element={<VegyInfoList/>} />
             <Route path="/infoList/:id" element={<VegyInfo/>} />
          </Route>
        </Routes>
   
  );
}

export default App;
