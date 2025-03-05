import Card from "./components/Card/Card.js";
import './App.css'
import Info from "./components/Info/Info.js";

function App() {
    return (
        <div className="App">
            <div className="card-container">
                <Card start={4} step={2} symbol="*"/>
                <Card start={4} step={2} symbol="+"/>
                <Card start={4} step={2} symbol="-"/>
            </div>
        </div>
    )
}

export default App;