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
