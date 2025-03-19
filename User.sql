CREATE DATABASE User;

Use User;

CREATE TABLE credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(50) NOT NULL, 
     email VARCHAR(100) NOT NULL UNIQUE, 
     password VARCHAR(255) NOT NULL
)

CREATE TABLE activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    Journal_entry VARCHAR(255) NOT NULL,
    Mood VARCHAR(50) NOT NULL,
    Water VARCHAR(50) NOT NULL,
    entry_date DATE NOT NULL,
    FOREIGN KEY (email) REFERENCES credentials(email)
)

CREATE TABLE calendar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    event_description TEXT NOT NULL,
    FOREIGN KEY (email) REFERENCES credentials(email)
   
)

CREATE TABLE to_do (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    task_description TEXT NOT NULL,
    due_date DATE,
    is_completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (email) REFERENCES credentials(email)

)
