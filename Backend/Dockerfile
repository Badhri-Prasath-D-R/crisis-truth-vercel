# Use a Python base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies for SQLite
RUN apt-get update && apt-get install -y build-essential

# Copy and install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your backend code and your Database folder
COPY . .

# Set the port and run the app
ENV PORT=7860
EXPOSE 7860

CMD ["python", "main.py"]