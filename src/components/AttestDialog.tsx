import { Dialog, Transition } from "@headlessui/react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Fragment, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useSigner } from "../wagmi/hooks/useSigner";
import { isAddress } from "viem/utils";
import { publicClient } from "../viem/client";
import { queryClient } from "../main";

export default function AttestDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const signer = useSigner();
  const [userId, setUserId] = useState("");
  const [isAttesting, setIsAttesting] = useState(false);

  async function attest() {
    if (!signer) return;

    setIsAttesting(true);

    let address = userId;
    try {
      if (!isAddress(userId)) {
        const result = await publicClient.getEnsAddress({
          name: userId,
        });
        address = result as string;
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to resolve ENS name");
      setIsAttesting(false);
      return;
    }

    const eas = new EAS("0x4200000000000000000000000000000000000021");
    eas.connect(signer);

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
      toast.success("Like sent!");
      queryClient.invalidateQueries();
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
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col w-full max-w-md gap-5 p-6 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title className="text-2xl font-semibold text-gray-900">
                    Who do you like?
                  </Dialog.Title>

                  <div>
                    Enter an ethereum address or ENS name. Likes are stored as
                    on-chain{" "}
                    <a
                      href="https://attest.sh/"
                      target="_blank"
                      className="underline"
                    >
                      EAS
                    </a>{" "}
                    attestations on the Optimism L2 network.
                  </div>

                  <input
                    type="text"
                    className="w-full disabled:opacity-50"
                    onChange={(e) => setUserId(e.target.value)}
                    value={userId}
                    disabled={isAttesting}
                  />

                  <div className="flex justify-center w-full">
                    <button
                      type="submit"
                      className="flex items-center justify-center px-4 py-2 font-medium text-blue-900 border border-transparent rounded-xl bg-theme-3/50 hover:bg-theme-2/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => attest()}
                      disabled={isAttesting}
                    >
                      {isAttesting ? (
                        <>
                          <FontAwesomeIcon
                            icon={faCircleNotch}
                            className="w-4 h-4 mr-2"
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
