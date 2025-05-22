# Edu-Bot

**Senior Design Project: Early Education AI Tutor**

Edu-Bot is a full‑stack web application integrating Text‑to‑Speech (TTS) and Speech‑to‑Text (STT) for early‑education lessons. Designed to run on a Raspberry Pi with a speaker and microphone, it comprises:

* **Backend**: Django + Django REST Framework
* **Frontend**: React + Vite

---

## Table of Contents

* [Prerequisites](#prerequisites)
* [Repository Structure](#repository-structure)
* [Getting Started](#getting-started)

  * [1. Clone the Repo](#1-clone-the-repo)
  * [2. Backend Setup](#2-backend-setup)
  * [3. Frontend Setup](#3-frontend-setup)
  * [4. Running the Application](#4-running-the-application)
* [Contributing](#contributing)
* [Environment Variables](#environment-variables)
* [License](#license)

---

## Prerequisites

Make sure you have the following installed on your development machine:

* **Git** (v2.x)
* **Node.js & npm** (LTS v16+)
* **Python** (v3.10+)
* **VS Code** (recommended) with extensions:

  * ESLint
  * Prettier
  * Python
  * Tailwind CSS IntelliSense
  * GitLens

---

## Repository Structure

```
edu-bot/            # Monorepo root
├── backend/        # Django REST API
│   ├── core/       # Settings & URLs
│   ├── api/        # Models, views, serializers
│   ├── manage.py   # Django management
│   └── venv/       # Python virtual environment (gitignored)
├── frontend/       # React + Vite client
│   ├── src/        # React source code
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md       # You are here
```

---

## Getting Started

Follow these steps to get the project up and running locally.

### 1. Clone the Repo

```bash
git clone https://github.com/NickCebula/edu-bot.git
cd edu-bot
```

### 2. Backend Setup

1. **Create & activate** a virtual environment

   ```bash
   cd backend
   python -m venv venv
   # macOS/Linux
   source venv/bin/activate
   # Windows (PowerShell)
   venv\Scripts\Activate.ps1
   ```
2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```
3. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env with your SECRET_KEY, DEBUG, ALLOWED_HOSTS, etc.
   ```
4. **Apply migrations & run server**

   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

The API will be available at: `http://localhost:8000/api/`

### 3. Frontend Setup

1. **Navigate & install**

   ```bash
   cd ../frontend
   npm install
   ```
2. **(If needed) Configure environment**

   ```bash
   cp .env.example .env
   ```
3. **Start the dev server**

   ```bash
   npm run dev
   ```

Open the React app at: `http://localhost:5173`

### 4. Running the Application

1. Ensure your **Django** backend is running on port **8000**.
2. Ensure your **Vite** frontend is running on port **5173**.
3. Navigate to `http://localhost:5173` to interact with Edu‑Bot.

---

## Environment Variables

Both `backend/` and `frontend/` include an `.env.example`. Copy these to `.env` and fill in:

* **backend/.env**:

  ```ini
  SECRET_KEY=your_django_secret_key
  DEBUG=True
  ALLOWED_HOSTS=localhost,127.0.0.1
  ```

* **frontend/.env** (if used):

  ```ini
  # e.g. VITE_API_BASE_URL=/api
  ```

---

## Contributing

We use a **feature-branch** workflow:

1. Create a new branch:

   ```bash
   ```

git checkout -b feature/my-new-feature

````
2. Commit your changes:
   ```bash
git add . && git commit -m "feat: add awesome feature"
````

3. Push & open a Pull Request:

   ```bash
   ```

git push origin feature/my-new-feature

```
4. Request a review, then merge into `main` once approved.

Please ensure you pull the latest `main` before starting new work.

---

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.

```
