import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


const getData = async () => {


    const response = await fetch('http://localhost:4000/product-list', {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        throw new Error('Network response was not ok');

    }

    return response.json();
}


export function useProducts() {


    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['products'],
        queryFn: getData,


    })



    useEffect(() => {
        if (isSuccess) {
            console.log('Data fethced successfully', data)
        }
    }, [isSuccess, data])


    useEffect(() => {
        if (isError) {
            console.log('Error fetching data')
        }
    }, [isError])


    return { data, isError, isLoading, isSuccess }
}

