"use client";

import useStoreCategories from "@/hooks/shop/StoreCategoryList";
import "./StoreCategoryList.css";
import Skeleton from "@/components/commen/Skeleton";
import ErrorState from "@/components/commen/ErrorState";
import EmptyState from "@/components/commen/EmptyState";

interface Props {
    onSelectCategory: (id: number) => void;
}


export default function StoreCategoryList({
    onSelectCategory,
}: Props) {


    const {
     data: categories = [],isLoading,isError,} = useStoreCategories()


    // ==========================================
    // Loading
    // ==========================================

    if (isLoading) {

        return (
            <div className="store-category-list">

                <Skeleton count={6} />

            </div>
        );

    }


    // ==========================================
    // Error
    // ==========================================

    if (isError) {

        return (
            <div className="store-category-list">

                <ErrorState
                    message="Error loading categories."
                />

            </div>
        );

    }


    // ==========================================
    // Empty
    // ==========================================

    if (categories.length === 0) {

        return (
            <div className="store-category-list">

                <EmptyState
                    message="No categories found."
                />

            </div>
        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <section className="store-category-list">


            <h2>

                Store Categories

            </h2>


            <div className="category-grid">


                {categories.map((category) => (

                    <div

                        key={category.id}

                        className="category-card"

                        onClick={() =>
                            onSelectCategory(
                                category.id
                            )
                        }

                    >

                        <div

                            className="category-icon"

                            dangerouslySetInnerHTML={{
                                __html: category.icon,
                            }}

                        />


                        <h3>

                            {category.name}

                        </h3>


                    </div>

                ))}


            </div>


        </section>

    );

}