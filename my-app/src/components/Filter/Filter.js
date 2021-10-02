import { useEffect, useState } from 'react';
import { Slider, Select, Button, Row, Col } from 'antd';
import './Filter.css';
const collection = ['Спортивная школа', 'Школа танцев', 'Школа искусств', 'Курсы иностранных языков', 'Компьютерные курсы', 'Боулинг-клуб', 'Клуб для детей и подростков', 'Клуб любителей животных', 'Конный клуб', 'Спортивный клуб, секция', 'Музыкальный клуб', 'Спортивная школа'];
const Filter = () => {
    const [coords, setCoords] = useState({
        latitude : 0,
        longitude  : 0
    });
    const [selected, setSelected] = useState([]);
    const [range, setRange] = useState(0);
    const [cards, setCards] = useState([]);
    const filterHandler = () => {
        Promise.all(selected.map(e => {
            return fetch(`https://search-maps.yandex.ru/v1/?text=${e}, Калининград${range ? `&ll=${coords.longitude.toFixed(5)},${coords.latitude.toFixed(5)}&spn=${range/111.3.toFixed(5)},${range/111.1.toFixed(5)}`: ''}&results=${Math.round(10/selected.length)}&type=biz&lang=ru_RU&apikey=f3d3e191-313c-467e-829b-53e0c3e628c7`).then(e => e.json())
        })).then(e => setCards(e));
        
        // fetch(`https://search-maps.yandex.ru/v1/?text=${selected.join(',')}, Калининград${range ? `&ll=${coords.longitude.toFixed(5)},${coords.latitude.toFixed(5)}&spn=${range/111.3.toFixed(5)},${range/111.1.toFixed(5)}`: ''}&type=biz&lang=ru_RU&apikey=f3d3e191-313c-467e-829b-53e0c3e628c7`).then(e => e.json()).then(e => setCards(e));
    }
    console.log(cards);
    const notificationHandler = (message) => {
        let parentMail = localStorage.getItem('parent_email');
        fetch(`http://localhost:5000/api/email/send`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
            mail : parentMail,
            message : message
        }) // body data type must match "Content-Type" header
        }).then(e => {
            if(e.ok){
                console.log('ok')
            }
        })
    }
    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCoords({latitude, longitude});
        }, console.log);
    }, []);
    console.log(cards);
    return (
        <>
        <div className="filter">
            <div className={"filter_item"}>
                <h2>Список секций:</h2>
                <Select
                mode="multiple"
                allowClear
                placeholder="Выбери секцию!"
                onChange={(value) => {
                    setSelected(value)}}
                >
                {collection.map((e, i) => {
                    return <Select.Option value={e} key={i.toString(36) + i}>{e}</Select.Option>
                })}
                </Select>
            </div>
            <div className={"filter_item"}>
                <h2>{range ? `Секции в ${range} км` : `Секция от тебя (км)`}</h2>
                <Slider defaultValue={0} min={1} max={10} onChange={(value) => setRange(value)} onAfterChange={(value) => setRange(value)}/>
            </div>
            <div className={"filter_item"}>
                <Button onClick={filterHandler}>Найти хобби</Button>
            </div>
        </div>
        <Row gutter={[16, 16]} justify="space-around" align="middle">
            {cards.length ? cards.map(e => {
                debugger
                return e.features.map(j => <Col className="gutter-row" span={8}>
                <div className={"card"} key={j.properties.CompanyMetaData.id}>
                {j.properties.CompanyMetaData.url ? <a href={j.properties.CompanyMetaData.url}>{j.properties.name}</a> : <h2>{j.properties.name}</h2>}
                <span className="ymaps-geolink" data-bounds={`${[j.properties.boundedBy[0],j.properties.boundedBy[1]]}`} data-type="biz">{j.properties.description}</span>
                {j.properties.CompanyMetaData.Hours ? <div className={"content_hours"}>{j.properties.CompanyMetaData.Hours.text}</div> : null}
                {j.properties.CompanyMetaData.Phones ? <div className={"content_phone"}>{j.properties.CompanyMetaData.Phones[0].formatted}</div> : null}
                <Button onClick={() => {
                    notificationHandler(`Здравствуйте, ваш ребенок хочет аниматься в ${j.properties.name}`)
                }} type="primary" danger>Хочу сюда!</Button>
                </div>
            </Col>)
                
            }) : null}
        </Row>
        </>
    );
}

export { Filter };