import mongoose from "mongoose";
// mongodb://localhost:27017/ecom-udemy'
// process.env.MONGO_URI
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://localhost/withfirebase`, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true
        })

        console.log(`DB connected ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}

export default connectDB