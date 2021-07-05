import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ProductDetailQuery, ProductDetailQueryVariables } from "./__generated__/product-detail-query";
import { AddReview, AddReviewVariables } from "./__generated__/add-review";
// import { useState } from 'react'
import ProductReview, { productReviewFlagment } from "./ProductReview";

const query = gql`
    ${productReviewFlagment}
    query ProductDetailQuery($pid: ID!) {
        product(id: $pid) {
            id
            name
            description
            ...ProductReviewFragment
        }
    }
`;

const addReviewMutation = gql`
    mutation AddReview($pid: ID!, $commentBody: String!) {
        addReview(productId: $pid, addReviewInput: {
            star: 0,
            commentBody: $commentBody
        }) {
            id
        }
    }
`;

export default function () {
    // const [commentBody, setCommentBody] = useState("");
    const { productId } = useParams<{ readonly productId: string}>();
    const { data, loading, refetch } = useQuery<ProductDetailQuery, ProductDetailQueryVariables>(query, {
        variables: {
            pid: productId
        }
    });
    const [mutate, { loading: submitting }] = useMutation<AddReview, AddReviewVariables>(addReviewMutation)

    if (loading) return <div>loading...</div>;
    if (!data?.product) return <div>not found </div>;
    const { product } = data;

    return (
        <>
            <h1>{product.name}</h1>
            <p style={{ whiteSpace: "pre-wrap" }}>
                {product.description}
                </p>
            <ProductReview product={product} submitting={submitting} onSubmit={(comment: string) => mutate({
                variables: {
                    pid: productId,
                    commentBody: comment
                }
            }).then(() => refetch())} />
        </>
    )
}