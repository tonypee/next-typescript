export function toArray(ss:firestore.QuerySnapshot) {
  const output = [];
  ss.forEach(item => output.push(item))
  return output;
} 

export function ssToData(ss:firestore.QuerySnapshot) {
  return toArray(ss).map(ss2 => ss2.data())
} 