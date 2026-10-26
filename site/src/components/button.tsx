import { TransitionLink } from "./motion/transition-link";

type Variant = "primary" | "ink" | "solid" | "secondary" | "text" | "text-field";
type Size = "md" | "sm";

const styles: Record<Variant, string> = {
  // Tactile keys: a darker edge underneath that the face presses down onto.
  primary: "tactile tactile-field bg-field text-on-field rounded-full",
  // Always black: for use on the orange field.
  ink: "tactile tactile-ink bg-on-field text-[#f4f5f7] rounded-full",
  // Follows the theme: black on light pages, white on dark ones.
  solid: "tactile tactile-solid bg-ink text-paper rounded-full",
  secondary: "border border-rule-strong text-ink hover:border-ink rounded-full",
  text: "text-ink underline decoration-rule-strong hover:decoration-redline",
  "text-field": "text-on-field underline decoration-on-field/40 hover:decoration-on-field",
};

const sizes: Record<Size, string> = {
  md: "h-12 text-[0.975rem]",
  sm: "h-10 text-[0.9rem]",
};

const pad: Record<Size, string> = { md: "px-6", sm: "px-4" };

type Common = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AsLink = Common & { href: string; sheetLabel?: string };
type AsButton = Common & { href?: undefined } & Omit<
    React.ComponentPropsWithRef<"button">,
    "children" | "className"
  >;

/** The one button for the whole site: a link when given `href`, otherwise a real `<button>`. */
export function Button(props: AsLink | AsButton) {
  const { children, variant = "primary", size = "md", className = "" } = props;
  const isText = variant === "text" || variant === "text-field";
  const cls = `inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,border-color,color,text-decoration-color] duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${sizes[size]} ${isText ? "" : pad[size]} ${styles[variant]} ${className}`;

  if (props.href !== undefined) {
    return (
      <TransitionLink href={props.href} sheetLabel={props.sheetLabel} className={cls}>
        {children}
      </TransitionLink>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, type = "button", ...rest } = props;
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
