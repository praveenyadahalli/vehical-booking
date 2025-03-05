-- Seed VehicleTypes Table
INSERT INTO vehicle_types (name, wheels) VALUES
('Car', 4),
('Bike', 2);

-- Seed Vehicles Table
INSERT INTO vehicles (name, type_id) VALUES
('Hatchback', 1), -- Car type
('SUV', 1),       -- Car type
('Sedan', 1),     -- Car type
('Cruiser', 2),   -- Bike type
('Sports', 2);    -- Bike type