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
```
<ul>
  <li><strong>REQ:</strong> O request serve para obter dados da requisição que estamos fazendo para o servidor. Por exemplo, ao criar um usuário, podemos buscar dados como email e senha do request, ou seja, ele traz informações da requisição da API.</li>
  <li><strong>RES:</strong> É o objeto que utilizamos para enviar uma resposta para quem está chamando a API.</li>
</ul>


