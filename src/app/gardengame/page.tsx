"use client"

import NavHeader from "@/components/navHeader";
import RightPanel from "@/components/rightPanel";
import { prisma } from "@/db";
import { useState } from "react";


interface storeItemType {
    itemId: number,
    itemName: string,
    itemCost: number,
}

interface gameSaveType {
    saveId: string,
    saveUserId: string,
    saveString: string,
    saveLeaves: number,
    saveLeavesPerSecond: number,
    saveUpdated: Date,
    saveCreated: Date,
}

let testItems: storeItemType[] = [
    {itemId: 0, itemName: 'beans', itemCost: 24},
    {itemId: 1, itemName: 'apples', itemCost: 48},
    {itemId: 2, itemName: 'chips', itemCost: 128},
    {itemId: 3, itemName: 'carrots', itemCost: 248},
    {itemId: 4, itemName: 'gravy', itemCost: 942},
    {itemId: 5, itemName: 'titos', itemCost: 1482},
    {itemId: 6, itemName: 'hershey kisses', itemCost: 3287},
    {itemId: 7, itemName: 'cereal', itemCost: 6327},
    {itemId: 8, itemName: 'noodles', itemCost: 14203},
]

interface userType {
    id: string,
    username: string,
}


async function getUserSave(user: userType) {
    const userSave = await prisma.userSave.findFirst({
        where: {
            saveUser: {
                id: user.id
            }
        }
    })
  
    const postElements = new Array()
  
    blogPosts.forEach(post => {
      postElements.push(<BlogPost postData={post} />)
    })
  
    return postElements
}

export default function GamePage() {

    const [gameSave, setGameSave] = useState(getUserSave())


    function Store(props: {storeItems: Array<storeItemType>}) {

        const elements = props.storeItems.map(storeItem => (
            <div className="flex flex-row justify-between bg-gray-100 p-2 hover:bg-gray-200 rounded" key={storeItem.itemId}>
                <div className="bg-black mr-2">
                    <img className="min-w-[35px] h-[35px]" src=""></img>
                </div>
                <hr className="border-r border-solid h-full border-slate-500/25 border-2" />
                <p className="w-full text-left px-2 self-center text-xl font-sans">{storeItem.itemName}</p>
                <p className="w-full text-right px-2 self-center">$</p>
                <p className="w-[250px] text-right px-3 self-center">{storeItem.itemCost}</p>
            </div>
        ))

        return (
            <div className="flex flex-col gap-1 hover:cursor-pointer m-2 mt-1 w-full">
                {elements}
            </div>
        )
    }
    
    function GameBoard() {
        const letterRows = [
            ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["-", "A", "-", "-", "-", "-", "-", "-", "-"],
            ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ]

        const letters = (
            <div className="flex flex-col gap-1">
                {letterRows.map((row, rowIndex) => (
                    <span key={rowIndex} className="flex flex-row gap-1">
                        {row.map((char, charIndex) => (
                            <p key={charIndex} className="text-white text-2xl text-center h-12 w-12 pt-3 flex justify-center bg-purple-900/5 hover:bg-gray-900 hover:cursor-pointer rounded">{char}</p>
                        ))}
                    </span>
                ))}
            </div>
        )
        

        return (
            <div className="bg-black mr-2 mb-2 rounded h-fit">
                <div className="bg-blue-900/5 rounded p-1">
                    {letters}
                </div>
            </div>
        )
    }
    
    function GameHeader() {
        return (
            <span className="flex flex-col justify-end bg-gray-700 text-white p-2 px-3 m-2 text-end rounded-md">
                <p>leaves</p>
                <p>lps</p>
            </span>
        )
    }

    function GameComponent() {
        return (
            <>  
                <div className="flex flex-col w-auto m-4 bg-white">
                    <GameHeader />
                    <div className="flex flex-row">
                        <Store storeItems={testItems} />
                        <GameBoard />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
        <div className="flex flex-col w-[1050px]">
          {/* <MainHeader /> */}
          <main className='flex flex-row bg-black/20'>
            <div className="w-full">
              <NavHeader />
              <GameComponent />
            </div>
          </main>
        </div>
    </>
  )
}