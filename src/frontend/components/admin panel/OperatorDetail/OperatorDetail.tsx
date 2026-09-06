
"use client";

import { useQuery } from "@tanstack/react-query";

import {
    getOperatorDetail,
} from "@/services/shop-admin-panel.services";

import {
    shopAdminQueryKeys,
} from "@/Lib/query-keys/shopadmin.keys";

import Skeleton from "@/components/commen/Skeleton";
import ErrorState from "@/components/commen/ErrorState";
import EmptyState from "@/components/commen/EmptyState";

import "./OperatorDetail.css";


interface Props {
    operatorId: number | string;
}


export default function OperatorDetail({
    operatorId,
}: Props) {

    const {
        data: operator,
        isLoading,
        isError,
    } = useQuery({
        queryKey:
            shopAdminQueryKeys.operator(operatorId),

        queryFn: () =>
            getOperatorDetail(operatorId),
    });


    if (isLoading) {
        return (
            <div className="operator-detail-page">
                <Skeleton count={4} />
            </div>
        );
    }


    if (isError) {
        return (
            <div className="operator-detail-page">
                <ErrorState
                    message="Failed to load operator."
                />
            </div>
        );
    }


    if (!operator) {
        return (
            <div className="operator-detail-page">
                <EmptyState
                    message="Operator not found."
                />
            </div>
        );
    }


    return (
        <div className="operator-detail-page">

            <div className="operator-detail-card">

                <div className="operator-avatar">
                    {operator.user.email
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <h1>
                    {operator.username ||
                        "No Username"}
                </h1>

                <span className="role-badge">
                    Operator
                </span>

                <div className="detail-grid">

                    <div>
                        <span>Email</span>

                        <strong>
                            {operator.user.email}
                        </strong>
                    </div>

                    <div>
                        <span>Username</span>

                        <strong>
                            {operator.username || "-"}
                        </strong>
                    </div>

                </div>

                <div className="button-group">

                    <button className="update-btn">
                        Update Operator
                    </button>

                    <button className="password-btn">
                        Change Password
                    </button>

                    <button className="delete-btn">
                        Delete Operator
                    </button>

                </div>

            </div>

        </div>
    );
}

