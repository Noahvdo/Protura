import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.RefObject<HTMLDivElement>;
}

const Container: React.FC<ContainerProps> = ({
  className,
  ref,
  ...props
}: ContainerProps) => {
  return <div className={cn("p-4", className)} ref={ref} {...props}></div>;
};

Container.displayName = "Container";

export default Container;
