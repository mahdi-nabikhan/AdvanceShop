"use client";

import { useState } from "react";
import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import { getProductComments } from "@/services/comment.services";

import CommentCard from "../CommentCard/CommentCard";
import Pagination from "../../../commen/Paginations";
import Skeleton from "@/components/commen/Skeleton";
import ErrorState from "@/components/commen/ErrorState";
import EmptyState from "@/components/commen/EmptyState";


interface IUser {
    id: number;
    email: string;
}


interface IComment {
    id: number;
    descriptions: string;
    status: string;
    user: IUser;
    product: number;
    parent: number | null;
}


interface IResponse {
    links: {
        next: string | null;
        previous: string | null;
    };

    count: number;

    results: IComment[];
}


interface Props {
    productID: number | string;
}


export default function CommentList({
    productID,
}: Props) {

    const [page, setPage] = useState(1);
    const {
        data,
        isLoading,
        isError,
        isFetching,
    } = useQuery<IResponse>({
        queryKey: [
            "product-comments",
            productID,
            page,
        ],

        queryFn: () =>
            getProductComments(
                productID,
                page
            ),

        placeholderData: keepPreviousData,
    });


    if (isLoading) {
        return <Skeleton count={4} />;
    }

    if (isError) {
        return (
            <ErrorState message="Error loading comments." />
        );
    }

    const comments = data?.results ?? [];

    if (comments.length === 0) {
        return (
            <EmptyState message="No comments found." />
        );
    }




    return (

        <div className="comment-list">

            {data?.results.map((comment) => (

                <CommentCard
                    key={comment.id}
                    comment={comment}
                    productID={productID}
                />

            ))}


            <Pagination
                next={data?.links.next ?? null}
                previous={data?.links.previous ?? null}
                loading={isFetching}
                onNext={() =>
                    setPage(prev => prev + 1)
                }
                onPrevious={() =>
                    setPage(prev =>
                        Math.max(1, prev - 1)
                    )
                }
            />

        </div>

    );

}