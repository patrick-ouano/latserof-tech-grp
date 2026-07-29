/**
 * "What's included" list.
 *
 * The tick is a decorative marker, not content, so it is aria-hidden and the
 * list keeps its native semantics — a screen reader announces "list, 5
 * items" rather than reading a checkmark before every line.
 */
export function CheckList({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`grid gap-x-8 gap-y-3 sm:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 font-body text-copy text-body-dim"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="mt-[7px] shrink-0 text-gold"
          >
            <path
              d="M2 8.5l4 4 8-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}
