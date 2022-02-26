import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistDisplay from '../components/elements/PlaylistDisplay';
import Track from '../components/elements/Track';

const spotify = new SpotifyWebApi();

const User: NextPage = () => {

    const [user, setUser] = useState("");
    const [userImage, setUserImage] = useState("");
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const accessToken = getCodeFromUrl().access_token;

        if (accessToken) {
            spotify.setAccessToken(accessToken);
            spotify.getMe().then((user) => {
                if (user.display_name != undefined) {
                    const name = user.display_name;
                    setUser(name);
                }
                if (user.images != undefined) {
                    setUserImage(user.images[0]["url"])
                }
            });

            spotify.getUserPlaylists().then((res) => {
                var playlists = []
                var cnt = 0
                res.items.forEach(p => {
                    var playlist = { img: p.images[0]["url"], name: p.name, cnt: cnt }
                    playlists.push(playlist);
                    cnt++;
                })
                setPlaylists(playlists);
            })
        }
    }, [])


    return (
        <div>
            <h3 className="text-3xl font-bold">Welcome, {user}!</h3>
            <img src={userImage} />
            <br />
            <h3 className="text-2xl font-bold">Your Playlists</h3>
            <div className="flex gap-5 ml-5 mr-5">
                {playlists.map(playlist => (
                    <PlaylistDisplay key={playlist.cnt} img={playlist.img} name={playlist.name} />
                ))}
            </div>
            <br/>
            <Track key={0} name="Way It Goes" artist="Hippo Campus" popularity={80}/>
        </div>
    )
}

export default User

export const getCodeFromUrl = () => {
    return window.location.search
        .substring(1)
        .split('&')
        .reduce((initial: any, item) => {
            // #accessToken=mysecretkev&name=somerandomname
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial
        }, {});
}

function getTopItems() {
    spotify.getMyTopTracks().then((res) => {
        console.log(res.items);
    })
}