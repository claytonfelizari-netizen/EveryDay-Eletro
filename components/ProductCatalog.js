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
  { code: "ace", label: "Acessórios" },
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

function ProductGallery({ activeImageIndex = 0, product }) {
  const images = product.images?.length ? product.images : [product.image];
  const activeImage = images[activeImageIndex] || product.image;

  return (
    <div className="product-gallery">
      <img
        className="product-gallery-main"
        decoding="async"
        src={activeImage}
        alt={product.alt}
      />
    </div>
  );
}

function ProductThumbs({ activeImageIndex, product, setActiveImageIndex }) {
  const images = product.images?.length ? product.images : [product.image];

  if (images.length <= 1) return null;

  return (
    <div className="modal-gallery-thumbs" aria-label="Mais imagens do produto">
      {images.map((image, index) => (
        <button
          aria-label={`Ver imagem ${index + 1} do produto ${product.id}`}
          className={`modal-gallery-thumb${
            activeImageIndex === index ? " ativo" : ""
          }`}
          key={image}
          onClick={() => setActiveImageIndex(index)}
          type="button"
        >
          <img decoding="async" loading="eager" src={image} alt="" />
        </button>
      ))}
    </div>
  );
}

function ProductCard({ isPromotional, product, remaining, visible }) {
  const [flipped, setFlipped] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  function toggleDetails(event) {
    event.stopPropagation();
    const nextFlipped = !flipped;
    setFlipped(nextFlipped);

    if (nextFlipped) {
      setModalImageIndex(0);
      setScrollEnabled(false);
      window.setTimeout(() => setScrollEnabled(true), 400);
    } else {
      setScrollEnabled(false);
    }
  }

  return (
    <>
      <article
        className={`product-card${isPromotional ? " promotional-card" : ""}`}
        data-cat={product.category}
        style={{ display: visible ? "block" : "none" }}
      >
        <button
          aria-label="Ver detalhes do produto"
          className="product-card-expand"
          onClick={toggleDetails}
          type="button"
        >
          i
        </button>
        <div className="product-card-inner">
          <div className="card-front">
            <ProductGallery product={product} />
            <div className="product-desc">
              <ProductDescription lines={product.description} />
            </div>
            <div className="product-offer">
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
          </div>
        </div>
      </article>

      {flipped ? (
        <div className="product-detail-overlay" onClick={toggleDetails} role="presentation">
          <article
            className="product-detail-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Fechar detalhes do produto"
              className="product-detail-close"
              onClick={toggleDetails}
              type="button"
            >
              ×
            </button>
            <ProductGallery activeImageIndex={modalImageIndex} product={product} />
            <div className="modal-thumbs-mobile">
              <ProductThumbs
                activeImageIndex={modalImageIndex}
                product={product}
                setActiveImageIndex={setModalImageIndex}
              />
            </div>
            <div className={`card-back${scrollEnabled ? " scroll-on" : ""}`}>
              <div className="back-header">
                <div className="back-heading">Detalhes</div>
                <div className="back-reference">{product.reference}</div>
              </div>
              <div className="back-name">
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
              {product.price ? (
                <div className="back-footer">
                  <div className="back-price-label">Preço</div>
                  {isPromotional && product.promotionalPrice ? (
                    <div className="back-promo-line">
                      <span className="back-price-original">R$ {product.price}</span>
                      <span className="back-promo-badge">
                        {PROMOTION_PERCENTAGE}% desconto
                      </span>
                      <span className="back-price">R$ {product.promotionalPrice}</span>
                    </div>
                  ) : (
                    <div className="back-price">R$ {product.price}</div>
                  )}
                  <ProductThumbs
                    activeImageIndex={modalImageIndex}
                    product={product}
                    setActiveImageIndex={setModalImageIndex}
                  />
                  <a
                    className="card-back-whatsapp"
                    href={`https://wa.me/5544998514184?text=${encodeURIComponent(
                      `Olá! Tenho interesse no produto ${product.reference}: ${product.description.join(" ")}`
                    )}`}
                    onClick={(event) => event.stopPropagation()}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Chamar no WhatsApp
                  </a>
                </div>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}

export default function ProductCatalog({ products }) {
  const productIds = useMemo(() => products.map((product) => product.id), [products]);
  const availableCategories = useMemo(
    () => new Set(products.map((product) => product.category)),
    [products]
  );
  const initialCategory = "todos";
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
    const preloadImages = () => {
      products.forEach((product) => {
        product.images?.forEach((image) => {
          const preload = new Image();
          preload.decoding = "async";
          preload.src = image;
        });
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadImages, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(preloadImages, 800);
    return () => window.clearTimeout(timer);
  }, [products]);

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
