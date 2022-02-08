import React from 'react';
import { useParams } from "react-router";
import { useState ,useEffect } from 'react';

export default function AddTask() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    let { uid } = useParams();

    useEffect(() => {
      setLoading(true);
      fetch(`http://localhost:3001/tasks/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDataSource(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  
   
    console.log(dataSource.data)
  return (
  <div>
      
  <h2>adding task for {dataSource.data.taskname}</h2>
  </div>
  )
}
