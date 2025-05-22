# Edu-Bot
Senior Design Project for our Early Education AI Tutor. This will include the front and backend for our web page, incorporating TTS and STT to work on a Raspberry Pi with a speaker and microphone. 

## Getting Started

1. **Clone**  
   ```bash
   git clone https://github.com/NickCebula/edu-bot.git
   cd edu-bot
cd backend
python -m venv venv

2. Backend
# activate:
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

pip install -r requirements.txt
cp .env.example .env      # and fill in your values
python manage.py migrate
python manage.py runserver

3. Front End
cd ../frontend
npm install
cp .env.example .env      # if needed
npm run dev

4. Open 
Frontend at http://localhost:5173

Backend API at http://localhost:8000/api

