/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import instance from "../../../Constants/axiosConstants";
// import Rules_edit from "../../../assets/images/Newestdashboard/Agency-Profile/Agency-Rules_edit.svg";

import check from "../../../assets/images/Newestdashboard/Agency-Profile/check.png";
import cancel from "../../../assets/images/Newestdashboard/Agency-Profile/cancel.png";

import "./Rules.css";

function Rules(props) {
  const Role = localStorage.getItem("role");
  const [agencyProfiledata, setAgencyProfileData] = useState({});

  const [rules, setRules] = useState([]);
  const [editRules, setEditRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    agencyTiming: {
      startTime: props?.data?.agencyTiming?.startTime
        ? props?.data?.agencyTiming?.startTime
        : "11:00 AM",
      endTime: props?.data?.agencyTiming?.endTime
        ? props?.data?.agencyTiming?.endTime
        : "08:00 PM",
    },
  });

  const handalLoading = () => {
    setEditRules(false);
  }

  const handleEditRules = (value) => {
    setLoading(true);
    setEditRules(value);
    const id = localStorage.getItem("userId");
    instance
      .patch(`/api/${Role}/agencies/update/${id}`, {
        agencyRules: rules.map((rules) => {
          return {
            ruleId: rules.ruleId._id,
            selection: rules.selection,
          };
        }),
        agencyTiming: { ...form.agencyTiming },
      })
      .then((response) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const permanentDisable = (name) => {
    if (name === "startTime" || name === "endTime") {
      return false;
    } else return true;
  };

  const getAgencyProfile = (agencyId, profileviewStatus) => {
    let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
    instance
      .get(`/api/${Role}/agencies/get/${agencyId}${addParam}`)
      .then(function (response) {
        setAgencyProfileData(response);
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    if (Role === "Agency") {
      getAgencyProfile(localStorage.getItem("userId"), false);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      agencyTiming: {
        ...form.agencyTiming,
        [name]: value,
      },
    });
  };

  const handleRules = (event, rule) => {
    const { value } = event.target;
    let tempArr = [...rules];
    let index = tempArr.indexOf(rule);
    tempArr[index].selection = value === "true" ? true : false;
    setRules(tempArr);
  };

  useEffect(() => {
    setRules(props.data.agencyRules);
  }, []);

  useEffect(() => {
  }, [rules]);

  return (
    <>
      <div className="mainRules">
        <div className="innerRules">
          {Role === "Agency"
            ? agencyProfiledata.isAgencyVerified && (
                <div className="editableBtn_rules">
                  <div className="rules_parent">
                    <p>AGENCY RULES</p>
                  </div>
                  <i
                    onClick={() => {
                      setEditRules(true);
                    }}
                    class="fa fa-pencil-square-o Edit-icon_information"
                    aria-hidden="true"
                  ></i>
                </div>
              )
            : null}
          <div className="rulesCard">
            <div className="rulesUpper">
              <div className="openTiming">
                <h4>
                  <i class="fa fa-clock-o" aria-hidden="true"></i>Default
                  Opening & Closing Time
                </h4>
                {/* <div className="default_timings"> */}
                {/* <p>Default Timings:</p> */}
                {/* <p>9:00AM to 5:00PM</p> */}
                <div className="date_parent">
                  <input
                    style={{
                      outline: editRules ? "none" : "none",
                      width: "40%",
                      border:
                        permanentDisable("startTime") || !editRules
                          ? "none"
                          : "1px solid #02044a",
                      textAlign: "center",
                    }}
                    disabled={permanentDisable("startTime") || !editRules}
                    type="text"
                    defaultValue={form.agencyTiming.startTime}
                    name="startTime"
                    onChange={(event) => handleChange(event)}
                    id=""
                  />
                  {/* </div> */}
                  <p style={{ marginTop: "0" }}>To</p>
                  <input
                    style={{
                      outline: editRules ? "none" : "none",
                      width: "40%",
                      border:
                        permanentDisable("endTime") || !editRules
                          ? "none"
                          : "1px solid #02044a",
                      textAlign: "center",
                    }}
                    disabled={permanentDisable("endTime") || !editRules}
                    type="text"
                    defaultValue={form.agencyTiming.endTime}
                    name="endTime"
                    onChange={(event) => handleChange(event)}
                    id=""
                  />
                  {/* </div> */}
                </div>
              </div>
              <div className="weekendOpening">
                <h4>
                  <i class="fa fa-calendar" aria-hidden="true"></i>Weekend Open
                </h4>
                <p>Yes</p>
              </div>
            </div>

            <div
              className="rulesQuestions"
              style={{ marginTop: editRules && "15px" }}
            >
              {rules.length > 0
                ? rules.map((value) => {
                    return (
                      <div
                        className={`questionPart ${
                          editRules === false && "conditionalPadding"
                        }`}
                      >
                        <div className="leftQuestion">
                          <p>{value?.ruleId.rule}</p>
                        </div>

                        {!editRules && (
                          <div className="rulesMark">
                            {value?.selection ? (
                              <img
                                className="check-img"
                                src={check}
                                alt="check"
                              />
                            ) : (
                              <img
                                className="cancel-img"
                                src={cancel}
                                alt="cancel"
                              />
                            )}
                          </div>
                        )}

                        {editRules && (
                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label={value?._id}
                              name={value?._id}
                              value={`${value?.selection}`}
                              onChange={(event) => handleRules(event, value)}
                            >
                              <FormControlLabel
                                value="true"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="false"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        )}
                      </div>
                    );
                  })
                : "There are no rules available for this Agency."}
              {editRules && (<div className="handleButtons">
                <div className="submitEditBtn">
                  <div
                    onClick={() => {
                      handleEditRules(false);
                    }}
                    className="information_save_parent"
                  >
                    <div className="information_save">
                      <p>Submit</p>
                    </div>
                  </div>
                </div>
                <div onClick={handalLoading} className="submitEditBtn">
                        <div className="information_cancel">
                            <p>Cancel</p>
                        </div>
                    </div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rules;
