import { firestore } from 'firebase'

export function collectionToObject(ss:firestore.QuerySnapshot) {
  const output = {};
  ss.forEach(item => {
    output[item.id] = item.data();
  })
  return output;
}