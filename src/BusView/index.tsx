import React from "react";
import * as styles from "./styles";

interface IProps {
  stopPlaces: {
    id: string;
    estimatedCalls: EstimatedCall[];
  }[];
}

interface EstimatedCall {
  actualArrivalTime: string;
  actualDepartureTime: string;
  aimedArrivalTime: string;
  aimedDepartureTime: string;
  date: string;
  destinationDisplay: {
    frontText: string;
  };
  expectedDepartureTime: string;
  expectedArrivalTime: string;
  predictionInaccurate: Boolean;
  quay: {
    id: string;
    name: string;
    description: string;
    publicCode: string;
  };
  realtime: Boolean;
  serviceJourney: {
    id: string;
    journeyPattern: {
      line: {
        publicCode: string;
      };
    };
  };
}

const getTimeText = (time: string) => {
  const date = new Date(time);
  const arrival = date.getTime();
  const now = new Date().getTime();
  if (arrival - now < 60000) {
    return "Nå";
  } else if (arrival - now < 600000) {
    return `${Math.floor((arrival - now) / 60000)} min`;
  } else {
    return time.split("T")[1].substring(0, 5);
  }
};

const BusSingular: React.FC<EstimatedCall> = props => {
  return (
    <div className={styles.busRow}>
      <div style={{ width: "10%", marginLeft: "24px" }}>
        <p>{props.serviceJourney.journeyPattern.line.publicCode}</p>
      </div>
      <div style={{ width: "30%", marginLeft: "24px" }}>
        <p>{props.destinationDisplay.frontText}</p>
      </div>
      <div style={{ width: "15%", marginLeft: "36px" }}>
        <p>
          {getTimeText(
            props.realtime ? props.expectedArrivalTime : props.aimedArrivalTime
          )}
        </p>
      </div>
      <div style={{ width: "20%", marginLeft: "24px" }}>
        <p>{`Lerkendal ${props.quay.publicCode}`}</p>
      </div>
    </div>
  );
};

const BusView: React.FC<IProps> = props => {
  return (
    <div style={{ fontFamily: "helvetica" }}>
      <div className={styles.busHeader}>
        <div style={{ width: "10%", marginLeft: "24px" }}>
          <p>Nr.</p>
        </div>
        <div style={{ width: "30%", marginLeft: "24px" }}>
          <p>Rute</p>
        </div>
        <div style={{ width: "15%", marginLeft: "36px" }}>
          <p>Avgang</p>
        </div>
        <div style={{ width: "20%", marginLeft: "24px" }}>
          <p>Stopp</p>
        </div>
      </div>
      {props.stopPlaces.map(sp =>
        sp.estimatedCalls.map(ec => <BusSingular {...ec} />)
      )}
    </div>
  );
};

export default BusView;
