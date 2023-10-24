"use client"
import React, { useState, useEffect } from 'react';

export default function LoginPage() {
    const [forgotPassword, setForgotPassword] = useState(false)
    const [creatingAccount, setCreatingAccount] = useState(false)

    const f = false;

    let menu = LoginMenu();

    if (forgotPassword) {
        menu = ForgotPasswordMenu();
    }
    
    if (creatingAccount) {
        menu = CreateAccountMenu();
    }

    return (
        <div className="w-full h-full flex justify-center mt-24">
            <form className="bg-gray-200 p-2 w-[400px] h-fit flex flex-col align-end gap-0 ">
                {menu}
            </form>
        </div>
    )

    function LoginMenu() {
        return (
            <>
                <input className="m-2 p-1" type="text" placeholder="email"></input>
                <input className="m-2 p-1" type="password" placeholder="password"></input>
                <input className="text-sm hover:cursor-pointer hover:bg-gray-400/25" type="button" value="Create Account" onClick={e => setCreatingAccount(true)}></input>
                <input className="text-sm hover:cursor-pointer hover:bg-gray-400/25" type="button" value="Forgot Password" onClick={e => setForgotPassword(true)}></input>
                <input className="m-2 hover:cursor-pointer hover:bg-white bg-white/50" type="submit" value="Login"></input>
            </>
        )
    }
    
    function CreateAccountMenu() {
        return (
            <>
                <input className="m-2 p-1" type="text" placeholder="email"></input>
                <input className="m-2 p-1" type="password" placeholder="password"></input>
                <input className="m-2 p-1" type="password" placeholder="re-enter password"></input>
                <input className="text-sm hover:cursor-pointer hover:bg-gray-400/25 py-0 mx-2" type="button" value="Back" onClick={e => setCreatingAccount(false)}></input>
                <input className="m-2 hover:cursor-pointer hover:bg-white bg-white/50" type="submit" value="Create Account"></input>
            </>
        )
    }
    
    function ForgotPasswordMenu() {
        return (
            <>
                <input className="m-2 p-1" type="text" placeholder="email"></input>
                <input className="text-sm hover:cursor-pointer hover:bg-gray-400/25 py-0 mx-2" type="button" value="Back" onClick={e => setForgotPassword(false)}></input>
                <input className="m-2 hover:cursor-pointer hover:bg-white bg-white/50" type="submit" value="Send Recovery"></input>
            </>
        )
    }
}


