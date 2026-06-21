import ProductCatalog from "../components/ProductCatalog";
import { getProducts, getStoreAddress } from "../lib/products";

export default function Home() {
  const products = getProducts();
  const address = getStoreAddress();

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

        <div className="info2">10% DESCONTO NO PIX</div>
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
          <span id="endereco-loja">{address}</span>
        </p>
        <p>CNPJ: 63.280.662/0001-82</p>
      </footer>
    </>
  );
}
