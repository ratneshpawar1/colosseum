
# Colosseum

"Colosseum is your ultimate destination for seamless watch parties with friends, family, or colleagues. Our web application revolutionizes the way you enjoy videos together by offering integrated audio and chat functionalities without the hassle of logging in. Whether it's catching up on the latest YouTube videos, sharing nostalgic clips, or streaming live events, Colosseum brings everyone together in a virtual amphitheater of entertainment. Say goodbye to syncing issues and complicated setups – simply start a watch party, invite your guests with a unique link, and immerse yourselves in synchronized viewing experiences like never before. With Colosseum, the spotlight is on shared moments, laughter, and lively discussions, making every watch party an unforgettable event."


## Run Locally

Clone the project

```bash
  git clone https://github.com/ratneshpawar1/colosseum
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  PORT=8080 npm run dev
```
Defaults to port 8080 customize with `PORT` env var

This is needed for some WebRTC features (camera, etc.) Run using
```bash
  self-signed HTTPS cert with `HTTPS=true`
```
Start the React application in a separate shell and port via
```bash
  PORT=3000 npm run start
```
 Duplicate the `.env.example` file and Rename it to `.env`

### YouTube API (video search)
This project uses the YouTube API for video search, which requires an API key. You can get one from Google [here](https://console.developers.google.com/).

After creating a `YouTube Data API V3` access, you can create an API key which you can add to your environment variables by copying the:
```bash
.env.example, renaming it to .env 
```
And adding the key to the `YOUTUBE_API_KEY` variable.After that restart your server to enable the YouTube API access on your server.

### Firebase Config (user authentication)
• This project uses Firebase for authentication. This is used for user login, account management, subscriptions, and handling some features like room locking/permanence.

• To set up, create a new Firebase app (or reuse an old one) from [here](https://console.firebase.google.com/u/0/).

• After creating an application, click on the settings `cog icon` in the left menu next to "Project overview" and click on `project settings`. From there, scroll down, `create a web application` and copy the `Firebase SDK configuration snippet` JSON data.

• Next, you have to stringify it: `JSON.stringify(PASTE_CONFIG_HERE)` in your browser console, then add it to `REACT_APP_FIREBASE_CONFIG` in your `.env file`.

• For server verification of accounts you'll also need `FIREBASE_ADMIN_SDK_CONFIG`, which you should do the same steps for.



## Tech Stack
React, TypeScript, Node.js, websocket, webRTC, HTML, CSS
