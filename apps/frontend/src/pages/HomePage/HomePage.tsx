import "./HomePage.scss";

import MapRender from "../../components/MapRender/MapRender.tsx";
import HeaderBar from "../../components/HeaderBar/HeaderBar.tsx";
import FooterBar from "../../components/FooterBar/FooterBar.tsx";
import Card from "../../components/Card/Card.tsx";
import {
  Button,
  InputType,
  LargeTextInput,
  SelectionInput,
  SelectionInputItem,
} from "../../components/Inputs/Inputs.tsx";
import { useState } from "react";

type ServiceRequest = {
  type: string;
  details: string;
  state: string;
};
function HomePage() {
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest>({
    type: "",
    details: "",
    state: "none",
  });

  return (
    <div className="home-page">
      <aside className="info-bar">
        <HeaderBar />
        {serviceRequest.state == "none" && (
          <>
            <section className="body">
              <h1 className="level">Level 1</h1>
              <hr className="rule" />
              <ul className="list">
                <li className="item">Point of interest 1</li>
                <li className="item">Point of interest 2</li>
                <li className="item selected">Point of interest 3</li>
                <li className="item">Point of interest 4</li>
                <li className="item">Point of interest 5</li>
                <li className="item">Point of interest 6</li>
              </ul>
            </section>
            <div
              onClick={() => {
                setServiceRequest({ ...serviceRequest, state: "writing" });
              }}
            >
              <FooterBar />
            </div>
          </>
        )}
        {serviceRequest.state == "writing" && (
          <section className={"body"}>
            <Card>
              <h2>Request Service</h2>
              <SelectionInput
                onChange={(s) => {
                  setServiceRequest({ ...serviceRequest, type: s });
                }}
                type={InputType.Blue}
                placeholder={"Select a Service"}
                label={"Service"}
              >
                <SelectionInputItem>Elevator</SelectionInputItem>
                <SelectionInputItem>Power</SelectionInputItem>
                <SelectionInputItem>Plumbing</SelectionInputItem>
                <SelectionInputItem>Cleaning</SelectionInputItem>
              </SelectionInput>
              <LargeTextInput
                onChange={(s) => {
                  setServiceRequest({ ...serviceRequest, details: s });
                }}
                type={InputType.Blue}
                placeholder={"write here...."}
                label={"Please provide details:"}
              />
              <Button
                onClick={() => {
                  setServiceRequest({ ...serviceRequest, state: "submitted" });
                }}
                type={InputType.Blue}
              >
                Submit
              </Button>
              <a
                onClick={() => {
                  setServiceRequest({
                    ...serviceRequest,
                    state: "none",
                    details: "none",
                    type: "",
                  });
                }}
              >
                {" "}
                &lt; Cancel
              </a>
            </Card>
          </section>
        )}
        {serviceRequest.state == "submitted" && (
          <section className={"body"}>
            <Card>
              <h2>We're On Our Way!</h2>
              <p>
                Your request for {serviceRequest.type} was received. Our team
                will take care of it as soon as possible.
              </p>
              <p>
                Additional details:
                <br />
                {serviceRequest.details.length > 0
                  ? serviceRequest.details
                  : "none"}
              </p>
              <Button
                onClick={() => {
                  setServiceRequest({ ...serviceRequest, state: "none" });
                }}
                type={InputType.Blue}
              >
                Done
              </Button>
            </Card>
          </section>
        )}
      </aside>
      <MapRender level={"1"} />
    </div>
  );
}

export default HomePage;
