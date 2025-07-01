"use server"

export const getDoctorBySpeciality = async (speciality) => {
    try {
        const doctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
                speciality: speciality.split("%20").join(" "),
            },
            orderBy: {
                name: "asc",
            },
        });
    } catch (error) {
        console.error("Failed to get verified doctors:", error);
        return { error: "Failed to fetch verified doctors" };
    }
}