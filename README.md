NODEJS_Begginer-Course.Rocketseat

Todos os conteúdos dessa aula foram tirados do seguinte vídeo: [Link para o vídeo](https://www.youtube.com/watch?v=hHM-hr9q4mo&t=129s)

---

## O que é Node JS?

É um ambiente para execução de JavaScript que permite utilizar JavaScript no lado do servidor, viabilizando o desenvolvimento de aplicações no back-end com JavaScript.

---

## Criando um servidor HTTP Nativo:

Para criar um servidor HTTP nativo, precisamos importar um módulo chamado `http` do Node.js. O Node.js instala vários módulos que permitem realizar diversas operações, como o `fs`, que possibilita a leitura e criação de arquivos.

Para importar esse módulo, é necessário adicionar a seguinte opção ao `package.json` após iniciar com `npm init`: `"type": "module"`.

Depois disso, importamos as informações e definimos uma constante para a função do módulo que estamos utilizando:

```javascript
import { createServer } from 'node:http';

const server = createServer((request, response) => {
  response.write('Hi!');
  return response.end();
});

server.listen(3333)
```
<ul>
  <li><strong>REQ:</strong> O request serve para obter dados da requisição que estamos fazendo para o servidor. Por exemplo, ao criar um usuário, podemos buscar dados como email e senha do request, ou seja, ele traz informações da requisição da API.</li>
  <li><strong>RES:</strong> É o objeto que utilizamos para enviar uma resposta para quem está chamando a API.</li>
</ul>

---

Criamos um servidor sem utilizar nenhuma biblioteca, porém não vamos nos aprofundar mais nisso porque raramente alguém cria um servidor dessa forma. Vamos agora criar um servidor utilizando um framework.

Utilizar um framework facilita muitas coisas, pois ele já possui uma estrutura de servidor configurada. Ele permite dividir o servidor em diversos endpoints ou rotas diferentes.

Por exemplo, imagine que estamos desenvolvendo uma aplicação para gerenciar vídeos. Gostaríamos de ter uma rota para criar vídeos, como `localhost:3333/videos`, usando o método HTTP POST. Se quisermos excluir um vídeo, poderíamos usar `DELETE localhost:3333/videos/1`. O framework nos ajudará a redirecionar o usuário para funcionalidades específicas da nossa aplicação, dependendo do endpoint que ele acessar.

Além disso, os frameworks facilitam muitas outras tarefas, como integração com bibliotecas de terceiros para envio de e-mails, autenticação, pagamentos, entre outros. Eles também simplificam o trabalho com bancos de dados.

---

## Frameworks

Para esta aplicação, vamos utilizar o **Fastify**. Existem vários outros frameworks como o Express, que é o mais famoso, e muitos outros...

O grande ponto do **Fastify** é que ele é um micro framework, similar ao Flask do Python. Ele oferece apenas funcionalidades essenciais e não impõe muitas estruturas no nosso projeto.

Para instalar o Fastify, você pode usar o seguinte comando:

```sh
npm install fastify
```

Ao fazer o download da API, você verá duas páginas adicionadas ao seu aplicativo:
- `package-lock.json`: Funciona como um cache e não deve ser alterado manualmente.
- `node_modules`: Armazena todas as dependências do projeto.

---

## Criando um servidor com Fastify

Já criamos o servidor com HTTP nátivo, e agora vamos ver como fazemos essa criação com o Fastify:

```javascript
import { fastify } from 'fastify';

const server = fastify()

server.get('/', ()=>{
  return 'hello World!'
})

server.listen({
  port: 3333,
})
```
---

Dentro do protocolo HTTP temos métodos que são basicamente formas da gente diferenciar semanticamente, ou seja de acordo com o significado, as ações da API.

Por exemplo:

<ul>
  <li><strong>GET:</strong> É utilizado quando eu quero fazer uma operação na minha aplicação onde eu busco algo, geralmente fazemos isso em listagens.</li>
  <li><strong>POST:</strong> É utilizado para criação, ou seja quando eu quero criar algo para nossa aplicação.</li>
  <li><strong>PUT:</strong> É utilizado para alteração, ou seja quando queremos alterar um dado que já foi criado.</li>
  <li><strong>DELETE:</strong> É utilizado para deletar dados.</li>
</ul>

Temos outros, porem esses são os principais. 

Alguns outros que valem apena serem mencionados: `PATCH`, quando queremos alterar apenas uma informação, por exemplo quando quero alterar um vídeo de público para privado, ao ínves de alterar tudo alteramos só essa parte. Temos diversos outros seria bom pesquisar a respeito.

---

## Criando o CRUD

O projeto que vamos fazer é sobre **Gerenciamento de Vídeos** e vamos criar todo o `CRUD` para esse projeto, primeiramente vamos fazer com dados locais, sem utilizar banco de dados.

---

## Banco de dados em memória

Primeiramente vamos criar o `CRUD` com um banco de dados em memória, basicamente salvando as informações em váriaveis.

**Rotas**

```javascript
import { DatabaseMemory } from './database-memory.js';

//* Criar Vídeos
server.post('/videos', ()=>{

});

//* Listar Vídeos
server.get('/videos', ()=>{

});

//* Editar Vídeos
server.put('/videos/:id', ()=>{

});

//* Deletar Vídeos
server.delete('/videos/:id', ()=>{

})
```

Alterações que adicionei ao servidor, colocamos caminhos rotas para fazer as respectivas atividades, tambem utilizamos um método de passar parametros em rotas, com o `:id`, no caso o : define que vai ser parametro, e o id é o nome do parametro que estamos passando.

```javascript
import { randomUUID } from "node:crypto" 

export class DatabaseMemory{
  #videos = new map()

  list(){
    return this.#videos.values()
  }

  create(video){
    const videoId = randomUUID()
    this.#videos.set(videoId, video)
  }

  update(id, video){
    this.#videos.set(id, video)
  }

  delete(id){
    this.#videos.delete(id)
  }
}
```

Essse é o banco de dados, em memória, criamos uma classe DatabaseMemory e dentro dela criamos um objeto com suas propriedades privadas, só podemos altera-las dentro da classe pai, depois criamos diversos métodos que sugestivos.

---

Certo depois de terminar a criação e configuração de todos os métodos do `CRUD` que estávamos fazendo o resultado final foi o seguinte:

```javascript
import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';

const server = fastify();
const database = new DatabaseMemory

//* Criar Vídeos
server.post('/videos', (request, reply)=>{
  const { title, description, duration } = request.body

  database.create({
    title: title,
    descrption: description,
    duration: duration,
  })
  
  return reply.status(201).send()
});

//* Listar Vídeos
server.get('/videos', (request, reply)=>{
  const search = request.query.search

  const videos = database.list(search)

  return videos
});

//* Editar Vídeos
server.put('/videos/:id', (request, reply)=>{
  const videoId = request.params.id
  const { title, description, duration } = request.body

  database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
});

//* Deletar Vídeos
server.delete('/videos/:id', (request, reply)=>{
  const videoId = request.params.id
  database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  port: 3333,
});

```

Utilizamos conceitos novos aqui e vou apresentear todos eles antes de ir para o banco de dados em memória.

<ul>
<li><strong> Request Body:</strong>É a parte de uma requisição HTTP, nela temos os dados que o cliente envia para o servidor. Geralmente usamos ela nos métodos POST, PUT, PATCH. Um exemplo de utilidade seria como enviar dados de um formulário pro servidor. </li>
<li><strong> Route Parameters:</strong>São partes das URL que são variáveis e podem capturar valores dinâmicos. São úteis quando precisamos capturar o ID de algo por exemplo.</li>
<li><strong> Query Parameters:</strong>São parametros de consulta usados para passar informações adicionais para requisição, basicamente vai filtrar ou ordenar os recursos retornados pela API.</li>
</ul>

```javascript
import { randomUUID } from "node:crypto" 

export class DatabaseMemory{
  #videos = new Map()

  list(search){
    return Array.from(this.#videos.entries())
      .map((videoArray)=>{
        const id = videoArray[0]
        const data = videoArray[1]

        return{
          id,
          ...data,
        }
      })
      .filter(video =>{
        if(search){
          return video.title.includes(search)
        }
        return true
      }) 
  }

  create(video){
    const videoId = randomUUID()
    this.#videos.set(videoId, video)
  }

  update(id, video){
    this.#videos.set(id, video)
  }

  delete(id){
    this.#videos.delete(id)
  }
}
```

O banco de dados, ficou desse jeito nessa etapa, é importante pesquisar o que exatamente está acontecendo no list view.

---

## Banco de dados Postgres

Para fazer a conexão com o Postgres, utilizamos um site chamado [Neon.tech](https://neon.tech/), que é basicamente um Postgres Serverless.


Primeiramente, tivemos que importar a biblioteca do Postgres para funcionar a conexão. Em seguida, criamos um arquivo `DB.js`, onde configuramos a conexão do banco de dados com o aplicativo.

Para passar as informações sensíveis, utilizamos um arquivo `.env`, que armazena essas informações de forma segura e permite que sejam acessadas pela aplicação.

**Database Postgres**

riamos a Database Postgres que é bem semelhante à do banco de dados em memória, porém aqui, dentro das funções, temos consultas para o banco de dados.

Também fizemos as funções se tornarem todas assíncronas.

```javascript
import { randomUUID } from "node:crypto"; 
import sql from "./db.js";

export class DatabasePostgres {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`SELECT * FROM videos WHERE title ILIKE ${"%" + search + "%"}`;
    } else {
      videos = await sql`SELECT * FROM videos`;
    }

    return videos;
  }

  async create(video) {
    const videoId = randomUUID();
    const { title, description, duration } = video;

    await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
  }

  async update(id, video) {
    const { title, description, duration } = video;

    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`DELETE FROM videos WHERE id = ${id}`;
  }
}
```

As funções tem que ser assíncronas pelo fato que o acesso ao banco de dados envolve operações de entrada e saída, que podem ser demoradas. Essas funções permitem que a aplicação continue respondendo a outras solicitações enquanto espera a resposta do bando de dados.

**Server**

```javascript
import { fastify } from 'fastify';
//import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
//const database = new DatabaseMemory
const database = new DatabasePostgres()

//* Criar Vídeos
server.post('/videos', async (request, reply)=>{
  const { title, description, duration } = request.body

  await database.create({
    title: title,
    description: description,
    duration: duration,
  })
  
  return reply.status(201).send()
});

//* Listar Vídeos
server.get('/videos', async (request, reply)=>{
  const search = request.query.search

  const videos = await database.list(search)

  return videos
});

//* Editar Vídeos
server.put('/videos/:id', async (request, reply)=>{
  const videoId = request.params.id
  const { title, description, duration } = request.body

  await database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
});

//* Deletar Vídeos
server.delete('/videos/:id', async (request, reply)=>{
  const videoId = request.params.id
  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  port: 3333,
});
```

Fizemos pequenas alterações nos métodos da API, agora eles são assíncronos e estão enviando as informações ou pegando de um banco de dados.

# Deploy do Projeto