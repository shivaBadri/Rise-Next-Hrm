# Rise Next HRM

A Human Resource Management system with Employee Login.

---

## Project Structure

```
RiseNext-HRM/
├── Backend/     → Node.js + Express + MongoDB API
└── Frontend/    → React + Vite app
```

---

## Deploying on Render

### Backend (Web Service)
1. Create a **Web Service** on Render
2. Root Directory: `Backend`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add Environment Variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = any random secret string
   - `PORT` = 5000 (Render sets this automatically)

### Frontend (Static Site)
1. Create a **Static Site** on Render
2. Root Directory: `Frontend`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`
5. Add Environment Variables:
   - `VITE_API_URL` = your Backend Render URL (e.g. `https://hrm-backend.onrender.com`)

---

## Employee Login

- Default password for all new employees: **Employee@123**
- Employees log in with their **email** and password
- Token is valid for 8 hours

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Employee login |
| GET | /api/auth/me | Get current user |
| GET | /api/employees | List all employees |
| POST | /api/employees | Add employee |
| PUT | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee |
