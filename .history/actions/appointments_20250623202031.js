

export const getDoctorById = async (doctorId) => {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id
            }
        })
    } catch (error) {
        
    }
}