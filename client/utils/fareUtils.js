import { ROUTE_DISTANCES, AVERAGE_SPEED, PRICE_PER_KM } from './constants';

/**
 * Get distance for a route (HashMap DSA - O(1) lookup)
 */
export const getDistance = (route) => {
  return ROUTE_DISTANCES[route] || 0;
};

/**
 * Calculate travel time based on distance and average speed
 * Travel Time = Distance / Average Speed
 */
export const calculateTravelTime = (distance) => {
  if (distance === 0) return 0;
  const hours = distance / AVERAGE_SPEED;
  return {
    hours: Math.floor(hours),
    minutes: Math.round((hours % 1) * 60),
  };
};

/**
 * Format time as HH:MM
 */
export const formatTime = (hours, minutes) => {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

/**
 * Calculate arrival time given departure time and travel time
 */
export const calculateArrivalTime = (departureTime, travelHours, travelMinutes) => {
  // Parse departure time (e.g., "06:00 AM")
  const [time, period] = departureTime.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  // Add travel time
  let totalMinutes = hours * 60 + minutes + travelHours * 60 + travelMinutes;
  const nextDayHours = Math.floor(totalMinutes / (24 * 60));
  totalMinutes = totalMinutes % (24 * 60);

  hours = Math.floor(totalMinutes / 60);
  minutes = totalMinutes % 60;

  // Convert back to 12-hour format
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${meridiem}${nextDayHours > 0 ? ' +1' : ''}`;
};

/**
 * Calculate fare per seat
 * Fare = Distance × Price Per KM
 */
export const calculateFarePerSeat = (distance) => {
  return Math.ceil(distance * PRICE_PER_KM);
};

/**
 * Calculate total fare
 * Total Fare = Fare Per Seat × Number of Seats
 */
export const calculateTotalFare = (distance, numberOfSeats) => {
  const farePerSeat = calculateFarePerSeat(distance);
  return farePerSeat * numberOfSeats;
};

/**
 * Get all route information
 */
export const getRouteInfo = (route) => {
  const distance = getDistance(route);
  const travelTime = calculateTravelTime(distance);
  const farePerSeat = calculateFarePerSeat(distance);

  return {
    distance,
    travelTime,
    farePerSeat,
  };
};
