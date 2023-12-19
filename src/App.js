import { useState } from 'react';
import './App.css';

function App() {
  const [ song, setSong ] = useState('');
  const [ songs, setSongs ] = useState([]);

  function handleSearch(event) {
    event.preventDefault();
    if (song.trim() === '') {
      alert('U sould type something');
    }
    setSong('');
    getSong(song);
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7ab5168070mshd0b4615225a13e3p1cd749jsneba6bef110b8',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  async function getSong(song) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${song}&type=multi&offset=0&limit=20&numberOfTopResults=5`;
      let data = await fetch(url, options);
      let res = await data.json();
      setSongs(res.tracks.items);
      console.log(res.tracks.items);

      // Err handler
    } catch (err) {
      console.log(err);
    }
  }

  return <>
    <h2>Tangerine Music</h2>
    <form onSubmit={ handleSearch }>
      <input type='text' value={ song } onChange={ event => setSong(event.target.value) }></input>
      <button type='submit'>Search</button>
    </form>

    { songs.map((song, index) => (
      <>
        {/* <div key={index}>
          <img src={ song.data.albumOfTrack.coverArt.sources[0].url } alt="" />
          <h2>{ song.data.name }</h2>
          <a href={ song.data.uri }><button>Play song</button></a>
        </div> */}

        <div class="card">
          <img src={ song.data.albumOfTrack.coverArt.sources[0].url } alt="" />
          <div class="card-body">
            <h2>{ song.data.name }</h2>
            <a href={ song.data.uri }><button>Play song</button></a>
          </div>
        </div>
      </>
    ))}
  </>
}

export default App;