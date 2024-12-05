import { connectToDB } from "@/lib/db";
import { Users } from "@/models";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export async function POST(req) {

    const saltRounds = 10;

    try {

        const body = await req.json(); 
        const { email, password, repeatPassword, username } = body;
        
        //console.log(email, password, repeatPassword, username)

        if(!email || !password || !repeatPassword || !username) {
            return NextResponse.json({message: "Verifique se deixou algum campo vazio"}, {status: 400})
        }
        if(password !== repeatPassword) {
            return NextResponse.json({message: "As senhas não correspondem"}, {status: 400})
        }

        await connectToDB()

        const user = await Users.findOne({ where: { email: email } });

        // console.log("User:" + user);
        if (user !== null) {

            return NextResponse.json({ message: "An account with the following email already exists" }, { status: 400 })

        } else {

            const salt = await bcrypt.genSalt(saltRounds) 
            const hashedPassword = await bcrypt.hash(password, salt) 
        
            await Users.create({
                username,
                email,
                password: hashedPassword,
                slug: username.toLowerCase(),
            })
                
            return NextResponse.json({ message: `User criado com sucesso`}, { status: 200 })

            
        }
    } catch (error) {
        return NextResponse.json({ message: `An error has occured: ${error}`}, { status: 500 })
    }

}