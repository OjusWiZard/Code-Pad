# Generated by Django 3.1.5 on 2021-01-24 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0007_auto_20210125_0402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='slug',
            field=models.SlugField(max_length=8, unique=True),
        ),
        migrations.AlterField(
            model_name='problem',
            name='slug',
            field=models.SlugField(max_length=8, unique=True),
        ),
    ]