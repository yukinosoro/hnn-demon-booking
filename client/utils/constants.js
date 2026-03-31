// Constants with all predefined data
export const ROUTE_DISTANCES = {
  'Chennai-Bangalore': 350,
  'Chennai-Hyderabad': 630,
  'Mumbai-Delhi': 1400,
  'Bangalore-Hyderabad': 582,
};

export const AVERAGE_SPEED = 60; // km/h

export const PRICE_PER_KM = 1.5; // fare per km

export const BUS_TYPES = ['AC Sleeper', 'AC Seater', 'Non-AC Sleeper'];

// Seat Configuration: 40 seats in 10 rows x 4 columns
export const SEAT_ROWS = 10;
export const SEAT_COLUMNS = 4;
export const TOTAL_SEATS = SEAT_ROWS * SEAT_COLUMNS; // 40 seats

export const DEPARTURE_TIMES = [
  '06:00 AM',
  '09:00 AM',
  '12:00 PM',
  '03:00 PM',
  '06:00 PM',
  '09:00 PM',
];

export const AVAILABLE_ROUTES = [
  'Chennai-Bangalore',
  'Chennai-Hyderabad',
  'Mumbai-Delhi',
  'Bangalore-Hyderabad',
];
