import React from "react";
import { FirebaseDatabaseNode } from "@react-firebase/database";

interface DatabaseProps {
  no: number;
  taken: boolean;
}

const NumberMap: React.FC<DatabaseProps> = props => {
  return (
    <h1
      style={{
        color: props.taken ? "red" : "green",
        fontSize: "44px",
        fontFamily: "helvetica",
      }}
    >
      {props.no}
    </h1>
  );
};

const Rooms: React.FC = () => {
  return (
    <div>
      <FirebaseDatabaseNode path={"rooms"}>
        {d => {
          return (
            <React.Fragment>
              {!d.isLoading && d.value && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {Object.keys(d.value).map(it => (
                    <NumberMap {...d.value[it]} />
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        }}
      </FirebaseDatabaseNode>
      Bruk API fra entur: https://api.entur.io/journey-planner/v2/graphql
    </div>
  );
};

export default Rooms;
