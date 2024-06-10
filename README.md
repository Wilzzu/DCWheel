![Banner](https://i.imgur.com/4BemzGb.png)

<h1 align="center">DCWheel</h1>

<p align="center">Fast and fun way to create teams for games and events by spinning a wheel.</br>With a Discord integration, users can easily add players and share the results in their Discord server.</p>

## Live Site

Check out the live version of the website:
[DCWheel.wilzzu.dev](https://dcwheel.wilzzu.dev/)

![Screenshots](https://i.imgur.com/HTVB5s2.png)

## Features

- Spin a wheel to randomly assign players to teams
- Add players manually or fetch from a Discord server/voice channel
- Move players between teams
- Post results to a Discord server
- Change wheel settings such as the number of players per team and spin speed
- User authentication

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Discord.js
- **Database**: MongoDB
- **Authentication**: Supabase

## Setup and Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/Wilzzu/DCWheel.git
   cd DCWheel
   ```

2. **Install dependencies:**

   ```
   # For backend
   cd backend
   npm install

   # For frontend
   cd frontend
   npm install
   ```

3. **Configure environment variables:**
   Rename the `.env.example` files in both `backend` and `frontend` directories to `.env` and fill in the values:

   **Frontend `.env` file:**

   | Variable                       | Required | Description                                                                                            |
   | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
   | `VITE_SERVER_URL`              | ✅       | The URL where your backend server is hosted, e.g., `http://localhost:3000`.                            |
   | `VITE_SUPABASE_URL`            | ✅       | URL found in `Project Settings` > `API` > `Project URL` in your Supabase project.                      |
   | `VITE_SUPABASE_KEY`            | ✅       | Anon key found in `Project Settings` > `API` > `Project API keys` in your Supabase project.            |
   | `VITE_SUPABASE_PASS`           | ✅       | The password for your Supabase database.                                                               |
   | `VITE_ENCRYPTION_KEY`          | ✅       | A random string used for encryption. Should be the same in both the frontend and backend `.env` files. |
   | `VITE_DISCORD_BOT_INVITE_LINK` | ✅       | Bot invite link found in `Installation` > `Install Link` in your Discord Developer Portal application. |
   | `VITE_FAKE_ODDS`               | ❌       | Show randomly generated odds. Only shown to the main Discord server.                                   |
   | `VITE_MAIN_GUILD_ID`           | ❌       | The ID of your main Discord server. This is only used for fake odds if you want to enable them.        |

   **Backend `.env` file:**

   | Variable                | Required | Description                                                                                            |
   | ----------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
   | `PORT`                  | ✅       | The port where the backend server will run, e.g., `3000`.                                              |
   | `DISCORD_TOKEN`         | ✅       | Bot token found in `Bot` > `Token` in your Discord Developer Portal application.                       |
   | `DISCORD_CLIENT_ID`     | ✅       | Client ID found in `OAuth2` > `Client information` in your Discord Developer Portal application.       |
   | `DISCORD_CLIENT_SECRET` | ✅       | Client secret found in `OAuth2` > `Client information` in your Discord Developer Portal application.   |
   | `ENCRYPTION_KEY`        | ✅       | A random string used for encryption. Should be the same in both the frontend and backend `.env` files. |
   | `TOKEN_SECRET`          | ✅       | A random string used for encrypting and decrypting tokens.                                             |

4. **Run the application:**

   ```
   # Start the backend server
   cd backend
   npm run start

   # Start the frontend development server
   cd frontend
   npm run dev
   ```

## API Endpoints

### Public Endpoints

- `GET /api/encrypt` - Encrypt tokens.
- `GET /api/validate` - Validate encrypted tokens.

### Protected Endpoints

These endpoints require authentication.

- `GET /api/guilds` - Retrieve a list of Discord guilds.
- `GET /api/voicechannels` - Retrieve a list of voice channels and connected users from a guild.
- `GET /api/textchannels` - Retrieve a list of text channels from a guild.
- `GET /api/members` - Retrieve a list of all members from a guild.
- `POST /api/screenshot` - Post a screenshot to text channel in a guild.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
