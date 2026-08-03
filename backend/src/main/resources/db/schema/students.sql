CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT NOT NULL,
    cgpa DECIMAL(3,2) NOT NULL,
    tenth_percentage DECIMAL(5,2),
    twelfth_percentage DECIMAL(5,2),
    skills TEXT,
    internships INT DEFAULT 0,
    communication_score DECIMAL(4,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);