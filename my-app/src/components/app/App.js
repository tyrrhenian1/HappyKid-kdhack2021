import './App.css';
import '../LoginForm/Login';
import { LoginForm } from '../LoginForm/Login';
import { Quiz } from '../../Quiz/Quiz';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
} from "react-router-dom";
import { useState } from 'react';
import { Button } from 'antd';
import { Navbar } from '../Nabar/Navbar';
import { Account } from '../Account/Account';
import { Filter } from '../Filter/Filter';
import logo from'../../logo.png'

function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('loggined')));
  const [tutorialStatus, setTutorialStatus] = useState(JSON.parse(localStorage.getItem('tutorial')));
  console.log(auth);
  return (
    <div className="App">
      {!auth ? 
        <LoginForm status={auth} setAuth={setAuth}/>
        :
        <Router>
        <div className={"main"}>
          <div className={"navbar_wrapper"}>
            <img src={logo} alt="Logo" />
            <div className={"navbar_button_wrapper"}>
            <Button className="navbar">
              <Navbar/>
            </Button>
            <Button onClick={() => {
              localStorage.setItem('loggined', false);
              setAuth(false);
            }}>
              <Link to="/">Выйти</Link>
            </Button>
            </div>
          </div>
          <Switch>
            <Route exact path="/">
              {tutorialStatus ?
              <Filter/>
              :
              <Quiz setTutorialStatus={setTutorialStatus}/>
              }
            </Route>
            <Route exact path="/account">
              <Account setAuth={setAuth}/>
            </Route>
          </Switch>
        </div>
        </Router>
      }
    </div>
  );
}

export default App;
