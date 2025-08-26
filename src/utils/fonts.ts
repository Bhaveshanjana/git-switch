import { Manrope, Urbanist } from "next/font/google";

const sans_init = Manrope({
  subsets: ["latin"],
  display: "swap",
});
const urbainst_init = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export const sans = sans_init.className;
export const urban = urbainst_init.className;
