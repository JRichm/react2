"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { redirect } from 'next/navigation';

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

    const [displayedSong, setDisplayedSong] = useState<SpotifyApiResponse | undefined>();

    console.log('Aside Panel')

    useEffect(() => {
        (async () => {
            console.log('Async Use Effect')
            var song = await GetMostRecentSong();
            setDisplayedSong(song);
        })();
    });

    return (
        <>
            <div className="border-r border-b border-black border-solid p-2 h-full w-[2000px] flex flex-col">
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
                    <p>some other random jazz</p>
                </span>
            </div>
        </>
    )
}

async function GetMostRecentSong() {
    try {
        console.log('Getting Most Recent Song...')

        const token = await get_token();
        if (!token || token.error) {
            console.error('(!)Error getting access token:', token.error)
            return;
        }

        console.log('(✓) valid token')
        const accessToken = token.access_token;
    
        const apiResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
    
        if (!apiResponse.ok) {
            console.error('(!) Error fetching data from the Spotify API:', apiResponse.status, apiResponse.statusText);
            return;
        }
    
        const data = await apiResponse.json();
    
        console.log('data');
        console.log(data);
    
        const mostRecentSong = data.items[0];
        return mostRecentSong;
    } catch (err) {
        console.error('(!) Error fetching recently played song:', err);
    }
}

async function get_token() {
    const authString = client_id + ":" + client_secret;
    const authBase64 = Buffer.from(authString, "utf-8").toString("base64");

    const requestData = new URLSearchParams();
    requestData.append('grant_type', 'client_credentials');

    const token = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authBase64}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    }).then(res => res.json())
    .then(async(data) => {
        const authorized = await authorizeApp(data)
        return data
    })
    .catch(err => {
        console.error('Error fetching token:', token.error.message);
    })
    console.log(token)
    return token;
}

async function authorizeApp(token: any) {
    const AUTH_URL = `https://acounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-%20user-modify-playback-state`;

    try {
        console.log('Authorizing application...');

        const authResponse = redirect(AUTH_URL)

    } catch (err) {
        console.error('(!) Error authorizing app:', err);
    }
}


// https://acounts.spotify.com/authorize?client_id=40b16be30c874e948cb0690b76c001fb&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-%20user-modify-playback-state