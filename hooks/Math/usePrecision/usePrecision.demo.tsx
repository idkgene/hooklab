import { useState } from "react";
import { usePrecision } from "./usePrecision";

const UsePrecisionDemo = () => {
  const [value, setValue] = useState(3.14159265);
  const [precision, setPrecision] = useState(2);
  const formattedValue = usePrecision({ precision, value });

  return (
    <div>
      <label>
        Value:
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Precision:
        <input
          type="number"
          value={precision}
          onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
        />
      </label>
      <p>Formatted Value: {formattedValue}</p>
    </div>
  );
};

export default UsePrecisionDemo