export const metadata = {
  title: "Discord Clone",
  viewport: "width=device-width, initial-scale=1"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
