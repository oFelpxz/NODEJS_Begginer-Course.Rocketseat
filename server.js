import { fastify } from 'fastify';

const server = fastify()

server.get('/', ()=>{
  return 'hello World!'
})

server.listen({
  port: 3333,
})