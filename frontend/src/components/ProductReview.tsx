import { gql } from "@apollo/client";
import { useState } from "react";
import { ProductReviewFragment } from "./__generated__/product-review-fragment";

export type Props = {
    readonly product: ProductReviewFragment,
    readonly submitting: boolean,
    readonly onSubmit: ((commentBody: string) => Promise<any>),
};

export const productReviewFlagment = gql`
    fragment ProductReviewFragment on Product {
        reviews {
            id
            commentBody
        }
    }
`;

export default function ProductReview({product, submitting, onSubmit}: Props) {
    const [myComment, setMyComment] = useState("");

    // if (!product) return null;

    return (
        <>
            <div>
                <h2>レビュー</h2>
                {product.reviews.length ? (
                    <ul>
                    {product.reviews.map(r => (
                    <li key={r.id}>{r.commentBody}</li>
                    ))}
                    </ul>
                ) : (
                <p>レビューはまだありません</p>
                )}
            </div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                await onSubmit(myComment);
                
                setMyComment("");
            }}>
                <textarea value={myComment} onChange={(e) => setMyComment(e.target.value)} />
                <button type="submit" disabled={submitting}>送信</button>
            </form>
        </>
    )
}