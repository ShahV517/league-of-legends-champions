import React, {useEffect, useState} from 'react'
import axios from 'axios';

const App = () => {
    const [champion, setChampion] = useState('Aatrox');
    const [championData, setChampionData] = useState('');
    const [championImage, setChampionImage] = useState('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg');

    useEffect(() => {
        fetchData().then((data) => {
            setChampionData(data || '');
        });
    }, []);

    const fetchData = () => {
        return axios.get(`https://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion/${champion}.json`)
            .then(({ data }) => {
                console.log(data["data"][champion]);
                return JSON.stringify(data["data"][champion], null, 2);
            })
            .catch((err) => {
                console.log(err);
            }
        );
    }

    const fetchImage = () => {
        return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;
    }


    const handleChange = (e) => {
        setChampion(e.target.value);
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                fetchData().then((data) => {
                    setChampionData(data || '');
                });
                setChampionImage(fetchImage());
            }
            }>
                <label>
                    Champion:
                    <input type="text" value={champion} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>

            <div>
                <h1>
                    Champion: {champion}
                </h1>
                <img src={championImage} alt="champion" />
                <pre>
                    {championData}
                </pre>
            </div>
            
        </div>
    );
}

export default App;