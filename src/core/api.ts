import db, { TIMESTAMP } from './db'
import { collectionToObject } from './utils'

export function getPage(pageId:string) {
  return db.collection('pages').doc(pageId).get().then(doc => doc.data())
}

export function getTodosRef(limit:number = 9999, orderAsc:boolean = true) {
  return db.collection("todos")
    .limit(limit)
    .orderBy('createdAt', orderAsc ? 'asc' : 'desc')
}

export function getTodos() {
  return getTodosRef()
    .get().then(ss => collectionToObject(ss))
}

export function watchTodos(onData:Function, limit:number, orderAsc:boolean) {
  return getTodosRef(limit, orderAsc)
      .onSnapshot(ss => {
        onData(collectionToObject(ss))
      })
}

export function addTodo(todo:string) {
  return db.collection('todos').add({
    createdAt: TIMESTAMP,
    todo,
  })
}

export function deleteTodo(docId:string) {
  return db.collection('todos').doc(docId).delete()  
}