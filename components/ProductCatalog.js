"use client";

import { useEffect, useMemo, useState } from "react";

const PROMOTION_PERCENTAGE = 10;
const PROMOTION_DURATION_MS = 24 * 60 * 60 * 1000;
const INITIAL_PROMOTIONAL_PRODUCT_ID = 17;
const PROMOTION_EPOCH_MS = Date.UTC(2024, 0, 1);

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

function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function PromotionCountdown({ remaining }) {
  return (
    <div className="promotion-countdown">
      Termina em <strong>{formatCountdown(remaining)}</strong>
    </div>
  );
}

function ProductGallery({ product }) {
  const [activeImage, setActiveImage] = useState(product.image);
  const images = product.images?.length ? product.images : [product.image];

  return (
    <>
      <img className="product-gallery-main" src={activeImage} alt={product.alt} />
      {images.length > 1 ? (
        <div className="product-gallery-thumbs" aria-label="Mais imagens do produto">
          {images.map((image, index) => (
            <button
              aria-label={`Ver imagem ${index + 1} do produto ${product.id}`}
              className={`product-gallery-thumb${
                activeImage === image ? " ativo" : ""
              }`}
              key={image}
              onClick={(event) => {
                event.stopPropagation();
                setActiveImage(image);
              }}
              type="button"
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}

function ProductCard({ isPromotional, product, remaining, visible }) {
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
          <ProductGallery product={product} />
          <div className="product-desc">
            <ProductDescription lines={product.description} />
          </div>
          {isPromotional && product.price && product.promotionalPrice ? (
            <>
              <div className="product-promo-badge">
                {PROMOTION_PERCENTAGE}% OFF
              </div>
              <div className="product-price-original">R$ {product.price}</div>
              <div className="product-price">R$ {product.promotionalPrice}</div>
              <div className="product-price-pix">Promoção por tempo limitado</div>
              <PromotionCountdown remaining={remaining} />
            </>
          ) : product.price ? (
            <div className="product-price">R$ {product.price}</div>
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
  const productIds = useMemo(() => products.map((product) => product.id), [products]);
  const availableCategories = useMemo(
    () => new Set(products.map((product) => product.category)),
    [products]
  );
  const initialCategory = availableCategories.has("ele")
    ? "ele"
    : categories.find((category) => availableCategories.has(category.code))?.code ||
      "todos";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [promotionState, setPromotionState] = useState(() => {
    const baseIndex = productIds.includes(INITIAL_PROMOTIONAL_PRODUCT_ID)
      ? productIds.indexOf(INITIAL_PROMOTIONAL_PRODUCT_ID)
      : 0;
    const cycle = Math.floor((Date.now() - PROMOTION_EPOCH_MS) / PROMOTION_DURATION_MS);
    const promoIndex = productIds.length
      ? (baseIndex + cycle) % productIds.length
      : 0;

    return {
      productId: productIds[promoIndex],
      deadline: PROMOTION_EPOCH_MS + (cycle + 1) * PROMOTION_DURATION_MS,
    };
  });
  const [remaining, setRemaining] = useState(PROMOTION_DURATION_MS);

  useEffect(() => {
    if (!productIds.length) return undefined;

    function updateRemaining() {
      const cycle = Math.floor((Date.now() - PROMOTION_EPOCH_MS) / PROMOTION_DURATION_MS);
      const baseIndex = productIds.includes(INITIAL_PROMOTIONAL_PRODUCT_ID)
        ? productIds.indexOf(INITIAL_PROMOTIONAL_PRODUCT_ID)
        : 0;
      const promoIndex = productIds.length ? (baseIndex + cycle) % productIds.length : 0;
      const nextProductId = productIds[promoIndex];
      const nextDeadline = PROMOTION_EPOCH_MS + (cycle + 1) * PROMOTION_DURATION_MS;
      const nextRemaining = Math.max(0, nextDeadline - Date.now());

      setPromotionState({
        productId: nextProductId,
        deadline: nextDeadline,
      });
      setRemaining(nextRemaining);
    }

    updateRemaining();
    const timer = window.setInterval(updateRemaining, 1000);

    return () => window.clearInterval(timer);
  }, [productIds]);

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
            isPromotional={product.id === promotionState.productId}
            key={product.id}
            product={product}
            remaining={remaining}
            visible={
              activeCategory === "todos" || product.category === activeCategory
            }
          />
        ))}
      </section>
    </>
  );
}
