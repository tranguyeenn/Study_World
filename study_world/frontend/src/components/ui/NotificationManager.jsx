import React from "react";
import Notification from "./Notification";

/**
 * StudyWorld Notification Manager
 * -------------------------------
 * Displays a stack of active notifications.
 * The NotificationContext controls what gets passed here.
 */
export default function NotificationManager({ notifications = [], onClose }) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {notifications.map((n) => (
        <Notification
          key={n.id}
          message={n.message}
          type={n.type}
          duration={n.duration}
          onClose={() => onClose && onClose(n.id)}
        />
      ))}
    </div>
  );
}