import app from "./src/app.js"
import connectDB from "./src/config/db.js"

await connectDB()

// app.listen(process.env.PORT, ()=>{
//     console.log(`server is running on port ${process.env.PORT}`)
// })

export default app