import {
  FirebaseDatabaseMutation,
  FirebaseDatabaseNode,
} from "@react-firebase/database";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { colorDict } from "../assets/colors";

interface IParams {
  id?: string | undefined;
}

interface IProps {
  taken: 0 | 1 | 2;
  no: number;
}

const RoomDiv: React.FC<IProps> = props => {
  return (
    <div>
      <h1
        style={{
          color: colorDict[props.taken],
          fontSize: "44px",
          fontFamily: "helvetica",
        }}
      >
        {props.no}
      </h1>
    </div>
  );
};

const RoomAdmin: React.FC = () => {
  const { id } = useParams<IParams>();

  return (
    <React.Fragment>
      <div>
        <Link to="/" style={{ color: "#FFFFFF" }}>
          Tilbake
        </Link>
      </div>
      <FirebaseDatabaseNode path={`rooms/${id}`}>
        {d => {
          return (
            <React.Fragment>
              {!d.isLoading && d.value && <RoomDiv {...d.value} />}
            </React.Fragment>
          );
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseMutation type="set" path={`rooms/${id}`}>
        {({ runMutation }) => (
          <React.Fragment>
            <h3>Opptatt?</h3>
            <button
              style={{ marginRight: "12px" }}
              onClick={async () => {
                await runMutation({ no: id, taken: 2 });
              }}
            >
              Ja
            </button>
            <button
              style={{ marginRight: "12px" }}
              onClick={async () => {
                await runMutation({ no: id, taken: 1 });
              }}
            >
              Kanskje
            </button>
            <button
              onClick={async () => {
                await runMutation({ no: id, taken: 0 });
              }}
            >
              Nei
            </button>
          </React.Fragment>
        )}
      </FirebaseDatabaseMutation>
    </React.Fragment>
  );
};

export default RoomAdmin;
