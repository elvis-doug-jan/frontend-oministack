import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import api from './../services/api'
import { Link } from 'react-router-dom'
import './Main.css'

export default function Main({ match }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      let response = []
      await api.get('/devs', { headers: { user: match.params.id } })
        .then(res => response = res.data)
        .catch(err => console.warn(err))

      setUsers(response)
    }

    loadUsers()
  }, [match.params.id])

  async function handleLike(id) {
    await api.post(`/devs/${id}/like`, null, { headers: { user: match.params.id } })

    setUsers(users.filter(user => user._id !== id))
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislike`, null, { headers: { user: match.params.id } })

    setUsers(users.filter(user => user._id !== id))
  }

  function withoutDevs(usesList) {
    return (
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>

            <div className="buttons">
              <button type="button" onClick={() => handleLike(user._id)}>
                <img src={dislike} alt="Dislike" />
              </button>
              <button type="button" onClick={() => handleDislike(user._id)}>
                <img src={like} alt="Like" />
              </button>
            </div>
          </li>
        ))
        }
      </ul>
    )
  }

  return (
    <div className="main-container">
      <Link to={"/"}>
        <img src={logo} alt="TinDev" />
      </Link>
      {users.length > 0 ? (
        withoutDevs(users)
      ) : (
          <div className="empty">Acabou D: </div>
        )}
    </div>
  )
}