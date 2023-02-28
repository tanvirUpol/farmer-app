
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import VegyInfo from './pages/VegyInfo';
import VegyInfoList from './pages/VegyInfoList';
import NotFound from './pages/NotFound';
import AuthProvider from './context/AuthProvider';
import PrivateOutlet from './components/PrivateOutlet';
import Login from './pages/Login';
import PreviousUploadedList from './pages/PreviousUploadedList';

function App() {

  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path='/' element={<PrivateOutlet />}>
          <Route path="/" element={<Home />} />
          <Route path="previous-uploaded-list" element={<PreviousUploadedList />} />
          <Route path="form" element={<Form />} />
          <Route path="infoList" element={<VegyInfoList />} />
          <Route path="infoList/:id" element={<VegyInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
