
import {useState} from 'react';
import './Card.css';
import changeNumber from '../../changeNumber/changeNumber';


function Card({start, step, symbol}) {
    const [n, setN] = useState(start);

    function clickBtn() {
        setN(changeNumber(n, step, symbol));
    }

    return (
        <div className="card">
            <h2 className="card-title">Clicks: {n}</h2>
            <button className="card-button" onClick={clickBtn}>Click me</button>
        </div>
    )
}

export default Card;
