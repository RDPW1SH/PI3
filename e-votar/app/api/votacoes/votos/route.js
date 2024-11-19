import { connectToDB } from "@/lib/db";
import { Votes, PollOptions } from "@/models";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDB();

        // Parse o corpo da requisição
        const { pollId, optionId, userId } = await req.json();

        if (!pollId || !optionId || !userId) {
            return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
        }

        // Verificar se o usuário já votou na mesma "poll"
        const checkVote = await Votes.findOne({ where: { userId, pollId } });

        if (checkVote) {
            return new Response(JSON.stringify({ message: "Você já votou nesta votação" }), { status: 403 });
        }

        // Verificar se a opção pertence à votação
        const pollOption = await PollOptions.findOne({ where: { id: optionId, pollId } });

        if (!pollOption) {
            return new Response(JSON.stringify({ message: "Opção inválida" }), { status: 400 });
        }

        // Registrar o voto
        await Votes.create({ userId, pollId, optionId });

        return new Response(JSON.stringify({ message: "Voto registrado com sucesso" }), { status: 200 });

    } catch (error) {
        console.error("Erro ao registrar voto:", error);
        return new Response(JSON.stringify({ message: "Erro interno do servidor" }), { status: 500 });
    }
}
