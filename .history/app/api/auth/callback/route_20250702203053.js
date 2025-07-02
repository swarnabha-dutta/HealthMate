import { google } from 'googleapis';
import { cookies } from 'next/headers';
export const GET = async (req) => {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    if (!code) {
        // Step 1: Redirect user to Google OAuth consent screen
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar.readonly'],
            prompt: 'consent'
        });



        console.log("process.env.GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
        console.log("process.env.GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET);
        console.log("process.env.GOOGLE_REDIRECT_URI", process.env.GOOGLE_REDIRECT_URI);
        return Response.redirect(authUrl);
    }

    // Step 2: Handle callback, exchange code for tokens
    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log("tokens", tokens);
        oauth2Client.setCredentials(tokens);
        console.log("oauth2Client", oauth2Client);
        // Step 3: Fetch upcoming events from Google Calendar
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const events = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        return new Response(JSON.stringify(events.data.items, null, 2), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('OAuth error:', error);
        return new Response(
            JSON.stringify({ error: 'OAuth error', details: error?.toString(), stack: error?.stack }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};