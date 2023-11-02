"use client"
import "./style.css";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { logInAuthorizedEmail } from './crud'

interface userInputFormType {
    username: string,
    email: string,
    password: string,
    password_conf: string,
}

export default function LoginPage() {
    const [forgotPassword, setForgotPassword] = useState(false)
    const [creatingAccount, setCreatingAccount] = useState(false)

    const [userFormData, setUserFormData] = useState({username: "", email: "", password: "", password_conf: ""})

    
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        // const email = session?.user?.email ? session?.user?.email : ""

        try {
            const login = async() => {
                const res = await fetch('/api/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(session?.user)
                })
    
                if (res.ok) {
                    console.log("res ok")
                }
            }
            
            login()

        } catch (error) {

        }
    }

    const userName = session?.user?.name;
    const userEmail = session?.user?.email;
    const isAuthenticated = !!session;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({
            ...userFormData,
            [name]: value
        })
        console.log("userFormData")
        console.log(userFormData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('form submitted')
        console.log(e)

        if (!userFormData?.email || !userFormData?.password || !userFormData?.password_conf) {
            setError("All Fields Are Necessary!");
            return;
        }

        try {
            console.log('sending user form data')
            console.log(userFormData)

            const res = await fetch('/api/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userFormData)
            })

            if (res.ok) {
                const form = e.target
                form.reset();
                console.log("res ok!")
            } else {
                console.log("user registration failed.")
            }
        } catch (error) {
            console.log("Error during registration:", error)
        }

    }

    let menu = LoginMenu();

    if (forgotPassword) {
        menu = ForgotPasswordMenu();
    }
    
    if (creatingAccount) {
        menu = CreateAccountMenu();
    }

    if (session) {
        menu = LoggedIn();
    }

    const f = false;

    return (
        <div className="w-full h-full flex justify-center mt-24">
            <form className="bg-gray-200 p-2 w-[400px] h-fit flex flex-col align-end gap-0 rounded-md" onSubmit={handleSubmit}>
                { menu }
            </form>
        </div>
    )

    function LoginMenu() {
        return (
            <>
                <input className="m-2 p-1" type="text" name="email" placeholder="email" onChange={handleInputChange}></input>
                <input className="m-2 p-1" type="password" name="password" placeholder="password" onChange={handleInputChange}></input>
                <input className="text-sm hover:cursor-pointer hover:bg-gray-400/25" type="button" value="Create Account" onClick={e => setCreatingAccount(true)}></input>
                <input className="text-sm hover:cursor-pointer hover:bg-gray-400/25" type="button" value="Forgot Password" onClick={e => setForgotPassword(true)}></input>
                <input className="m-2 hover:cursor-pointer hover:bg-white bg-white/50" type="submit" value="Login"></input>
            </>
        )
    }
    
    function CreateAccountMenu() {
        return (
            <>
                <input className="m-2 p-1" type="text" name="email" placeholder="email" onChange={handleInputChange}></input>
                <input className="m-2 p-1" type="password" name="password" placeholder="password" onChange={handleInputChange}></input>
                <input className="m-2 p-1" type="password" name="password_conf" placeholder="re-enter password" onChange={handleInputChange}></input>
                <input className="text-sm hover:cursor-pointer hover:bg-gray-400/25 py-0 mx-2" type="button" value="Back" onClick={e => setCreatingAccount(false)}></input>
                <input className="m-2 hover:cursor-pointer hover:bg-white bg-white/50" type="submit" value="Create Account"></input>
            </>
        )
    }
    
    function ForgotPasswordMenu() {
        return (
            <>
                <input className="m-2 p-1" type="text" placeholder="email" name="email" onChange={handleInputChange}></input>
                <input className="text-sm hover:cursor-pointer hover:bg-gray-400/25 py-0 mx-2" type="button" value="Back" onClick={e => setForgotPassword(false)}></input>
                <input className="m-2 hover:cursor-pointer hover:bg-white bg-white/50" type="submit" value="Send Recovery"></input>
            </>
        )
    }

    function LoggedIn() {
        return (
            <>
                <h1 className="m-2">You are already logged in!</h1>
                <div className="bg-gray-900/10 p-2 rounded min-h-[100px]">
                    <p>Name: {session?.user?.name}</p>
                    <p>Email: {session?.user?.email}</p>
                </div>
                <input className="m-2 h-10 hover:cursor-pointer bg-red-400/25 hover:bg-red-500/75 hover:text-white" type="submit" value="log out"></input>
            </>
        )
    }

    function setError(alert: string) {
        console.log(alert)
    }
}
