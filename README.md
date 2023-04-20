##Colosseum

A website for watching videos together.

## Description

•	Synchronizes the video being watched with the current room
•	Plays, pauses, and seeks are synced to all watchers
•	Supports:
o	Screen sharing (full screen, browser tab or application)
o	Video files on the Internet (anything accessible via HTTP)
o	YouTube videos
•	Create separate rooms for users on demand
•	Text chat
•	Video chat

## Quick Start

•	Install npm dependencies for the project via `npm install`
•	Start the server via `PORT=8080 npm run dev`
o	Defaults to port 8080, customize with `PORT` env var
o	Run using self-signed HTTPS cert with `HTTPS=true`. This is needed for some WebRTC features (camera, etc.)
•	Start the React application in a separate shell and port via `PORT=3000 npm run start`
o	Point to server using `REACT_APP_SERVER_HOST` env var if you customized it above
o	Run using self-signed HTTPS cert with `HTTPS=true`. This is needed for some WebRTC features (camera, etc.)
•	Duplicate the `.env.example` file
•	Rename it to `.env`
•	Add config for the features you want as described in the advanced setup

### YouTube API (video search)

•	This project uses the YouTube API for video search, which requires an API key. You can get one from Google [here](https://console.developers.google.com).

•	Without an API key you won't be able to search for videos via the searchbox.

•	After creating a **YouTube Data API V3** access, you can create an API key which you can add to your environment variables by copying the `.env.example`, renaming it to `.env` and adding the key to the YOUTUBE_API_KEY variable.

•	After that restart your server to enable the YouTube API access on your server.

### Firebase Config (user authentication)

•	This project uses Firebase for authentication. This is used for user login, account management, subscriptions, and handling some features like room locking/permanence.

•	To set up, create a new Firebase app (or reuse an old one) from [here](https://console.firebase.google.com/). After creating an application, click on the settings cog icon in the left menu next to "Project overview" and click on project settings. From there, scroll down, create a web application and copy the Firebase SDK configuration snippet JSON data.

•	Next, you have to stringify it: `JSON.stringify(PASTE_CONFIG_HERE)` in your browser console, then add it to `REACT_APP_FIREBASE_CONFIG` in your .env file.

•	For server verification of accounts you'll also need `FIREBASE_ADMIN_SDK_CONFIG`, which you should do the same steps for.


### Permeant room


## Tech

•	React
•	TypeScript
•	Node.js
•	sockect.io
