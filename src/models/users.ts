import { IUser } from '../helpers/interfaces';
import { parse } from 'path';

const Users: IUser[] = [
  {
    id: "f591c565-8545-4142-8fc2-5bb9d82f354e",
    username: "Snoop",
    age: 27,
    hobbies:["drinking peer, smoke weed every day"]
  },
  {
    id: "14f9301e-8f41-40c4-9dc5-7f28fdd88b85",
    username: "Keany",
    age: 27,
    hobbies:["drinking peer, be Neo"]
  }
]

export function findAllUsers () {
  return new Promise((resolve) => {
    resolve(Users)
  })
}

export function createNewUser(user: any) {
  return new Promise(resolve => {
    try {
      const newUser:IUser = { id: '1', ...user as Omit<IUser, 'id'> };
      Users.push(newUser);
      // console.log(newUser)
      resolve(newUser);
    } catch (error: any) {
      console.log(error.message)
    }
  })
}

export function findUserById(id: string) {
    return new Promise(resolve => {
        const user = Users.find(item => item.id === id);
        resolve(user);
    })
}
export function create(user:IUser) {
    return new Promise(resolve => {
        try {
            // const newUser:IUser = {id:'ramdom_uuid', ...user};
            // Users.push(newUser);
            // resolve(newUser);
        }
        catch (error: any) {
            console.log(error.message)
        }
    })
}

export function deleteUserById(user: IUser) {
  return new Promise(resolve => {
    const index = Users.findIndex((u) => u.id === user.id);
    Users.splice(index, 1);
    resolve(index);
  })
}


// export function update(id: string, data:IUser) {
//     return new Promise(resolve => {
//         const userIndex = Users.findIndex(item => item.id === id);
//         Users[userIndex] = {id, ...data}
//         resolve(Users[userIndex]);
//     })
// }

// export function remove(id:string) {
//     return new Promise<void>(resolve => {
//         Users.filter(item => item.id !== id);
//         resolve()
//     })
// }