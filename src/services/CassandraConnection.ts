import * as cassandra from 'cassandra-driver'

import { IConnection, IDatabase } from '../atoms/connections'

let connection: CassandraConnection | undefined

function initializeConnection(
  connectionOptions: IConnection,
  database: IDatabase
): Promise<void> {
  if (connection) {
    connection.disconnect()
  }

  return new Promise((resolve, reject) => {
    // TODO: Add Cassandra credentials
    const client = new cassandra.Client({
      contactPoints: [`${connectionOptions.host}:${connectionOptions.port}`],
      localDataCenter: 'datacenter1'
    })

    client
      .connect()
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

function terminateConnection(): void {
  if (connection) {
    connection.disconnect()
  }
}

export { connection, initializeConnection, terminateConnection }
