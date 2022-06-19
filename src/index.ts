import { createServer } from 'http';
import { router } from './router/Routes';
import { config } from 'dotenv';

config();
const PORT = process.env.PORT || 3000;

export async function init() {
  const server = createServer(async (request, response) => {
    try {
      await router(request, response);
    } catch {
      console.log('Something was wrong')
    }
  })
  
  server.listen(PORT, () => {
    console.log(`App has been started on port ${PORT}...`)
  });
}

init();
