import type { NextPage } from 'next'
import FadeIn from '../animations/animations'
import { animated } from '@react-spring/web';
import Para from "../animations/animations"
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Loading from '../animations/Loading';

const spotify = new SpotifyWebApi();

type UserComputedData = {
    indieRatio: number;
    mostCommonArtists: object;
}

const Home: NextPage = () => {

    let hold: UserComputedData  = {
        indieRatio: 0,
        mostCommonArtists: {}
    }

    const [computedData, setComputedData] = useState(false);
    const [data, setData] = useState<UserComputedData>(hold);
    const [artists, setArtists] = useState({});
    const [genres, setGenres] = useState({});
    const [indieCount, setIndieCount] = useState(undefined);

    useEffect(() => {
        const accessToken = getCodeFromUrl().access_token;

        if (accessToken) {
            var limit = 50;

            fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=short_term`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                var ids = compileArtists(data);
                var repeatedArtists = ids[1];
                fetch(`https://api.spotify.com/v1/artists?ids=${ids[0].join(",")}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setArtists(data.artists);
                    let g = compileGenres(data.artists, repeatedArtists);
                    setGenres(g[0]);
                    setIndieCount(g[1])

                    let indieRatio = g[1]/(g[1]+g[2])*100
                    setData({indieRatio: indieRatio, mostCommonArtists: repeatedArtists})

                    setComputedData(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [])

    return (
        <div className="flex justify-center items-center min-h-screen">
            {/* <Loading /> */}
            {computedData ? <Para percentage={data.indieRatio}/> : <h1>Collecting information</h1>}
            {/* {indieCount ? <h1 className="text-4xl font-bold">Total indie count: {indieCount}</h1> : null }
            {Object.keys(genres).map((key, index) => (
                <p key={index}>{key}: {genres[key]}</p>
            ))} */}
        </div>
    );
}

export default Home;

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
/**
 * Compile Artist
 * @param data user's top tracks from Spotify API
 * @returns the ids of all the artists from the top tracks data
 */
function compileArtists(data): [Array<string>, object] {
    const tracks = data.items
    var ids = []
    let repeatedArtists = {}
    tracks.forEach(track => {
        var id = track["artists"][0]["id"]
        let name = track["artists"][0]["name"]
        if (!ids.includes(id)) { // don't repeat the same artists/ids
            ids.push(track["artists"][0]["id"])
        } else {
            if (repeatedArtists[name] !== undefined) {
                repeatedArtists[name] += 1                
            } else {
                repeatedArtists[name] = 1
            }
        }
    });
    return [ids, repeatedArtists];
}

/**
 * Compile genres
 * @param artists list of artists that user listens to
 * @returns genres listened to, # of indie genre, # of non-indie genres
 */
function compileGenres(artists, repeatedArtists): [object, number, number] {
    var genres = {}
    var indieCount = 0
    var nonIndieCount = 0
    artists.forEach(artist => {
        var genreList = artist["genres"]
        if (genreList.some(x => x.includes("indie"))) {
            indieCount++;
            if (repeatedArtists[artist["name"]] != undefined) {
                indieCount += repeatedArtists[artist["name"]]
            }
        } else {
            nonIndieCount++;
            if (repeatedArtists[artist["name"]] != undefined) {
                nonIndieCount += repeatedArtists[artist["name"]]
            }
        }

        genreList.forEach(g => {
            if (genres[g] == undefined) {
                genres[g] = 1
            } else {
                genres[g] += 1
            }
        });
    });
    return [genres, indieCount, nonIndieCount]
}