import { connectToDB } from "@/lib/db";
import { Polls, Votes, Users, PollOptions} from "@/models";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {

        await connectToDB();

        const polls = await Polls.findAll({
            include: [
              { model: Votes, as: "votes" },
              { model: Users, as: "users" },
            ],
            order: [ [ 'createdAt', 'DESC' ]],
            limit: 10,
          });

        if (!polls) {
            return NextResponse.json({ message: "Nenhuma votação foi encontrada" }, { status: 404 });
        }

        return NextResponse.json({ polls }, {status: 200});
        
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function POST(req) {

    const {id} = await req.json();  
    // console.log("Id: ", id);
    try {
        await connectToDB();

        const poll = await Polls.findByPk(id)

        if(poll) {

            // Eliminação de outros registos com Fk (foreign key)
            await Votes.destroy({ where: { pollId: id } });
            await PollOptions.destroy({ where: { pollId: id } });

            // Eliminar votação
            await poll.destroy();

            return NextResponse.json({ message: "A votação foi eliminada com sucesso" }, {status: 200}); 
             
        } else {
            return NextResponse.json({ message: "Ocorreu um erro a eliminar a votação" }, {status: 200});
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
