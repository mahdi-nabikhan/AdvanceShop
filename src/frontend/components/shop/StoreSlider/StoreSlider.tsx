"use client";

import { useQuery } from "@tanstack/react-query";

import {
    getStoresByCategory,
    CategoryStore,
} from "@/services/shop.services";

import Skeleton from "@/components/commen/Skeleton";
import ErrorState from "@/components/commen/ErrorState";
import EmptyState from "@/components/commen/EmptyState";

import "./StoreSlider.css";

interface Props {
    categoryId: number;
}

export default function StoreSlider({
    categoryId,
}: Props) {
    const {
        data: stores = [],
        isLoading,
        isError,
    } = useQuery<CategoryStore[]>({
        queryKey: [
            "stores-by-category",
            categoryId,
        ],

        queryFn: () =>
            getStoresByCategory(
                categoryId
            ),

        enabled: categoryId !== null,

        staleTime: 10 * 60 * 1000,

        gcTime: 30 * 60 * 1000,
    });

    // Loading
    if (isLoading) {
        return (
            <section className="store-slider">
                <h2>Stores</h2>

                <Skeleton count={4} />
            </section>
        );
    }

    // Error
    if (isError) {
        return (
            <section className="store-slider">
                <h2>Stores</h2>

                <ErrorState
                    message="Error loading stores."
                />
            </section>
        );
    }

    // Empty
    if (stores.length === 0) {
        return (
            <section className="store-slider">
                <h2>Stores</h2>

                <EmptyState
                    message="No stores found."
                />
            </section>
        );
    }

    return (
        <section className="store-slider">
            <h2>Stores</h2>

            <div className="store-row">
                {stores.map((store) => (
                    <div
                        className="store-card"
                        key={store.id}
                    >
                        {store.logo && (
                            <img
                                src={store.logo}
                                alt={store.name}
                            />
                        )}

                        <h3>
                            {store.name}
                        </h3>

                        <button>
                            Visit Store
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}