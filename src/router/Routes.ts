import { getUsers, createUser, deleteUser } from '../controllers/UserController'

export const router = async (request: any, response: any) => {
  switch (request.method) {
    case 'GET':
      await getUsers(request, response)
      break;
    case 'POST':
      console.log("POST")
      await createUser(request, response)
      break;
    case 'PUT':
      console.log("PUT")
      break;
    case 'DELETE':
      console.log("DELETE")
      await deleteUser(request, response)
      break;
    default:
      console.log("Error")
      request.statusCode = 500;
      request.end({ message: "Server Error. Server doesn't proccesing you request" });
      break;
  }
};
