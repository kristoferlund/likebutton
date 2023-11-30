type SvgIconProps = {
  size?: "tiny" | "small" | "large";
  className?: string;
};

function sizeClass(size: SvgIconProps["size"]) {
  if (size === "tiny") {
    return "h-4 w-4";
  }
  if (size === "large") {
    return "h-20 w-20";
  }
  return "h-10 w-10";
}

export function SvgIcon({ size = "small", className = "" }: SvgIconProps) {
  return (
    <div
      className={`flex items-center justify-center ${sizeClass(
        size
      )} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        className={`fill-current ${sizeClass(size)}`}
      >
        <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
      </svg>
    </div>
  );
}
