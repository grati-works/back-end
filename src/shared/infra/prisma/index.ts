import { PrismaClient } from '@prisma/client';

// @ts-ignore
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const client =
  global.prisma ||
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  });

if (!global.prisma) global.prisma = client;

/*
const log = createPrismaQueryEventHandler();
client.$on('query', e => {
  if (!e.query.includes('COMMIT') && !e.query.includes('BEGIN')) {
    if (e.duration > 10) {
      process.stdout.write(`\x1b[91m[${e.duration}ms]\x1b[39m \x1b[0m`);
      log(e);
    }
  }
}); */

client.$use(async (params, next) => {
  const before = Date.now();

  const result = await next(params);

  const after = Date.now();

  const duration = after - before;

  if (duration > 5000) {
    console.log(
      `A query ${params.model}.${params.action} demorou \x1b[91m${duration}ms\x1b[39m \x1b[0mpara ser executada.`,
    );
  }

  return result;
});

export { client };
