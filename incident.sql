-- 1. Create the database
CREATE DATABASE incident_management;
USE incident_management;

-- 2. Create the Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR(50) NOT NULL,
    lName VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',  -- 'admin' or 'user'
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create the Incidents table
CREATE TABLE Incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,  -- Foreign key referencing Users table
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    status ENUM('open', 'in progress', 'closed') DEFAULT 'open',  -- Status of the incident
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE  -- Link user who reported
);

-- 4. Create the Incident_Log table to track status updates
CREATE TABLE Incident_Log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incidentId INT,  -- Foreign key referencing Incidents table
    updatedBy INT,  -- Foreign key referencing Users table (admin who updated)
    newStatus ENUM('open', 'in progress', 'closed') NOT NULL,  -- New status
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (incidentId) REFERENCES Incidents(id) ON DELETE CASCADE,
    FOREIGN KEY (updatedBy) REFERENCES Users(id) ON DELETE CASCADE
);
