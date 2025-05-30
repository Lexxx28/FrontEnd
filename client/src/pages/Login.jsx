import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [commandPrefix, setCommandPrefix] = useState("$");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const navigate = useNavigate();

  React.useEffect(() => {
    const commandInterval = setInterval(() => {
      setCommandPrefix((prev) => (prev === "$" ? "$ _" : "$"));
    }, 500);

    return () => clearInterval(commandInterval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!username || !password) {
      setErrorMessage("Error: Username and password are required");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, accept any login with username containing "admin" or specific test credentials
      if (
        username.includes("admin") ||
        (username === "test" && password === "test")
      ) {
        // Use React Router to navigate to the submit page
        navigate("/");
      } else {
        setErrorMessage("Error: Authentication failed. Invalid credentials.");
      }
    } catch (error) {
      setErrorMessage("Error: Connection failed. Please try again.");
    } finally {
      setIsLoading(false);
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
            <span className="terminal-title">secure_login.sh</span>
          </div>
          <div className="terminal-content">
            <div className="command-line">
              $ ./authenticate --secure --protocol=CTF
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username">{commandPrefix} username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  autoComplete="off"
                  spellCheck="false"
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

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              <button
                type="submit"
                className={`login-button ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
