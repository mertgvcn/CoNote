import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
//utils
import { getCookie } from "../CookieManager";

const BACKEND_BASEURL = process.env.REACT_APP_BACKEND_BASEURL;

interface ConnectionConfig {
  hubEndpoints: string;
  onMessage?: { [event: string]: (data: any) => void };
}

class SignalRManager {
  private connections: { [hubName: string]: HubConnection } = {};

  async connect(
    hubName: string,
    config: ConnectionConfig
  ): Promise<HubConnection> {
    if (this.connections[hubName]) {
      return this.connections[hubName];
    }

    const { hubEndpoints, onMessage } = config;

    const connection = new HubConnectionBuilder()
      .withUrl(`${BACKEND_BASEURL}${hubEndpoints}`, {
        accessTokenFactory: () => getCookie("access_token"),
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    if (onMessage) {
      Object.entries(onMessage).forEach(([event, handler]) => {
        connection.on(event, handler);
      });
    }

    try {
      await connection.start();
      this.connections[hubName] = connection;
      console.log(`${hubName} connection established.`);
      return connection;
    } catch (error) {
      console.error(`${hubName} connection failed:`, error);
      throw error;
    }
  }

  getConnection(hubName: string): HubConnection | undefined {
    return this.connections[hubName];
  }

  async disconnect(hubName: string): Promise<void> {
    const connection = this.connections[hubName];
    if (connection) {
      await connection.stop();
      delete this.connections[hubName];
      console.log(`${hubName} connection closed.`);
    }
  }

  async disconnectAll(): Promise<void> {
    await Promise.all(
      Object.keys(this.connections).map((hubName) => this.disconnect(hubName))
    );
  }
}

export const signalRManager = new SignalRManager();
