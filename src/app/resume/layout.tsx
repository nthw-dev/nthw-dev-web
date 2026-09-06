import type { Metadata } from "next";

import "~/styles/resume.css";

export const metadata: Metadata = {
  // Absolute, so the portfolio's "%s | Natthawat Narin" template doesn't
  // double up the name the way it would on a normal page.
  title: { absolute: "Resume Preview - Natthawat Narin" },
  description:
    "Professional Resume Preview with multiple layout options and PDF export functionality",
};

/**
 * The resume renders inside the portfolio's dark root layout, so it gets its
 * own wrapper: the light-theme base and font stack in resume.css instead of the
 * portfolio's dark surface and Geist.
 */
export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="resume-root">{children}</div>;
}
