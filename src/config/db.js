const dns = require('node:dns').promises;
dns.setServers(['1.1.1.1', '8.8.8.8']);
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Validate environment variable exists
    if (!process.env.MONGO_URI) {
      throw new Error(
        'MONGO_URI is not defined in .env file. Expected format: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority',
      );
    }

    // Connection options for better reliability and performance
    const options = {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
      // Only use these if you have network/firewall issues
      // family: 4, // Force IPv4 if DNS resolution fails
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, options);

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Enhanced error logging for troubleshooting
    console.error('✗ MongoDB Connection Error:');
    console.error(`  Error Type: ${error.name}`);
    console.error(`  Error Message: ${error.message}`);

    // Specific error handling for common issues
    if (error.message.includes('querySrv ECONNREFUSED')) {
      console.error(
        '\n  💡 Troubleshooting Tips:\n' +
          '     - Check your internet connection\n' +
          '     - Ensure MONGO_URI is correctly formatted (mongodb+srv://...)\n' +
          '     - Verify MongoDB Atlas cluster is running\n' +
          '     - Check if firewall is blocking DNS (port 53)\n' +
          '     - If on corporate network, check proxy/firewall settings\n',
      );
    } else if (error.message.includes('authentication failed')) {
      console.error(
        '\n  💡 Authentication Issue:\n' +
          '     - Verify username and password are correct\n' +
          '     - Check for special characters (use URL encoding if needed)\n',
      );
    } else if (error.message.includes('ENOTFOUND')) {
      console.error(
        '\n  💡 DNS Resolution Issue:\n' +
          '     - Verify cluster hostname in MONGO_URI\n' +
          '     - Try using IP addresses if available (mongodb://...)\n',
      );
    }

    process.exit(1);
  }
};

module.exports = connectDB;
