# Sortifly - AI Voice Agents Platform

A modern React + Python full-stack application with stunning 3D animations, built for AI voice agents sales and booking.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Frontend Setup (React + Vite)

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Backend Setup (Python Flask)

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Start the backend server:
```bash
python server.py
```

The API will run at `http://localhost:5000`

## 📋 Features

### Frontend (React)
- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **Tailwind CSS** - Utility-first styling
- 🎬 **Framer Motion** - Smooth animations
- 🎭 **Three.js** - 3D WebGL graphics
- 📱 **Fully Responsive** - Mobile-first design
- 🔄 **React Router** - Client-side routing

### Backend (Python)
- 🐍 **Flask** - Lightweight web framework
- ✉️ **Email Integration** - Demo request notifications
- 🔒 **CORS Enabled** - Cross-origin support
- 📊 **API Endpoints** - RESTful architecture

## 🏗️ Project Structure

```
sortifly-react/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Hero3D.jsx       # 3D animation component
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   └── Contact.jsx      # Demo booking form
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── App.css              # Global styles
├── public/                  # Static assets
├── server.py                # Flask backend
├── requirements.txt         # Python dependencies
├── package.json             # Node dependencies
└── vite.config.js           # Vite configuration
```

## 💻 Development

### Frontend Development
```bash
npm run dev
```

### Backend Development
```bash
python server.py
```

### Production Build
```bash
npm run build
```

## 🔧 Configuration

### Email Settings
To enable email notifications for demo requests, set these environment variables in `.env`:

```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=abidrahim05@gmail.com
EMAIL_PASSWORD=your-app-password-here
```

For Gmail:
1. Enable 2-Factor Authentication
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character app password

## 📈 Pricing (Built-in)

- **Starter**: $2,000 - Build your first agent
- **Professional**: $5,000 - Scale your automation  
- **Enterprise**: Custom - For large organizations

## 🎯 Key Features Implemented

✅ 3D animated hero with interactive objects
✅ Responsive navigation with mobile menu
✅ Feature showcase section
✅ Pricing comparison
✅ Demo booking form with validation
✅ Backend API for form submissions
✅ Email notifications (configured for abidrahim05@gmail.com)
✅ Modern gradient styling (orange/amber theme)
✅ Smooth scroll animations
✅ Dark mode optimized

## 📬 Contact Form

The contact form submits to:
- **Email**: abidrahim05@gmail.com
- **API Endpoint**: `POST /api/demo-request`

Form data collected:
- Name
- Company
- Email
- Phone
- Industry
- Message

## 🚢 Deployment

### Frontend (Vercel, Netlify, etc.)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku, Railway, AWS, etc.)
```bash
pip freeze > requirements.txt
# Deploy server.py with Python runtime
```

## 🐛 Troubleshooting

### CORS Issues
Make sure the Flask backend is running on `http://localhost:5000` and the React app has the correct API URL configured.

### Email Not Sending
Check that:
1. Environment variables are set correctly
2. Gmail app password is correct (not your main password)
3. 2FA is enabled on the Gmail account

### 3D Animation Not Loading
Ensure WebGL is supported by your browser. Check browser console for errors.

## 📦 Dependencies

### Frontend
- react (19.2.6)
- react-router-dom (7.17.0)
- three (0.184.0)
- framer-motion (12.40.0)
- axios (1.17.0)
- tailwindcss (4.3.0)

### Backend
- Flask (2.3.2)
- Flask-CORS (4.0.0)
- python-dotenv (1.0.0)

## 📄 License

This project is proprietary software for Sortifly AI Voice Agents.

## 📞 Support

For support inquiries, contact: abidrahim05@gmail.com

---

**Built with ❤️ using React, Flask, and Three.js**
