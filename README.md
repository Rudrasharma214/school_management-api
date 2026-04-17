# Educase School Management API

## Project Title
Educase School Management API

## Tech Stack
- Node.js
- Express.js
- MySQL (mysql2)

## Features
- Add School API
- List Schools API sorted by nearest distance from user coordinates
- Input validation for request payload and query parameters

## API Documentation

### 1) POST /addSchool
Creates a new school record.

Request Body (JSON)
{
  "name": "DPS",
  "address": "neelbad",
  "latitude": 23.1815,
  "longitude": 77.3015
}

Validation Rules
- name: required, non-empty string
- address: required, non-empty string
- latitude: required, numeric, range -90 to 90
- longitude: required, numeric, range -180 to 180

### 2) GET /listSchools?latitude=xx&longitude=xx
Returns schools sorted by nearest distance from the given user location.

Query Parameters
- latitude: required, numeric, range -90 to 90
- longitude: required, numeric, range -180 to 180

Sorting Explanation
- Distance is calculated in SQL for each school against input latitude and longitude.
- Result is sorted ascending by distance so nearest schools appear first.

## Distance Calculation
- Method used: Haversine-equivalent great-circle distance formula in SQL.
- Earth radius constant used: 6371 km.
- Implemented in model query for efficient server-side sorting.

## Setup Instructions

1) Clone Repository
- git clone <your-repo-url>
- cd school_management-api

2) Install Dependencies
- npm install

3) Setup Environment Variables
Create a .env file in project root:
- PORT=5000
- NODE_ENV=development
- DB_HOST=localhost
- DB_PORT=3306
- DB_USER=your_db_user
- DB_PASSWORD=your_db_password
- DB_NAME=your_db_name

4) Setup MySQL Database and Table
Create database and required table:

CREATE DATABASE IF NOT EXISTS your_db_name;
USE your_db_name;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);

5) Run Server
- npm run dev

6) Health Check
- GET http://localhost:5000/health