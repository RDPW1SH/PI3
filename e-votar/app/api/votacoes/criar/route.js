import { connectToDB } from "@/lib/db";
import { Polls, Users } from "@/models";
import PollOptions from "@/models/poll_options";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {

        const {title, options, userId, startDate} = await req.json()
        await connectToDB();

        const user = await Users.findOne({where: {id: userId}})

        if (user) {

            // Criar a votação
            const newPoll = await Polls.create({
                title,
                userId,
                end_date: startDate,
            });

            // Criar as opções da votação e associalas a votação
            const optionPromises = options.map(optionTitle => {
                return PollOptions.create({
                    optionTitle,
                    pollId: newPoll.id,  
                });
            });
            
            await Promise.all(optionPromises);

            return NextResponse.json({ message: "Votação criada com sucesso" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "O utilizador não foi encontrado" }, { status: 404 });
        }
        

    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}