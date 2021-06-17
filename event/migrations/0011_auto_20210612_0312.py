# Generated by Django 3.2.4 on 2021-06-11 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0010_event_icon'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='penalty',
            field=models.PositiveSmallIntegerField(default=20, help_text='Points Deduction on Incorrect Attempt.'),
        ),
        migrations.AddField(
            model_name='problem',
            name='point_loss',
            field=models.PositiveSmallIntegerField(default=2, help_text='Point loss per minute.'),
        ),
        migrations.AddField(
            model_name='problem',
            name='points',
            field=models.PositiveSmallIntegerField(default=150, help_text='Maximum score.'),
        ),
        migrations.AlterField(
            model_name='event',
            name='icon',
            field=models.ImageField(upload_to='event_icons/'),
        ),
        migrations.AlterField(
            model_name='event',
            name='is_contest',
            field=models.BooleanField(default=True, help_text='True if you want Scores and Leaderboard.'),
        ),
    ]