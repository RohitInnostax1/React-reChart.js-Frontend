import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    Rectangle,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export default function ChartSmartPhone() {
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0); // Track the index of data being added

    // Function to load data from API
    const loadData = async () => {
        try {
            const result = await axios.get("http://localhost:8000/smartPhones");
            if (result.status === 200) {
                setAllData(result.data);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load phones. Please try again later.");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

   
    useEffect(() => {
        if (allData.length === 0) return;

        const interval = setInterval(() => {
            setData((prevData) => {
                if (index < allData.length) {
                    return [...prevData, allData[index]];
                } else {
                    clearInterval(interval);
                    return prevData;
                }
            });
            setIndex((prevIndex) => prevIndex + 1);
        }, 10000);

        return () => clearInterval(interval);
    }, [allData, index]);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const renderCustomizedLabel = ({ name, value }) => `${name}: ${value}`;

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>
                Quarterly Sales Figures for Mobile Phones
            </h2>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            <div className="charts-container">
                {/* Line Chart */}
                <div className="chart-item">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data} margin={{ top: 50 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="red" />
                            <XAxis dataKey="name" tick={{ fill: "blue" }} padding={{ left: 30, right: 30 }} />
                            <YAxis tick={{ fill: "blue" }} />
                            <Tooltip contentStyle={{ backgroundColor: "red", color: "#fff" }} />
                            <Legend />
                            <Line type="natural" dataKey="samsung" stroke="#8884d8" strokeWidth={3} />
                            <Line type="monotone" dataKey="iphone" stroke="#82ca9d" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="chart-item">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fill: "blue" }} />
                            <YAxis tick={{ fill: "blue" }} />
                            <Tooltip contentStyle={{ backgroundColor: "red", color: "#fff" }} />
                            <Legend />
                            <Bar dataKey="iphone" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                            <Bar dataKey="samsung" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Area Chart */}
                <div className="chart-item">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fill: "blue" }} />
                            <YAxis tick={{ fill: "blue" }} />
                            <Tooltip contentStyle={{ backgroundColor: "red", color: "#fff" }} />
                            <Area type="monotone" dataKey="iphone" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="samsung" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="chart-item">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="iphone"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
