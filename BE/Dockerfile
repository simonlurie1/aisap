FROM python:3.11-slim

WORKDIR /app

# Install ping utility
RUN apt-get update && apt-get install -y iputils-ping && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application
COPY ./app /app

# Command to run the application (remove the ping test)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]