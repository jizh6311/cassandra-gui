import * as cassandra from 'cassandra-driver'

export function testConnection(options): Promise<void> {
  return new Promise((resolve, reject) => {
    // TODO: Add Cassandra credentials
    const client = new cassandra.Client({
      contactPoints: [`${options.host}:${options.port}`],
      localDataCenter: 'datacenter1'
    })

    client
      .connect()
      .then(() => {
        resolve()

        client.shutdown()
      })
      .catch(err => {
        reject(err)
      })
  })
}
