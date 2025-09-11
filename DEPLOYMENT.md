# 🚀 Roundtable Management System - Deployment Guide

## 📋 Overview

The system consists of:
- **Frontend**: React SPA (Vite build) - 460KB production bundle
- **Backend**: Node.js API (Express + TypeScript) - 236KB compiled
- **Database**: PostgreSQL with Prisma ORM
- **Email**: SMTP integration for notifications

## 🌐 Deployment Options

### 1. **Quick Deploy (Recommended)**
**Frontend**: Vercel/Netlify + **Backend**: Railway/Render + **Database**: Neon/Supabase

### 2. **Enterprise Deploy**
**Full Stack**: AWS/Azure/GCP with Docker containers

### 3. **Self-Hosted**
VPS/Dedicated server with Docker Compose

---

## 🚀 Option 1: Quick Deploy (Production Ready)

### **Frontend Deployment (Vercel)**

1. **Connect to Vercel**:
   ```bash
   cd frontend
   npm install -g vercel
   vercel
   ```

2. **Build Settings**:
   - Build Command: `vite build`
   - Output Directory: `dist`
   - Framework: Vite

3. **Environment Variables** (optional):
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

### **Backend Deployment (Railway)**

1. **Connect to Railway**:
   ```bash
   cd backend
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

2. **Environment Variables**:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   PORT=3000
   NODE_ENV=production
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   FROM_EMAIL=noreply@makaitalia.com
   FRONTEND_URL=https://your-frontend.vercel.app
   COORDINATOR_EMAILS=training@makaitalia.com,alessia@makaitalia.com
   JWT_SECRET=your-super-secure-jwt-secret-here-minimum-32-characters
   ```

3. **Build Command**:
   ```
   npm run build
   ```

4. **Start Command**:
   ```
   npm start
   ```

### **Database Setup (Neon PostgreSQL)**

1. **Create Database**:
   - Sign up at [Neon.tech](https://neon.tech)
   - Create new PostgreSQL database
   - Copy connection string

2. **Run Migrations**:
   ```bash
   cd backend
   DATABASE_URL="your-neon-connection-string" npx prisma db push
   DATABASE_URL="your-neon-connection-string" npx prisma generate
   ```

---

## 🐳 Option 2: Docker Deployment

### **Frontend Dockerfile**
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### **Backend Dockerfile**
```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npx prisma generate
EXPOSE 5000
CMD ["npm", "start"]
```

### **Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/roundtables
      - NODE_ENV=production
      - PORT=5000
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=roundtables
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

**Deploy with Docker**:
```bash
docker-compose up -d
```

---

## ☁️ Option 3: Cloud Platform Specific

### **AWS Deployment**

1. **Frontend**: S3 + CloudFront
2. **Backend**: ECS Fargate or Lambda
3. **Database**: RDS PostgreSQL
4. **Email**: SES

### **Azure Deployment**

1. **Frontend**: Static Web Apps
2. **Backend**: Container Instances
3. **Database**: Azure Database for PostgreSQL
4. **Email**: SendGrid

### **GCP Deployment**

1. **Frontend**: Firebase Hosting
2. **Backend**: Cloud Run
3. **Database**: Cloud SQL PostgreSQL
4. **Email**: SendGrid

---

## 🔧 Pre-Deployment Checklist

### **Environment Setup**
- [ ] Generate secure JWT secret (32+ characters)
- [ ] Configure SMTP email credentials
- [ ] Set up PostgreSQL database
- [ ] Update CORS origins in backend
- [ ] Set production API URLs in frontend

### **Security**
- [ ] Enable HTTPS
- [ ] Configure proper CORS
- [ ] Set secure environment variables
- [ ] Enable database SSL
- [ ] Configure rate limiting

### **Performance**
- [ ] Enable gzip compression
- [ ] Set up CDN for frontend
- [ ] Configure database connection pooling
- [ ] Enable backend caching
- [ ] Monitor bundle sizes

---

## 📦 Quick Start Commands

### **Development**
```bash
# Backend
cd backend
npm install
npm run db:generate
npm run dev

# Frontend  
cd frontend
npm install
npm run dev
```

### **Production Build**
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npx serve dist
```

---

## 🔗 Recommended Stack

**For most users**: 
- **Frontend**: Vercel (free tier)
- **Backend**: Railway ($5/month)
- **Database**: Neon PostgreSQL (free tier)
- **Email**: Gmail SMTP (free)

**Total Cost**: ~$5/month for production-ready deployment

**Enterprise**: AWS/Azure with auto-scaling and enhanced security

---

## 🆘 Troubleshooting

### **Common Issues**

1. **CORS Errors**: Update `FRONTEND_URL` in backend env
2. **Database Connection**: Check `DATABASE_URL` format
3. **Email Not Sending**: Verify SMTP credentials
4. **Build Failures**: Ensure Node.js 18+ compatibility
5. **Environment Variables**: Double-check all required vars

### **Health Checks**

- Frontend: `https://your-domain.com`
- Backend: `https://your-api.com/health`
- Database: Check connection in backend logs

---

**The system is production-ready and can be deployed immediately with any of these options!**