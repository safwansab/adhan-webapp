# Deployment Guide — Adhan Timing & Mosque Management System

This application can be deployed in multiple ways depending on whether you want to run it inside a Mosque/Home network (Local Display) or host it on the internet for public access.

---

## Option 1: Local Network Deployment (Mosque TV / Local PC)

Best for: **Mosque TV Display Mode, Hall Screens, Home Smart Displays.**

### 1. Simple Startup
To launch the server locally on Windows, simply double-click:
```cmd
start.bat
```
Or run from command prompt / PowerShell:
```cmd
py -3 server.py
```
The server will start on port `8000` and automatically open `http://localhost:8000`.

### 2. Auto-Start on Windows Boot (Mosque TV Setup)
To make the application start automatically whenever the TV PC turns on:
1. Press `Win + R`, type `shell:startup`, and hit Enter.
2. Create a shortcut to `c:\webapp\start.bat` inside that Startup folder.
3. Open `http://localhost:8000` in Google Chrome, press `F11` for Fullscreen TV Mode.

### 3. Accessing from Phones & Tablets on local Wi-Fi
Anyone connected to the same Wi-Fi network can view prayer times on their phone:
1. Open Command Prompt (`cmd`) and type `ipconfig`.
2. Note your IPv4 Address (e.g., `192.168.1.100`).
3. Open mobile browser to:
   ```text
   http://192.168.1.100:8000
   ```

---

## Option 2: Cloud Deployment (Render.com / Railway — Free HTTPS URL)

Best for: **Global public access via a custom URL (e.g., `https://my-mosque-adhan.onrender.com`).**

### Step 1: Create a GitHub Repository
1. Push your `c:\webapp` folder to GitHub.

### Step 2: Deploy on Render (Free)
1. Go to [render.com](https://render.com) and create a free account.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the configuration options:
   - **Environment**: `Python 3`
   - **Build Command**: *(leave blank or `pip install --upgrade pip`)*
   - **Start Command**: `python server.py`
5. Click **Create Web Service**.
6. Render will build and provide a free secure HTTPS URL!

---

## Option 3: Docker Deployment (Self-Hosted Linux Server / VPS)

If you own a Linux VPS (DigitalOcean, AWS EC2, Linode):

1. Create a `Dockerfile` in `c:\webapp`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
EXPOSE 8000
CMD ["python", "server.py"]
```

2. Build and run:
```bash
docker build -t adhan-webapp .
docker run -d -p 8000:8000 --name adhan-app adhan-webapp
```
