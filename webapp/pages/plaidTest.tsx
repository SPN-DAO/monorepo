import Link from "../components/PlaidLink";

import useCreateLinkToken from "~~/hooks/useCreateLinkToken";

export default function Home() {
  const { linkToken } = useCreateLinkToken();
  return linkToken != null ? <Link linkToken={linkToken} /> : <></>;
}
