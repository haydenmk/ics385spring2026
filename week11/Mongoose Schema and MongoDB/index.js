require('dotenv').config();
const mongoose = require('mongoose');
const Customer = require('./customerModel');
const Hotel = require('./hotelModel');
const Amenities = require('./amenitiesModel');

// Replace 'myDatabase' with the desired database name
const connectionString = 'mongodb+srv://haydenmk_db_user'; // Not the full connection link, verified that it connected though.

mongoose.connect(connectionString, { useNewUrlParser: true})
  .then(async () => {
    console.log('Connected to MongoDB.');

    // Insert three records into the Customer model
    const customersToInsert = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '555-123-4567'
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phone: '555-987-6543'
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        phone: '555-555-1234'
      }
    ];

    const hotelsToInsert = [
      {
        name: 'Wailea Beach Resort',
        rating: 4.6,
        location: 'Wailea',
        description: '$670/night for king size bed, balcony, sofa bed.'
      },
      {
        name: 'Maui Beach Hotel',
        rating: 3.6,
        location: 'Kahului',
        description: '$285/night for king size bed, garden view, sofa bed.'
      },
      {
        name: 'The Ritz-Carlton Maui, Kapalua',
        rating: 4.3,
        location: 'Kapalua',
        description: '$866/night for king size bed, resort view, lanai.'
      }
    ];

    const amenitiesToInsert = [
      {
        pool: true,
        lawn: false,
        BBQ: false,
        laundry: true
      },
      {
        pool: true,
        lawn: false,
        BBQ: false,
        laundry: false
      },
      {
        pool: true,
        lawn: true,
        BBQ: true,
        laundry: true
      }
    ];

    // Delete all documents in the Customers collection
    try {
      const result = await Customer.deleteMany({});

      console.log(`Deleted ${result.deletedCount} customers.`);
    } catch (error) {
      console.error('Error deleting customers:', error);
    }

    try {
      const hotelResult = await Hotel.deleteMany({});

      console.log(`Deleted ${hotelResult.deletedCount} hotels.`);
    } catch (error) {
      console.error('Error deleting hotels:', error);
    }

    try {
      const amenitiesResult = await Amenities.deleteMany({});

      console.log(`Deleted ${amenitiesResult.deletedCount} amenities.`);
    } catch (error) {
      console.error('Error deleting amenities:', error);
    }
    
    // Insert Array of CustomersToInsert into Customers Collection
    try {
      const insertedCustomers = await Customer.insertMany(customersToInsert);
      console.log('Inserted customers:', insertedCustomers);
    } catch (error) {
      console.error('Error inserting customers:', error);
    }

    try {
      const insertedHotels = await Hotel.insertMany(hotelsToInsert);
      console.log('Inserted hotels:', insertedHotels);
    } catch (error) {
      console.error('Error inserting hotels:', error);
    }

    try {
      const insertedAmenities = await Amenities.insertMany(amenitiesToInsert);
      console.log('Inserted amenities:', insertedAmenities);
    } catch (error) {
      console.error('Error inserting amenities:', error);
    }

    // Find all the documents with the last name 'Doe'
    try {
      const lastNameToFind = 'Doe';
      const customer = await Customer.find({ lastName: lastNameToFind });

      if (customer) {
        console.log(`Found customer with last name '${lastNameToFind}':`, customer);
      } else {
        console.log(`No customer found with last name '${lastNameToFind}'`);
      }
    } catch (error) {
      console.error('Error finding customer:', error);
    }

    try {
      const hotelNameToFind = 'Maui Beach Hotel';
      const hotel = await Hotel.find({ name: hotelNameToFind });

      if (hotel) {
        console.log(`Found hotel with name '${hotelNameToFind}':`, hotel);
      } else {
        console.log(`No hotel found with name '${hotelNameToFind}'`);
      }
    } catch (error) {
      console.error('Error finding hotel:', error);
    }

    try {
      const amenities = await Amenities.find({ pool: true });

      if (amenities) {
        console.log('Found amenities with pool = true:', amenities);
      } else {
        console.log('No amenities found with pool = true');
      }
    } catch (error) {
      console.error('Error finding amenities:', error);
    }
    
    // Close the MongoDB connection after finishing the operations
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//Customer.find({});
