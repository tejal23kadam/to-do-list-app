import React, { useState , useEffect} from 'react'
import axios from 'axios';
function Axio() {

    // const [no, Setno] = useState(0)

    const [datas,Setdata] = useState([]);
    useEffect(() => {
      
            // alert(`${no}`);

            axios.get('https://fakestoreapi.com/products')
            .then(function (response) {
            // handle success
            console.log(response);

            Setdata(response.data);

            console.log("hhh",datas);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
  })
      
    },[])
    
    return (

        <>
            {/* <h1>{no}</h1>
            <div onClick={()=>Setno(no+1)}>Count</div> */}

            {

                datas.map((i)=>{
                    return <li>

                        {i.id} <br></br>
                        {i.title}
                    </li>
                })
            }
        </>





    )
}

export default Axio