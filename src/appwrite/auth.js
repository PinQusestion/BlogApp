import config from "../conf/conf";
import { Account, ID } from "appwrite";
import client from "./client";

export class AuthService {
  account;

  constructor() {
    this.account = new Account(client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // Automatically log in the user after account creation
        return this.login({ email, password });
      }
      return null; // If account creation fails, return null
    } catch (error) {
      console.error("Appwrite AuthService :: createAccount ::", error);
      throw new Error("Account creation failed. Please try again.");
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password); //creating a session for the user.
    } catch (error) {
      console.error("Appwrite AuthService :: login ::", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  }

  async getCurrentUser() {
    try {
      const session = await this.account.get(); // Getting the session from appwrite
      if (session) {
        return await this.account.get();
      }
    } catch (error) {
      console.warn("Appwrite AuthService :: getCurrentUser :: not logged in");
    }

    return null; // Return null if no user session is found
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite AuthService :: logOut ::", error);
      throw new Error("Logout failed. Please try again.");
    }
  }
}

const authService = new AuthService();
export default authService;
