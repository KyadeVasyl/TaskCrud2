
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function HomePage() {

    const navigate = useNavigate();


    const { data: products, isSuccess } = useQuery({

        queryKey: ['products'],
        queryFn: async () => {

            const response = await fetch('http://localhost:4000/product-list');
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData || 'Упс щось запит провалився');
            }

            return response.json();
        }


    });

    useEffect(() => {
        if (isSuccess) {
            if (products && products.length > 0) {
                navigate('/product-list')
            } else {

                navigate('product-create')
            }
        }
    }, [isSuccess, products, navigate])

    return <div>Loading....</div>


}