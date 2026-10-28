import type { Metadata } from "next";
import { ListPropertyHero } from "@/components/sections/ListPropertyHero";
import { ListPropertyProcess } from "@/components/sections/ListPropertyProcess";
import { ListPropertyWizard } from "@/components/sections/ListPropertyWizard";
import { Reveal } from "@/shared/ui/Reveal";

export const metadata: Metadata = {
  title: "List Your Property | Purpose Space Realtors",
  description:
    "Share the essentials and our team will advise on the best next step—whether you are selling, letting or looking for attentive management.",
};

export default function ListPropertyPage() {
  return (
    <>
      <ListPropertyHero />
      <Reveal>
        <ListPropertyWizard />
      </Reveal>
      <Reveal>
        <ListPropertyProcess />
      </Reveal>
    </>
  );
}
