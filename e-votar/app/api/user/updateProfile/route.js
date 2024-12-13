import { connectToDB } from "@/lib/db";
import { Users } from "@/models";
import bcrypt from "bcrypt"; 
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id, userData } = await req.json();

  console.log(userData);
  if (!id || !userData.username || !userData.email || !userData.password) {
    return NextResponse.json(
      { error: "Dados incompletos ou inválidos" },
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const user = await Users.findOne({ where: { id } });

    if (!user) {
      return NextResponse.json(
        { error: "Utilizador não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se a senha atual está correta
    const isPasswordMatch = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 400 });
    }

    // Prepara os dados a serem atualizados
    const updateData = {
      username: userData.username,
      email: userData.email,
      slug: userData.username.toLowerCase(),
    };

    // Atualiza a senha, se `newPassword` estiver presente
    if (userData.newPassword) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(userData.newPassword, salt);

      updateData.password = hashedPassword;
    }
    
    await Users.update(updateData, { where: { id } });

    return NextResponse.json(
      { message: "Os seus dados foram atualizados com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar o perfil:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar o perfil" },
      { status: 500 }
    );
  }
}
