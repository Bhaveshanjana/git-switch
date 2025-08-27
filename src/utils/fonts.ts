import {
  Bricolage_Grotesque,
  DM_Sans,
  Manrope,
  Quicksand,
  Roboto_Flex,
  Share_Tech_Mono,
  Urbanist,
  VT323,
} from "next/font/google";

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const manrope_init = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const dm_sans_init = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

const edu_init = VT323({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const quick_init = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const roboto_init = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
});
const urban_init = Urbanist({
  subsets: ["latin"],
  display: "swap",
});
const share_init = Share_Tech_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

export const bricolage = bricolage_grotesque_init.className;
export const manrope = manrope_init.className;
export const sans = dm_sans_init.className;
export const edu = edu_init.className;
export const quick = quick_init.className;
export const roboto = roboto_init.className;
export const urban = urban_init.className;
export const share = share_init.className;