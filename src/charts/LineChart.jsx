import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import PropTypes from 'prop-types'

 ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  }
function LineChart({report}) {
    let data = {
        datasets: [{
          label: 'Sale 2024',
          data: report,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(20, 100, 200, 0.5)',
        }]
      }
    return (
        <Line data={data} options={options}/>
      )
}
LineChart.propTypes={
    report:PropTypes.array
}
export default LineChart
