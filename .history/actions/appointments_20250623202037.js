

export const getDoctorById = async (doctorId) => {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id:doctorI
            }
        })
    } catch (error) {
        
    }
}