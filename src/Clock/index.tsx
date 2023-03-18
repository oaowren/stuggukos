import React from "react";

const Clock: React.FC = () => {
  const [time, setTime] = React.useState(
    new Date().toLocaleTimeString("en-GB", {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          margin: "10px auto",
          fontSize: "3em",
          fontFamily: "Roboto Mono",
        }}
      >
        {time}
      </p>
    </div>
  );
};

export default Clock;
