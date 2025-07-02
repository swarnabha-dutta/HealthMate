import { cookies } from "next/headers"





export const GET = async (req) => {
    const cookieStore = cookies();
    const access_token = (await cookieStore).get('google_access_token')?.value;
    const refresh_token = (await cookieStore).get('google_refresh_token')?.value;

    if (!access_token || !refresh_token) {
        rteurn new Response(JSON.stringify({error:'Google'}))
    }
}