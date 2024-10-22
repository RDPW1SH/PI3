import { connectToDB } from "@/lib/db";
import { Polls, Users } from "@/models";
import PollOptions from "@/models/poll_options";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const {title, options, userId} = req.body
        await connectToDB();

        const user = Users.findByPk(userId)

        if (user) {
            // Create the poll
            const newPoll = await Polls.create({
                title,
                userId,
            });

            // Create the poll options and associate them with the poll
            const optionPromises = options.map(optionTitle => {
                return PollOptions.create({
                    optionTitle,
                    pollId: newPoll.id,  // Associate each option with the created poll
                });
            });
            await Promise.all(optionPromises); // Wait for all options to be created

            return NextResponse.json({ message: "Poll created successfully!" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        

    } catch (error) {
        return NextResponse.json({message: "Ocorreu um erro"}, {status: 500});
    }
}