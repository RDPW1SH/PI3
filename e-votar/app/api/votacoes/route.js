import { connectToDB } from "@/lib/db";
import { PollOptions, Polls, Votes } from "@/models";
import { NextResponse } from "next/server";
import { Op } from "sequelize"; 

export async function GET(req) {

    
  const { searchParams } = new URL(req.url); 
  const searchTerm = searchParams.get("searchTerm");

  try {
    await connectToDB();

    const whereCondition = searchTerm
      ? { title: { [Op.substring]: searchTerm } }
      : {};

    const polls = await Polls.findAll({
      include: [
        { model: PollOptions, as: "options" },
        { model: Votes, as: "votes" },
      ],
      where: whereCondition,
    });

    if (polls.length > 0) {
      return NextResponse.json({ polls });
    } else {
      return NextResponse.json(
        { message: "Nenhuma votação foi encontrada" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar votações: " + error.message },
      { status: 500 }
    );
  }
}
