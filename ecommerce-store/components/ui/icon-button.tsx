import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

type IconButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  title?: string;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  title,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
      title={title}
    >
      {icon}
    </button>
  );
};

export default IconButton;
