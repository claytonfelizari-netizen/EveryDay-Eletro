# Guia para agentes de IA

Este repositório contém o site da EveryDay-Eletro. Leia este arquivo antes de alterar o projeto.

## Versão oficial

- A versão oficial e publicada é a aplicação Next.js formada por:
  - `app/`
  - `components/`
  - `lib/`
- A página principal é gerada por `app/page.js`.
- O catálogo e os cards são controlados por `components/ProductCatalog.js`.
- Os estilos oficiais estão em `app/globals.css`.
- O arquivo `index.html` da raiz é uma versão antiga e não deve ser usado como base para mudanças no site atual.
- O arquivo `out/index.html` é gerado automaticamente pelo build. Não o edite manualmente.
- A versão aprovada em 23/07/2026 está preservada pela tag Git:
  - `versao-aprovada-2026-07-23`

## Publicação

- O site oficial é `https://everyday-eletro.netlify.app/`.
- A publicação usa a branch `main`.
- O Netlify executa `npm run build`.
- A pasta publicada é `out`, conforme `netlify.toml`.
- Nunca publique sem o usuário pedir explicitamente `publique`.
- Antes de publicar:
  - faça o build;
  - confira a prévia local;
  - inclua somente os arquivos aprovados;
  - preserve alterações locais não relacionadas.

## Como testar

Use:

```sh
npm run build
```

Depois sirva a pasta `out` por um servidor local e abra a prévia pelo navegador.

Verifique sempre:

- produtos carregados;
- filtros de categorias;
- card de detalhes e miniaturas;
- promoção e contador;
- título dos cards em no máximo duas linhas;
- oferta sem sobrepor o título;
- endereço e telefone no rodapé;
- desktop com quatro colunas;
- celular com uma coluna e sem rolagem lateral.

## Estrutura dos produtos

Cada produto usa arquivos com o mesmo número:

```text
produto11.jpg
produto11.txt
```

O carregamento oficial é feito por `lib/products.js`, que procura os produtos de 1 até 200.

Formato recomendado:

```text
Referencia: REF 011
Categoria: ele
Preco: 2499
Imagens: produto11-2.jpg, produto11-3.jpg
Nome curto do produto
Informações adicionais
Ativo: sim
```

Campos aceitos:

- `Referencia:` ou `Referência:`
- `Categoria:`
- `Preco:` ou `Preço:`
- `Imagens:` ou `Imagem:`
- `Consumo:`
- `GastoHora:`
- `Ativo:`

As demais linhas formam a descrição. Na frente do card, somente as duas primeiras informações são usadas no título, limitado a duas linhas. A descrição completa aparece no painel de detalhes.

Categorias atuais:

- `ele` para Eletrônicos.
- `ace` para Acessórios.
- As categorias antigas `arc`, `ven`, `aqu`, `cli` e `pur` continuam reconhecidas pelo componente.

## Endereço da loja

- O endereço oficial vem de `config/endereco.txt`.
- `public/config/endereco.txt` é uma cópia gerada para arquivos públicos.
- O script `scripts/sync-public-assets.js` sincroniza os arquivos antes do desenvolvimento e do build.

## Cuidados importantes

- Não use o `index.html` antigo para corrigir o site publicado.
- Não altere diretamente os arquivos dentro de `out`.
- Não apague imagens ou arquivos de produtos sem confirmar o uso.
- Não misture alterações locais antigas com uma publicação nova.
- Preserve o layout aprovado no desktop ao fazer ajustes exclusivos para celular.
- Mostre a prévia ao usuário antes de publicar mudanças visuais.
