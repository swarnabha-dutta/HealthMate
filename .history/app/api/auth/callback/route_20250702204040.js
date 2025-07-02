




export const POST = async (req) => {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("google_access_token")?.value;
    const refresh_token = cookieStore.get("google_refresh_token")?.value;


    if (!access_token || !refresh_token) {
        return new Response(JSON.stringify({ error: "Not Authenticated with Google" }), { status: 401 });
    }
    const oauth2Client = new google.auth
}