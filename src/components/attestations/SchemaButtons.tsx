import { EAS_SCHEMAS } from "../../config";
import Link from "next/link";

type SchemaButtonsProps = {
  uid?: string;
};

export default function SchemaButtons({ uid }: SchemaButtonsProps) {
  const className = (_uid?: string) => {
    let mark = "";
    if (_uid === uid) {
      mark = "ring-4 ring-theme-3 ring-opacity-40";
    }
    return `px-3 py-2 cursor-pointer shadow-theme-shadow-1 rounded-xl hover:ring-4 whitespace-nowrap hover:ring-theme-3 hover:ring-opacity-40 ${mark}`;
  };

  return (
    <div className="flex w-full gap-5 p-2 overflow-scroll md:p-0 md:overflow-visible">
      <Link href="/1">
        <div className={className()}>All</div>
      </Link>
      {EAS_SCHEMAS.map((schema) => (
        <Link href={`/schema/${schema.uid}/1`} key={schema.uid}>
          <div key={schema.uid} className={className(schema.uid)}>
            {schema.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
