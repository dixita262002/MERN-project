/*import React from "react";
import { FaTasks, FaUsers, FaChartLine, FaMoneyBill } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 10 },
  { name: "In Progress", value: 6 },
  { name: "Pending", value: 4 },
];

const COLORS = ["#4ade80", "#facc15", "#f87171"];

export const Report = () => {

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Reports</h2>

      {/* Stats Overview */
      /*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg flex items-center space-x-3">
          <FaTasks size={28} />
          <div>
            <p className="text-sm">Total Tasks</p>
            <h3 className="text-xl font-bold">20</h3>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center space-x-3">
          <FaUsers size={28} />
          <div>
            <p className="text-sm">Team Members</p>
            <h3 className="text-xl font-bold">6</h3>
          </div>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg flex items-center space-x-3">
          <FaChartLine size={28} />
          <div>
            <p className="text-sm">Project Progress</p>
            <h3 className="text-xl font-bold">65%</h3>
          </div>
        </div>
        <div className="bg-purple-100 text-purple-800 p-4 rounded-lg flex items-center space-x-3">
          <FaMoneyBill size={28} />
          <div>
            <p className="text-sm">Budget Usage</p>
            <h3 className="text-xl font-bold">$12,400</h3>
          </div>
        </div>
      </div>

      {/* Task Status Pie Chart */
      /*<div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Task Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

*/

import React from "react";
import { FaTasks, FaUsers, FaChartLine, FaMoneyBill } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 10 },
  { name: "In Progress", value: 6 },
  { name: "Pending", value: 4 },
];

const COLORS = ["#4ade80", "#facc15", "#f87171"];

export const Report = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Reports</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg flex items-center space-x-3">
          <FaTasks size={28} />
          <div>
            <p className="text-sm">Total Tasks</p>
            <h3 className="text-xl font-bold">20</h3>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center space-x-3">
          <FaUsers size={28} />
          <div>
            <p className="text-sm">Team Members</p>
            <h3 className="text-xl font-bold">6</h3>
          </div>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg flex items-center space-x-3">
          <FaChartLine size={28} />
          <div>
            <p className="text-sm">Project Progress</p>
            <h3 className="text-xl font-bold">65%</h3>
          </div>
        </div>
        <div className="bg-purple-100 text-purple-800 p-4 rounded-lg flex items-center space-x-3">
          <FaMoneyBill size={28} />
          <div>
            <p className="text-sm">Budget Usage</p>
            <h3 className="text-xl font-bold">$12,400</h3>
          </div>
        </div>
      </div>

      {/* Task Status Pie Chart */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Task Distribution</h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
