from .models import ReadingPassage, Question
from django.conf import settings
from openai import OpenAI
import json

client = OpenAI(api_key=settings.OPENAI_API_KEY)
def generate_reading_data():
    prompt = (
        "Generate a short reading passage appropriate for a 2nd grade student."
        "Then generate one multiple-choice question about the passage with four answer choices."
        "Randomize the order of the choices."
        "Return ONLY valid JSON in this format:\n"
        "{\n"
        '  "passage": "Text of the passage...",\n'
        '  "question": "Question text...",\n'
        '  "options": ["Option A", "Option B", "Option C", "Option D"],\n'
        '  "answer": "A"\n'
        "}\n"
        "The answer should be the letter of the correct choice (A, B, C, or D)."
        "Do not explain the answer or include any extra text."
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo", 
        messages=[
            {
                "role": "system",
                "content": "You are a reading tutor that creates age-appropriate quizzes for 2nd grade students. You only respond with properly formatted JSON."
            },
            {"role": "user", "content": prompt}
        ]
    )

    result = response.choices[0].message.content.strip()

    try:
        data = json.loads(result)
    except json.JSONDecodeError:
        return None

    return data


def save_reading_to_db(data):
    passage_text = data.get("passage")
    question_text = data.get("question")
    options = data.get("options")
    answer = data.get("answer")

    passage = ReadingPassage.objects.create(passage_text=passage_text)
    Question.objects.create(
        passage=passage,
        subject="Reading",
        prompt=question_text,
        option_a=options[0],
        option_b=options[1],
        option_c=options[2],
        option_d=options[3],
        correct_answer=answer,
    )
    return passage