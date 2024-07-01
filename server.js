// Ao instalar o NODEJS no computador ele adiciona vários módulos por padrão, e podemos importar funções deles como fizemos abaixo.
import { createServer } from 'node:http'

// Definindo uma constante para a função.

// Nesse create server, passamos uma função e nela podemos receber 2 parametros Request e Response.

// REQ:  O request serve para a gente obter dados da requisição que a gente ta fazendo pro servidor, um exemplo seria imaginar que estamos fazendo uma funcionalidade de criação de usuario, no request estamos buscando todos os dados como(email, senha), ou seja ele trás informação da requisição da API.
//RES: É o objeto que utilizamos para devolver uma resposta para quem ta chamando a API
const server = createServer((request, response)=>{
  response.write('Hi!')
  return response.end()
})
// Tem que ter esse response.end ele que finaliza fazendo com que as coisas apareçam

// Depois de criar esse servidor, vamos retornar um método chamado Listen, nesse método colocamos a porta na qual a aplicação vai executar.
server.listen(3333)
//localhost:3333
