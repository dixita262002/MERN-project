/*import React, { useState, useEffect } from "react";
import { FaBell, FaSave, FaMoon, FaSun, FaGlobe } from "react-icons/fa";

export const TeamMemberSettings = () => {
  
    const [settings, setSettings] = useState({
        email: "teammember@example.com",
        notifications: true,
        theme: "light",
        language: "English",
    });

    // Load settings from local storage on mount
    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem("teamMemberSettings"));
        if (savedSettings) {
            setSettings(savedSettings);
            applyTheme(savedSettings.theme);
        }
    }, []);

    // Apply theme to document body
    const applyTheme = (theme) => {
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    };

    // Toggle theme and save settings
    const toggleTheme = () => {
        setSettings((prev) => {
            const newTheme = prev.theme === "light" ? "dark" : "light";
            const newSettings = { ...prev, theme: newTheme };
            localStorage.setItem("teamMemberSettings", JSON.stringify(newSettings));
            applyTheme(newTheme);
            return newSettings;
        });
    };

    // Handle dropdown change
    const handleDropdownChange = (e) => {
        setSettings((prev) => {
            const newSettings = { ...prev, [e.target.name]: e.target.value };
            localStorage.setItem("teamMemberSettings", JSON.stringify(newSettings));
            return newSettings;
        });
    };

    // Toggle notifications
    const toggleNotifications = () => {
        setSettings((prev) => {
            const newSettings = { ...prev, notifications: !prev.notifications };
            localStorage.setItem("teamMemberSettings", JSON.stringify(newSettings));
            return newSettings;
        });
    };

    // Save settings
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("teamMemberSettings", JSON.stringify(settings));
        alert("Settings saved successfully!");
    };

    return (
        <div className={`p-6 min-h-screen transition-all ${settings.theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h1 className="text-2xl font-bold mb-6">Team Member Settings</h1>

            <div className={`shadow-md rounded-lg p-6 transition-all ${settings.theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Display */
                 /*   <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={settings.email}
                            readOnly
                            className="w-full mt-1 p-3 border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-md"
                        />
                    </div>

                    {/* Notifications Toggle */
                    /*<div className="flex items-center justify-between">
                        <label className="flex items-center text-gray-700 dark:text-gray-300 font-semibold">
                            <FaBell className="mr-2" /> Enable Notifications
                        </label>
                        <button
                            type="button"
                            onClick={toggleNotifications}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
                                settings.notifications ? "bg-blue-600" : "bg-gray-400"
                            }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
                                    settings.notifications ? "translate-x-6" : ""
                                }`}
                            ></div>
                        </button>
                    </div>

                    {/* Theme Selection */
                    /*<div className="flex items-center justify-between">
                        <label className="flex items-center text-gray-700 dark:text-gray-300 font-semibold">
                            {settings.theme === "dark" ? <FaMoon className="mr-2" /> : <FaSun className="mr-2" />}
                            Theme
                        </label>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
                                settings.theme === "dark" ? "bg-gray-700" : "bg-yellow-500"
                            }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
                                    settings.theme === "dark" ? "translate-x-6" : ""
                                }`}
                            ></div>
                        </button>
                    </div>

                    {/* Language Selection */
                   /* <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                            <FaGlobe className="mr-2 inline" /> Language
                        </label>
                        <select
                            name="language"
                            value={settings.language}
                            onChange={handleDropdownChange}
                            className="w-full mt-1 p-3 border border-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md"
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Español</option>
                            <option value="French">Français</option>
                            <option value="German">Deutsch</option>
                        </select>
                    </div>

                    {/* Save Button */
                   /* <button
                        type="submit"
                        className="flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition w-full"
                    >
                        <FaSave className="mr-2" /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

*/

/*import React, { useState, useEffect } from "react";
import { FaBell, FaSave, FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import axios from "axios";

export const TeamMemberSettings = () => {
  const [settings, setSettings] = useState({
    email: "teammember@example.com",
    notifications: true,
    theme: "light",
    language: "English",
  });

  useEffect(() => {
    axios
      .get(`/api/settings/${settings.email}`)
      .then((res) => {
        setSettings(res.data);
        applyTheme(res.data.theme);
      })
      .catch(() => {
        applyTheme(settings.theme);
      });
  }, []);

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    setSettings((prev) => {
      const newTheme = prev.theme === "light" ? "dark" : "light";
      applyTheme(newTheme);
      return { ...prev, theme: newTheme };
    });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const toggleNotifications = () => {
    setSettings((prev) => ({ ...prev, notifications: !prev.notifications }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/settings", settings);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    }
  };

  return (
    <div
      className={`p-6 min-h-screen transition-all ${
        settings.theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Team Member Settings</h1>

      <div
        className={`shadow-md rounded-lg p-6 transition-all ${
          settings.theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={settings.email}
              readOnly
              className="w-full mt-1 p-3 border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-md"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700 dark:text-gray-300 font-semibold">
              <FaBell className="mr-2" /> Enable Notifications
            </label>
            <button
              type="button"
              onClick={toggleNotifications}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
                settings.notifications ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
                  settings.notifications ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700 dark:text-gray-300 font-semibold">
              {settings.theme === "dark" ? (
                <FaMoon className="mr-2" />
              ) : (
                <FaSun className="mr-2" />
              )}
              Theme
            </label>
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
                settings.theme === "dark" ? "bg-gray-700" : "bg-yellow-500"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
                  settings.theme === "dark" ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
              <FaGlobe className="mr-2 inline" /> Language
            </label>
            <select
              name="language"
              value={settings.language}
              onChange={handleDropdownChange}
              className="w-full mt-1 p-3 border border-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md"
            >
              <option value="English">English</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
              <option value="German">Deutsch</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition w-full"
          >
            <FaSave className="mr-2" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

*/

import React, { useState, useEffect } from "react";
import { FaBell, FaSave, FaMoon, FaSun, FaGlobe } from "react-icons/fa";

export const TeamMemberSettings = () => {

    const [settings, setSettings] = useState({
        email: "teammember@example.com",
        notifications: true,
        theme: "light",
        language: "English",
    });

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem("teamMemberSettings"));
        if (savedSettings) {
            setSettings(savedSettings);
            applyTheme(savedSettings.theme);
        }
    }, []);

    const applyTheme = (theme) => {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    };

    const toggleTheme = () => {
        setSettings((prev) => {
            const newTheme = prev.theme === "light" ? "dark" : "light";
            const newSettings = { ...prev, theme: newTheme };
            localStorage.setItem("teamMemberSettings", JSON.stringify(newSettings));
            applyTheme(newTheme);
            return newSettings;
        });
    };

    const handleDropdownChange = (e) => {
        setSettings((prev) => {
            const newSettings = { ...prev, [e.target.name]: e.target.value };
            localStorage.setItem("teamMemberSettings", JSON.stringify(newSettings));
            return newSettings;
        });
    };

    const toggleNotifications = () => {
        setSettings((prev) => {
            const newSettings = { ...prev, notifications: !prev.notifications };
            localStorage.setItem("teamMemberSettings", JSON.stringify(newSettings));
            return newSettings;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("teamMemberSettings", JSON.stringify(settings));
        alert("Settings saved successfully!");
    };

    return (
        <div className={`settings-container ${settings.theme === "dark" ? "dark" : "light"}`}>
            <h1 className="settings-title">Team Member Settings</h1>

            <div className="settings-card">
                <form onSubmit={handleSubmit} className="settings-form">
                    {/* Email Display */}
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={settings.email} readOnly />
                    </div>

                    {/* Notifications */}
                    <div className="form-group row">
                        <label><FaBell /> Enable Notifications</label>
                        <button type="button" onClick={toggleNotifications} className={`toggle-switch ${settings.notifications ? "on" : "off"}`}>
                            <div className="switch-knob"></div>
                        </button>
                    </div>

                    {/* Theme */}
                    <div className="form-group row">
                        <label>{settings.theme === "dark" ? <FaMoon /> : <FaSun />} Theme</label>
                        <button type="button" onClick={toggleTheme} className={`toggle-switch ${settings.theme === "dark" ? "on" : "off"}`}>
                            <div className="switch-knob"></div>
                        </button>
                    </div>

                    {/* Language */}
                    <div className="form-group">
                        <label><FaGlobe /> Language</label>
                        <select name="language" value={settings.language} onChange={handleDropdownChange}>
                            <option value="English">English</option>
                            <option value="Spanish">Español</option>
                            <option value="French">Français</option>
                            <option value="German">Deutsch</option>
                        </select>
                    </div>

                    {/* Save Button */}
                    <button type="submit" className="save-btn">
                        <FaSave /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};


