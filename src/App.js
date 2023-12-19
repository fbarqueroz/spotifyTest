import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
    <header>
      <h2>Tangerine Music</h2>
      <form onSubmit={ handleSearch }>
        <input type='text' value={ song } onChange={ event => setSong(event.target.value) }></input>
        <button type='submit'>Search</button>
      </form>
    </header>
    <main>
    { songs.map((song, index) => (
      <>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ song.data.albumOfTrack.coverArt.sources[0].url } />
            <Card.Body>
              <Card.Title>{ song.data.name }</Card.Title>
              <Card.Text>{ song.data.artists.items[0].profile.name }</Card.Text>
              <a href={ song.data.uri }><Button variant="primary">Play Song</Button></a>
            </Card.Body>
          </Card>
      </>
    ))}
    </main>
  </>
}

export default App;



