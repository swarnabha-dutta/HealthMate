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

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const body = await req.json();

    const event = {
        summary: body.summary,
        description: body.description,
        start: { dateTime: body.start, timeZone: body.timeZone || 'UTC' },
        end: { dateTime: body.end, timeZone: body.timeZone || 'UTC' },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        return new Response(JSON.stringify({ success: true, event: response.data }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify)
    }
}