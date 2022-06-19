import { IUser } from '../helpers/interfaces';
import { parse } from 'path';
import { v4 as uuidv4 } from 'uuid';

const Users: IUser[] = []

export function findAllUsers () {
  return new Promise((resolve) => {
    resolve(Users)
  })
}

export function createNewUser(user: IUser) {
  return new Promise(resolve => {
      const id = uuidv4();
      const newUser: IUser = { id: id, ...user };
      Users.push(newUser);
      resolve(newUser);
  })
}

export function findUserById(id: string) {
  return new Promise(resolve => {
    const user = Users.find(item => item.id === id);
    resolve(user);
  })
}

export function deleteUserById(user: IUser) {
  return new Promise(resolve => {
    const index = Users.findIndex((u) => u.id === user.id);
    Users.splice(index, 1);
    resolve(index);
  })
}

export function updateExistingUser(id: any, data: IUser) {
  return new Promise(resolve => {
    const userIndex = Users.findIndex((user) => user.id === id);
    const updatedUser: IUser = { id, ...data };
    Users.splice(userIndex, 1, updatedUser);

    resolve(Users[userIndex]);
  })
}
