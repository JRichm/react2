"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const config = require('../../../config.json');
const client_id = config.CLIENT_ID;
const client_secret = config.CLIENT_SECRET;

interface SpotifyApiResponse {
    album: {
        images: {
            url: string;
        }[];
    };
    name: string;
}

export default function AsidePanel() {

    const router = useRouter();

    const [displayedSong, setDisplayedSong] = useState<SpotifyApiResponse | undefined>();
    const [apiToken, setApiToken] = useState<string | undefined>();

    // use effect
        // get api token
        // authorize token
        // get displayed song

    useEffect(() => {
        const setToken = async () => {

            // get token for app only if its not already set
            if (!apiToken) {
                const token = await get_token("")
                setApiToken(token)
            }

            console.log('(*) Token:', apiToken);

            const url = new URL(window.location.href);
            const codeValue = url.searchParams.get('code');
            
            //
            if (codeValue !== null) {
                console.log('(*) Value of code param:', codeValue);

                const authorizedToken = await get_token(codeValue)
                setApiToken(authorizedToken)

            // Authorize token
            } else {
                console.log('(>) code param not found in url, authorizing')
                await authorizeApp();
            }
        }
        setToken();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (apiToken) {
                // Get displayed song
                const song = await GetMostRecentSong();
                console.log('(*) Song:', song);
                setDisplayedSong(song)
            }
        }
        fetchData();
    }, [apiToken])

    async function GetMostRecentSong() {

        console.log('(>) Getting Most Recent Song...')
        console.log(apiToken)
    
        if (!apiToken || apiToken == "") {
            console.error('(!)Error getting access token:', apiToken);
        } else {
            console.log('(✓) valid token')
        }

        // const apiResponse = await fetch(`https://api.spotify.com/v1/playlists/1okbgtASYcBbmjfaGA1jps/tracks?limit=1`, {
        const apiResponse = await fetch(`https://api.spotify.com/v1/users/8rpo2o2l29kvna1ekmxcjk4cm/top/tracks?limit=1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        })

        if (!apiResponse.ok) {
            if (apiResponse.status == 401) {
                const currentURL = new URL(window.location.href)
                const code = "" + currentURL.searchParams.get('code')
                const newToken = await get_token(code);
                console.log('newToken')
                console.log(newToken)
                console.log(apiToken)

                const authorizedToken = await get_token(newToken);
                console.log('newAuthorizedToken')
                console.log(authorizedToken)
            }
            console.error('(!) Error fetching data from the Spotify API:', apiResponse.status, apiResponse.statusText);
            console.error(apiResponse);
            return;
        }

        const data = await apiResponse.json();
        
        console.log('data');
        console.log(data);
    
        const mostRecentSong = data.items[0].track;
        return mostRecentSong;
    }

    async function get_token(code: string) {

        // concat authString and convert to base64
        const authString = client_id + ":" + client_secret;
        const authBase64 = Buffer.from(authString, "utf-8").toString("base64");
        
        var body = ""

        if (code) {
            body = 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code
        } else {
            body = 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
        }

        const token = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authBase64}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        }).then(res => res.json())
        .then(async(data) => {
            console.log('return valaue of get_token') 
            console.log(data.access_token) 
            console.log(code) 
            return data.access_token;
        })
        .catch(err => {
            console.error('(!) Error fetching token:', token.error.message);
        })
        return token;
    }

    async function authorizeApp() {

        const REDIRECT_URI = 'http://localhost:3000/';
        const SCOPE = 'user-top-read'
        const state = generateRandomString(16);
        const authorizationURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${SCOPE}&state=${state}&redirect_uri=${REDIRECT_URI}`;

        try {
            console.log('(>) Authorizing App...');
            router.push(authorizationURL);
        } catch (err) {
            console.error('(!) Error authorizing app:', err);
        }
    }

    function generateRandomString(length: number) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }

        return randomString;
    }

    return (
        <>
            <div className="border-r border-b border-black border-solid p-2 h-full w-[250px] flex flex-col">
                <div className='flex flex-col'>
                    <div className='flex w-full justify-center'>
                        {displayedSong && displayedSong.album && (
                            <Image
                                className="bg-black m-3"
                                alt={displayedSong.name}
                                src={displayedSong.album.images[0].url}
                                width={150}
                                height={150}
                            />
                        )}
                    </div>
                    <h1 className='text-center'>test header for image</h1>
                </div>
                <hr className='m-3' />
                <span>
                    <p>{apiToken}</p>
                </span>
            </div>
        </>
    )
}