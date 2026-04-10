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
- **📧 Email Notifications**: OTP and password reset emails via Nodemailer.
- **🚦 Rate Limiting**: Protect your endpoints from abuse with Express Rate Limit.
- **🪖 Security Headers**: Helmet keeps the bad guys out.
- **📝 Request Logging**: Morgan logs every incoming request like a faithful reporter.
- **🌍 CORS Support**: Cross-origin requests handled gracefully.
- **💎 Modern Stack**: ES Modules, Mongoose, and the latest Express 5 features.

---

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) v5
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) ODM
- **Caching/State**: [Redis](https://redis.io/)
- **Auth & Security**: [Argon2](https://github.com/ranisalt/node-argon2), [Bcrypt](https://github.com/kelektiv/node-bcrypt), [JWT](https://jwt.io/), [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors)
- **Social Login**: [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs)
- **Validation**: [Joi](https://joi.dev/)
- **File Handling**: [Multer](https://github.com/expressjs/multer)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Rate Limiting**: [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)
- **Logging**: [Morgan](https://github.com/expressjs/morgan)
- **Config**: [dotenv](https://github.com/motdotla/dotenv)

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
   JWT_REFRESH_SECRET=your_refresh_secret_key
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_app_password
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
