import { Dialog, Transition } from "@headlessui/react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Fragment, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { revalidateCache } from "../actions";
import toast from "react-hot-toast";
import { useSigner } from "../wagmi/hooks/useSigner";

export default function AttestDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const signer = useSigner();
  const [address, setAddress] = useState("");
  const [isAttesting, setIsAttesting] = useState(false);

  async function attest() {
    if (!signer) return;

    setIsAttesting(true);

    const eas = new EAS("0x4200000000000000000000000000000000000021");
    eas.connect(signer as any);

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("bool like");
    const encodedData = schemaEncoder.encodeData([
      { name: "like", value: true, type: "bool" },
    ]);

    const schemaUID =
      "0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd";

    try {
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: address,
          expirationTime: BigInt(0),
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });
      await tx.wait();
      await revalidateCache();
      toast.success("Like sent!");
      setIsOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Like failed");
    }
    setIsAttesting(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Who do you like?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter an ethereum address (no ENS names, sorry). Likes are
                      stored as on-chain{" "}
                      <a
                        href="https://attest.sh/"
                        target="_blank"
                        className="underline"
                      >
                        EAS
                      </a>{" "}
                      attestations on the Optimism L2 network.
                    </p>
                  </div>
                  <input
                    type="text"
                    className="w-full mt-2 disabled:opacity-50"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    disabled={isAttesting}
                  />

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-theme-3/50 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-theme-2/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => attest()}
                      disabled={isAttesting}
                    >
                      {isAttesting ? (
                        <>
                          <FontAwesomeIcon
                            icon={faCircleNotch}
                            className="mr-2 w-4 h-4"
                            spin
                          />
                          Sending like
                        </>
                      ) : (
                        "Like"
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
