import { createServer } from 'http';
import { router } from './router/Routes';
import { config } from 'dotenv';

config();
const PORT = process.env.PORT || 3000;

async function init() {
  const server = createServer(async (request, response) => {
    try {
      await router(request, response);
    } catch {
      console.log('PIZDA')
    }
  })
  
  server.listen(PORT, () => {
    console.log(`App has been started on port ${PORT}...`)
  });
}

init();
