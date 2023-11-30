import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type TimeProps = {
  time: string;
  className?: string;
};

export function Time({ time, className }: TimeProps) {
  dayjs.extend(relativeTime);
  return (
    <div className={`md:w-36 whitespace-nowrap ${className}`}>
      {dayjs.unix(parseInt(time)).fromNow()}
    </div>
  );
}
