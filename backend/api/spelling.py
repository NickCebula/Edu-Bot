from .models import SpellingQuestion
from django.conf import settings
from openai import OpenAI
import json
import os

client = OpenAI(api_key=settings.OPENAI_API_KEY)

import random

categories = ["animals", "food", "toys", "nature", "vehicles", "clothing", "sports equipment"]
category = random.choice(categories)

def generate_spelling_word():
    prompt = (
        "Generate a single English noun from the category {category}."
        "Vary the word each time so they are not repeated." 
        "Return ONLY valid JSON like this example:\n"
        '{\n  "word": "apple"\n}\n'
        "Do not include any extra text or explanation."
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a spelling tutor that creates age-appropriate spelling words for 2nd grade students. You only respond with properly formatted JSON."
            },
            {"role": "user", "content": prompt}
        ],
        temperature=1.5,
    )

    result = response.choices[0].message.content.strip()

    try:
        data = json.loads(result)
    except json.JSONDecodeError:
        return None

    return data

def generate_spelling_image(word):
    """
    Generate an image for the given word using OpenAI DALL·E and return the image URL.
    """
    response = client.images.generate(
        model="dall-e-3",  # or "dall-e-2"
        prompt=f"Create a simple cartoon image of a {word} with a white (#FFFFFF) background. Do not include any text or writing in the image.",
        size="1024x1024",
        n=1
    )
    image_url = response.data[0].url
    return image_url

def generate_audio_for_word(word, filename=None):
    """
    Generate an audio clip for the given word using OpenAI TTS and return the file path.
    """
    from django.conf import settings

    # Generate a unique filename if not provided
    if not filename:
        filename = f"{word.lower()}_{os.urandom(4).hex()}.mp3"
    audio_dir = os.path.join(settings.BASE_DIR, "media", "spelling_audio")
    os.makedirs(audio_dir, exist_ok=True)
    file_path = os.path.join(audio_dir, filename)

    response = client.audio.speech.create(
        model="tts-1",
        voice="nova",
        input=word
    )
    with open(file_path, "wb") as f:
        f.write(response.content)

    # Return the relative URL for serving via Django
    return f"/media/spelling_audio/{filename}"

def save_spelling_to_db():
    # Step 1: Generate the word
    data = generate_spelling_word()
    if not data or "word" not in data:
        return None

    word = data["word"]

    # Step 2: Generate the image URL for the word
    image_url = generate_spelling_image(word)

    audio_url = generate_audio_for_word(word)

    # Step 3: Save to the database
    spelling_question = SpellingQuestion.objects.create(
        word=word,
        image_url=image_url,
        audio_url=audio_url
    )
    return spelling_question