import { cookies } from "next/headers"





export const GET = async (req) => {
    const cookieStore = cookies();
    const access_token = (await cookieStore).get('google_access_token')?.value;
    const refresh_token = (await cookieStore).get('google_refresh_token')?.value;

    if (!access_token || !refresh_token) {
        return new Response(JSON.stringify({ error: 'Google authentication required.' }), { status: 401 });
    }

    const oauth2Client = new google.auth.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
    
    oauth2Client.setCredentials({
        access_token,
        refresh_token
    });

    const calendar = google.calendar({version:'v3'})
}