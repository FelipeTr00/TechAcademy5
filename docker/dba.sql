CREATE USER 'dba'@'localhost' IDENTIFIED BY '999';
GRANT ALL PRIVILEGES ON *.* TO 'dba'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;


CREATE USER 'dba'@'%' IDENTIFIED BY '999';
GRANT ALL PRIVILEGES ON *.* TO 'dba'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;


-- GIST TESTS
INSERT INTO users (id, username, email, cpf, role) VALUES
(1, 'admin_user', 'admin@email.com', '12345678901', 'admin'),
(2, 'regular_user', 'user@email.com', '98765432100', 'user'),
(3, 'dba_user', 'dba@email.com', '56789012345', 'dba');

INSERT INTO passwd (userid, hash) VALUES
(1, '$2y$10$abcdefghijklmnopqrstuv'), 
(2, '$2y$10$1234567890abcdefghijklm'), 
(3, '$2y$10$mnopqrstuv1234567890abc'); 

INSERT INTO users_vehicles (userid, vehicleid, owner) VALUES
(1, 'ABC1234', TRUE), 
(2, 'XYZ5678', FALSE),
(3, 'JKL9012', TRUE); 
