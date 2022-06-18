import { createServer } from 'http';
import { router } from './router/Routes';

async function init() {
  const PORT = '3000';
    const server = createServer(async (req, res) => {
      await router('GET') 
    })
  
    server.listen(PORT, () => {
        console.log(`App has been started on port ${PORT}...`)});
}

init()