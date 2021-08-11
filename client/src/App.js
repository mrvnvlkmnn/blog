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
            <MenuButtons darkMode={isDarkmode} changeMode={handleCallback}/>
        </HashRouter>
    </div>
)
}

export default App;
