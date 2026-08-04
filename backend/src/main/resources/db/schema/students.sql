CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,

    age INTEGER NOT NULL CHECK (age BETWEEN 16 AND 35),

    gender VARCHAR(20) NOT NULL,

    cgpa NUMERIC(3,2) NOT NULL CHECK (cgpa BETWEEN 0 AND 10),

    branch VARCHAR(50) NOT NULL,

    college_tier INTEGER NOT NULL CHECK (college_tier BETWEEN 1 AND 3),

    internships_count INTEGER DEFAULT 0 CHECK (internships_count >= 0),

    projects_count INTEGER DEFAULT 0 CHECK (projects_count >= 0),

    certifications_count INTEGER DEFAULT 0 CHECK (certifications_count >= 0),

    coding_skill_score INTEGER CHECK (coding_skill_score BETWEEN 0 AND 100),

    communication_skill_score INTEGER CHECK (communication_skill_score BETWEEN 0 AND 100),

    aptitude_score INTEGER CHECK (aptitude_score BETWEEN 0 AND 100),

    logical_reasoning_score INTEGER CHECK (logical_reasoning_score BETWEEN 0 AND 100),

    mock_interview_score INTEGER CHECK (mock_interview_score BETWEEN 0 AND 100),

    backlogs INTEGER DEFAULT 0 CHECK (backlogs >= 0),

    placement_status BOOLEAN DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);