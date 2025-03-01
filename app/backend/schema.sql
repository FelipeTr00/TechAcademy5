DROP DATABASE app;
CREATE DATABASE IF NOT EXISTS app;
USE app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    cpf VARCHAR(14) NOT NULL UNIQUE,
    role ENUM('admin', 'user', 'dba') NOT NULL DEFAULT 'user'
);


CREATE TABLE passwd (
    userid INT PRIMARY KEY,
    hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE fipe (
    id VARCHAR(50) PRIMARY KEY,
    reference TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price DOUBLE NOT NULL CHECK (price >= 0)
);


CREATE TABLE vehicles (
    id VARCHAR(50) PRIMARY KEY,
    fipe VARCHAR(50),
    type VARCHAR(50) NOT NULL,
    model VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    year INT NOT NULL CHECK (year >= 1900 AND year <= YEAR(CURDATE())),
    FOREIGN KEY (fipe) REFERENCES fipe(id) ON DELETE SET NULL
);


CREATE TABLE users_vehicles (
    userid INT NOT NULL,
    vehicleid VARCHAR(50) NOT NULL,
    owner BOOLEAN NOT NULL DEFAULT FALSE CHECK (owner IN (0, 1)),
    PRIMARY KEY (userid, vehicleid),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicleid) REFERENCES vehicles(id) ON DELETE CASCADE
);
