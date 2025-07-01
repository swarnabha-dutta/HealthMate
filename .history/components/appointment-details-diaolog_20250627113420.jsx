import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const AppointmentDetailsDialog = ({ open, setOpen, appointment }) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-white">
          Appointment Details
        </DialogTitle>
        <DialogDescription>
          {appointment.status === "SCHEDULED"
            ? "Manage your upcoming appointment"
            : "View appointment information"}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export default AppointmentDetailsDialog;
