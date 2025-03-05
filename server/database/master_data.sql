-- Seed VehicleTypes Table
INSERT INTO vehicle_types (name, wheels) VALUES
('Car', 4),
('Bike', 2);

-- Seed Vehicles Table
INSERT INTO vehicles (name, type_id) VALUES
('Hatchback', 1), 
('SUV', 1),       
('Sedan', 1),   
('Cruiser', 2),  
('Sports', 2);    

INSERT INTO vehicle_types (name, wheels) VALUES
('Auto', 3),
('Truck', 10);

INSERT INTO vehicles (name, type_id) VALUES
('Petrol Truck', 4), 
('Diesel Truck', 4),
('Electric Truck', 4),
('Petrol Auto', 3), 
('Diesel Auto', 3),
('Electric Auto', 3);