CREATE TABLE mock_interviews (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT REFERENCES students(id),
    interview_type VARCHAR(50),
    question TEXT,
    answer TEXT,
    technical_score DECIMAL(4,2),
    communication_score DECIMAL(4,2),
    confidence_score DECIMAL(4,2),
    total_score DECIMAL(4,2),
    ai_feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);