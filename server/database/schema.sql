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
CREATE TABLE vehicle_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    wheels INT NOT NULL
);

-- Create Vehicles Table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type_id INT,
    FOREIGN KEY (type_id) REFERENCES vehicle_types(id)
);

-- Create Bookings Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    vehicle_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);