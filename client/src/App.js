import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { About } from './components/About';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';

export const App = () => {
  return(
    <div id="app">
        <HashRouter>
            <Header/>
            <div className="background-img">
            <img 
            src="https://images.unsplash.com/photo-1572062505547-912c49028cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDIwfHxkYXJrJTIwbW9kZXxlbnwwfHx8fDE2MTc2MDM0NTI&ixlib=rb-1.2.1&q=80&w=2000"
            alt="Background"
            className="img" />    
            </div>
            <Switch>
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register}/>
                <Route path="/" component={Home}/>
            </Switch>
        </HashRouter>
    </div>
)
}

export default App;
