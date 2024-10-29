import { Client, Databases, Account, OAuthProvider } from "appwrite";

const client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67193f63002da27b2ff0");

export const account = new Account(client);
export const databases = new Databases(client);
export { OAuthProvider };
