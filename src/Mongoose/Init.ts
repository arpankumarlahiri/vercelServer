import mongoose from 'mongoose';

const uri = process.env.MONGO_CONN;
const clientOptions = {
  serverApi: { version: '1' as '1', strict: true, deprecationErrors: true },
};
async function mongoConnect() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri as string, clientOptions);
    await mongoose?.connection?.db?.admin().command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  // finally {
  //   // Ensures that the client will close when you finish/error
  //   await mongoose.disconnect();
  // }
}

export default mongoConnect;
