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
        // Redirect user to Google OAuth consent screen
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar'],
            prompt: 'consent'
        });
        return Response.redirect(authUrl);
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);


        // Store tokens in cookies 
        const cookieStore = cookies();
        cookieStore.set('google_access_token', tokens.access_token, { path: '/' });
        cookieStore.set('google_refresh_token',tokens.refresh_token,{path:})
    } catch (error) {
        
    }
}