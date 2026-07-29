import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The two button treatments in the design. 2px radius, no shadow, no lift —
 * hover is a colour change only, per the handoff's interaction notes.
 *
 * `size` maps to the three paddings that actually appear: header (15/26),
 * hero (18/30) and CTA band (20/34).
 */
type Variant = "gold" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

/* No focus utilities here: globals.css owns the focus ring for the whole
   site. Tailwind's `outline-2` also resets outline-color to currentColor,
   which was overriding the gold ring with the button's own text colour. */
const base =
  "inline-flex items-center justify-center rounded-btn font-heading font-extrabold " +
  "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-hover",
  ghost: "border border-stroke text-paper hover:border-gold hover:text-gold",
  // Black-on-gold, used inside the gold CTA band.
  ink: "bg-ink text-paper hover:bg-black",
};

const sizes: Record<Size, string> = {
  sm: "px-[26px] py-[15px] text-[14px] tracking-[0.04em]",
  md: "px-[30px] py-[18px] text-[15px]",
  lg: "px-[34px] py-[20px] text-[16px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type Props = CommonProps &
  (
    | { asSubmit: true; href?: never; disabled?: boolean; onClick?: never }
    | {
        asSubmit?: false;
        href: string;
        disabled?: never;
        onClick?: () => void;
      }
  );

export function Button(props: Props) {
  const { variant = "gold", size = "md", className = "", children } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.asSubmit) {
    return (
      <button type="submit" disabled={props.disabled} className={cls}>
        {children}
      </button>
    );
  }

  // tel: and mailto: are not routes — Link would try to prefetch them.
  if (props.href.startsWith("tel:") || props.href.startsWith("mailto:")) {
    return (
      <a href={props.href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={props.href} className={cls} onClick={props.onClick}>
      {children}
    </Link>
  );
}
