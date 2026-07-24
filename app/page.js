import ProductCatalog from "../components/ProductCatalog";
import { getProducts, getStoreAddress } from "../lib/products";
import Link from "next/link";

export default function Home() {
  const products = getProducts();
  const address = getStoreAddress();
  const pickupAddress = address.replace(/\s*-\s*na loja Gabba/i, "");

  return (
    <>
      <section className="faixa-azul">
        <div className="logo-bloco">
          <div className="logo" aria-label="Logo EveryDay-Eletro">
            <img
              src="/logo.png"
              alt="EveryDay-Eletro - Produtos para seu dia a dia"
            />
          </div>
        </div>

        <div className="info2">ATÉ 10% DE DESCONTO EM PRODUTOS SELECIONADOS</div>
      </section>

      <img
        src="/banner-eletronicos.png"
        className="topo-img"
        alt="Eletronicos e acessorios EveryDay-Eletro"
      />

      <ProductCatalog products={products} />

      <a
        className="whats-float"
        href="https://wa.me/5544998514184"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="whats-btn">WhatsApp</div>
      </a>

      <footer className="rodape">
        <p>
          <strong>EveryDay-Eletro</strong>
        </p>
        <p>
          <strong>Endereco para coleta:</strong>
          <br />
          <span id="endereco-loja">
            {pickupAddress}
            <br />
            <span className="pickup-store-highlight">LOJA GABBA</span>
          </span>
        </p>
        <p>CNPJ: 63.280.662/0001-82</p>
        <p>
          <Link className="footer-privacy-link" href="/politica-de-privacidade">
            Política de Privacidade
          </Link>
        </p>
      </footer>
    </>
  );
}
