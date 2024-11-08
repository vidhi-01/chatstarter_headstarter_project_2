import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { PlusIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewDirectMessage } from "./new-direct-message";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const user = useQuery(api.functions.user.get);
  const directMessages = useQuery(api.functions.dm.list);
  const pathName = usePathname();

  if (!user) {
    return null;
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathName === "/"}>
                  <Link href="/">
                    <User2Icon className="w-4 h-4 mr-2" />
                    Friends
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Direct Messages</SidebarGroupLabel>

          <NewDirectMessage />

          <SidebarGroupContent>
            <SidebarMenu>
              {directMessages?.map((directMessage) => {
                return (
                  <SidebarMenuItem key={directMessage._id}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathName === `/dms/${directMessage._id}`}
                    >
                      <Link href={`/dms/${directMessage._id}`}>
                        <Avatar className="size-6">
                          <AvatarImage src={directMessage.user.image} />
                          <AvatarFallback>
                            {directMessage.user.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium">
                          {directMessage.user.username}
                        </p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={user?.image} />
                        <AvatarFallback>{user?.username[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {user?.username}
                      </span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <SignOutButton>Sign out</SignOutButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
