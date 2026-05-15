import axiosInstance from "./axiosInstance";

export async function walletAuthenticate(
  address: `0x${string}`,
  signMessageAsync: (args: {
    account: `0x${string}`;
    message: string;
  }) => Promise<`0x${string}`>
): Promise<any> {
  try {
    const tokenRes = await axiosInstance.get(
      `/auth/wallet/request-token/${address}`
    );
    const { message, token } = tokenRes.data;
    const signature = await signMessageAsync({ account: address, message });
    const loginRes = await axiosInstance.post("/auth/wallet/login", {
      signature,
      address,
      token,
    });
    return loginRes.data.user_instance;
  } catch (err: any) {
    if (err.response?.status === 400) {
      return err.response.data; // already authenticated — server returns user_instance directly
    }
    throw err;
  }
}
