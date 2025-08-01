from .models import SpellingQuestion
from django.conf import settings
from openai import OpenAI
import json
import os
import requests
import boto3
import uuid
import logging
from contextlib import closing

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
    Generate an image for the given word using OpenAI DALL·E and stream it directly to S3.
    Returns the S3 URL of the uploaded image.
    """
    try:
        # Check if S3 is configured
        bucket_name = os.getenv('AWS_STORAGE_BUCKET_NAME')
        if not bucket_name:
            # Fallback to direct OpenAI URL if S3 not configured
            response = client.images.generate(
                model="dall-e-3",
                prompt=f"Create a simple cartoon image of a {word} with a white (#FFFFFF) background. Do not include any text or writing in the image. Make it colorful and appealing for children.",
                size="1024x1024",
                n=1
            )
            return response.data[0].url
        
        # 1️⃣ Ask for a URL (small JSON response, fast)
        response = client.images.generate(
            model="dall-e-3",
            prompt=f"Create a simple cartoon image of a {word} with a white (#FFFFFF) background. Do not include any text or writing in the image. Make it colorful and appealing for children.",
            size="1024x1024",
            n=1,
            response_format="url",
        )
        url = response.data[0].url
        
        # 2️⃣ Stream it into S3
        key = f"spelling_images/{word.lower()}_{uuid.uuid4()}.png"
        s3 = boto3.client("s3")
        
        with closing(requests.get(url, stream=True, timeout=30)) as r:
            r.raise_for_status()
            # boto3 can upload a file-like object; iter_chunks avoids loading all bytes
            s3.upload_fileobj(
                Fileobj=r.raw,
                Bucket=bucket_name,
                Key=key,
                ExtraArgs={"ContentType": "image/png"},
            )
        
        return f"https://{bucket_name}.s3.amazonaws.com/{key}"
        
    except Exception as e:
        logging.error(f"Error generating/uploading image for {word}: {e}")
        # Return None if image generation fails completely
        return None

def generate_audio_for_word(word, filename=None):
    """
    Generate an audio clip for the given word using OpenAI TTS and return the S3 URL.
    """
    try:
        # Check if S3 is configured
        bucket_name = os.getenv('AWS_STORAGE_BUCKET_NAME')
        if not bucket_name:
            # Fallback to local storage if S3 not configured
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
        
        # Generate audio and upload to S3
        if not filename:
            filename = f"{word.lower()}_{uuid.uuid4()}.mp3"
        
        # Generate audio content
        response = client.audio.speech.create(
            model="tts-1",
            voice="nova",
            input=word
        )
        
        # Upload to S3
        key = f"spelling_audio/{filename}"
        s3 = boto3.client("s3")
        
        # Upload the audio content directly to S3
        s3.put_object(
            Bucket=bucket_name,
            Key=key,
            Body=response.content,
            ContentType="audio/mpeg"
        )
        
        return f"https://{bucket_name}.s3.amazonaws.com/{key}"
        
    except Exception as e:
        logging.error(f"Error generating/uploading audio for {word}: {e}")
        return None

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

from api.models import SpellingQuestion

# Remove these lines from spelling.py:
# Start Django shell
# python manage.py shell

# Then run this code:
# Get all questions
# all_questions = SpellingQuestion.objects.all()
# print(f"Total questions: {all_questions.count()}")

# Find questions with local media URLs
# local_questions = []
# s3_questions = []

# for q in all_questions:
#     if q.image_url and q.image_url.startswith('/media/'):
#         local_questions.append(q)
#         print(f"Will delete: {q.word} (ID: {q.id}) - {q.image_url}")
#     elif q.image_url and 's3.amazonaws.com' in q.image_url:
#         s3_questions.append(q)
#         print(f"Will keep: {q.word} (ID: {q.id}) - {q.image_url}")

# Delete local questions
# if local_questions:
#     print(f"\nDeleting {len(local_questions)} questions with local URLs...")
#     for q in local_questions:
#         q.delete()
#     print("Cleanup complete!")

# print(f"Remaining questions: {SpellingQuestion.objects.count()}")