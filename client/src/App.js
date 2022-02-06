import { Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './components/Create';
import Detail from './components/Detail';
import Home from './components/Home';
import Landing from './components/Landing';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing />}/>
        <Route exact path='/create' element={<Create />}/>
        <Route exact path='/home/detail/:id' element={<Detail />}/>
        <Route exact path='/home' element={<Home />}/>
      </Routes>
    </div>
    
  );
}

export default App;
