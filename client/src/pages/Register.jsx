import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { registerUser } from "../services/apiCTF";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [commandPrefix, setCommandPrefix] = useState("$");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password visibility

  const navigate = useNavigate();

  // Effect for the blinking command prefix
  React.useEffect(() => {
    const commandInterval = setInterval(() => {
      setCommandPrefix((prev) => (prev === "$" ? "$ _" : "$"));
    }, 500);

    return () => clearInterval(commandInterval);
  }, []);

  /**
   * Handles the form submission for user registration.
   * @param {FormEvent} e - The form event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate form inputs
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Error: All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Error: Passwords do not match.");
      return;
    }

    setIsLoading(true);

    // Simulate API call for registration
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // For demo purposes, simulate if a username is already taken
      if (
        username.toLowerCase() === "admin" ||
        username.toLowerCase() === "test"
      ) {
        setErrorMessage(
          "Error: Username already exists. Please choose another."
        );
      } else {
        // Simulate successful registration
        setSuccessMessage(
          `Success: User '${username}' registered. Redirecting to login...`
        );
        // In a real application, you would send this data to your backend
        // and handle the actual user creation.

        // After a short delay, navigate to the login page
        setTimeout(() => {
          navigate("/login"); // Navigate to the login page after successful registration
        }, 1500);
      }
    } catch (error) {
      // Handle potential errors during the simulated API call
      setErrorMessage("Error: Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false); // Always stop loading, regardless of success or failure
    }
  };

  return (
    <div className="login-page">
      <div className="content">
        <div className="header">
          <div className="logo">TANCTF</div>
          <h1>CyberSec CTF Challenge 2025</h1>
        </div>

        <div className="terminal">
          <div className="terminal-header">
            <span className="terminal-button"></span>
            <span className="terminal-button"></span>
            <span className="terminal-title">secure_register.sh</span>
          </div>
          <div className="terminal-content">
            <div className="command-line">
              $ ./register --secure --protocol=CTF
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username">{commandPrefix} Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  autoComplete="off"
                  spellCheck="false"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{commandPrefix} Email:</label>
                <input
                  type="email" // Changed to type="email" for better validation
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="off"
                  spellCheck="false"
                  required
                />
              </div>
              <div className="form-group password-group">
                {" "}
                {/* Added a class for styling */}
                <label htmlFor="password">{commandPrefix} password:</label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle type
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button" // Important: type="button" to prevent form submission
                  className="show-hide-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="form-group password-group">
                {" "}
                {/* Added a class for styling */}
                <label htmlFor="confirm">
                  {commandPrefix} confirm_password:
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"} // Toggle type
                  id="confirm"
                  value={confirmPassword} // Use confirmPassword state
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                  disabled={isLoading}
                  required
                />
                <button
                  type="button" // Important: type="button" to prevent form submission
                  className="show-hide-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              <button
                type="submit"
                className={`login-button ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
