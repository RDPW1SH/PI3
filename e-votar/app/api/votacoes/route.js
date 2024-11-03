import { connectToDB } from "@/lib/db";
import { PollOptions, Polls, Votes } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req) {

    

    try {

        await connectToDB();
        const polls = await Polls.findAll({
            include: [
                { model: PollOptions, as: 'options' },
                { model: Votes, as: 'votes' },
            ] 
        });

        if (polls.length > 0) {
            return NextResponse.json({ polls });
        } else {
            return NextResponse.json({ message: "No polls available" }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
    
    

}