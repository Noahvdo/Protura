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
      url: "/",
    },
  ];
  const projects = [
    {
      title: "Axs ict website",
      projectId: "/",
    },
    {
      title: "KeepUp front-end",

      projectId: "/companies",
    },
    {
      title: "New vacancy AXS ict",

      projectId: "/companies",
    },
  ];
  const tasks = [
    {
      title: "Front-end aanpassen",
      projectId: "/",
      taskId: "someId",
      projectName: "Axs ict website",
    },
    {
      title: "Vacature veranderen",
      projectId: "/companies",
      taskId: "someId",
      projectName: "Axs ict website",
    },
    {
      title: "Contact formulier aanpassen",
      taskId: "someId",
      projectName: "Axs ict website",
      projectId: "/companies",
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
                <SidebarMenuItem key={item.title}>
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
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recent projects</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`/projects/${item.projectId}`}>
                      <span>{item.title}</span>
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
                <SidebarMenuItem key={item.title} className="h-10">
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/projects/${item.projectId}/tasks/${item.taskId}`}
                    >
                      <div className="flex flex-col w-full">
                        <span className="text-sm">
                          {alterStringLength(item.title, 24)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.projectName}
                        </span>
                      </div>
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
