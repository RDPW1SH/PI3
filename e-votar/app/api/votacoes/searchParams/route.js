import { connectToDB } from "@/lib/db";
import { Polls } from "@/models";
import { Op } from "sequelize";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("searchTerm") || ""; // Captura o searchTerm

    await connectToDB();

    const polls = await Polls.findAll({
      where: { title: { [Op.like]: `%${searchTerm}%` } },
      include: [
        { model: PollOptions, as: 'options' },
        { model: Votes, as: 'votes' },
    ]  
    });

    return NextResponse.json({ polls: polls || [] });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
