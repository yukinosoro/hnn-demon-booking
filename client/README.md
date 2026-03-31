# 🚌 BusReserve - Online Bus Reservation System

A modern, fully functional bus reservation web application built with **Next.js (App Router)**, **React Hooks**, and **Tailwind CSS**.

## 🎯 Features

### ✨ Core Features
- **Seat Selection System**: Interactive 10×4 grid (40 seats) with real-time selection
- **Real-time Seat Availability**: Dynamically load and manage booked seats
- **Live Booking Summary**: Auto-updating summary panel with total fare calculation
- **Route Management**: Pre-configured routes with distances and fares
- **Data Persistence**: All bookings saved to localStorage
- **Responsive Design**: Works seamlessly on mobile and desktop

### 🧠 DSA Implementations
- **2D Array**: Seat matrix representation (10 rows × 4 columns)
- **HashMap (Object)**: Route distance lookup with O(1) complexity
- **Set**: Booked seats tracking for efficient duplicate prevention
- **Queue (FIFO)**: Booking request queue management
- **Greedy Algorithm**: Nearest available seat finding
- **Searching**: Seat availability checking
- **Sorting**: Selected seats displayed in numerical order

### 🎨 UI/UX Features
- Modern RedBus-inspired design
- Smooth animations and transitions
- Interactive seat grid with hover effects
- Color-coded seat indicators
- Real-time fare calculation
- Statistics dashboard

## 📁 Project Structure

```
client/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.jsx           # Main application page with all logic
│   └── globals.css        # Global styles and animations
├── components/
│   ├── Header.jsx         # Header with title/logo
│   ├── BookingForm.jsx    # Journey details form
│   ├── SeatGrid.jsx       # Interactive 2D seat grid
│   └── SummaryPanel.jsx   # Booking summary panel
├── utils/
│   ├── constants.js       # All constant values
│   ├── seatUtils.js       # Seat matrix operations (DSA)
│   ├── fareUtils.js       # Fare calculation functions
│   ├── bookingQueue.js    # Queue implementation (FIFO)
│   └── storage.js         # localStorage operations
├── public/                # Static assets (if needed)
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Navigate to client folder:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Build for Production
```bash
npm run build
npm start
```

## 📝 How to Use

1. **Enter Journey Details**
   - Passenger name
   - Select route (Chennai-Bangalore, Chennai-Hyderabad, etc.)
   - Choose date and time
   - Select bus type

2. **Search Buses**
   - Click "Search Buses" button
   - Seat grid will appear with available/booked seats

3. **Select Seats**
   - Click on available seats (green) to select them
   - Selected seats turn blue and show a scale effect
   - Already booked seats (red) cannot be selected

4. **Review Summary**
   - Check selected seats in summary panel
   - View calculated total fare
   - Verify journey details

5. **Confirm Booking**
   - Click "Confirm Booking" to complete
   - Success message with booking ID appears
   - Seats are marked as booked

6. **Reset or Start Over**
   - Use "Reset Selection" button to clear current selection
   - Use "Clear All Bookings" to reset all booked seats

## 🎨 Color Theme

| Element | Color |
|---------|-------|
| Primary | Blue-600 |
| Accent | Indigo-500 |
| Available Seats | Green-300 |
| Selected Seats | Blue-500 |
| Booked Seats | Red-400 |
| Background | Gray-100 |

## 📊 Route Data

```javascript
{
  "Chennai-Bangalore": 350 km,
  "Chennai-Hyderabad": 630 km,
  "Mumbai-Delhi": 1400 km,
  "Bangalore-Hyderabad": 582 km
}
```

## ⚙️ Key Calculations

### Travel Time
```
Travel Time = Distance / Average Speed (60 km/h)
```

### Fare Per Seat
```
Fare Per Seat = Distance × Price Per KM (₹1.5)
```

### Total Fare
```
Total Fare = Fare Per Seat × Number of Selected Seats
```

## 💾 Data Persistence

All data is stored in browser's localStorage:
- **`busReservation_bookedSeats`**: Array of booked seat IDs
- **`busReservation_bookings`**: History of all bookings

## 🧠 DSA Explanation (for Viva)

### 2D Array (Seat Matrix)
```
Matrix[10][4] = {
  { seat_1, seat_2, seat_3, seat_4 },
  { seat_5, seat_6, seat_7, seat_8 },
  ...
}
```
- **Time Complexity**: O(1) for seat access
- **Space Complexity**: O(40) = O(1) constant space

### HashMap (Route Distances)
```
{
  "Chennai-Bangalore": 350,
  "Chennai-Hyderabad": 630
}
```
- **Time Complexity**: O(1) average for lookup
- **Use Case**: Fast route distance retrieval

### Set (Booked Seats)
```
bookedSeats = {1, 5, 12, 23, ...}
```
- **Time Complexity**: O(1) for lookup
- **Benefit**: Prevent duplicate bookings

### Queue (Booking Queue)
```
Queue: [Booking1, Booking2, Booking3]
```
- **Operations**: Enqueue O(1), Dequeue O(1)
- **Use Case**: FIFO booking processing

### Greedy Algorithm (Nearest Seat)
- Always selects the first available seat
- O(n) scan through matrix
- Useful for auto-assign features

## 🎯 Components Overview

### Header Component
Displays the application title and branding with gradient background.

### BookingForm Component
- Form validation
- Route and bus type selection
- Date and time input
- Search button with disabled state

### SeatGrid Component
- 2D grid rendering of seats
- Seat status tracking (available, selected, booked)
- Interactive click handlers
- Seat legend with statistics
- Smooth hover animations

### SummaryPanel Component
- Live journey details display
- Selected seats with animations
- Real-time fare calculation
- Action buttons for confirmation and reset
- Sticky positioning on desktop

## 🔒 Features Not Used (as per requirements)

### ✅ Implemented
- 2D Array, HashMap, Set, Queue, Greedy, Sorting, Searching

### ❌ Not Used (as specified)
- Graphs
- Dijkstra Algorithm

## 🚀 Performance Optimizations

1. **localStorage Caching**: Booked seats loaded once on mount
2. **State Management**: Efficient React state updates
3. **CSS Animations**: Hardware-accelerated transitions
4. **Responsive Grid**: Mobile-first design approach

## 📚 Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: UI library with hooks
- **Tailwind CSS 3**: Utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript features
- **localStorage API**: Client-side data persistence

## 💡 Future Enhancements

- Payment integration
- Email confirmation
- Multiple bus companies
- Return ticketing
- User authentication
- Admin dashboard
- Real API integration
- Database backend

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a comprehensive full-stack bus reservation system with proper DSA implementations and modern UI/UX design.

---

**Happy Booking! 🎉**
