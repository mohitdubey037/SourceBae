import * as actionTypes from "./actionTypes";

export const Notification = (notification) => {
  return {
    type: actionTypes.NOTIFICATION,
    notification: notification,
  };
};
