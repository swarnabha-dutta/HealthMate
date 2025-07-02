"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Set doctor's availability slots
 */
export async function setAvailabilitySlots(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // Get form data
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");

    // Validate input
    if (!startTime || !endTime) {
      throw new Error("Start time and end time are required");
    }

    if (startTime >= endTime) {
      throw new Error("Start time must be before end time");
    }

    // Just create a new availability slot (do NOT delete previous ones)
    const newSlot = await db.availability.create({
      data: {
        doctorId: doctor.id,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: "AVAILABLE",
      },
    });

    revalidatePath("/doctor");
    return { success: true, slot: newSlot };
  } catch (error) {
    console.error("Failed to set availability slots:", error);
    throw new Error("Failed to set availability: " + error.message);
  }
}

/**
 * Get doctor's current availability slots
 */
export async function getDoctorAvailability() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const availabilitySlots = await db.availability.findMany({
      where: {
        doctorId: doctor.id,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return { slots: availabilitySlots };
  } catch (error) {
    throw new Error("Failed to fetch availability slots " + error.message);
  }
}

/**
 * Get doctor's upcoming appointments
 */

export async function getDoctorAppointments() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const appointments = await db.appointment.findMany({
      where: {
        doctorId: doctor.id,
        status: {
          in: ["SCHEDULED"],
        },
      },
      include: {
        patient: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return { appointments };
  } catch (error) {
    throw new Error("Failed to fetch appointments " + error.message);
  }
}

/**
 * Cancel an appointment (can be done by both doctor and patient)
 */

export async function cancelAppointment(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    const appointmentId = formData.get("appointmentId");

    if (!appointmentId) {
      throw new Error("Appointment ID is required");
    }
    const appointment = await db.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });
    if (!appointment) {
      throw new Error("Appointment  not Found");
    }
    if (appointment.doctorId !== user.id && appointment.patientId !== user.id) {
      throw new Error("You are not Authorized to cancel this appointment");
    }


    await db.$transaction(async tx => {
      await tx.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: "CANCELLED",
        },
      });

      await tx.creditTransaction.create({
        data: {
          userId: appointment.patientId,
          amount: 2,
          type: "APPOINTMENT_DEDUCTION",
        },
      });

      await tx.creditTransaction.create({
        data: {
          userId: appointment.doctorId,
          amount: -2,
          type: "APPOINTMENT_DEDUCTION",
        },
      });




      // patient balance update
      await tx.user.update({
        where: {
          id: appointment.patientId,
        },
        data: {
          credits: {
            increment: 2,
          },
        },
      });


      //doctor balance update
      await tx.user.update({
        where: {
          id: appointment.doctorId,
        },
        data: {
          credits: {
            decrement: 2,
          },
        },
      });
    });

    if (user.role === "DOCTOR") {
      revalidatePath("/doctor");
    } else if (user.role === "PATIENT") {
      revalidatePath("/appointments");
    }

    return { success: true };
  } catch (error) {
    throw new Error("Failed To cancel appointment:" + error.message);
  }
}



export async function addAppointmentNotes(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const appointmentId = formData.get("appointmentId");
    const notes = formData.get("notes");



    const appointment = await db.appointment.findUnique({
      where: {
        id: appointmentId,
        doctorId: doctor.id,
      },
    });
    if (!appointment) {
      throw new Error("Appointment Not Found");
    }
    const updatedAppointment = await db.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        notes,
      },
    });


    revalidatePath("/doctor");

    return { success: true, appointment: updatedAppointment };
  } catch (error) {
    throw new Error("Failed to update notes " + error.message);
  }
}




export async function markAppointmentCompleted(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const appointmentId = formData.get("appointmentId");

    if (!appointmentId) {
      throw new Error("Appointment ID is Required");
    }


    const appointment = await db.appointment.findUnique({
      where: {
        id: appointmentId,
        doctorId: doctor.id,
      },
      include: {
        patient: true,
      },
    });
    if (!appointment) {
      throw new Error("Appointment Not Found");
    }

    if (appointment.status !== "SCHEDULED") {
      throw new Error("Only SCHEDULED appointments can be marked as Completed");
    }

    const now = new Date();
    const appointmentEndTime = new Date(appointment.endTime);

    if (now < appointmentEndTime) {
      throw new Error(
        "Cannot mark appointment as completed before the scheduled end time"
      );
    }
    const updatedAppointment = await db.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: "COMPLETED",
      },
    });


    revalidatePath("/doctor");
    return { success: true, appointment: updatedAppointment };
  } catch (error) {
    throw new Error("Failed to mark appointment as completed:" + error.message);
  }
}



pls tell and guide me  to add my how to  do that like i will give u 


can i need to delete Prisma schema part of availaility part ?

  First remove those custom  availability sections and related sections and then guide me 


I will get the source idea that looking i want but color is darkmode theme based 
You get the idea 
and give that as well according to my code base



data.js
export const timeSlots = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export const defaultAvailability = {
  monday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  tuesday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  wednesday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  thursday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  friday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  saturday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  sunday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  timeGap: 0,
};



layout.jsx

import { Suspense } from "react";

export default async function AvailabilityLayout({ children }) {
  return (
    <div className="mx-auto">
      <Suspense fallback={<div>Loading availability...</div>}>
        {children}
      </Suspense>
    </div>
  );
}

page.jsx ::


import React from "react";
import AvailabilityForm from "./_components/availability-form";
import { getUserAvailability } from "@/actions/availability";
import { defaultAvailability } from "./data";

export default async function AvailabilityPage() {
  const availability = await getUserAvailability();

  return <AvailabilityForm initialData={availability || defaultAvailability} />;
}





