import { useState } from "react";
import API from "../services/api";

function PredictionForm() {
    const [student, setStudent] = useState({
        name: "",
        age: "",
        cgpa: "",
        tenth: "",
        twelfth: "",
        skills: "",
        internships: "",
        communication: "",
    });
    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        alert("Frontend is ready! Backend connection will be added next.");
        console.log(student);

        // Later we'll use:
        // const response = await API.post("/predict", student);
    };

    return (
        <div
            style={{
                maxWidth: "500px",
                margin: "40px auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
            }}
        >
            <h2>Student Placement Form</h2>

            <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={student.name}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="age"
                placeholder="Age"
                value={student.age}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="cgpa"
                placeholder="CGPA"
                value={student.cgpa}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="tenth"
                placeholder="10th Percentage"
                value={student.tenth}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="twelfth"
                placeholder="12th Percentage"
                value={student.twelfth}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
                type="text"
                name="skills"
                placeholder="Skills"
                value={student.skills}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="internships"
                placeholder="Number of Internships"
                value={student.internships}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
                type="number"
                name="communication"
                placeholder="Communication Skill (1-10)"
                value={student.communication}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            />

            <button
                onClick={handleSubmit}
                style={{
                    width: "100%",
                    padding: "12px",
                    cursor: "pointer",
                }}
            >
                Predict Placement
            </button>
        </div>
    );
}

export default PredictionForm;