"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import {
  PendingFriendList,
  AcceptedFriendList,
} from "./_components/friends-list";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import AddFriend from "./_components/add-friend";

const FriendsPage = () => {
  return (
    <div className="flex-1 flex-col flex divide-y">
      <header className="flex items-center justify-between p-4">
        <h1 className="font-semibold">Friends</h1>
        <AddFriend />
      </header>
      <div className="grid p-4 gap-4">
        <TooltipProvider delayDuration={0}>
          <PendingFriendList />
          <AcceptedFriendList />
        </TooltipProvider>
      </div>
    </div>
  );
};

export default FriendsPage;
