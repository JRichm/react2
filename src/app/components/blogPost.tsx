"use client"

import React, { useState } from 'react'
import { togglePostVisibility } from '../crud'
import { prisma } from "@/db"

interface blogPostDataProps {
    postData: {
        id: string,
        title: string,
        textData: string,
        postDate: Date,
        postCreated: Date,
        postUpdated: Date,
        postVisible: boolean
    }
}

export default function BlogPost({postData}: blogPostDataProps) {

    const [hovering, setHovering] = useState(false);
    const [visible, setVisibility] = useState(true);

    function hidePost() {
        setVisibility(false)
        togglePostVisibility(postData.id, false)
    }

    return (
        <>
            <div className={`p-5 px-10 bg-white m-4 rounded-xl w-[700px] ${ visible ? "visible" : "hidden" }`} onMouseLeave={() => setHovering(false)}  onMouseEnter={() => setHovering(true)} >
                <div className="w-full flex justify-end">
                    <input type="button" onClick={e => hidePost()} value="x" className={`bg-red-500 text-xl border-white/25 hover:border-black/25 border-2 text-black/50 hover:text-white w-8 h-8 font-bold rounded-full absolute self-end mx-[-50px] ${hovering ? "visible" : "hidden"} cursor-pointer transition-all`}></input>
                </div>
                <h1 className="text-2xl m-3" key="title">{postData.title}</h1>
                <p className="text-sm" key="text" >{postData.textData}</p>
                <span className="flex flex-row justify-between">
                    <p className="text-end m-3 text-gray-500" key="date">{new Date(postData.postDate).toDateString()}</p>
                </span>
            </div>
        </>
    )
}