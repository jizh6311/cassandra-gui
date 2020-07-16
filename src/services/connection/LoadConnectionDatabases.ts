import * as cassandra from 'cassandra-driver'

import { IConnection, IDatabase } from '../../atoms/connections'

export function loadConnectionDatabases(
  connection: IConnection
): Promise<IDatabase[]> {
  return new Promise((resolve, reject) => {
    // TODO: Add Cassandra credentials
    const client = new cassandra.Client({
      contactPoints: [`${options.host}:${options.port}`],
      localDataCenter: 'datacenter1'
    })

    client
      .connect()
      .then(() => {
        const connectionState = client
          .getState()
          .getConnectedHosts()
          .map(host => {
            return {
              // TODO: update the data struct for cassandra
              name: host.address,
              keys: 1
            }
          })

        resolve(connectionDatabases)

        client.shutdown()
      })
      .catch(err => {
        reject(err)
      })
  })
}
