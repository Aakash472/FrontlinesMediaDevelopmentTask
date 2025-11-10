import './databaseconnection.js';
import express from 'express'
import dotenv from 'dotenv'
import { data } from './databaseconnection.js';
import { faker } from '@faker-js/faker';
import { randomIndustries, randomLocation } from './RandomData.js';
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors())

app.get('/findAll', async (req, res) => {
    try {
        const companiesData = await data.find()
        res.status(200).json({ message: "Data Fetched Successfully", data: companiesData })
    } catch (error) {
        res.status(404).json({ message: "Not Found", error })
    }
})

const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];

const companies = Array.from({ length: 250 }, () => ({
    name: faker.company.name(),
    industry: getRandom(randomIndustries),
    location: getRandom(randomLocation),
    employees: faker.number.int({ min: 250, max: 5000 }),
    website: faker.internet.url(),
}));
// await data.insertMany(companies);
// console.log("✅ 250 random companies inserted successfully!");

app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`);
})