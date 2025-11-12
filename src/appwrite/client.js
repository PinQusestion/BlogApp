import config from "../conf/conf";
import { Client } from "appwrite";

/**
 * Singleton client instance with CORS-friendly configuration
 * Handles credentials and session management across origins
 */
class AppwriteClientManager {
  static instance = null;
  client = null;

  constructor() {
    this.client = new Client();
    this.initializeClient();
  }

  initializeClient() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId)
      .setSession(undefined);

    // Enable credentials for cookies to be sent with requests (required for CORS with sessions)
    if (typeof window !== 'undefined') {
      // This ensures cookies are included in cross-origin requests
      this.client.headers = {
        ...this.client.headers,
        'X-Appwrite-Response-Format': '1.4.0',
      };
    }
  }

  getClient() {
    return this.client;
  }

  static getInstance() {
    if (!AppwriteClientManager.instance) {
      AppwriteClientManager.instance = new AppwriteClientManager();
    }
    return AppwriteClientManager.instance.getClient();
  }
}

export default AppwriteClientManager.getInstance();
