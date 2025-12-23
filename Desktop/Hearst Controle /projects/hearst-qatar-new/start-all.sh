#!/bin/bash

echo "🚀 Starting Qatar Project..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "📦 Node version: $(node --version)"
echo ""

# Backend
echo "🔧 Starting Backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "⚠️  Warning: backend/.env not found. Copy env.example to .env and configure it."
fi

npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
cd ..

# Wait a bit for backend
sleep 3

# Frontend
echo ""
echo "🎨 Starting Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    npm install
fi

if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: frontend/.env.local not found. Copy env.example to .env.local and configure it."
fi

npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
cd ..

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║        QATAR PROJECT - SERVICES RUNNING           ║"
echo "╠════════════════════════════════════════════════════╣"
echo "║                                                    ║"
echo "║  🔧 Backend:  http://localhost:3001                ║"
echo "║  🎨 Frontend: http://localhost:3000                ║"
echo "║                                                    ║"
echo "║  🔑 Default Login:                                 ║"
echo "║     Email: admin@hearstmining.com                  ║"
echo "║     Password: Admin123!Hearst                      ║"
echo "║                                                    ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT

wait
