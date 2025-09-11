#!/bin/bash

# Roundtables Deployment Script
# Usage: ./deploy.sh [option]
# Options: vercel, railway, docker, local

set -e

echo "🚀 Roundtables Deployment Script"
echo "================================="

# Check if option is provided
if [ $# -eq 0 ]; then
    echo "Usage: ./deploy.sh [vercel|railway|docker|local]"
    echo ""
    echo "Options:"
    echo "  vercel   - Deploy frontend to Vercel"
    echo "  railway  - Deploy backend to Railway"
    echo "  docker   - Build and run with Docker Compose"
    echo "  local    - Run locally for development"
    exit 1
fi

OPTION=$1

case $OPTION in
    "vercel")
        echo "📦 Deploying Frontend to Vercel..."
        cd frontend
        
        # Install Vercel CLI if not exists
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        # Build and deploy
        echo "Building and deploying..."
        vercel --prod
        echo "✅ Frontend deployed to Vercel!"
        ;;
        
    "railway")
        echo "🚂 Deploying Backend to Railway..."
        cd backend
        
        # Install Railway CLI if not exists
        if ! command -v railway &> /dev/null; then
            echo "Installing Railway CLI..."
            npm install -g @railway/cli
        fi
        
        # Deploy
        echo "Deploying to Railway..."
        railway up
        echo "✅ Backend deployed to Railway!"
        ;;
        
    "docker")
        echo "🐳 Building and running with Docker Compose..."
        
        # Check if Docker is running
        if ! docker info > /dev/null 2>&1; then
            echo "❌ Docker is not running. Please start Docker and try again."
            exit 1
        fi
        
        # Build and run
        echo "Building containers..."
        docker-compose build
        
        echo "Starting services..."
        docker-compose up -d
        
        echo "✅ Services started!"
        echo "Frontend: http://localhost:3000"
        echo "Backend: http://localhost:5000"
        echo "Database Admin: http://localhost:8080"
        
        # Show logs
        echo "Showing logs (Ctrl+C to exit)..."
        docker-compose logs -f
        ;;
        
    "local")
        echo "💻 Running locally for development..."
        
        # Check if Node.js is installed
        if ! command -v node &> /dev/null; then
            echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
            exit 1
        fi
        
        # Install dependencies and run backend
        echo "Setting up backend..."
        cd backend
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        
        # Check for .env file
        if [ ! -f ".env" ]; then
            echo "⚠️  No .env file found. Copying from .env.example..."
            cp .env.example .env
            echo "Please edit .env file with your configuration."
        fi
        
        # Generate Prisma client
        echo "Generating Prisma client..."
        npx prisma generate
        
        # Start backend in background
        echo "Starting backend server..."
        npm run dev &
        BACKEND_PID=$!
        
        # Install dependencies and run frontend
        echo "Setting up frontend..."
        cd ../frontend
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        
        # Start frontend
        echo "Starting frontend server..."
        npm run dev &
        FRONTEND_PID=$!
        
        echo "✅ Development servers started!"
        echo "Frontend: http://localhost:5173"
        echo "Backend: http://localhost:5000"
        echo ""
        echo "Press Ctrl+C to stop both servers..."
        
        # Wait for Ctrl+C
        trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
        wait
        ;;
        
    *)
        echo "❌ Unknown option: $OPTION"
        echo "Valid options: vercel, railway, docker, local"
        exit 1
        ;;
esac