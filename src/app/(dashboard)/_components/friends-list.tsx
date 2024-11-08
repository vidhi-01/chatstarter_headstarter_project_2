import { useMutation, useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckIcon, MessageCircleIcon, XIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
// const useTestUser = () => {
//   const user = useQuery(api.functions.user.get);
//   if (!user) {
//     return [];
//   }
//   return [user, user, user, user];
// };

export function PendingFriendList() {
  const friends = useQuery(api.functions.friend.listPending);
  const updateStatus = useMutation(api.functions.friend.updatedStatus);
  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-xs font-medium text-muted-foreground p-2.5">
        Pending Friends
      </h2>
      {friends?.length === 0 && (
        <FriendListEmpty>
          You don't have any pending friend requestes!
        </FriendListEmpty>
      )}
      {friends?.map((friend, index) => (
        <div key={index}>
          <FriendItem username={friend.user.username} image={friend.user.image}>
            <IconButton
              title="Accept"
              icon={<CheckIcon />}
              className="bg-green-100"
              onClick={() => {
                updateStatus({ id: friend._id, status: "accepted" });
              }}
            />
            <IconButton
              title="Reject"
              icon={<XIcon />}
              className="bg-red-100"
              onClick={() => {
                updateStatus({ id: friend._id, status: "rejected" });
              }}
            />
          </FriendItem>
        </div>
      ))}
    </div>
  );
}
function FriendItem({
  username,
  image,
  children,
}: {
  username: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 gap-2.5">
      <div className="flex item-center gap-2 5">
        <Avatar className="size-9 border">
          <AvatarImage src={image} />
          <AvatarFallback />
        </Avatar>
        <p className="text-sm font-medium">{username}</p>
      </div>
      <div className="flex item-center gap-1">{children}</div>
    </div>
  );
}

export function AcceptedFriendList() {
  const friends = useQuery(api.functions.friend.listAccepted);
  const updateStatus = useMutation(api.functions.friend.updatedStatus);
  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-xs font-medium text-muted-foreground p-2.5">
        Accepted Friends
      </h2>
      {friends?.length === 0 && (
        <FriendListEmpty>You dont have any friends yet!</FriendListEmpty>
      )}
      {friends?.map((friend, index) => (
        <div key={index}>
          <FriendItem username={friend.user.username} image={friend.user.image}>
            <IconButton
              title="Start DM"
              icon={<MessageCircleIcon />}
              //   className="bg-red-100"
              onClick={() => null}
            />
            <IconButton
              title="Remove Friend"
              icon={<XIcon />}
              className="bg-red-100"
              onClick={() => {
                updateStatus({ id: friend._id, status: "rejected" });
              }}
            />
          </FriendItem>
        </div>
      ))}
    </div>
  );
}

export function IconButton({
  title,
  className,
  icon,
  onClick,
}: {
  title: string;
  className?: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn("rounded-full", className)}
          onClick={onClick}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}

function FriendListEmpty({ children }: { children?: React.ReactNode }) {
  return (
    <div className="p-4 bg-muted/50 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}
