import { NextResponse } from "next/server";

export const GET = async ()=>{
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar.readonly');
    const response_type = 'code';
    const access_type = 'offline';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&access_type=${access_type}&prompt=consent`;

    return NextResponse.redirect(url);
}