import { useState } from "react";
import { Eye } from "lucide-react";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DetailItem } from "../DetailItem";
import Image from "next/image";

type UserDetailsProps = {
  user: User;
};

const UserDetails = ({ user }: UserDetailsProps) => {
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
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
              Personal Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="First Name" value={user.fullname} />

              <DetailItem label="Email" value={user.email} />

              <DetailItem label="Phone" value={user.phone} />

              <DetailItem label="Status" value={user.status} />
            </div>
          </section>

          <Separator />

          {/* Address */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
              Address
            </h3>

            <div className="grid gap-4 sm:grid-cols-2"></div>
          </section>

          <Separator />

          {/* Identification */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
              Identification
            </h3>

            <div className="grid gap-4 sm:grid-cols-2"></div>
            {user.profileImage && (
              <Image
                alt="Profile image"
                src={user.profileImage}
                width={100}
                height={100}
              />
            )}
          </section>

          <Separator />

          {/* Additional */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
              Additional Information
            </h3>

            {/* <DetailItem label="Notes" value={User.notes} /> */}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;
