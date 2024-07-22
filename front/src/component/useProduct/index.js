import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const getData = async () => {
    const response = await fetch('http://localhost:4000/product-list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData || 'Упс щось запит провалився');
    }
    return response.json();
}

export function useProducts() {
    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['products'],
        queryFn: getData,

    }

    );

    useEffect(() => {
        if (isSuccess) {
            console.log('Дані отримано успішно', data);
        } else if (isError) {
            console.log('Помилка при отриманні даних');
        } else if (isLoading) {

            console.log('Дані завантажуються');

        }
    }, [isSuccess, isError, isLoading, data]);


    return { data, isError, isLoading, isSuccess };
}
