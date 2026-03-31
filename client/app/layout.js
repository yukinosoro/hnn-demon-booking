import './globals.css';

export const metadata = {
  title: 'HNN - Demon Booking - Multi-Service Reservation System',
  description: 'Book your bus, train, and movie tickets online with ease. Modern, fast, and secure multi-service reservation system.',
  keywords: 'bus booking, train booking, movie booking, reservation, online tickets',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
