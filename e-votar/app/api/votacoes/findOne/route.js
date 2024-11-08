import { connectToDB } from "@/lib/db";
import { Polls } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchTerm } = req.query;  // Pegando o termo de pesquisa enviado na query string
    await connectToDB();

    const polls = await Polls.findAll({
      where: { title: { $like: `%${searchTerm}%` } }  // Ajuste para buscar por título que contenha o termo
    });

    if (polls.length > 0) {
      return NextResponse.json({ polls });
    } else {
      return NextResponse.json({ message: "No polls found" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
