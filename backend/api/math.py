from .models import MathQuestion
from django.conf import settings
from openai import OpenAI
import json

client = OpenAI(api_key=settings.OPENAI_API_KEY)
def generate_math_data():
    prompt = (
 	    "Generate a math question appropriate for a 2nd grade student."
        "Randomly pick a math operation (addition, subtraction), and choose numbers between 1 and 20."
        "Vary the questions each time so they are not repeated."
        "Then save the number answer and the text answer. "
        "Return ONLY valid JSON like this example:\n"
        "{\n"
        '  "question": "2 + 2 = ?",\n'
        '  "answer_text": "four",\n'
        '  "answer_num": "4",\n'
        "}\n"
        "Do not explain the answer or include any extra text."
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo", 
        messages=[
            {
                "role": "system",
                "content": "You are a math tutor that creates age-appropriate quizzes for 2nd grade students. You only respond with properly formatted JSON."
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

def save_math_to_db(data):
    question_text = data.get("question")
    answer_text = data.get("answer_text")
    answer_num = data.get("answer_num")

    if not question_text or not answer_text or not answer_num:
        return None
    
    # Create the MathQuestion instance
    math_question = MathQuestion.objects.create(
        question=question_text,
        answer_text=answer_text,
        answer_num=answer_num
    )
    return math_question