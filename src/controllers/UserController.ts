import { IUser } from './../helpers/interfaces';
import { IncomingMessage, ServerResponse } from 'http';
import { findAllUsers, createNewUser, findUserById, deleteUserById } from '../models/users';
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
    // @ts-ignore
    console.log('age', request.params)
    const body:any = await getPostData(request);
    console.log('----------------------------------------------')
    console.log(JSON.parse(JSON.parse(body)));
    console.log('----------------------------------------------')

    // const {username, age} = JSON.parse(JSON.parse(body));

    // console.log(age)
    // console.log(username)

    await createNewUser(request)
    const users = await findAllUsers();
    response.writeHead(201, { "Content-Type" : "application/json" });
  } catch (error: any) {
    response.writeHead(500, { "Content-Type" : "application/json" });
    response.end(JSON.stringify({message: error.message}))
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



export async function getPostData(request: IncomingMessage) {
  return new Promise((resolve, reject) => {
      try {
          let body:any = '';
          request.on('data', (chunk: string) => {
              body += chunk.toString();
          })
          request.on('end', () => {
            console.log('3223423423432')
              resolve(Buffer.concat(body).toString())
          })
      }
      catch (e) {
          reject(e)
      }
  })
  // let body: any = [];
  //   request.on('data', (chunk) => {
  //     console.log(chunk, '555555')
  //     body.push(chunk);
  //   });

  //   request.on('end', () => {
  //     try {
  //       if (body.length) {
  //         console.log('66666')
  //         console.log(JSON.parse(Buffer.concat(body).toString()), '123123123123123')
  //         // body = JSON.parse(Buffer.concat(body).toString());
  //         console.log(body, "bodybodybodybodybody")
  //       }
  //     }
  //     catch (e) {console.log('нам пизда')}
  // })
}


export async function deletesUser(user:any) {
console.log(user, "51231213212313")
return new Promise((resolve, reject) => {


})
}

