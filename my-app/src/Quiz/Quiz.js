import { useState } from "react";
import { Radio, Button, Progress } from 'antd';
import './Quiz.css';
import { Link, useHistory } from "react-router-dom";
const quizQuetions = {
    music : ['Тебя кажется что ты почти никогда не устаешь?', 'Твои движения легки, пластичны и грациозны?', 'Ты уже катаешься на велосипеде или самокате?', 'Тебе нравится бегать и играть на улице?'],
    test : ['Тебя кажется что ты почти никогда не устаешь?', 'Твои движения легки, пластичны и грациозны?', 'Ты уже катаешься на велосипеде или самокате?', 'Тебе нравится бегать и играть на улице?'],
    testt : ['Тебя кажется что ты почти никогда не устаешь?', 'Твои движения легки, пластичны и грациозны?', 'Ты уже катаешься на велосипеде или самокате?', 'Тебе нравится бегать и играть на улице?']
} 

const Quiz = ({setTutorialStatus}) => {
    const history = useHistory();
    const [value, setValue] = useState(0);
    const [stat, setStat] = useState({
        music : 0,
        tech : 0,
        art : 0,
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const statHandler = (index, event) => {
        let key = Object.keys(stat)[index]
        setValue(event.target.value);
        setStat({music : 0,
            tech : 0,
            art : 0, [key] : stat[Object.keys(stat)[index]]+1});
    };
    console.log(value, stat);
    return(
        <div className="card flex-col">
            <h1>Выбери подходящий вариант</h1>
            <Radio.Group onChange={(e) => {
            statHandler(value, e)}} value={value}>
            {Object.keys(quizQuetions).map((j, i) => {
            return <Radio data-remove={j} key={i} value={i}>{quizQuetions[j][currentIndex]}</Radio>
            })}
            <div className="button_wrapper">
                {quizQuetions[Object.keys(quizQuetions)[0]].length - 1 === currentIndex ? <Button onClick={() => {
                    localStorage.setItem('tutorial', true);
                    setTutorialStatus(true);
                    history.push('/')}}>Завершить</Button> : <Button type="primary" onClick={() => setCurrentIndex(prev => prev + 1)}>Далее</Button>}
            </div>
            <Progress percent={currentIndex / (quizQuetions[Object.keys(quizQuetions)[0]].length - 1) * 100 || 10} showInfo={false} />
        </Radio.Group>
        </div>
    )
}

export { Quiz };