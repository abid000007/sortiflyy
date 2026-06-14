# Dockerfile for Flask backend (server.py)
FROM python:3.11-slim
WORKDIR /app

# Install runtime dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy server code
COPY server.py .
COPY templates/ ./templates/  
COPY static/ ./static/ || true

EXPOSE 5000
CMD ["python", "server.py"]
