import { useState } from "react";
import { Eye } from "lucide-react";
import { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DetailItem } from "../../DetailItem";

type TransactionDetailsProps = {
  transaction: Transaction;
};

const TransactionDetails = ({ transaction }: TransactionDetailsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon">
            <Eye className="size-4" />
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="min-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          <section>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
              Personal Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="Id" value={transaction.id} />

              <DetailItem label="Description" value={transaction.description} />

              <DetailItem label="Status" value={transaction.status} />
            </div>
          </section>

          <Separator />


          {/* Additional */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
              Additional Information
            </h3>

            {/* <DetailItem label="Notes" value={ReferralUser.notes} /> */}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetails;
