import React from "react";

const Clock: React.FC = () => {
  const [time, setTime] = React.useState(
    new Date().toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginLeft: "-100px" }}>
      <p style={{ fontWeight: 800 }}>{time}</p>
    </div>
  );
};

export default Clock;
