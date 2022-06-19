import { IUser } from './../helpers/interfaces';
import { IncomingMessage, ServerResponse } from 'http';
import { findAllUsers, createNewUser, findUserById, deleteUserById, updateExistingUser } from '../models/users';
import { parse } from 'path';
import { validate } from 'uuid';

const USERS_PATH = /^\/api\/users$/;
const USERS_PATH2 = /^\/api\/users\/$/;
const USER_PATH = /^\/api\/users\/[\w-]+$/;

export const getUsers = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  const url = parse(request.url as string);

  if (request.url && USER_PATH.test(request.url)) {
    if(validate(url.name)) {
      getOneUsers(url, response)
    } else {
      notUuid(response)
    }
  } else if (request.url && USERS_PATH.test(request.url) || USERS_PATH2.test(request.url as string)) {
    getAllUsers(request, response)
  } else {
    response.writeHead(500, { "Content-Type" : "application/json" });
    response.end(JSON.stringify({message: 'No such resourse'}))
  }
}

const notUuid = async (response: any) => { 
  response.writeHead(400, { "Content-Type" : "application/json" });
  response.end(JSON.stringify({message: 'ID type is not UUID'}))
}

const getOneUsers = async (url: any, response: any ) => {
  const user = await findUserById(url.name)
  if (user) {
    response.writeHead(200, { "Content-Type" : "application/json" });
    response.end(JSON.stringify(user));
  } else {
    response.writeHead(404, { "Content-Type" : "application/json" });
    response.end(JSON.stringify({message: `User ${user} not found`}))
  }
}

const getAllUsers = async (request: any, response: any ) => {
  try {
    const users = await findAllUsers();
    response.writeHead(200, { "Content-Type" : "application/json" });
    response.end(JSON.stringify(users));
  } catch (error: any) {
    response.writeHead(500, { "Content-Type" : "application/json" });
    response.end(JSON.stringify({message: error.message}))
  }
}

export const createUser = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  try {
    const body: any = await getPostData(request)
    const { username, age, hobbies } = JSON.parse(body)
    const userParams = {username, age, hobbies}
    const user = await createNewUser( userParams )
    if (user) {
      response.writeHead(201, { "Content-Type" : "application/json" });
      response.end();
    } else {
      response.writeHead(400, { "Content-Type" : "application/json" });
      response.end(JSON.stringify({message: `User ${(user as IUser).username} can't be added`}))
    }

  } catch (error) {
      console.log(error)
  }
}

export const deleteUser = async (request: any, response: ServerResponse): Promise<void> => {
  const url = parse(request.url as string);
  if(validate(url.name)) {
    const user = await findUserById(url.name)
    if (user) {
      //@ts-ignore
      await deleteUserById(user)
      response.writeHead(204, { "Content-Type" : "application/json" });
      response.end();
    }
    else {
    response.writeHead(404, { "Content-Type" : "application/json" });
    response.end(JSON.stringify({message: `User ${user} not found`}))
    }
  } else {
    notUuid(response)
  }
}

export async function getPostData(req:any) {
  return new Promise((resolve, reject) => {
    try {
      let body = ''

      req.on('data', (chunk: any) => {
        body += chunk.toString()
      })

      req.on('end', () => {
        resolve(body)
      })
    } catch (error: any) {
      reject(err)
    }
  })
}

export const updateUser = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  // Сорри за копипасту и код, не успеваю переписать нормально
  if (request.url && USER_PATH.test(request.url) && request.method === "PUT") {
    const url = parse(request.url as string);
    if(validate(url.name)) {
      const url = parse(request.url as string);
      if(validate(url.name)) {
        const user = await findUserById(url.name)
        if (user) {
          const id = (user as IUser).id;
          const body: any = await getPostData(request)
          const { username, age, hobbies } = JSON.parse(body)
          const userParams = {username, age, hobbies}
          const updatedUser = await updateExistingUser(id, userParams as IUser)
          console.log(updatedUser, "updatedUser")
          response.writeHead(200, { "Content-Type" : "application/json" });
          response.end();
        } else {}
      }
    } else {
      notUuid(response)
    }
  }
}

function err(err: any) {
  throw new Error('Function not implemented.');
}
