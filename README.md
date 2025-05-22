Edu-Bot

Senior Design Project: Early Education AI Tutor

Edu-Bot is a full‑stack web application integrating Text‑to‑Speech (TTS) and Speech‑to‑Text (STT) for early‑education lessons. Designed to run on a Raspberry Pi with a speaker and microphone, it comprises:

Backend: Django + Django REST Framework

Frontend: React + Vite

Table of Contents

Prerequisites

Repository Structure

Getting Started

1. Clone the Repo

2. Backend Setup

3. Frontend Setup

4. Running the Application

Contributing

Environment Variables

License

Prerequisites

Make sure you have the following installed on your development machine:

Git (v2.x)

Node.js & npm (LTS v16+)

Python (v3.10+)

VS Code (recommended) with extensions:

ESLint

Prettier

Python

Tailwind CSS IntelliSense

GitLens

Repository Structure

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

Getting Started

Follow these steps to get the project up and running locally.

1. Clone the Repo

git clone https://github.com/NickCebula/edu-bot.git
cd edu-bot

2. Backend Setup

Create & activate a virtual environment

cd backend
python -m venv venv
# macOS/Linux
source venv/bin/activate
# Windows (PowerShell)
venv\Scripts\Activate.ps1

Install dependencies

pip install -r requirements.txt

Configure environment

cp .env.example .env
# Edit .env with your SECRET_KEY, DEBUG, ALLOWED_HOSTS, etc.

Apply migrations & run server

python manage.py migrate
python manage.py runserver

The API will be available at: http://localhost:8000/api/

3. Frontend Setup

Navigate & install

cd ../frontend
npm install

(If needed) Configure environment

cp .env.example .env

Start the dev server

npm run dev

Open the React app at: http://localhost:5173

4. Running the Application

Ensure your Django backend is running on port 8000.

Ensure your Vite frontend is running on port 5173.

Navigate to http://localhost:5173 to interact with Edu‑Bot.

Environment Variables

Both backend/ and frontend/ include an .env.example. Copy these to .env and fill in:

backend/.env:

SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

frontend/.env (if used):

# e.g. VITE_API_BASE_URL=/api

Contributing

We use a feature-branch workflow:

Create a new branch:



git checkout -b feature/my-new-feature

2. Commit your changes:
   ```bash
git add . && git commit -m "feat: add awesome feature"

Push & open a Pull Request:



git push origin feature/my-new-feature

4. Request a review, then merge into `main` once approved.

Please ensure you pull the latest `main` before starting new work.
