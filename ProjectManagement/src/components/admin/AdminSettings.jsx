/*import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBell, FaEye, FaPalette, FaAdjust } from "react-icons/fa";

const AdminSettings = () => {
    const [theme, setTheme] = useState("light");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div className="p-6 space-y-6 bg-white dark:bg-gray-900 min-h-screen transition-colors">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Theme Settings */
               /* <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <FaPalette /> Theme
                    </h2>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Toggle Light/Dark Mode</span>
                        <button
                            onClick={toggleTheme}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {theme === "light" ? <FaMoon /> : <FaSun />}
                        </button>
                    </div>
                </div>

                {/* Notification Settings */
                /*<div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <FaBell /> Notifications
                    </h2>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Enable Alerts</span>
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                            className="toggle toggle-primary"
                        />
                    </div>
                </div>

                {/* Accessibility */
                /*<div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <FaAdjust /> Accessibility
                    </h2>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">High Contrast Mode</span>
                        <input
                            type="checkbox"
                            checked={highContrast}
                            onChange={() => setHighContrast(!highContrast)}
                            className="toggle toggle-accent"
                        />
                    </div>
                </div>

                {/* Layout Preferences */
                /*<div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <FaEye /> Layout Preferences
                    </h2>
                    <div className="mt-4">
                        <label className="block text-gray-600 dark:text-gray-300 mb-2">Sidebar Style:</label>
                        <select className="w-full p-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                            <option>Expanded</option>
                            <option>Collapsed</option>
                            <option>Hidden</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
*/
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBell, FaEye, FaPalette, FaAdjust, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "../../assets/AdminSettings.css";

const AdminSettings = () => {
    const [theme, setTheme] = useState("light");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [highContrast, setHighContrast] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        // Load preferences from localStorage on component mount
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }

        const savedNotifications = localStorage.getItem("notificationsEnabled");
        if (savedNotifications) {
            setNotificationsEnabled(JSON.parse(savedNotifications));
        }

        const savedHighContrast = localStorage.getItem("highContrast");
        if (savedHighContrast) {
            setHighContrast(JSON.parse(savedHighContrast));
        }

        // Apply theme
        document.documentElement.classList.toggle("dark-mode", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme); // Save theme preference
            return newTheme;
        });
    };

    const toggleSound = () => {
        setSoundEnabled((prev) => {
            const newSoundEnabled = !prev;
            localStorage.setItem("soundEnabled", newSoundEnabled); // Save sound preference
            return newSoundEnabled;
        });
    };

    const handleNotificationsChange = () => {
        setNotificationsEnabled((prev) => {
            const newNotificationsEnabled = !prev;
            localStorage.setItem("notificationsEnabled", newNotificationsEnabled); // Save notification preference
            return newNotificationsEnabled;
        });
    };

    const handleHighContrastChange = () => {
        setHighContrast((prev) => {
            const newHighContrast = !prev;
            localStorage.setItem("highContrast", newHighContrast); // Save high contrast preference
            return newHighContrast;
        });
    };

    const handleProfilePictureChange = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        axios.post("/api/uploadProfilePic", formData)
            .then(response => {
                console.log(response.data);
                setProfilePicture(response.data.profilePictureUrl); // Assuming backend returns image URL
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className="admin-settings-container">
            <h1 className="admin-settings-title">Admin Settings</h1>

            <div className="settings-grid">
                {/* Profile Picture Upload */}
                <div className="settings-card">
                    <h2 className="settings-card-title">
                        <FaUserCircle /> Profile Picture
                    </h2>
                    <div className="settings-option">
                        <label htmlFor="profilePic">Upload Profile Picture</label>
                        <input 
                            type="file" 
                            id="profilePic" 
                            onChange={handleProfilePictureChange} 
                        />
                        {profilePicture && <img src={profilePicture} alt="Profile" />}
                    </div>
                </div>

                {/* Theme Settings */}
                <div className="settings-card">
                    <h2 className="settings-card-title">
                        <FaPalette /> Theme
                    </h2>
                    <div className="settings-option">
                        <span>Toggle Light/Dark Mode</span>
                        <button onClick={toggleTheme} className="theme-toggle-btn">
                            {theme === "light" ? <FaMoon /> : <FaSun />}
                        </button>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="settings-card">
                    <h2 className="settings-card-title">
                        <FaBell /> Notifications
                    </h2>
                    <div className="settings-option">
                        <span>Enable Alerts</span>
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={handleNotificationsChange}
                        />
                    </div>
                </div>

                {/* Sound Notifications */}
                <div className="settings-card">
                    <h2 className="settings-card-title">
                        <FaBell /> Sound Notifications
                    </h2>
                    <div className="settings-option">
                        <span>Enable Sound Alerts</span>
                        <input
                            type="checkbox"
                            checked={soundEnabled}
                            onChange={toggleSound}
                        />
                    </div>
                </div>

                {/* Accessibility Settings */}
                <div className="settings-card">
                    <h2 className="settings-card-title">
                        <FaAdjust /> Accessibility
                    </h2>
                    <div className="settings-option">
                        <span>High Contrast Mode</span>
                        <input
                            type="checkbox"
                            checked={highContrast}
                            onChange={handleHighContrastChange}
                        />
                    </div>
                </div>

                {/* Layout Preferences */}
                <div className="settings-card">
                    <h2 className="settings-card-title">
                        <FaEye /> Layout Preferences
                    </h2>
                    <div className="settings-layout-select">
                        <label>Sidebar Style:</label>
                        <select>
                            <option>Expanded</option>
                            <option>Collapsed</option>
                            <option>Hidden</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
