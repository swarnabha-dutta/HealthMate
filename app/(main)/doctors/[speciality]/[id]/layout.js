import { getDoctorById } from '@/actions/appointments';
import { PageHeader } from '@/components/page-header';
import { redirect } from 'next/navigation';



export const generateMetaData = async ({ params }) => {
    const { id } = await params;
    const { doctor } = await getDoctorById(id);


    return {
        title: `Dr.${doctor.name}-HealthMate`,
        description:`Book an appointment with Dr.${doctor.name},${doctor.speciality}    specialist with ${doctor.experience} years of experience`,
    }
}



const DoctorProfileLayout = async ({ children,params }) => {
    const { id } = await params;
    const { doctor } = await getDoctorById(id);
    if (!doctor) redirect("/doctors");


  return (
        <div className='container mx-auto px-4'>
            <PageHeader
            title={"Dr. "+doctor.name}
            backLink={`/doctors/${doctor.speciality}`}
            backLabel={`Back to ${doctor.speciality}`}
            />
            {children}
        </div>
  )
}

export default DoctorProfileLayout