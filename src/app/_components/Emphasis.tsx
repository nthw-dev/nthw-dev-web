import { Fragment } from "react";

/**
 * Renders résumé copy that marks its key phrases with `**…**`, so the figures
 * and product names can be scanned the way they are on the PDF. Text outside
 * the markers is passed through untouched, and an unpaired `**` stays literal.
 */
export default function Emphasis({ text }: { text: string }) {
  // The capturing group puts every emphasised span on an odd index.
  const parts = text.split(/\*\*(.+?)\*\*/g);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-slate-200">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
