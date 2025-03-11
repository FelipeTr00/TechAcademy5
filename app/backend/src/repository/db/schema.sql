CREATE DATABASE IF NOT EXISTS db;
USE db;

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(100)                    NOT NULL,
    email      VARCHAR(255)                    NOT NULL UNIQUE,
    password   VARBINARY(255)                  NOT NULL,
    user_level ENUM ('admin', 'user', 'guest') NOT NULL DEFAULT 'user',
    CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);


