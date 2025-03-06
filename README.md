# Vehicle Booking

## Project Overview
The goal of this project is to design and provide users with a form that collects user information and data about the vehicle to rent, along with the dates for the rental period.

## Features
- **User Information Collection**: Collects user's first name and last name.
- **Vehicle Selection**: Allows users to select the number of wheels, vehicle type, and specific vehicle model.
- **Date Selection**: Enables users to select the start and end dates for the rental period.
- **Booking Submission**: Submits the booking details to the backend for processing.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **API Testing**: Postman

---

## API Endpoints

### 1. Get Vehicle Types by Number of Wheels
- **Endpoint**: `GET /api/vehicle-types?wheels=<number_of_wheels>`
- **Description**: Fetches vehicle types based on the number of wheels.

### 2. Get Vehicles by Type ID
- **Endpoint**: `GET /api/vehicles?typeId=<type_id>`
- **Description**: Fetches vehicles based on the vehicle type ID.

### 3. Submit Booking
- **Endpoint**: `POST /api/bookings`
- **Description**: Submits a booking with user details, vehicle ID, and rental dates.

### 4. Get All Vehicle Types
- **Endpoint**: `GET /api/vehicle-types/all`
- **Description**: Fetches all available vehicle types.

---

## Setup Instructions

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your machine.
- **PostgreSQL**: Install and set up PostgreSQL.
- **Postman**: For testing the APIs.
