
"use client";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/commen/Skeleton";
import ErrorState from "@/components/commen/ErrorState";

import {
    getCommentReplies,
} from "@/services/comment.services";
import type { CommentReply } from "@/types/comment";
interface Props {
    commentID: number;
}

export default function ReplyList({
    commentID
}: Props) {
    const {
        data: replies = [],
        isLoading, isError,
    } = useQuery<CommentReply[]>({
        queryKey: [
            "comment-replies",
            commentID,
        ],
        queryFn: () =>
            getCommentReplies(commentID),
    });

    if (isLoading) {
        return <Skeleton count={2} />;
    }


    if (isError) {
        return (
            <ErrorState message="Error loading replies." />
        );
    }


    if (replies.length === 0) {
        return null;
    }










    return (

        <div className="reply-list">

            {replies.map((reply) => (

                <div
                    key={reply.id}
                    className="reply-item"
                >

                    <div className="reply-icon">
                        ↳
                    </div>


                    <div className="reply-content">

                        <div className="reply-header">

                            <span className="reply-user">
                                User #{reply.user}
                            </span>

                        </div>


                        <p className="reply-text">
                            {reply.descriptions}
                        </p>

                    </div>

                </div>

            ))}

        </div>

    );

}
