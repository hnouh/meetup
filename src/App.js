import './App.css';
import Navbar from './Components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import Grocery from './Components/Grocery'
function App() {
  return (
    
    <div className="App">
      <Navbar></Navbar>
      <div className="Content">
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route path="/Grocery" element={<Grocery/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
