import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <div className="sticky flex items-center w-full pt-3 px-7 bg-footer h-28">
      <div className="flex items-center justify-end w-full px-7">
        <div>
          <a href="https://givepraise.xyz" className="underline">
            <FontAwesomeIcon
              icon={faGithubSquare}
              className="inline-block w-10 h-10 ml-1 text-black/80"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
