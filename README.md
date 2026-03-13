# 📩 Sara7a App - The Anonymous Whisperer 🤫

![Funny Welcome GIF](https://media.giphy.com/media/3o7TKDkDbIDJieKbVm/giphy.gif)

Welcome to the **Sara7a App**! Built with ❤️ during the **Node.js Learning Path at Route IT**. This app allows users to receive anonymous feedback from their friends, enemies, and that one person who still hasn't returned their charger. 🔌

---

## 🚀 Features

- **🔐 Secure Authentication**: Register, Login, and stay protected.
- **🌐 Google Social Login**: Because who remembers passwords anymore? 🤷‍♂️
- **💌 Anonymous Messages**: Send and receive messages without knowing who’s behind the screen.
- **🖼️ Profile Management**: Upload your best selfie (thanks to Multer).
- **🛡️ Validation**: Joi is watching every request like a hawk. 🦅
- **⚡ Redis Integration**: Super-fast token blacklisting and caching.
- **💎 Modern Stack**: ES6 Modules, Mongoose, and the latest Express features.

---

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Caching/State**: [Redis](https://redis.io/)
- **Security**: [Argon2](https://github.com/ranisalt/node-argon2), [Bcrypt](https://github.com/kelektiv/node-bcrypt), [JWT](https://jwt.io/)
- **Validation**: [Joi](https://joi.dev/)
- **File Handling**: [Multer](https://github.com/expressjs/multer)

---

## 📁 Project Structure

```text
Saraha-App/
├── src/
│   ├── Modules/
│   │   ├── auth/       # 🔑 Authentication & Social Login
│   │   ├── user/       # 👤 Profile & User Management
│   │   └── message/    # ✉️ Anonymous Messaging Logic
│   ├── DB/             # 🗄️ Database Connections & Models
│   ├── Middlewares/    # 🛡️ Validation & Auth Guards
│   ├── Utils/          # 🛠️ Helper functions
│   └── app.controller.js
├── uploads/            # 📁 Where your profile pics live
├── app.js              # 🚀 Entry point
└── package.json        # 📦 Dependencies & Scripts
```

---

## ⚙️ Installation & Setup

1. **Clone the repo**:
   ```bash
   git clone https://github.com/MohamedSamyHossebo/Saraha-App.git
   cd Saraha-App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up your `.env` file**:
   Create a `.env` file in the root directory and add:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_super_secret_key
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   ```

4. **Run the app**:
   ```bash
   npm run dev
   ```

---

## 🎮 API Endpoints (Highlights)

| Method  | Endpoint        | Description              |
| :------ | :-------------- | :----------------------- |
| `POST`  | `/auth/signup`  | Join the anonymous club  |
| `POST`  | `/auth/login`   | Enter the secret chamber |
| `POST`  | `/message/send` | Drop a truth bomb 💣      |
| `GET`   | `/message/all`  | Read your whispers       |
| `PATCH` | `/user/profile` | Update your vibe         |

---

## 😂 Why Anonymous Messaging?

- **Expectation**: "You are such an inspiration to me!" 😍
- **Reality**: "I'm the one who ate your lunch in the office fridge." 🥪

![Funny Reality GIF](https://media.giphy.com/media/3o7TKVUn7iM8FMEU24/giphy.gif)

---

## 👨‍🏫 Special Thanks

Big shoutout to the mentors at **Route IT** for the amazing Node.js course! 🚀

---

Made with ☕ and 💻 by **Mohamed Samy**.
