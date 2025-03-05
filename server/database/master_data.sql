-- Seed VehicleTypes Table
INSERT INTO VehicleTypes (name, wheels) VALUES
('Car', 4),
('Bike', 2);

-- Seed Vehicles Table
INSERT INTO Vehicles (name, typeId) VALUES
('Hatchback', 1), -- Car type
('SUV', 1),       -- Car type
('Sedan', 1),     -- Car type
('Cruiser', 2),   -- Bike type
('Sports', 2);    -- Bike type