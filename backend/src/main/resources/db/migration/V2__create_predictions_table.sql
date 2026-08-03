CREATE TABLE predictions (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT REFERENCES students(id),
    prediction VARCHAR(20),
    confidence DECIMAL(5,2),
    ml_model VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);