import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
    
    try {
        console.log("req")
        console.log(req)

        const { username, email, password, password_conf } = await req.json();

        console.log("username", username)
        console.log("email", email)
        console.log("password", password)
        console.log("password_conf", password_conf)
        
        return NextResponse.json({message: "User Registered."}, {status: 201});

    } catch (error) {
        return NextResponse.json({message:"An Error Occurred While Registering User."}, {status: 500})
    }
}