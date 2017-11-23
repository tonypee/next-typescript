import db from './db'
import { collectionToObject } from './utils'

export function getAbout() {
  return db.collection('pages').doc('about').get().then(doc => doc.data().content)
}

export function getContact() {
  return db.collection('pages').doc('contact').get().then(doc => doc.data().content)
}

export function getTodos() {
  return db.collection('todos').get().then(collectionToObject)
}

export function watchTodos(onData: Function ) {
  db.collection("todos").onSnapshot(ss => onData(collectionToObject(ss)))
}

export function addTodo(todo:string) {
  return db.collection('todos').add({
    todo
  })
}

export function deleteTodo(docId:string) {
  return db.collection('todos').doc(docId).delete()  
}