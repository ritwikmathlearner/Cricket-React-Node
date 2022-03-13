import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const [players, setPlayers] = useState([])
  const [name, setName] = useState('')
  const [hs, setHs] = useState('')
  const [match, setMatch] = useState('')
  const [formName, setFormName] = useState('')
  const [formMatches, setFormMatches] = useState('')
  const [formRuns, setFormRuns] = useState('')
  const [formHs, setFormHs] = useState('')
  const [formAction, setFormAction] = useState('Add')

  useEffect(() => {
  }, []);

  const searchByName = async e => {
    let name = e.target.value;
    setName(name)
    if (name !== '') {
      setHs('')
      setMatch('')
      let data = await axios.get(`http://localhost:5000/cricketer/${name}`)
      if (data.data.data != null)
        setPlayers([data.data.data])
    }
  }

  const searchByHs = async e => {
    let hs = e.target.value;
    setHs(hs)
    if (hs !== '') {
      setName('')
      setMatch('')
      let data = await axios.get(`http://localhost:5000/hs/${hs}`)
      if (data.data.data != null)
        setPlayers([...data.data.data])
    }
  }

  const searchByMatch = async e => {
    let match = e.target.value;
    setMatch(match)
    if (match !== '') {
      setName('')
      setHs('')
      let data = await axios.get(`http://localhost:5000/${match}`)
      if (data.data.data != null)
        setPlayers([...data.data.data])
    }
  }

  const deletePlayer = async player_name => {
    await axios.post(`http://localhost:5000/cricketer`, {
      player_name
    })
    let new_players = players.filter(player => player.player_name !== player_name)
    setPlayers(new_players)
  }

  const addOrUpdatePlayer = async (e) => {
    e.preventDefault()
    if (formAction === 'Add') {
      await axios.post(`http://localhost:5000`, {
        player_name: formName,
        matches: formMatches,
        runs: formRuns,
        hs: formHs,
      })
    } else {
      await axios.post(`http://localhost:5000/update`, {
        player_name: formName,
        update: {
          matches: formMatches,
          runs: formRuns,
          hs: formHs
        }
      })
    }
    setFormName('')
    setFormMatches('')
    setFormRuns('')
    setFormHs('')
    setName('')
    setHs('')
    setMatch('')
    setPlayers([])
    setFormAction('Add')
  }

  const fillEditForm = (player) => {
    setFormName(player.player_name)
    setFormMatches(player.matches)
    setFormRuns(player.runs)
    setFormHs(player.hs)
    setFormAction('Update')
  }

  const resetForm = (e) => {
    e.preventDefault()
    setFormName('')
    setFormMatches('')
    setFormRuns('')
    setFormHs('')
    setFormAction('Add')
  }

  return (
    <div className='container'>
      <form className='add'>
        <h3>Add/Update Form</h3>
        <div>
          <label htmlFor="form-player-name">Player Name</label>
          <input type="text" id="form-player-name" value={formName} onChange={e => setFormName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="form-player-matches">Player Matches</label>
          <input type="number" id="form-player-matches" value={formMatches} onChange={e => setFormMatches(e.target.value)} />
        </div>
        <div>
          <label htmlFor="form-player-runs">Player Runs</label>
          <input type="number" id="form-player-runs" value={formRuns} onChange={e => setFormRuns(e.target.value)} />
        </div>
        <div>
          <label htmlFor="form-player-hs">Player Hs</label>
          <input type="number" id="form-player-hs" value={formHs} onChange={e => setFormHs(e.target.value)} />
        </div>
        <button onClick={addOrUpdatePlayer} >{formAction} Player</button>
        <button onClick={resetForm}>Clear</button>
      </form>
      <br />
      <form>
        <label htmlFor="player-name">Player Name</label>
        <input type="text" id="player-name" value={name} onChange={searchByName} />
      </form>
      <form>
        <label htmlFor="player-hs">Player Hs</label>
        <input type="number" id="player-hs" value={hs} onChange={searchByHs} />
      </form>
      <form>
        <label htmlFor="player-match">Player Match</label>
        <input type="number" id="player-match" value={match} onChange={searchByMatch} />
      </form>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Matches</th>
            <th>Runs</th>
            <th>HS</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            return <tr key={index}>
              <td>{player.player_name}</td>
              <td>{player.matches}</td>
              <td>{player.runs}</td>
              <td>{player.hs}</td>
              <td>
                <button onClick={() => deletePlayer(player.player_name)}>Delete</button>
                <button onClick={() => fillEditForm(player)}>Edit</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
