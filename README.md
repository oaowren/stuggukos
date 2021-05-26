# About
This project is a simple React-application for use on a dedicated screen in the common area of apartment H101-106 of Klæbuveien 128. The purpose is to keep track of all bus-routes that are available from the Lerkendal-stops. 

Besides this, the screen also showcases the status for each of the rooms in the apartment, following a traffic-light model (green = available, yellow = maybe, red = busy). This status can be updated from a dedicated link for each room. 

The app is hosted through Firebase hosting, and is available at https://stuggukos.web.app/

## API 
The bus routes are fetched from Entur's journey planner API, using GraphQL (https://api.entur.io/journey-planner/v2/graphql). Docs for this API is available at https://developer.entur.org/.
