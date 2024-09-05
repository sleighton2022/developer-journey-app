import React, { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useGetIncidentsQuery, useGetUserQuery} from 'src/redux/apiSlice';
import {Incident} from "src/models/Incident";

export default function ListIncidents() {
    const [incidents, setListOfIncidents] = React.useState([]);
    const {
        data: incidentsData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetIncidentsQuery();

    //const [incidentsData2, setIncidents] = useState([])
    //setIncidents(incidentsData);

    //alert(isLoading);
    if (!isLoading) {
        let i = 1;
        const incidentsData2 = incidentsData?.map((item) => ({
            phone: item.phone,
            category: item.category,
            description: item.description,
            id: i++
        }))
        return (
            <section className="bg-slate-800 text-slate-100 rounded-l-xl p-8 col-span-3 space-y-4">
                <table border={1}>
                    <thead>
                    <tr>
                        <th>Phone</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {incidentsData2?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.phone}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        )
    }
    else
        return (
            <div>is loading</div>
        )
}
