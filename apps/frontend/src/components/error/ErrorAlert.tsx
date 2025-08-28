"use client";
import React, { useEffect, useState } from "react";

type AlertProps = {
  message: string;
  type?: "danger" | "success" | "warning" | "info";
  duration?: number; // in ms
};

const Alert: React.FC<AlertProps> = ({
  message,
  type = "danger",
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false); // Trigger leave animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const typeClasses: Record<string, string> = {
    danger: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
    success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
    warning:
      "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
    info: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
  };

  return (
    <div
      className={`
        fixed bottom-4 right-4 transform 
        p-4 mb-4 text-sm rounded-lg shadow-lg
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
        ${typeClasses[type]}
      `}
      role="alert"
    >
      <span className="font-medium">
        {type.charAt(0).toUpperCase() + type.slice(1)} alert!
      </span>{" "}
      {message}
    </div>
  );
};

export default Alert;
