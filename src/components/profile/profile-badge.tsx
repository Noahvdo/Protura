import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CommandShortcut } from "../ui/command";

export default function SidebarProfileBadge({
  user,
}: {
  user: { name: string; email: string; profilePicture?: string };
}) {
  return (
    <div className="w-full flex items-center text-left gap-2 rounded-md transition-all font-normal">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="text-sm font-bold">{user.name}</span>
        <span className="text-xs dark:text-gray-300 font-normal">
          {user.email}
        </span>
      </div>
      <CommandShortcut>⌘P</CommandShortcut>
    </div>
  );
}
