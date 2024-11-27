import { connectToDB } from '@/lib/db';
import { Users } from '@/models';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { id } = await req.json();
  
  if (!id) return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });

  try {
    await connectToDB();
    
    const user = await Users.findOne({ where: { id } });
    if (!user) return NextResponse.json({ error: 'Utilizador não encontrado' }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar utilizador' }, { status: 500 });
  }
}
