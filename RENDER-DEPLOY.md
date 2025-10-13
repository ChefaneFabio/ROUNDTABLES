# 🚀 Deploy Backend to Render.com

## 📋 Overview

Render.com is an excellent alternative to Railway for backend hosting:
- ✅ **$7/month** for starter plan
- ✅ **Free PostgreSQL** database included
- ✅ **Auto-scaling** and SSL certificates
- ✅ **Zero-downtime deploys**
- ✅ **GitHub integration**

---

## 🎯 Quick Deploy Steps

### **Method 1: One-Click Deploy (Recommended)**

1. **Fork/Clone Repository** (if not already done)
   - Ensure your code is pushed to GitHub
   - Make sure `render.yaml` is in the backend folder

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New" → "Blueprint"

3. **Deploy Blueprint**
   - Enter your GitHub repo URL: `https://github.com/ChefaneFabio/ROUNDTABLES`
   - Select branch: `main`
   - Click "Connect"
   - Render will auto-detect the `render.yaml` configuration

4. **Configure Environment Variables**
   - Add these additional variables in Render dashboard:
   ```
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait ~5-10 minutes for deployment
   - Your API will be available at: `https://roundtables-backend.onrender.com`

---

### **Method 2: Manual Setup**

#### **Step 1: Create Web Service**

1. Go to [render.com](https://render.com) dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Select `backend` folder as root directory

#### **Step 2: Configure Build & Start**

**Build Command:**
```bash
npm install && npm run build && npx prisma generate
```

**Start Command:**
```bash
npm start
```

**Environment:**
- Runtime: `Node`
- Node Version: `18`

#### **Step 3: Add Environment Variables**

In Render dashboard, add these environment variables:

```bash
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@makaitalia.com
COORDINATOR_EMAILS=training@makaitalia.com,alessia@makaitalia.com
FRONTEND_URL=https://your-vercel-app.vercel.app
```

#### **Step 4: Create PostgreSQL Database**

1. In Render dashboard, click "New" → "PostgreSQL"
2. Name: `roundtables-db`
3. Plan: `Free` (sufficient for development)
4. Create database

#### **Step 5: Connect Database**

1. Copy the database URL from your PostgreSQL service
2. Add it to your web service as:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

#### **Step 6: Deploy**

1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies
   - Build TypeScript
   - Generate Prisma client
   - Push database schema
   - Start the server

---

## 🔧 Post-Deployment Setup

### **1. Database Migration**

After first deployment, you may need to run:
```bash
# Render will auto-run this, but if needed:
npx prisma db push
```

### **2. Health Check**

Test your deployment:
```bash
curl https://your-app.onrender.com/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2024-01-22T10:30:00.000Z",
  "uptime": 123.45
}
```

### **3. Update Frontend API URL**

Update your frontend to use the new backend URL:
```javascript
// In frontend/src/services/api.ts
const API_BASE_URL = 'https://roundtables-backend.onrender.com'
```

---

## ⚙️ Advanced Configuration

### **Custom Domains**

1. In Render dashboard → Settings → Custom Domain
2. Add your domain (e.g., `api.yourdomain.com`)
3. Update DNS records as instructed
4. SSL certificate auto-generated

### **Auto-Deploy from GitHub**

1. Enable "Auto-Deploy" in settings
2. Every push to `main` branch triggers deployment
3. Zero-downtime rolling updates

### **Scaling**

- **Starter Plan**: 1 instance, 512MB RAM
- **Standard Plan**: Multiple instances, auto-scaling
- **Pro Plan**: Dedicated resources

### **Monitoring**

- Built-in logs and metrics
- Email alerts for downtime
- Integration with external monitoring

---

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 750 hours/month, sleeps after inactivity |
| **Starter** | $7/month | Always on, custom domains, SSL |
| **Standard** | $25/month | Auto-scaling, more resources |

**Recommended**: Starter plan for production use.

---

## 🔒 Security Best Practices

### **Environment Variables**
- ✅ Never commit secrets to Git
- ✅ Use Render's environment variables
- ✅ Generate strong JWT secrets
- ✅ Use app passwords for email

### **Database Security**
- ✅ SSL connections enabled by default
- ✅ Regular automated backups
- ✅ Network isolation
- ✅ Encryption at rest

### **API Security**
- ✅ HTTPS enforced
- ✅ CORS properly configured
- ✅ Rate limiting recommended
- ✅ Input validation in place

---

## 🚨 Troubleshooting

### **Common Issues**

**Build Fails:**
```bash
# Check Node version compatibility
"engines": {
  "node": ">=18.0.0"
}
```

**Database Connection:**
```bash
# Verify DATABASE_URL format
DATABASE_URL=postgresql://user:pass@host:port/dbname?sslmode=require
```

**Prisma Issues:**
```bash
# Clear and regenerate
rm -rf node_modules/.prisma
npx prisma generate
```

**Health Check Fails:**
- Ensure `/health` endpoint exists
- Check server startup logs
- Verify PORT environment variable

### **Logs Access**

View real-time logs in Render dashboard:
1. Go to your service
2. Click "Logs" tab
3. Monitor startup and runtime logs

---

## 📞 Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Community**: [community.render.com](https://community.render.com)
- **Status**: [status.render.com](https://status.render.com)

---

## ✅ **Next Steps After Deployment**

1. **Test API endpoints**: `https://your-app.onrender.com/api/health`
2. **Update frontend**: Point to new backend URL
3. **Set up monitoring**: Configure alerts
4. **Add custom domain**: Professional appearance
5. **Scale as needed**: Upgrade plan when traffic grows

**Your backend will be live at**: `https://roundtables-backend.onrender.com` 🚀