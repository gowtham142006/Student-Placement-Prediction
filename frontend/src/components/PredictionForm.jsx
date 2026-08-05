import { useState } from "react";
import { Sparkles } from "lucide-react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormSlider from "./FormSlider";

function PredictionForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    cgpa: "",
    branch: "",
    collegeTier: "",
    internships: "",
    projects: "",
    certifications: "",
    codingSkill: 50,
    communicationSkill: 50,
    aptitudeScore: 50,
    logicalReasoning: 50,
    mockInterview: 50,
    backlogs: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "range" || type === "number" ? Number(value) : value,
    }));

    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Required fields & bounds
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 16 || formData.age > 35) {
      newErrors.age = "Age must be between 16 and 35";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (formData.cgpa === "") {
      newErrors.cgpa = "CGPA is required";
    } else if (formData.cgpa < 0 || formData.cgpa > 10) {
      newErrors.cgpa = "CGPA must be between 0 and 10";
    }

    if (!formData.branch) {
      newErrors.branch = "Branch is required";
    }

    if (!formData.collegeTier) {
      newErrors.collegeTier = "College Tier is required";
    }

    // Sliders bounds
    if (formData.codingSkill < 0 || formData.codingSkill > 100) {
      newErrors.codingSkill = "Must be between 0 and 100";
    }
    
    if (formData.communicationSkill < 0 || formData.communicationSkill > 100) {
      newErrors.communicationSkill = "Must be between 0 and 100";
    }

    // Number fields cannot be negative
    if (formData.internships !== "" && formData.internships < 0) {
      newErrors.internships = "Cannot be negative";
    }

    if (formData.projects !== "" && formData.projects < 0) {
      newErrors.projects = "Cannot be negative";
    }

    if (formData.certifications !== "" && formData.certifications < 0) {
      newErrors.certifications = "Cannot be negative";
    }

    if (formData.backlogs !== "" && formData.backlogs < 0) {
      newErrors.backlogs = "Cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted:", formData);
      alert("Frontend is ready! Backend connection will be added next.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div className="p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Student Details
        </h2>
        <p className="text-slate-500 mb-10 text-lg">
          Fill in your academic and skill details to predict your placement chances.
        </p>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Personal & Academic Details */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
              Personal & Academic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              <FormInput
                id="age"
                name="age"
                label="Age"
                type="number"
                min="18"
                value={formData.age}
                onChange={handleChange}
                error={errors.age}
              />
              <FormSelect
                id="gender"
                name="gender"
                label="Gender"
                value={formData.gender}
                onChange={handleChange}
                error={errors.gender}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
              />
              <FormInput
                id="cgpa"
                name="cgpa"
                label="CGPA (out of 10)"
                type="number"
                step="0.01"
                min="0"
                value={formData.cgpa}
                onChange={handleChange}
                error={errors.cgpa}
              />
              <FormSelect
                id="branch"
                name="branch"
                label="Branch"
                value={formData.branch}
                onChange={handleChange}
                error={errors.branch}
                options={[
                  { value: "cse", label: "CSE" },
                  { value: "it", label: "IT" },
                  { value: "ece", label: "ECE" },
                  { value: "eee", label: "EEE" },
                  { value: "mechanical", label: "Mechanical" },
                  { value: "civil", label: "Civil" },
                  { value: "other", label: "Other" },
                ]}
              />
              <FormSelect
                id="collegeTier"
                name="collegeTier"
                label="College Tier"
                value={formData.collegeTier}
                onChange={handleChange}
                error={errors.collegeTier}
                options={[
                  { value: "tier1", label: "Tier 1" },
                  { value: "tier2", label: "Tier 2" },
                  { value: "tier3", label: "Tier 3" },
                ]}
              />
              <FormInput
                id="backlogs"
                name="backlogs"
                label="Active Backlogs"
                type="number"
                min="0"
                value={formData.backlogs}
                onChange={handleChange}
                error={errors.backlogs}
              />
            </div>
          </div>

          {/* Experience & Projects */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
              Experience & Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
              <FormInput
                id="internships"
                name="internships"
                label="Internships Count"
                type="number"
                min="0"
                value={formData.internships}
                onChange={handleChange}
                error={errors.internships}
              />
              <FormInput
                id="projects"
                name="projects"
                label="Projects Count"
                type="number"
                min="0"
                value={formData.projects}
                onChange={handleChange}
                error={errors.projects}
              />
              <FormInput
                id="certifications"
                name="certifications"
                label="Certifications Count"
                type="number"
                min="0"
                value={formData.certifications}
                onChange={handleChange}
                error={errors.certifications}
              />
            </div>
          </div>

          {/* Skills Assessment */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
              Skills Assessment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <FormSlider
                id="codingSkill"
                name="codingSkill"
                label="Coding Skill Score"
                value={formData.codingSkill}
                onChange={handleChange}
                error={errors.codingSkill}
              />
              <FormSlider
                id="communicationSkill"
                name="communicationSkill"
                label="Communication Skill Score"
                value={formData.communicationSkill}
                onChange={handleChange}
                error={errors.communicationSkill}
              />
              <FormSlider
                id="aptitudeScore"
                name="aptitudeScore"
                label="Aptitude Score"
                value={formData.aptitudeScore}
                onChange={handleChange}
                error={errors.aptitudeScore}
              />
              <FormSlider
                id="logicalReasoning"
                name="logicalReasoning"
                label="Logical Reasoning Score"
                value={formData.logicalReasoning}
                onChange={handleChange}
                error={errors.logicalReasoning}
              />
              <FormSlider
                id="mockInterview"
                name="mockInterview"
                label="Mock Interview Score"
                value={formData.mockInterview}
                onChange={handleChange}
                error={errors.mockInterview}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/30"
            >
              <Sparkles className="w-6 h-6 animate-pulse" />
              Predict Placement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PredictionForm;