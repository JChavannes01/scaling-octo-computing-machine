import React from "react";
import "./settings.css";

const OptionsControl = ({ options, handleChange }) => {
  return (
    <div className="container">
      <table className="settings">
        <tbody>
          <tr>
            <td className="label">Initiele inleg: </td>
            <td>
              <input
                name="initialInvestment"
                type="number"
                min="0"
                value={options.initialInvestment}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label">Maandelijkse inleg: </td>
            <td>
              <input
                name="monthlyInvestment"
                type="number"
                min="0"
                value={options.monthlyInvestment}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table className="settings right">
        <tbody>
        <tr>
            <td className="label">Rente percentage: </td>
            <td>
              <input
                name="interestRate"
                type="number"
                value={options.interestRate}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label">Duur in maanden: </td>
            <td>
              <input
                name="investmentPeriod"
                type="number"
                min="0"
                max="60"
                value={options.investmentPeriod}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OptionsControl;
