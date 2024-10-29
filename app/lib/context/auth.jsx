import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { account } from '../appwrite';

export class GoogleAuth {
    static init() {
        GoogleSignin.configure({
            webClientId: 'YOUR_WEB_CLIENT_ID', // Get this from Google Cloud Console
            offlineAccess: true,
        });
    }

    static async signIn() {
        try {
            // Start Google Sign In flow
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            
            // Get the ID token
            const { accessToken } = await GoogleSignin.getTokens();

            // Create OAuth2 session with Appwrite
            const session = await account.createOAuth2Session(
                'google',
                accessToken,
                'YOUR_SUCCESS_URL',
                'YOUR_FAILURE_URL'
            );

            return session;
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            throw error;
        }
    }

    static async signOut() {
        try {
            await GoogleSignin.signOut();
            await account.deleteSession('current');
        } catch (error) {
            console.error('Sign Out Error:', error);
            throw error;
        }
    }

    static async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.error('Get Current User Error:', error);
            return null;
        }
    }
}