import { useState, useEffect } from 'react';

function Login({ token, setToken }) {
  const REDIRECT_URI = "http://localhost:3000/redirect"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const scope = "streaming \
               user-read-email \
               user-read-private";

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, []);

    return (
        <div className="Login">
             {!token ?
                <a href={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`}>Login
                    to Spotify</a>
                : <button onClick={logout}>Logout</button>}
        </div>
    );
}

export default Login;