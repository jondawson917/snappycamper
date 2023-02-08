import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import axios from "axios";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
const CampingApi = require("../api/api");

const apiData = require("../API_DATA");
function CampList() {
  const [camps, setCamps] = useState([]);
  const [limitNumber, setLimit] = useState(2);
  const { currentUser } = useContext(UserContext);

  function getCampData(limitNumber) {
    try {
      axios
        .get(`${apiData.BASE_URL}/campgrounds`, {
          params: { api_key: apiData.API_KEY, limit: limitNumber },
        })
        .then((res) => {
          const camps = res.data.data;
          setCamps(camps);
          console.log(camps);
        });
    } catch (e) {
      e.preventDefault();
      console.log("Axios Error", e);
    }
  }
  async function addToFavorite(e) {
    e.preventDefault();
    let index = e.target.dataset.value;
    let faveCamp = camps[index];

    let { parkCode, name } = faveCamp;
    let cost = faveCamp.fees[0] ? +faveCamp.fees[0].cost : 0.0;

    const url = faveCamp.images[0]
      ? faveCamp.images[0].url
      : "../No_Image_Available.jpg";

    const user_id = currentUser ? currentUser.id : null;

    let data = { parkName: name, parkCode, cost, image_url: url };
    CampingApi.addCamp(data).then((addResponse) => {
      console.log("Add Response", addResponse);
      let camp_id = !addResponse[1] ? addResponse.data.camp.id : +addResponse[1];
        CampingApi.reserve(user_id, camp_id).then(
          (reserveResponse) => {
            console.log("Reserve Response:", reserveResponse);
            e.target.innerHTML = "Added to your favorites list!";
            e.target.disabled = true;
          }
        );
      
    });
  }
  function changeLimit(e) {
    let { value, name } = e.target;
    setTimeout(function () {
      console.log(value);
      setLimit(value);
      getCampData(value);
    }, 1000);
  }

  function checkValue(e) {
    let { checked, name } = e.target;
    if (checked && name === "cell") {
      setCamps(
        camps
          .filter(function (camp) {
            return (
              camp.amenities.cellPhoneReception &&
              !camp.amenities.cellPhoneReception.includes("No")
            );
          })
          .map((c) => c)
      );
    }
    if (checked && name === "toilets") {
      setCamps(
        camps
          .filter(function (camp) {
            return (
              camp.amenities.toilets[0] &&
              !camp.amenities.toilets[0].includes("No")
            );
          })
          .map((c) => c)
      );
    }
    if (checked && name === "rv") {
      setCamps(
        camps
          .filter(function (camp) {
            return +camp.accessibility.rvAllowed;
          })
          .map((c) => c)
      );
    } else if (!checked) getCampData();
    console.log("You selected " + `${name}` + checked);
  }
  /*Renders a list of camps */
  useEffect(
    function loadCamps() {
      async function getallCamps() {
        if (camps.length === 0) {
          try {
            getCampData();
          } catch (e) {
            console.log(e);
          }
        }
      }
      getallCamps();
    },
    [camps]
  );

  return (
    <div
      style={{
        width: "99%",
        border: "3px solid black",
        background: "antiquewhite",
      }}
    >
      <h1>Camp List</h1>
      <div
        className="container"
        style={{ border: "3px solid black", width: "fit-content" }}
      >
        <input name="toilets" type="checkbox" onChange={checkValue} />
        <label htmlFor="toilets">Toilets</label>
        <input name="rv" type="checkbox" onChange={checkValue} />
        <label htmlFor="rv">RV Access</label>
        <input name="cell" type="checkbox" onChange={checkValue} />
        <label htmlFor="cell">Cell Signal</label>
        <br />
        <label htmlFor="limit">
          Number of camps to populate between 0 and 50
        </label>
        <input
          name="limit"
          type="number"
          min="0"
          max="50"
          placeholder="25"
          onChange={changeLimit}
        />
      </div>

      <div
        className="d-flex row-cols-md-3   flex-wrap"
        style={{ marginRight: "50px" }}
      >
        {camps.map((c, index) => (
          <MDBContainer key={c.id}>
            <MDBCard className="p-2 flex-fill ">
              {c.images[0] ? (
                <MDBCardImage src={c.images[0].url} alt="..." position="top" />
              ) : (
                <MDBCardImage
                  src={"../No_Image_Available.jpg"}
                  alt="..."
                  position="top"
                />
              )}
              <MDBCardBody>
                <MDBCardTitle>{c.name}</MDBCardTitle>
                <MDBCardText>{c.description}</MDBCardText>
                <MDBListGroup>
                  <MDBListGroupItem>
                    <b>Toilet:</b> {c.amenities.toilets[0]}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    <b>Cell Signal:</b> {c.amenities.cellPhoneReception}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    Cost:{" "}
                    {c.fees.map((fee) => (
                      <h6>
                        <b>${fee.cost}</b> - {fee.description}
                      </h6>
                    ))}
                  </MDBListGroupItem>
                  {+c.accessibility.rvAllowed ? (
                    <MDBListGroupItem>
                      <b>RV's are allowed!</b>
                    </MDBListGroupItem>
                  ) : (
                    <MDBListGroupItem>
                      <b>
                        RV's are <i>NOT</i> allowed!
                      </b>
                    </MDBListGroupItem>
                  )}
                </MDBListGroup>
              </MDBCardBody>
              <MDBCardLink href={c.reservationUrl}>
                Camp reservation page
              </MDBCardLink>
              <br />

              <MDBCardLink
                data-value={index}
                onClick={addToFavorite}
                className={`btn ${
                  currentUser === null ||
                  (currentUser.camps &&
                    currentUser.camps.some((camp) => camp.parkname === c.name))
                    ? "btn-danger disabled"
                    : "btn-primary"
                }`}
              >
                "Add to Favorites"
              </MDBCardLink>
            </MDBCard>
          </MDBContainer>
        ))}
      </div>
    </div>
  );
}
export default CampList;
