import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
export default function Page() {
  return (
    <div className="absolute top-0 flex flex-col justify-center h-screen">
      <div className="flex flex-col items-center gap-5 text-xl">
        <FontAwesomeIcon icon={faFaceSadCry} className="w-10 h-10" />
        <div>Not found</div>
      </div>
    </div>
  );
}
