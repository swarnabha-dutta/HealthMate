import { auth } from "@clerk/nextjs/server"

export const getPatientAppointments = async () => {
    const {userId } = await auth
}