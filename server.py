from websocket_server import WebsocketServer

# Global variables for node connections
node1 = None
node2 = None

def new_client(client, server):
    global node1, node2

    # Assign the first client as Node1
    if node1 is None:
        node1 = client
        print("Node1 connected.")
    # Assign the second client as Node2
    elif node2 is None:
        node2 = client
        print("Node2 connected.")


def client_left(client, server):
    global node1, node2

    # Handle disconnections
    if client == node1:
        print("Node1 disconnected.")
        node1 = None
    elif client == node2:
        print("Node2 disconnected.")
        node2 = None

def message_received(client, server, message):
    print(f"Received: {message}")

    # Broadcast the message to all connected clients
    for conn in server.clients:
        server.send_message(conn, message)

# Create the WebSocket server
server = WebsocketServer(host='0.0.0.0', port=5050)
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)

server.run_forever()
