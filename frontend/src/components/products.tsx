import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom"
import { productsquery, productsqueryVariables } from "./__generated__/productsquery";

// 名前をつけるメリット、モニタリングをしたいときに~~クエリってないと不便
// 命名は慣習的に~queryで終わるが、mutationの名前はわかりゃok
const query = gql`
    query productsquery {
        products {
            id
            name
        }
    }
`;

export default function Products() {
    const { data, loading } = useQuery<productsquery, productsqueryVariables>(query);
    if (loading || !data) return null;
    return (
        <>
            <ul>
                {data.products.map((product) => 
                    (
                        <li key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                {product.name}
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </>
    )
}
