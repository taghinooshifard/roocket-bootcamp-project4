import { useEffect, useState } from 'react'
import BarChart from '../charts/BarChart'
import LineChart from '../charts/LineChart'
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { Storage } from '../hooks/useStorage';
import { ColorRing } from 'react-loader-spinner';

function Report() {
    const[data,setData] = useState({x:0,y:0})
    const[currentChart,setCurrentChart] = useState("nochart")
    const[isGetting,setIsGetting] = useState(false)
    const selectChartHandler = (e)=>{
        setCurrentChart(e.target.value)
    }
    useEffect(()=>{
        try{
            setIsGetting(true)
            axios.get('https://react-camp-api.roocket.ir/api/admin/dashboard',{
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${localStorage.getItem(Storage.Token)}`
                }
            })
              .then(function (response) {
                // console.log(response.data.data.map((item)=>({x: item.date, y: item.amount})))
                setData(response.data.data.map((item)=>({x: item.date, y: item.amount})))
                setIsGetting(false)
              })
              .catch(function (error) {
                // console.log(error);
                toast.error(error.message, {
                    position: "top-right",
                    theme: "colored",
                    transition: Bounce,
                    });
                // console.log(error.response.data.message)
                toast.error(error.response?.data?.message, {
                    position: "top-right",
                    theme: "colored",
                    transition: Bounce,
                    });
                    setIsGetting(false)

              });

        }
        catch(error){
            console.log(error.message);
            toast.error(error.message, {
                position: "top-right",
                 theme: "colored",
                transition: Bounce,
                });
                setIsGetting(false)

        }
    },[currentChart])

  return (
    // <BarChart/>
    <>
    <div className="flex justify-center items-center gap-2">
    <fieldset  disabled={isGetting} >
        <label htmlFor="chartType">Select Chart Type:</label>
        <select className="shadow-md" name='chartType' onChange={selectChartHandler}>
        <option value="nochart">No chart</option>
        <option value="linechart">linechart</option>
        <option value="barchart">barchart</option>
        </select>
    </fieldset>
        <ColorRing
                        className=" text-white"
                        visible={isGetting}
                        height="30"
                        width="30"
                        color='blue'
                        ariaLabel="three-circles-loading"
                        />
    </div>
    {!isGetting && currentChart == "linechart" && (<LineChart report={data}/>)}
    {!isGetting && currentChart == "barchart" && (<BarChart report={data}/>)}

    </>

  )
}

export default Report
