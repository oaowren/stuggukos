import React from "react";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import { colorDict } from "../assets/colors";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import BusView from "../BusView";
import Clock from "../Clock";
import CityBike from "../CityBike";

const BUS_ROUTES = gql`
  query (
    $id: String!
    $timeRange: Int!
    $limit: Int!
  ) {
  stopPlace(id: $id) {
    id
    name
    estimatedCalls(timeRange: $timeRange, numberOfDepartures: $limit) {     
      realtime
      aimedArrivalTime
      aimedDepartureTime
      expectedArrivalTime
      expectedDepartureTime
      actualArrivalTime
      actualDepartureTime
      date
      forBoarding
      forAlighting
      destinationDisplay {
        frontText
      }
      quay {
        id
        name
        description
        publicCode
      }
      serviceJourney {
        journeyPattern {
          line {
            id
            publicCode
            name
            transportMode
          }
        }
      }
    }
  }
}
`;

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

const date = new Date().toISOString();

const MINUTE_MS = 15000;

const citybikeHeader = {
  "Client-Identifier": "Odd_Andre_Owren-departureboard",
  "Content-Type": "application/json",
};

const Rooms: React.FC = () => {
  let { error, data, refetch, loading } = useQuery(BUS_ROUTES, {
    variables: {
      id: "NSR:StopPlace:60257",
      includeCancelledTrips: false,
      limit: 150,
      limitPerLine: 20,
      omitNonBoarding: true,
      start: date,
      timeRange: 72000,
    },
  });

  const [citybikeCapacity, setCitybikeCapacity] = React.useState(0);

  const getAndSetBikeCap = () => {
    fetch("https://gbfs.urbansharing.com/trondheimbysykkel.no/station_status.json", {
      headers: citybikeHeader,
      method: "GET"
    }).then(res => {
      if (res.ok){
        return res.json();
      } else {
        setCitybikeCapacity(-1);
        return null;
      }
    }).then(json => {
      const cap = json.data.stations.filter((s: any) => s.station_id === "86")[0].num_bikes_available
      if (isNaN(cap)) {
        setCitybikeCapacity(-1);
      } else {
        setCitybikeCapacity(cap)
      }
    })
  }

  React.useEffect(() => {
    getAndSetBikeCap();
    const interval = setInterval(() => {
      const dateNew = new Date().toISOString();
      refetch({
        id: "NSR:StopPlace:60257",
        includeCancelledTrips: false,
        limit: 40,
        limitPerLine: 20,
        omitNonBoarding: true,
        start: dateNew,
        timeRange: 72000,
      });
      getAndSetBikeCap();
    }, MINUTE_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <Clock />
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
      <div>
        <CityBike capacity={citybikeCapacity}/>
        <BusView {...data} />
      </div>
    </div>
  );
};

export default Rooms;
