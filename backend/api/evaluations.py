from django.conf import settings
from openai import OpenAI
import json

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def generate_evaluation(profile):
    prompt = (
        f"Write a short, encouraging evaluation summary for {profile.name}, "
        f"a {profile.age}-year-old student from {profile.state}. "
        f"Their favorite subject is {profile.favorite_subject} and their favorite hobby is {profile.favorite_hobby}. "
        f"They have answered {profile.math_questions_answered} math questions so far. Use this number explicitly. "
        "Highlight strengths and suggest one area for improvement. "
        "Keep it friendly, positive, and under 100 words. "
        "Return ONLY the evaluation text, no extra formatting or explanation."
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are an elementary school teacher writing brief, positive evaluations for students."
            },
            {"role": "user", "content": prompt}
        ]
    )

    result = response.choices[0].message.content.strip()
    return result