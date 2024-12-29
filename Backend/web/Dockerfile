



# Use a lightweight Python base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app
RUN apt-get update && apt-get install -y \
    python3-dev \
    libmariadb-dev\
    zlib1g-dev \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0\
    --no-install-recommends && rm -rf /var/lib/apt/lists/*
# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
# ENV PYTHONPATH="/app"

# Copy the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run the application
# CMD ["flask", "run", "--host=0.0.0.0"]
CMD ["python3", "-m", "app"]