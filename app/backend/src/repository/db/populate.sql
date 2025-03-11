/* user */
INSERT INTO user (name, email, password, user_level)
VALUES ('Chevrolet Monza', 'monza@example.com', AES_ENCRYPT('monzapass', 'MEMENTO MORI'), 'admin'),
       ('Opel Kadett', 'kadett@example.com', AES_ENCRYPT('kadett1985', 'MEMENTO MORI'), 'user'),
       ('Chevrolet Opala', 'opala@example.com', AES_ENCRYPT('opala1970', 'MEMENTO MORI'), 'user'),
       ('Ford Maverick', 'maverick@example.com', AES_ENCRYPT('maverick302', 'MEMENTO MORI'), 'admin'),
       ('Volkswagen Fusca', 'fusca@example.com', AES_ENCRYPT('fusca1300', 'MEMENTO MORI'), 'guest'),
       ('Fiat 147', 'fiat147@example.com', AES_ENCRYPT('fiatpower', 'MEMENTO MORI'), 'user'),
       ('Dodge Charger', 'charger@example.com', AES_ENCRYPT('chargerRT', 'MEMENTO MORI'), 'admin'),
       ('Plymouth Barracuda', 'barracuda@example.com', AES_ENCRYPT('cuda1971', 'MEMENTO MORI'), 'user'),
       ('Ford Mustang', 'mustang@example.com', AES_ENCRYPT('mustangGT', 'MEMENTO MORI'), 'user'),
       ('Chevrolet Chevelle', 'chevelle@example.com', AES_ENCRYPT('chevelleSS', 'MEMENTO MORI'), 'guest');


SELECT * FROM user
         WHERE
             email = 'monza@example.com'
             AND password = AES_ENCRYPT('monzapass', 'MEMENTO MORI');