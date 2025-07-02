import { google } from "googleapis";


export const GET = async (req) => {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');


    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,
    );

    if (!code) {
        
        
    }
}