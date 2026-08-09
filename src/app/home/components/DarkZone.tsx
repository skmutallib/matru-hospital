/**
 * Wraps the specialities / founder-message / FAQ sections in the site's
 * permanent dark background. (Previously this animated light → dark → light
 * on scroll; the whole site is now a single dark theme, so it stays dark.)
 */
export default function DarkZone({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#0a0b0d]">{children}</div>;
}
