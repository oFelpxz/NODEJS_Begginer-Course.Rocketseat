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