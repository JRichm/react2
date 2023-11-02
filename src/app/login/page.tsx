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
    const [action, setAction] = useState("login");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({
            ...userFormData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!userFormData?.email || !userFormData?.password || !userFormData?.password_conf) {
            setError("All Fields Are Necessary!");
            return;
        }

        const body = JSON.stringify({ action: action, data: userFormData });

        try {
            const res = await fetch('/api/loginAction/route', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body,
            })

            if (res.ok) {
                // const form = e.target
                // form.reset();
                // console.log("res ok!")

                console.log('success!!')

            } else {
                console.log("erro!!")
            }
        } catch (error) {
            console.log("Request Error:", error)
        }
    }
    
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        // const email = session?.user?.email ? session?.user?.email : ""

        try {
            const login = async() => {
                console.log('fetching loginAction')

                const body = JSON.stringify({
                    action: "loginAuthorized",
                    data: session?.user?.email
                })

                const res = await fetch('/api/loginAction', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: body
                })
    
                if (res.ok) {
                    console.log("res ok")
                } else {
                    console.log("res not ok")
                }
            }
            
            login()


        } catch (error) {
            console.error("(!) could not log in user ", error)
        }
    }

    const toggleAction = (newAction: string) => {
        setAction(newAction)
    }

    var menu = LoginMenu()

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
