import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Footer from '../components/elements/Footer';
import spotifyIcon from "../images/spotify-icon.png"

const Home: NextPage = () => {

  const spotify = new SpotifyWebApi();

  

  const [user, setUser] = useState("");

    useEffect(() => {
      console.log("This is from the url: ", getCodeFromUrl().code);

      const url_params = getCodeFromUrl();
      const _code: string = url_params.code
      const _state: string = url_params.state

      if (_code) {
        window.open(`http://localhost:8888/callback?code=${_code}&state=${_state}`, "_self")
      }
  
    }, [])

  return (
    <div className="flex flex-col gap-10 justify-center items-center bg-green-100 min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-2">
          How Indie Are You Really?
        </h1>
        <p>Tame Impala can't save you now, bud</p>
      </div>
      <button className="rounded-full bg-green-400 p-4 flex gap-2 justify-center items-center" onClick={login}>
        <img src={spotifyIcon.src} width={30} height={30} />
        <p className="font-bold">Connect to Spotify</p>
      </button>
    </div>
  )
}

function login() {
  window.open("http://localhost:8888/login", "_self")
}

export default Home

export const getCodeFromUrl = ()=> {
  return window.location.search
    .substring(1)
    .split('&')
    .reduce ((initial: any, item) =>{
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1])
      return initial
    }, {});
}