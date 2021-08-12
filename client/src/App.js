import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { About } from './components/About';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { MenuButtons } from './components/MenuButtons';
import { Login } from './components/Login';
import { Register } from './components/Register';

export const App = () => {
    const [isDarkmode, setIsDarkmode] = React.useState(true);
    const bodyElement = document.body;

    React.useEffect(() => {
        if (isDarkmode) {
            bodyElement.classList.add("darkmode");
        } else {
            bodyElement.classList.remove("darkmode");
        }
    }, [isDarkmode, bodyElement])

    const handleCallback = (newValue) => {
        setIsDarkmode(newValue);
    }
    
  return(
    <div id="app">
        <HashRouter>
            <Header darkMode={isDarkmode}/>
            <div class="background-img">
            <img 
            src="https://images.unsplash.com/photo-1572062505547-912c49028cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDIwfHxkYXJrJTIwbW9kZXxlbnwwfHx8fDE2MTc2MDM0NTI&ixlib=rb-1.2.1&q=80&w=2000"
            alt="Background"
            class="img" />    
            </div>
            <Switch>
                <Route exact path="/about" component={About} />
                <Route exact path="/login" render={() => (
                    <Login darkMode={isDarkmode}/>
                    )}/>
                <Route exact path="/register" render={() => (
                    <Register darkMode={isDarkmode}/>
                )}/>
                <Route path="/" render={() => (
                    <Home darkMode={isDarkmode} />
                )}/>
            </Switch>
        </HashRouter>
    </div>
)
}

export default App;
