import { getContactInfo } from "@/lib/contact";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  let logoUrl = "";
  try {
    const info = await getContactInfo();
    logoUrl = info.logo_url ?? "";
  } catch {
    // use default
  }

  return <NavbarClient logoUrl={logoUrl} />;
}

