import { useEffect, useRef } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useApp } from "@/context/AppContext";
import { walletAuthenticate } from "@/utils/walletAuth";
import { toast } from "sonner";
import Cookies from "js-cookie";

export function WalletSync() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { setWalletUser } = useApp();
  const prevAddressRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const prev = prevAddressRef.current;
    prevAddressRef.current = address;

    if (address && address !== prev) {
      walletAuthenticate(address, signMessageAsync)
        .then((userInstance) => {
          setWalletUser(userInstance);
          Cookies.set("safty_user_instance", JSON.stringify(userInstance), {
            expires: 10 / 24,
          });
          toast.success("Wallet connected and authenticated!");
        })
        .catch((err) => {
          const isRejection =
            err?.message?.includes("rejected") ||
            err?.message?.includes("denied");
          toast.error(
            isRejection
              ? "Signature rejected."
              : "Wallet authentication failed."
          );
        });
    }

    if (!address && prev !== undefined) {
      Cookies.remove("safty_user_instance");
      setWalletUser(null);
    }
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
