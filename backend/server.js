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

// Frontend URLs that are allowed to call this backend
const allowedOrigins = [
  // Local dev
  "http://localhost:5173",
  "http://localhost:5174",

  // Vercel (your current deployed frontend)
  "https://curequeue-sand.vercel.app",
  "https://curequeue.vercel.app",
  "https://curequeue-admin.vercel.app",

  // Netlify (if you still use these)
  "https://curequeue.netlify.app",
  "https://curequeue-admin.netlify.app",

  // Extra from environment (optional)
  process.env.FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL
].filter(Boolean) // remove undefined / empty values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin) return callback(null, true)

      // Check if the incoming origin is in our allowed list
      if (!allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin: " +
          origin
        return callback(new Error(msg), false)
      }

      return callback(null, true)
    },
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
