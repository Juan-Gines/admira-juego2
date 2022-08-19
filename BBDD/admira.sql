CREATE DATABASE admira DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE admira;

CREATE TABLE puntuaciones(
    id INT PRIMARY KEY AUTO_INCREMENT,    
    puntuacion INT NOT NULL    
);

INSERT INTO puntuaciones (puntuacion) VALUES
    (15000),
    (20000),
    (40000);