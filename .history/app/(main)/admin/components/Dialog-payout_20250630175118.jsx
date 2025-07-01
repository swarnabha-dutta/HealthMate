import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, Check } from "lucide-react";
import { BarLoader } from "react-spinners";

const DialogPayout = ({
    open,
    onOpenChange,
    selectedPayout,
    loading,
    onCancel,
    onConfirm,
}) => {
    if (!selectedPayout) return null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">
                        Confirm Payout Approval
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to approve this payout?
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            This action will:
                            <ul className="mt-2 space-y-1 list-disc pl-4">
                                <li>
                                    Deduct {selectedPayout.credits} credits from Dr. {selectedPayout.doctor.name}'s account
                                </li>
                                <li>Mark the payout as PROCESSED</li>
                                <li>This action cannot be undone</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

                    <div className="bg-muted/20 p-4 rounded-lg border border-emerald-900/20">
                        <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Doctor:</span>
                            <span className="text-white">
                                Dr. {selectedPayout.doctor.name}
                            </span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Amount to pay:</span>
                            <span className="text-emerald-400 font-medium">
                                ${selectedPayout.netAmount.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">PayPal:</span>
                            <span className="text-white text-sm">
                                {selectedPayout.paypalEmail}
                            </span>
                        </div>
                    </div>
                </div>

                {loading && <BarLoader width={"100%"} color="#36d7b7" />}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={loading}
                        className="border-emerald-900/30"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Confirm Approval
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogPayout; 