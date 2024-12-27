# Projeto e-votar 🗳️🛜

O projeto e-votar, desenvolvido no âmbito da disciplina de **Projeto Integrado 3**, é um projeto que tem como objetivo criar uma plataforma online de votações de diversos tópicos.

## 🛠️ Tecnologias usadas

   🌐 **Frontend**: HTML, CSS, JavaScript, React / Next.js
   💾 **Database**: MySQL Workbench (local)
   ⚙️ **Backend**: Sequelize
   🚅 **Frameworks**: TailwindCSS 

## 📦 Instalação

Para proceder à instalação do projeto é favor seguir estes passos:

  
1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/RDPW1SH/PI3.git

2. **Abrir um terminal na pasta "e-votar" e escrever o seguinte**

	 ```bash
	 npm install 
	 
3. **Abrir o documento ".env.local" e colocar os detalhes do seu MySQL Workbench**
		
	```bash
 	MYSQL_HOST = 'localhost'
	MYSQL_USER = 'nome do utilizador da base de dados'
	MYSQL_PASSWORD = 'nome da password do utilizador da base de dados'
	MYSQL_DB = 'evotar'
	MYSQL_PORT = '3306'
	DATABASE_URL=mysql://<MYSQL_USER>:<MYSQL_PASSWORD>@localhost:3306/evotar
	SYNC_DB = 'true'
	NEXTAUTH_SECRET = 'dYH89SDu9j23jklDFNDs89sdjksbDHIOK03jcxXdn=
		
4. **Criar uma base de dados no MySql Workbench com o nome "evotar"**

      File > New Query Tab > Escrever "CREATE TABLE evotar;" > Sublinhar e clicar no icone do raio ⚡

5. **Voltar ao terminal aberto no segundo passo e escrever**

    ```bash
    npm run dev

6. **Pesquisar no browser à escolha http://localhost:3000**
	
## ✍️ Documentação

### React & Frameworks

- **React** -  [Website](https://react.dev/)
- **Next.js** - [Website](https://nextjs.org/)
- **TailwindCSS** - [Website](https://tailwindcss.com/)

### Base de dados / backend

- **Sequelize** - [Website](https://sequelize.org/)
- **MySQL** - [Website](https://www.mysql.com/products/workbench/)
- **MySQL Workbench** - [Download](https://dev.mysql.com/downloads/workbench/)



