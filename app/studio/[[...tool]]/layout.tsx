export const metadata = {
  title: "TorudeAbi24 Studio",
  description: "Content management for torudeabi24.ee",
};

/** Root layout for Sanity Studio. */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh" }}>{children}</body>
    </html>
  );
}
