"use server"

export const getDoctorBySpeciality = async (speciality) => {
    try {
        const doctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
                speciality:speciality.split("%20").join(" "),
            },
            orderBy:{}
        })
    } catch (error) {
        
    }
}