import mongoose from "mongoose";
import { DB_HOST } from "./config.js"; 

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_HOST);
        console.log('>>> connected to the DB <<<')
    } catch (error) {
        console.log(error)
    }
}
// const uri = "mongodb+srv://jose:S28jyUJt0NqgO3CS@cluster0.5i1p3ph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);



