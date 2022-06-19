import { getUsers, createUser, deleteUser, updateUser } from '../controllers/UserController'

export const router = async (request: any, response: any) => {
  switch (request.method) {
    case 'GET':
      await getUsers(request, response)
      break;
    case 'POST':
      await createUser(request, response)
      break;
    case 'PUT':
      await updateUser(request, response)
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
