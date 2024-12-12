import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Building2,
  Files,
  LayoutDashboard,
  ListTodo,
  LogOut,
  PanelsTopLeft,
  Plus,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SidebarProfileBadge from "./sidebar-profile-badge";
import ProfileBadge from "../profile/profile-badge";
import { alterStringLength } from "@/lib/utils";
import SidebarHeaderContent from "./sidebar-header";
import { RecentProjectSidebarItem } from "@/lib/types/sidebar";
import { SidebarText, SidebarTooltip } from "./sidebar-utils";

export function AppSidebar() {
  const items = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/",
    },
    {
      title: "Companies",
      icon: Building2,
      url: "/companies",
    },
    {
      title: "Clients",
      icon: Users,
      url: "/companies",
    },
    {
      title: "Projects",
      icon: PanelsTopLeft,
      url: "/projects",
    },
    {
      title: "Tasks",
      icon: ListTodo,
      url: "/tasks",
      itemCount: 3,
    },
    {
      title: "Invoices",
      icon: Files,
      url: "/invoices",
    },
  ];
  const projects: RecentProjectSidebarItem[] = [
    {
      title: "Axs ict website",
      projectId: "129301283",
      projectNumber: 3,
    },
    {
      title: "KeepUp front-end",
      projectId: "129301283",
      projectNumber: 1,
    },
    {
      title: "New vacancy AXS ict",
      projectId: "129301283",
      projectNumber: 43,
    },
  ];
  const tasks = [
    {
      title: "Front-end aanpassen",
      projectId: "129301283",
      taskId: "someId",
      projectName: "Axs ict website",
    },
    {
      title: "Vacature veranderen",
      projectId: "129301283",
      taskId: "someId",
      projectName: "Axs ict website",
    },
    {
      title: "Contact formulier aanpassen",
      taskId: "someId",
      projectName: "Axs ict website",
      projectId: "129301283",
    },
  ];

  const organizations = [
    {
      value: "someid",
      label: "Protura",
    },
    {
      value: "sveltekit",
      label: "AXS ict",
    },
    {
      value: "nuxt.js",
      label: "Axoft",
    },
    {
      value: "remix",
      label: "Ferrari",
    },
    {
      value: "astro",
      label: "Apple",
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderContent organizations={organizations} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Protura</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarTooltip tooltipText={item.title} key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.itemCount && item.itemCount > 0 && (
                      <SidebarMenuBadge>{item.itemCount}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                </SidebarTooltip>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel>
            <SidebarText>Recent projects</SidebarText>
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`/projects/${item.projectId}`}>
                      <SidebarText>
                        #{item.projectNumber}{" "}
                        {alterStringLength(item.title, 20)}
                      </SidebarText>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pending tasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tasks.map((item) => (
                <SidebarMenuItem key={item.title} className="h-12">
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/projects/${item.projectId}/tasks/${item.taskId}`}
                      className="h-full py-4"
                    >
                      <SidebarText>
                        <div className="flex flex-col w-full">
                          <span className="text-sm">
                            {alterStringLength(item.title, 24)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.projectName}
                          </span>
                        </div>
                      </SidebarText>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <SidebarProfileBadge />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" className="w-64 mb-1">
                <DropdownMenuLabel>
                  <ProfileBadge
                    user={{
                      name: "Noah",
                      email: "noahvdo@icloud.com",
                      profilePicture: "https://github.com/shadcn.png",
                    }}
                  />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
