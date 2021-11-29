import { connect, connection as db } from 'mongoose'

export default async function connectDatabase (uri: string) {
  db.on('close', () => console.log('Database connection closed.'))
  console.log('Connecting to DB...');
  return connect(uri)
}