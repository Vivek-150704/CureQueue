import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()

// IMPORTANT: use process.env.PORT for Render / any hosting platform
const port = process.env.PORT || 4000

// connect DB + Cloudinary
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())

// --- CORS CONFIGURATION START ---
// Put ONLY FRONTEND ORIGINS here (not the backend URL)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",

  // your deployed frontends
  "https://curequeue-sand.vercel.app",
  "https://curequeue.vercel.app",
  "https://curequeue-admin.vercel.app",
  "https://curequeue.netlify.app",
  "https://curequeue-admin.netlify.app",

  // from env if you want to configure via Render dashboard
  process.env.FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL
].filter(Boolean) // remove undefined / empty

// Simple CORS setup: allow only the origins above
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
)
// --- CORS CONFIGURATION END ---

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
})

app.listen(port, () => console.log(`Server started on PORT:${port}`))
