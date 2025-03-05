SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET search_path TO public;

-- Create VehicleTypes Table
CREATE TABLE VehicleTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    wheels INT NOT NULL
);

-- Create Vehicles Table
CREATE TABLE Vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    typeId INT,
    FOREIGN KEY (typeId) REFERENCES VehicleTypes(id)
);

-- Create Bookings Table
CREATE TABLE Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    vehicleId INT,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    FOREIGN KEY (vehicleId) REFERENCES Vehicles(id)
);