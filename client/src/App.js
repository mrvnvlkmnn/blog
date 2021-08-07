import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { About } from './components/About';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { MenuButtons } from './components/MenuButtons';

export const App = () => {
    const [isDarkmode, setIsDarkmode] = React.useState(false);
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
                <Route path="/" component={Home} />
            </Switch>
            <MenuButtons darkMode={isDarkmode} changeMode={handleCallback}/>
            {isDarkmode ? "true" : "false"}
        </HashRouter>
    </div>
)
}

export default App;
