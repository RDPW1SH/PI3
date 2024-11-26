import { connectToDB } from "@/lib/db";
import { Votes, PollOptions } from "@/models";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const { pollId, optionId, userId } = await req.json();
    console.log(optionId);

    if (!pollId || !optionId || !userId) {
      return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
    }

    // Check if there's already a vote from this user for the poll
    const existingVote = await Votes.findOne({ where: { userId, pollId } });

    if (existingVote) {
      // If the user has voted already, delete the existing vote
      await Votes.destroy({ where: { userId, pollId } });

      console.log("Voto anterior removido");
    }

    // Check if the option is valid for the poll
    const pollOption = await PollOptions.findOne({ where: { id: optionId, pollId } });

    if (!pollOption) {
      return NextResponse.json({ message: "Opção inválida" }, { status: 400 });
    }

    // Register the new vote
    await Votes.create({ userId, pollId, optionId });

    return NextResponse.json({ message: "Voto registrado com sucesso" }, { status: 200 });
    
  } catch (error) {
    console.error(error);  // Log the error to help with debugging
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
