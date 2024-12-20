import { connectToDB } from "@/lib/db";
import { PollOptions, Polls, Users, Votes } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = req.nextUrl;
        const id = searchParams.get("id");
        
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        await connectToDB();

        const poll = await Polls.findOne({
            include: [
                { model: PollOptions, as: "options" },
                { model: Votes, as: "votes" },
                {
                    model: Users,
                    as: 'users',
                    attributes: { exclude: ['password', 'isAdmin', 'email'] } // Excluindo os campos da senha e outros indesejados
                }
            ],
            where: { id }, 
        });

        if (!poll) {
            return NextResponse.json({ message: "Poll not found" }, { status: 404 });
        }

        return NextResponse.json({ poll });
        
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
