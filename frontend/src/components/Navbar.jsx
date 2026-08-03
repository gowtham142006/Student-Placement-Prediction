import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 30px",
                backgroundColor: "#2563eb",
                color: "white",
            }}
        >
            <h2>🎓 Placement Predictor</h2>

            <div>
                <Link
                    to="/"
                    style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
                >
                    Home
                </Link>

                <Link
                    to="/prediction"
                    style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
                >
                    Prediction
                </Link>

                <Link
                    to="/about"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    About
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;