CREATE TABLE communication_tests (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT REFERENCES students(id),
    topic TEXT,
    transcript TEXT,
    grammar_score DECIMAL(4,2),
    fluency_score DECIMAL(4,2),
    pronunciation_score DECIMAL(4,2),
    confidence_score DECIMAL(4,2),
    communication_score DECIMAL(4,2),
    ai_feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);