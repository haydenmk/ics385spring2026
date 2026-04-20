const dashboardData = {
  "O'ahu": {
    city: "Honolulu",
    tagline: "North Shore Family Vacation Rentals Dashboard",
    arrivals: [
      { month: "Jan", arrivals: 182000 },
      { month: "Feb", arrivals: 195000 },
      { month: "Mar", arrivals: 230000 },
      { month: "Apr", arrivals: 210000 },
      { month: "May", arrivals: 225000 },
      { month: "Jun", arrivals: 240000 },
      { month: "Jul", arrivals: 255000 },
      { month: "Aug", arrivals: 260000 },
      { month: "Sep", arrivals: 215000 },
      { month: "Oct", arrivals: 220000 },
      { month: "Nov", arrivals: 190000 },
      { month: "Dec", arrivals: 200000 }
    ],
    origin: {
      labels: ["U.S. Domestic", "Japan", "Canada", "Other"],
      values: [72, 12, 8, 8]
    },
    metrics: {
      adr: 295,
      occupancy: 78,
      avgStay: 5.4
    }
  },

  Maui: {
    city: "Kahului",
    tagline: "Comparison Island Dashboard",
    arrivals: [
      { month: "Jan", arrivals: 120000 },
      { month: "Feb", arrivals: 128000 },
      { month: "Mar", arrivals: 145000 },
      { month: "Apr", arrivals: 138000 },
      { month: "May", arrivals: 142000 },
      { month: "Jun", arrivals: 150000 },
      { month: "Jul", arrivals: 158000 },
      { month: "Aug", arrivals: 160000 },
      { month: "Sep", arrivals: 140000 },
      { month: "Oct", arrivals: 143000 },
      { month: "Nov", arrivals: 130000 },
      { month: "Dec", arrivals: 135000 }
    ],
    origin: {
      labels: ["U.S. Domestic", "Japan", "Canada", "Other"],
      values: [68, 14, 10, 8]
    },
    metrics: {
      adr: 325,
      occupancy: 74,
      avgStay: 6.2
    }
  }
};

export default dashboardData;