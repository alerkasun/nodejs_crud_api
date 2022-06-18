export const router = async (method: any) => {
  switch (method) {
    case 'GET':
      console.log("GET")
      break;
    case 'POST':
      console.log("POST")
      break;
    case 'PUT':
      console.log("PUT")
      break;
    case 'DELETE':
      console.log("DELETE")
      break;
    default:
      console.log("Error")
      break;
  }
};


