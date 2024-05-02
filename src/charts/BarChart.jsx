import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import PropTypes from 'prop-types'
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
// const data = {
//     "data": [
//       {
//         "date": "1403/01/01",
//         "amount": 34234
//       },
//       {
//         "date": "1403/01/01",
//         "amount": 23423
//       },      {
//         "date": "1403/01/01",
//         "amount": 23435
//       },
//       {
//         "date": "1403/01/01",
//         "amount": 65765
//       },      {
//         "date": "1403/01/01",
//         "amount": 67657
//       },      {
//         "date": "1403/01/01",
//         "amount": 45645
//       }
//     ]
//   }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  }
function BarChart({report}) {
    let data = {
        datasets: [{
          label: 'Sale 2024',
          data: report,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(20, 100, 200, 0.5)',
        }]
      }
  return (
    <Bar data={data} options={options}/>
  )
}
BarChart.propTypes={
    report:PropTypes.array
}
export default BarChart
