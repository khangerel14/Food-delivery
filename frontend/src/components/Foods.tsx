"use client";

import axios from "axios";
import { Card } from "./Card";
import { useEffect, useState } from "react";

export const Foods = () => {
  const [foodData, setFoodData] = useState([]);
  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/foods");
      setFoodData(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Card foodData={foodData} />
    </div>
  );
};
