import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The three button treatments.
 *
 * Reworked from the original 2px / colour-change-only spec: 10px radius, a
 * gold gradient fill, a soft glow and a 2px lift on hover. The lift and glow
 * are what read as current — a flat rectangle that only changes hue was the
 * most dated element on the old page.
 *
 * `size` maps to the three that actually appear: header (sm), hero (md),
 * CTA band (lg).
 */
type Variant = "gold" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

/* No focus utilities here: globals.css owns the focus ring for the whole
   site. Tailwind's `outline-2` also resets outline-color to currentColor,
   which would override the gold ring with the button's own text colour. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-heading font-extrabold " +
  "transition duration-300 ease-out-expo will-change-transform " +
  "hover:-translate-y-[2px] active:translate-y-0 active:duration-75 " +
  "motion-reduce:transform-none motion-reduce:hover:transform-none " +
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:transform-none";

const variants: Record<Variant, string> = {
  // Gradient rather than flat gold: the highlight along the top edge is
  // what gives it a lit, physical read at 10px radius.
  gold:
    "bg-gradient-to-b from-gold-bright to-gold text-ink " +
    "hover:from-gold hover:to-gold-hover hover:shadow-glow-sm",
  ghost:
    "border border-stroke text-paper backdrop-blur-sm " +
    "hover:border-gold hover:bg-surface-2 hover:text-gold",
  // Black-on-gold, used inside the gold CTA band.
  ink: "bg-ink text-paper hover:bg-surface-3 hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  sm: "px-[22px] py-[13px] text-[14px] tracking-[0.02em]",
  md: "px-[28px] py-[16px] text-[15px]",
  lg: "px-[32px] py-[19px] text-[16px]",
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
