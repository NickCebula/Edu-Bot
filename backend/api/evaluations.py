from django.conf import settings
from openai import OpenAI
import json

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def generate_evaluation(username="Guest", grade="2nd"):
    """
    Generate an AI-powered evaluation summary for a student.
    """
    prompt = (
        f"Write a short, encouraging evaluation summary for a {grade} grade student named {username}. "
        "Focus on their progress in reading, math, and spelling. "
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