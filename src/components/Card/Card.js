
import {useState} from 'react';
import './Card.css';


function Card({start, step, symbol}) {
    const [n, setN] = useState(start);

    function clickBtn() {
        setN(n => {
            if (symbol === '*') {
                return n * step;
            } else if (symbol === '+') {
                return n + step;
            } else if (symbol === '-') {
                return n - step;
            } else {
                return n;
            }
        })
    }

    return (
        <div className="card">
            <h2 className="card-title">Clicks: {n}</h2>
            <button className="card-button" onClick={clickBtn}>Click me</button>
        </div>
    )
}

export default Card;
