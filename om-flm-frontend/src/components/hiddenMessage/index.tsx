import * as React from "react";

type Props = {
  children?: React.ReactNode;
};
function HiddenMessage({ children }: Props) {
  const [showMessage, setShowMessage] = React.useState(false);
  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        id="toggle"
        type="checkbox"
        data-testid="toggle"
        onChange={(e) => setShowMessage(e.target.checked)}
        checked={showMessage}
      />
      {showMessage ? children : null}
    </div>
  );
}
export default HiddenMessage;
