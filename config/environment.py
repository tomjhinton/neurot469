import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/neurot469')
secret = os.getenv('SECRET', 'a suitable secret')
