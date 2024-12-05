import { connectToDB } from '@/lib/db';
import { Users } from '@/models';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { id, userData } = await req.json();

  if (!id || !userData.username || !userData.email || !userData.password) return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });

  try {

    await connectToDB();
    
    const user = await Users.findOne({ where: { id } });

    if (!user) return NextResponse.json({ error: 'Utilizador não encontrado' }, { status: 404 });

  
    bcrypt.compare(userData.password, user.password, async function(err, result) {
      
      if(result) {

        await Users.update(userData, { where: { id } });
        return NextResponse.json({ error: 'Os seus dados foram atualizados' }, { status: 200 });

      } else {
        return NextResponse.json({ error: 'Ocorreu um erro, verifique os seus dados ou tente mais tarde' }, { status: 400 });
      }
      
    });

  } catch (error) {

    return NextResponse.json({ error: 'Erro ao atualizar o perfil' }, { status: 500 });

  }
}
