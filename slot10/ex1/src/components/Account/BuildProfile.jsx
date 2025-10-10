// src/components/Account/BuildProfile.jsx
import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";



export default function BuildProfile() {
  const [step, setStep] = useState(1); // 1..3
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!formData.firstName) e.firstName = "First name required";
      if (!formData.lastName) e.lastName = "Last name required";
      if (!formData.email) e.email = "Email required";
    } else if (s === 2) {
      if (!formData.username) e.username = "Username required";
      if (!formData.password) e.password = "Password required";
      if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords must match";
    } else if (s === 3) {
      if (!formData.street) e.street = "Street required";
      if (!formData.city) e.city = "City required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((p) => Math.min(3, p + 1));
  };
  const prev = () => setStep((p) => Math.max(1, p - 1));

  const finish = () => {
    if (validateStep(3)) {
      alert("Profile built (UI only). Data: " + JSON.stringify(formData, null, 2));
    }
  };

  const percent = step === 1 ? 33 : step === 2 ? 67 : 100;

  return (
    <div className="container py-4">
      <h3 className="mb-3 text-warning">Build Your Profile</h3>
      <ProgressBar now={percent} label={`${percent}%`} className="mb-3" />

      <div className="card p-3 bg-dark text-light">
        <Tabs activeKey={step} onSelect={(k) => setStep(Number(k))} className="mb-3">
          <Tab eventKey={1} title={<span> <i className="bi bi-person-circle"></i> About</span>}>
            <AboutForm formData={formData} setFormData={setFormData} errors={errors} />
          </Tab>
          <Tab eventKey={2} title={<span> <i className="bi bi-lock"></i> Account</span>}>
            <AccountForm formData={formData} setFormData={setFormData} errors={errors} />
          </Tab>
          <Tab eventKey={3} title={<span> <i className="bi bi-geo-alt"></i> Address</span>}>
            <AddressForm formData={formData} setFormData={setFormData} errors={errors} />
          </Tab>
        </Tabs>

        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={prev} disabled={step === 1}>Previous</Button>
          {step < 3 ? (
            <Button variant="primary" onClick={next}>Next</Button>
          ) : (
            <Button variant="success" onClick={finish}>Finish</Button>
          )}
        </div>
      </div>
    </div>
  );
}
