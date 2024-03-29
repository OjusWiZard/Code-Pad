# Generated by Django 3.1.5 on 2021-05-30 14:06

from django.db import migrations, models

import account.validators


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="avatar",
            field=models.SmallIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="user",
            name="admission_no",
            field=models.CharField(max_length=8, unique=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="username",
            field=models.SlugField(max_length=16, unique=True),
        ),
    ]
