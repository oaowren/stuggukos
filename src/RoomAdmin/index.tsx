import {
  FirebaseDatabaseMutation,
  FirebaseDatabaseNode,
} from "@react-firebase/database";
import React from "react";
import { useParams } from "react-router-dom";

interface IParams {
  id?: string | undefined;
}

const RoomAdmin: React.FC = () => {
  const { id } = useParams<IParams>();

  return (
    <React.Fragment>
      <FirebaseDatabaseNode path={`rooms/${id}`}>
        {d => {
          return (
            <React.Fragment>
              {!d.isLoading && d.value && (
                <div>
                  <h1
                    style={{
                      color: d.value.taken ? "red" : "green",
                      fontSize: "44px",
                      fontFamily: "helvetica",
                    }}
                  >
                    {d.value.no}
                  </h1>
                </div>
              )}
            </React.Fragment>
          );
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseMutation type="set" path={`rooms/${id}`}>
        {({ runMutation }) => (
          <React.Fragment>
            <h3>Opptatt?</h3>
            <button
              onClick={async () => {
                const returnVal = await runMutation({ no: id, taken: true });
                console.log(returnVal);
              }}
            >
              Ja
            </button>
            <button
              onClick={async () => {
                const returnVal = await runMutation({ no: id, taken: false });
                console.log(returnVal);
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
