import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { useMutation } from "convex/react";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function NewDirectMessage() {
  const [open, setOpen] = useState(false);
  const roter = useRouter();

  const createDirectMessage = useMutation(api.functions.dm.create);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const id = await createDirectMessage({
        username: e.currentTarget.username.value,
      });

      setOpen(false);

      roter.push(`/dms/${id}`);
    } catch (error) {
      toast.error("Failed to create direct message!", {
        description:
          error instanceof Error ? error.message : "An unknown error occured!",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction>
          <PlusIcon className="w-4 h-4" />
          <span className="sr-only">New Direct Message</span>
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New direct message</DialogTitle>
          <DialogDescription>
            Enter username to start new direct message.
          </DialogDescription>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" />
          </div>
          <DialogFooter>
            <Button>Start direct message!</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
