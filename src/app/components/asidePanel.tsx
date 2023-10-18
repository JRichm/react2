"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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

    useEffect(() => {
        (async () => {
            var song = await GetMostRecentSong();
            setDisplayedSong(song);
            console.log('displayedSong:', song);
        })();
    }, []);

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
    const authString = client_id + ":" + client_secret;
    const authBase64 = Buffer.from(authString, "utf-8").toString("base64");

    const requestData = new URLSearchParams();
    requestData.append('grant_type', 'client_credentials');

    const get_token = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authBase64}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestData.toString(),
    }).then(res => res.json());

    if (get_token.error) {
        console.error('Error fetching token:', get_token.error.message);
        return;
    }

    const accessToken = get_token.access_token;

    return fetch('https://api.spotify.com/v1/search?q=nirvana&type=track&limit=1', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(res => res.json())
    .then(data => {
        const mostRecentSong = data.tracks.items[0]; // Adjust this based on the Spotify API response structure.
        // Update component's state or render the song information as needed
        return mostRecentSong
    })
    .catch(err => {
        console.error('Error fetching recently played song:', err);
    });
}