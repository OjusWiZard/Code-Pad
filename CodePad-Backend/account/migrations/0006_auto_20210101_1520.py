# Generated by Django 3.1.4 on 2021-01-01 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0014_auto_20210101_1520'),
        ('account', '0005_auto_20210101_1502'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.DeleteModel(
            name='Group',
        ),
    ]