import { fastify } from 'fastify';
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
// const database = new DatabaseMemory
const database = new DatabasePostgres();

//* Criar Vídeos
server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title: title,
    description: description,
    duration: duration,
  });

  return reply.status(201).send();
});

//* Listar Vídeos
server.get('/videos', async (request, reply) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return videos;
});

//* Editar Vídeos
server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

//* Deletar Vídeos
server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  await database.delete(videoId);

  return reply.status(204).send();
});

const start = async () => {
  try {
    await server.listen({
      port: process.env.PORT || 3333,
      host: '0.0.0.0'
    });
    console.log(`Server running at http://0.0.0.0:${process.env.PORT || 3333}/`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
