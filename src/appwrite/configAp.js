import conf from "../conf/conf";
import { ID, Query, Databases, Storage } from "appwrite";
import client from "./client";

export class Service {
  databases;
  bucket;

  constructor() {
    this.databases = new Databases(client);
    this.bucket = new Storage(client);
  }

  async createPost({ title, slug, content, featuredImg, status, userId }) {
    try {
      const createPost = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImg,
          status,
          userID: userId,
        }
      );
      return createPost;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Error :: ", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Error ::", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Error :: ", error);
      throw error;
    }
  }

  async getPosts(queries = []) {
    try {
      // If no queries provided, fetch all posts, otherwise use the provided queries
      const queryArray = queries.length > 0 ? queries : [];
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queryArray
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      throw new Error("Failed to get posts.");
    }
  }

  // File upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Error :: ", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      const file = await this.bucket.getFile(conf.appwriteBucketId, fileId);
      if (!file) {
        throw new Error("File not found.");
      }
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Error :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }
}

const appwriteService = new Service();
export default appwriteService;
