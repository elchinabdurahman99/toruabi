export const metadata = {
  title: "Ajsan Studio",
  description: "Content management for ajsan.ee",
};

/** Root layout for Sanity Studio. */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh" }}>{children}</body>
    </html>
  );
}
