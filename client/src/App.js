import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Fib from "./Fib";
import OtherPage from "./OtherPage"


function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route exact path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
