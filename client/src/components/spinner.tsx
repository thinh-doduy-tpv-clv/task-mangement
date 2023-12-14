import React from "react";
import { useSelector } from "react-redux";

interface ComponentProps {
  show?: boolean;
}

type Props = ComponentProps;
// function formatNumber(number, decPlaces) {
const Spinner: React.FunctionComponent<Props> = ({ show }: any) => {
  if (show) {
    return (
      <div className={"c-spinner flex items-center justify-center"}>
        <div className={"lds-facebook"}>
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
  return null;
};

export default Spinner;
