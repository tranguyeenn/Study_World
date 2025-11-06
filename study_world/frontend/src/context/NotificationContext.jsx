import React, { createContext, useContext, useState, useCallback } from "react";
import NotificationManager from "../components/ui/NotificationManager";

// Create a single, consistent context name
const NotificationContext = createContext();

// Hook to trigger notifications anywhere
export function useNotification() {
  return useContext(NotificationContext);
}

// Provider component (the one App.jsx expects)
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    const newNotif = { id, message, type, duration };
    setNotifications((prev) => [...prev, newNotif]);

    // Auto-remove after duration
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}

      {/* === Notification Display Stack === */}
      <NotificationManager
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
}
