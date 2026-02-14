import { useContext, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { Card, Searching } from "../components/index";

import style from "../styles/general.module.css";

export const СatalogPage = () => {
  const { products } = useContext(AppContext);
  const [searchFilter, setSearchFilter] = useState("");

  const handleSearchChange = (value) => {
    setSearchFilter(value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  return (
    <>
      <Searching onSearchChange={handleSearchChange} />
      <div className={style.mainContent}>
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
