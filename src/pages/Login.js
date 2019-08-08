import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import api from './../services/api'
import './Login.css'

export default function Login({ history }) {
  const [username, setUsername] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    await api.post('/devs', {
      username
    }).then(res => console.log(res.data))

    history.push('/main')
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev"></img>
        <input
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
