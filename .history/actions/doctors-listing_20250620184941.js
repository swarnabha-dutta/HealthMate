"use server"

export const getDoctorBySpeciality = async (speciality) => {
    try {
        const doctors = await db.user.findMany({
            where: {
                
            }
        })
    } catch (error) {
        
    }
}