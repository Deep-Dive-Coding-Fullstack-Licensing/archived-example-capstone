import {useState} from "react";

import Switch from "react-switch";
import {Col, Container, Row} from "react-bootstrap";
import {SignInForm} from "../shared/components/main-nav/sign-in/SignInForm.tsx";

export function SignIn() {

    const [checked, setChecked] = useState(false);
    const handleChange = (nextChecked: boolean) => {
        setChecked(nextChecked);
    };
    return (
        <>
            <h1>Sign In to Tweeter</h1>
            <Container>
                <Row>
                    <Col>
                        <SignInForm/>

                </Col>
                </Row>
            </Container>

            <label>
                <span>Switch with default style</span>
            <Switch
                onChange={handleChange}
                checked={checked}
                className="react-switch"
            />
                </label>

        </>
    )
}