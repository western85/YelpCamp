const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DATABASE CONNECTED!')
    })
    .catch(err => {
        console.log('WHOOPS! MONGO CONNECTION ERROR!')
        Console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '62b0ece0f25175eeed842040',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, explicabo dolor ipsum accusamus cupiditate non facilis quisquam eligendi adipisci laboriosam iste tempora illum quod a neque cum praesentium odit unde.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dsevyxfcl/image/upload/v1656014522/YelpCamp/c4whzn97osludg3vnucy.jpg',
                    filename: 'YelpCamp/c4whzn97osludg3vnucy',
                },
                {
                    url: 'https://res.cloudinary.com/dsevyxfcl/image/upload/v1656014529/YelpCamp/ns9iyymgzbnfrp2ljfw7.jpg',
                    filename: 'YelpCamp/ns9iyymgzbnfrp2ljfw7',
                },
                {
                    url: 'https://res.cloudinary.com/dsevyxfcl/image/upload/v1656014538/YelpCamp/zn7bvhpsgwo73jiqptrb.jpg',
                    filename: 'YelpCamp/zn7bvhpsgwo73jiqptrb',
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})