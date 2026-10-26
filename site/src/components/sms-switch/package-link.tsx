"use client";

import { Button } from "../button";
import { PACKAGE_EVENT, type PackageId } from "./data";
import { JumpScope } from "./jump";

/**
 * A jump to the configurator that also preselects a package there.
 * The link itself still works on its own (it is a plain #configurator anchor).
 */
export function PackageLink({
  pkg,
  children,
  variant = "secondary",
  className = "",
}: {
  pkg: PackageId;
  children: string;
  variant?: "primary" | "secondary" | "solid" | "ink";
  className?: string;
}) {
  return (
    <JumpScope
      hash="#configurator"
      onJump={() => window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: pkg }))}
    >
      <Button href="#configurator" variant={variant} className={className}>
        {children}
      </Button>
    </JumpScope>
  );
}

/** A plain in-page jump rendered as the shared Button. */
export function JumpButton({
  hash,
  children,
  variant = "primary",
}: {
  hash: string;
  children: string;
  variant?: "primary" | "secondary" | "solid";
}) {
  return (
    <JumpScope hash={hash}>
      <Button href={hash} variant={variant}>
        {children}
      </Button>
    </JumpScope>
  );
}
