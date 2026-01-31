// server/src/seeds/index.js

require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('../models/Member');
const Event = require('../models/Event');
const Product = require('../models/Product');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Member.deleteMany({});
    await Event.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Seed Members
    const members = await Member.create([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+212600000001',
        membershipType: 'Premium',
        membershipStatus: 'Active',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+212600000002',
        membershipType: 'VIP',
        membershipStatus: 'Active',
      },
    ]);
    console.log(`✅ Created ${members.length} members`);

    // Seed Events
    const events = await Event.create([
      {
        title: 'FC Lions vs. Tigers',
        description: 'Premier League Match',
        category: 'Match',
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
        venue: 'Main Stadium',
        address: {
          city: 'Casablanca',
          country: 'Morocco',
        },
        ticketPrice: 450,
        maxCapacity: 5000,
        status: 'Published',
        organizer: members[0]._id,
      },
      {
        title: 'U-18 Tournament Finals',
        description: 'Youth Championship',
        category: 'Tournament',
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 days
        venue: 'Training Ground A',
        address: {
          city: 'Rabat',
          country: 'Morocco',
        },
        ticketPrice: 0,
        maxCapacity: 1000,
        status: 'Published',
        organizer: members[1]._id,
      },
    ]);
    console.log(`✅ Created ${events.length} events`);

    // Seed Products
    const products = await Product.create([
      {
        name: '23/24 Home Jersey',
        description: 'Official home jersey for the season',
        category: 'Jersey',
        price: 850,
        stock: 50,
        isFeatured: true,
      },
      {
        name: 'Pro Training Top',
        description: 'Professional training gear',
        category: 'Training',
        price: 550,
        stock: 30,
      },
      {
        name: 'Club Scarf',
        description: 'Official supporter scarf',
        category: 'Accessories',
        price: 200,
        stock: 100,
      },
    ]);
    console.log(`✅ Created ${products.length} products`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedDatabase();