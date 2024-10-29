import { connectToDB } from "@/lib/db";
import { Polls, Users } from "@/models";
import PollOptions from "@/models/poll_options";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const {title, options, userId} = req.body
        await connectToDB();

        const user = await Users.findOne({where: {id: userId}})

        if (user) {

            // Criar a votação
            const newPoll = await Polls.create({
                title,
                userId,
            });

            // Criar as opções da votação e associalas a votação
            const optionPromises = options.map(optionTitle => {
                return PollOptions.create({
                    optionTitle,
                    pollId: newPoll.id,  
                });
            });
            
            await Promise.all(optionPromises);

            return NextResponse.json({ message: "Poll created successfully!" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "O utilizador não foi encontrado" }, { status: 404 });
        }
        

    } catch (error) {
        return NextResponse.json({message: error}, {status: 500});
    }
}