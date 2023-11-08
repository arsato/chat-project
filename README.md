# Chatting Room App

Simple Chatting App using rooms to chat, it has the next functionalities:
- Login selecting an username
- Select a room to chat
- Fetch the 100 recent messages to each room
- Show the date and time of the messages
- Different style for messages sent vs messages received.


## Installation

You must have nodejs(v18.15.0), npm(v9.4.0) installed, then run:

In Unix:
```bash
bash script.sh
```

In Windows:
```bash
script.bat
```

## Technologies

- Back end
    - Nodejs: v18.15.0
    - npm: 9.4.0
	- oracledb: ^6.2.0
    - cors: ^2.8.5
    - express: ^4.18.2
    - dotenv: ^16.3.1
    - socket.io: ^4.7.2
- Front end
	- Vite: ^3.3.7
	- React: ^18.2.0
	- React-router-dom: ^6.17.0
    - socket.io-client: ^4.7.2
    - concurrently: ^8.2.2