#!/bin/bash
echo "🚀 Starting Food Delivery Fullstack App..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "🐳 Starting databases with Docker..."
docker compose up -d mongo redis cassandra neo4j

echo ""
echo "⏳ Waiting for databases to start..."
sleep 30

echo ""
echo "🔥 Starting backend..."
npm run dev:backend &   # chạy src/backend/app.js
BACKEND_PID=$!

echo ""
echo "⚛️ Starting frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are running!"
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:3000"
echo "Swagger UI: http://localhost:3000/api-docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    docker compose down
    exit 0
}

trap cleanup SIGINT
trap cleanup SIGTERM

# Keep script running
wait
