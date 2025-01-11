import { connectToDB } from '@/lib/db';
import { PollOptions, Polls, Users } from '@/models';
import { NextResponse } from 'next/server';
import sequelize from '@/lib/sequelize';

export async function GET(req) {

  try {

    await connectToDB();
    
    const users = await Users.findAll({  
        attributes: {exclude: ['password', 'isAdmin']},
        order: [ [ 'createdAt', 'DESC' ]],
        limit: 10,
    });
    
    if (!users) return NextResponse.json({ message: 'Utilizadores não encontrado' }, { status: 404 });

    return NextResponse.json({users}, { status: 200 });

  } catch (error) {
    
    return NextResponse.json({ message: 'Erro ao buscar utilizador' }, { status: 500 });
  }
}
export async function POST(req) {
  const { id } = await req.json();

  // Iniciar transação
  const transaction = await sequelize.transaction();

  try {
    await connectToDB();

    // Buscar o usuário pelo ID
    const user = await Users.findByPk(id, { transaction });

    if (!user) {
      await transaction.rollback();
      return NextResponse.json(
        { message: "O utilizador não foi encontrado." },
        { status: 404 }
      );
    }

    if(user.isAdmin) {
        return NextResponse.json(
            { message: "Não é possível eliminar um utilizador admin" },
            { status: 403 }
          ); 
    }
    const polls = await Polls.findAll({ where: { userId: id }, transaction });

    // Excluir as dependências relacionadas
    for (const poll of polls) {

      await PollOptions.destroy({ where: { pollId: poll.id }, transaction });
      await poll.destroy({ transaction });
    }

    await Votes.destroy({ where: { userId: id }, transaction });

    // Excluir o usuário
    await user.destroy({ transaction });

    // Confirmar transação
    await transaction.commit();

    return NextResponse.json(
      { message: "O utilizador foi eliminado com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    // Reverter transação em caso de erro
    await transaction.rollback();
    console.error("Erro ao excluir o utilizador:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

