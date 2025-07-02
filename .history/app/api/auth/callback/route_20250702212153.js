import { cookies } from "next/headers"





export const GET = async (req) => {
    const cookieStore = cookies();
    const access_token = (await cookieStore).get('google_access')
}