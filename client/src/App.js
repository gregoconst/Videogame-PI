import { Route, Routes } from 'react-router-dom';
import './App.css';
import {Create} from './components/Create';
import Detail from './components/Detail';
import HomeContainer from './components/HomeContainer';
import Landing from './components/Landing';
import { NavBar } from './components/NavBar';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing />}/>
        <Route exact path='/home' element={<HomeContainer />}/>
        {/* <Route exact path='/home' element={<NavBar/>} /> */}
        <Route exact path='/create' element={<Create />}/>
        <Route exact path='/home/detail/:id' element={<Detail />}/>
      </Routes>
    </div>
    
  );
}

export default App;
