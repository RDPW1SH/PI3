# Projeto e-votar 🗳️🛜

O projeto e-votar, desenvolvido no âmbito da disciplina de **Projeto Integrado 3**, é um projeto que tem como objetivo criar uma plataforma online de votações de diversos tópicos.

Disponibilizei um guia passo a passo para o download e setup do projeto, assim como queries para colocar na base de dados

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

## 📖 SQL Queries

### Para mostrar as funcionalidades do site é melhor ter conteúdo na base de dados para testar, por isso deixo aqui algumas queries

### **⚠️ Importante ⚠️** entrar na página de login do website antes de colocar estas queries, de modo ao website criar automaticamente as tabelas e colunas de cada uma

1. **palavra-passe** do **admin é admin**, sendo a do resto dos **utilizadores: password**, as passwords nas queries já estão a contar com encriptação.
   
 	```bash
 	use evotar;

	INSERT INTO Users (username, password, email, slug, isAdmin, createdAt, updatedAt)
	VALUES 
	('pedro', '$10$6Nc/E6YpqyqkhNsmcaipOO3.kk5axnipKm/bsXOJ9Tk7JYoeZTyRG', 'pedro12@gmail.com', 'pedro', false, NOW(), NOW()),
	('admin', '$10$U8TEm5ybvSJWAVAO/M7.7OIVm584TbGmF87DKshSjDHFJC0fMTxfK', 'admin@gmail.com', 'admin', true, NOW(), NOW()),
	('joao', '$10$6Nc/E6YpqyqkhNsmcaipOO3.kk5axnipKm/bsXOJ9Tk7JYoeZTyRG', 'joao@gmail.com', 'joao', false, NOW(), NOW()),
	('teste', '$10$6Nc/E6YpqyqkhNsmcaipOO3.kk5axnipKm/bsXOJ9Tk7JYoeZTyRG', 'teste@gmail.com', 'teste', false, NOW(), NOW());


	INSERT INTO Polls (title, userId, start_date, end_date, visibility, createdAt, updatedAt)
	VALUES 
	('Qual é melhor?', 1, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'visible', NOW(), NOW()),
	('Melhor tipo de formato de data?', 1, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'visible', NOW(), NOW()),
	('Quanto ganhas?', 1, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'visible', NOW(), NOW()),
	('Anos de experiência profissional', 1, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'visible', NOW(), NOW()),
	('Votação teste', 1, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'visible', NOW(), NOW());

	INSERT INTO Poll_Options (optionTitle, pollId, createdAt, updatedAt)
	VALUES
	('Pizza', 1, NOW(), NOW()),
	('Hamburger', 1, NOW(), NOW()),
	('dia-mês-ano', 2, NOW(), NOW()),
	('ano-mês-dia', 2, NOW(), NOW()),
	('mês-dia-ano', 2, NOW(), NOW()),
	('Salário minimo', 3, NOW(), NOW()),
	('1000€ a 2000€', 3, NOW(), NOW()),
	('2000€ - 3000€', 3, NOW(), NOW()),
	('3000€+', 3, NOW(), NOW()),
	('Nenhuma', 4, NOW(), NOW()),
	('Junior', 4, NOW(), NOW()),
	('Sénior', 4, NOW(), NOW()),
	('teste 1', 5, NOW(), NOW()),
	('teste 2', 5, NOW(), NOW()),
	('teste 3', 5, NOW(), NOW()),
	('teste 4', 5, NOW(), NOW());


	INSERT INTO Votes (optionId, userId, pollId, createdAt, updatedAt)
	VALUES
	(1, 2, 1, NOW(), NOW()), (3, 2, 2, NOW(), NOW()), (6, 2, 3, NOW(), NOW()), (10, 2, 4, NOW(), NOW()), (13, 2, 5, NOW(), NOW()),
	(2, 3, 1, NOW(), NOW()), (4, 3, 2, NOW(), NOW()), (7, 3, 3, NOW(), NOW()), (11, 3, 4, NOW(), NOW()), (14, 3, 5, NOW(), NOW()),
	(1, 4, 1, NOW(), NOW()), (3, 4, 2, NOW(), NOW()), (9, 4, 3, NOW(), NOW()), (12, 4, 4, NOW(), NOW()), (14, 4, 5, NOW(), NOW()),
	(1, 5, 1, NOW(), NOW()), (3, 5, 2, NOW(), NOW()), (6, 5, 3, NOW(), NOW()), (10, 5, 4, NOW(), NOW()), (13, 5, 5, NOW(), NOW());

## ✍️ Documentação

### React & Frameworks

- **React** -  [Website](https://react.dev/)
- **Next.js** - [Website](https://nextjs.org/)
- **TailwindCSS** - [Website](https://tailwindcss.com/)

### Base de dados / backend

- **Sequelize** - [Website](https://sequelize.org/)
- **MySQL** - [Website](https://www.mysql.com/products/workbench/)
- **MySQL Workbench** - [Download](https://dev.mysql.com/downloads/workbench/)



