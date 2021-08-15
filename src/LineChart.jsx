import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function sanitizedData(chartData) {
    const cleanData = {...chartData};
    [
      "monthlyInvestment",
      "initialInvestment",
      "interestRate",
      "investmentPeriod",
    ].forEach(key => cleanData[key] = Number(chartData[key]));
    return cleanData;
}

function GenerateDataSet(rawChartData) {
    const chartData = sanitizedData(rawChartData);

    let data = {
    labels: [...new Array(chartData.investmentPeriod).keys()],
    datasets: [],
  };

  // Add total cummulative investment
  let investmentList = new Array(chartData.investmentPeriod);
  for (let i = 0; i < investmentList.length; i++) {
    investmentList[i] =
      i === 0
        ? chartData.initialInvestment
        : investmentList[i - 1] + chartData.monthlyInvestment;
  }
  data.datasets.push({
    label: "Inleg",
    data: investmentList,
    fill: false,
    backgroundColor: "rgb(255, 99, 132)",
    borderColor: "rgba(255, 99, 132, 0.2)",
  });

  // Add total cummulative investment
  let totalValueList = new Array(chartData.investmentPeriod);
  const monthlyInterestRate = Math.pow(1 + chartData.interestRate / 100, 1 / 12);
  for (let i = 0; i < totalValueList.length; i++) {
    totalValueList[i] =
      i === 0
        ? chartData.initialInvestment
        : totalValueList[i - 1] * monthlyInterestRate + chartData.monthlyInvestment;
  }
  data.datasets.push({
    label: "Totale waarde",
    data: totalValueList,
    fill: false,
    backgroundColor: "rgb(0, 0, 0)",
    borderColor: "rgba(0, 0, 0, 0.2)",
  });

  // Add cummulative returns
  let returnsList = new Array(chartData.investmentPeriod);
  for (let i = 0; i < returnsList.length; i++) {
    returnsList[i] = totalValueList[i] - investmentList[i];
  }
  data.datasets.push({
    label: "Winst",
    data: returnsList,
    fill: false,
    backgroundColor: "rgb(75, 192, 192)",
    borderColor: "rgba(75, 192, 192, 0.2)",
  });

  return data;
}

export const LineChart = ({ chartData }) => {
  const data = GenerateDataSet(chartData);
  return <Line data={data} options={options} />;
};
