import dns from "dns";
import mongoose from "mongoose";

// Fixes querySrv ECONNREFUSED on some Windows/DNS setups
dns.setServers(["8.8.8.8", "1.1.1.1"]);

let cached = globalThis.__mongooseConnection;
if (!cached) {
  cached = globalThis.__mongooseConnection = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  const dbName = process.env.MONGODB_DB_NAME || "codereviewer";

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName,
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB connected (db: ${dbName})`);
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    cached.conn = null;
    throw new Error(
      `MongoDB connection failed: ${err.message}. Check MONGODB_URI, Atlas IP allowlist (0.0.0.0/0 for dev), and network/DNS.`
    );
  }
}

export function isDBConnected() {
  return mongoose.connection.readyState === 1;
}
