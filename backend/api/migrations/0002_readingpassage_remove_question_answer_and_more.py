# Generated by Django 5.2.1 on 2025-06-04 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReadingPassage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.CharField(default='General', max_length=50)),
                ('passage_text', models.TextField()),
                ('questions', models.JSONField(default=list)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='question',
            name='answer',
        ),
        migrations.AlterField(
            model_name='question',
            name='subject',
            field=models.CharField(max_length=100),
        ),
    ]
