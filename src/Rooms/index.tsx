import React from "react";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import { colorDict } from "../assets/colors";
import { Link } from "react-router-dom";

interface IProps {
  taken: 0 | 1 | 2;
  no: number;
}

const NumberMap: React.FC<IProps> = props => {
  return (
    <Link to={`/${props.no}`} style={{ textDecoration: "none" }}>
      <h1
        style={{
          color: colorDict[props.taken],
          fontSize: "44px",
          fontFamily: "helvetica",
        }}
      >
        {props.no}
      </h1>
    </Link>
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
