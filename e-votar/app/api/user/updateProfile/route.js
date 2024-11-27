import { connectToDB } from '@/lib/db';
import { Users } from '@/models';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { id, userData, newPhoto } = await req.json();

  if (!id || !userData) return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });

  try {
    await connectToDB();
    
    const user = await Users.findOne({ where: { id } });
    if (!user) return NextResponse.json({ error: 'Utilizador não encontrado' }, { status: 404 });

    // Atualizar os dados do utilizador
    await Users.update(userData, { where: { id } });

    // Lógica para guardar a nova foto, se for necessário, pode ser adicionada aqui

    return NextResponse.json({ message: 'Perfil atualizado com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar o perfil' }, { status: 500 });
  }
}
