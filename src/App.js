import './App.css'
import Header from "./Compoents/header/Header";
import Footer from "./Compoents/footer/Footer";

import Movies from "./pages/Movies/Movies";
import Trending from "./pages/Trending/Trending";
import Search from "./pages/Search/Search";
import Series from "./pages/TV-series/Series";

 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App" >
            <Header />
            <div className="content">
            <Switch>
            <Route path="/" component={Trending} exact />  
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            </Switch>
            </div>
            <Footer />

      </div> 
    </Router>
  );
}

export default App;
