"use client";

import { useMemo, useState } from "react";

const PROMOTION_PERCENTAGE = 10;

const categories = [
  { code: "todos", label: "Todos" },
  { code: "arc", label: "Ar-condicionado" },
  { code: "ven", label: "Ventiladores" },
  { code: "aqu", label: "Aquecedores" },
  { code: "cli", label: "Climatizadores" },
  { code: "pur", label: "Purificadores" },
  { code: "ele", label: "Eletrônicos" },
];

function ProductDescription({ lines }) {
  return (
    <>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

function ProductCard({ product, visible }) {
  const [flipped, setFlipped] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  function handleClick() {
    const nextFlipped = !flipped;
    setFlipped(nextFlipped);

    if (nextFlipped) {
      setScrollEnabled(false);
      window.setTimeout(() => setScrollEnabled(true), 400);
    } else {
      setScrollEnabled(false);
    }
  }

  return (
    <article
      className={`product-card${flipped ? " flipped" : ""}`}
      data-cat={product.category}
      onClick={handleClick}
      style={{ display: visible ? "block" : "none" }}
    >
      <div className="product-card-inner">
        <div className="card-front">
          <img src={product.image} alt={product.alt} />
          <div className="product-desc">
            <ProductDescription lines={product.description} />
          </div>
          {product.price && product.promotionalPrice ? (
            <>
              <div className="product-promo-badge">
                {PROMOTION_PERCENTAGE}% OFF
              </div>
              <div className="product-price-original">R$ {product.price}</div>
              <div className="product-price">R$ {product.promotionalPrice}</div>
              <div className="product-price-pix">Promoção por tempo limitado</div>
            </>
          ) : null}
        </div>

        <div className={`card-back${scrollEnabled ? " scroll-on" : ""}`}>
          <div className="product-title">{product.reference}</div>
          <div className="product-desc">
            <ProductDescription lines={product.description} />
          </div>
          {product.consumptionImage ? (
            <img
              src={product.consumptionImage}
              alt="Etiqueta de consumo"
              className="inmetro-img"
            />
          ) : null}
          {product.hourlyCost ? (
            <div className="gasto-hora">
              Consumo estimado por hora: <strong>R$ {product.hourlyCost}</strong>
            </div>
          ) : null}
          {product.category !== "ele" ? (
            <div className="aviso">
              * Valores estimados. Podem variar conforme uso, modelo e
              instalação.
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ProductCatalog({ products }) {
  const availableCategories = useMemo(
    () => new Set(products.map((product) => product.category)),
    [products]
  );
  const initialCategory = availableCategories.has("ele")
    ? "ele"
    : categories.find((category) => availableCategories.has(category.code))?.code ||
      "todos";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  return (
    <>
      <div id="categorias">
        {categories.map((category) => {
          const isAll = category.code === "todos";
          const isVisible = isAll
            ? availableCategories.size > 1
            : availableCategories.has(category.code);

          return (
            <button
              className={`cat-btn${
                activeCategory === category.code ? " ativo" : ""
              }`}
              data-cat={category.code}
              key={category.code}
              onClick={() => setActiveCategory(category.code)}
              style={{ display: isVisible ? "" : "none" }}
              type="button"
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <section className="produtos" id="lista-produtos">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            visible={
              activeCategory === "todos" || product.category === activeCategory
            }
          />
        ))}
      </section>
    </>
  );
}
