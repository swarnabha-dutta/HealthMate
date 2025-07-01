import { auth } from "@clerk/nextjs/dist/types/server"

export const getPatientAppointments = async () => {
    const {userId } = await auth
}