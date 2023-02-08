import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, Button } from "reactstrap";

function Home() {
  console.log("INSIDE HOME ROUTE")

    const history = useHistory();
    function handleClick(path) {
      history.push(path);
    }
  
    



  return (
    <main>
      <section className="col-md-8">
        <Card>
          <CardBody className="text-center">
            <CardTitle>
              <h2 className="font-weight-bold">
                Welcome to $inkedIn! $ink into getting more experience!
              </h2>
            </CardTitle>
            <Button color="primary" size="lg" onClick={()=>handleClick("/signup")}>Signup</Button>
            <br />
            <br />
            <Button color="secondary" size="lg" onClick={()=>handleClick("/login")}>Login</Button>
          </CardBody>
     
        </Card>
      </section>
    </main>
  );
}

export default Home;
