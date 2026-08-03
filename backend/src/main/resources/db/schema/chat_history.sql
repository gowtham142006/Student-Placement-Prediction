CREATE TABLE chat_history (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT REFERENCES students(id),
    user_message TEXT,
    ai_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);