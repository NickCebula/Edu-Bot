from django.core.management.base import BaseCommand
from api.spelling import save_spelling_to_db
from api.models import SpellingQuestion
import time

class Command(BaseCommand):
    help = 'Generate spelling questions with streaming image upload to S3'

    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=3,
            help='Number of spelling questions to generate (default: 3)'
        )

    def handle(self, *args, **options):
        count = options['count']
        
        self.stdout.write(f'Generating {count} spelling questions with streaming S3 upload...')
        
        total_time = 0
        s3_uploads = 0
        fallbacks = 0
        
        for i in range(count):
            try:
                start_time = time.time()
                spelling_question = save_spelling_to_db()
                end_time = time.time()
                
                if spelling_question:
                    duration = end_time - start_time
                    total_time += duration
                    
                    # Check if image was uploaded to S3
                    if spelling_question.image_url and "s3.amazonaws.com" in spelling_question.image_url:
                        storage_type = "S3"
                        s3_uploads += 1
                    else:
                        storage_type = "Fallback"
                        fallbacks += 1
                    
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'Generated question {i+1}: "{spelling_question.word}" '
                            f'({storage_type}) - {duration:.2f}s'
                        )
                    )
                    self.stdout.write(
                        f'  Image: {spelling_question.image_url}'
                    )
                else:
                    self.stdout.write(
                        self.style.ERROR(f'Failed to generate question {i+1}')
                    )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Error generating question {i+1}: {e}')
                )
        
        # Summary
        total_questions = SpellingQuestion.objects.count()
        avg_time = total_time / count if count > 0 else 0
        
        self.stdout.write("\n" + "=" * 50)
        self.stdout.write(self.style.SUCCESS(f'Generation Complete!'))
        self.stdout.write(f'  Total questions in database: {total_questions}')
        self.stdout.write(f'  S3 uploads: {s3_uploads}')
        self.stdout.write(f'  Fallback URLs: {fallbacks}')
        self.stdout.write(f'  Average time per question: {avg_time:.2f}s')
        
        if s3_uploads > 0:
            self.stdout.write(self.style.SUCCESS('✓ Streaming S3 upload is working!'))
        else:
            self.stdout.write(self.style.WARNING('⚠️  No S3 uploads detected. Check your environment variables.')) 