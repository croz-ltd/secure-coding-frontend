import {Client} from "@stomp/stompjs";
import {api} from "../api/paths";
import {CSRF_TOKEN_NAME, getCsrfToken} from "../util/AuthUtil";
import toast from "react-hot-toast";

let client = initWebSocketClient(0);

function initWebSocketClient(userId: number): Client {
  return new Client({
    brokerURL: api.websocket,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: (_frame) => {
      client.subscribe(api.stompTopic(userId), (message) => {
        toast.success(`Order received for product: ${JSON.parse(message.body)["productName"]}`);
      })
    }
  })
}

// TODO: Deaktiviraj na logout - bbes
export async function createWebSocketClient(userId: number) {
  if (client.active) {
    await client.deactivate();
  }

  client = initWebSocketClient(userId);
  client.connectHeaders[CSRF_TOKEN_NAME] = getCsrfToken();

  client.activate();
}
