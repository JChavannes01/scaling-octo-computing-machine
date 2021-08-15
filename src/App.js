import "./index.css";

import React, { useMemo, useState } from "react";
import { LineChart } from "./LineChart";
import OptionsControl from "./OptionsControl";

const initialOptions = {
  monthlyInvestment: 200,
  initialInvestment: 1000,
  interestRate: 7,
  investmentPeriod: 48,
  extraPeriodes: [],
};

const App = () => {
  const [draftOptions, setDraftOptions] = useState(initialOptions);
  const [options, setOptions] = useState(initialOptions);

  const handleChange = (e) => {
    setDraftOptions({ ...draftOptions, [e.target.name]: e.target.value });
  };

  const chart = useMemo(() => <LineChart chartData={options} />, [options]);

  return (
    <>
      <div className="content">
        <div className="header">
          <h1 className="title">Rente prognose demo</h1>
        </div>
        <hr />
        <h2 className="subtitle">Instellingen</h2>
        <OptionsControl options={draftOptions} handleChange={handleChange} />
        <hr />
        <button className="button" onClick={() => setOptions(draftOptions)}>
          Bereken
        </button>
        <h2 className="subtitle">Resultaat</h2>
        {chart}
      </div>
    </>
  );
};

export default App;
