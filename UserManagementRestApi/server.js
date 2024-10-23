import app from "./app.js";
import { connectDB } from "./src/dbConnect/dbConnection.js";


connectDB()

const port = 5000
app.listen(port, () => {
    console.log(`server is running port ${port}`);
})