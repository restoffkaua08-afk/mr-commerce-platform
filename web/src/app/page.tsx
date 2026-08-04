"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  brand: "Nike" | "Adidas" | "Lacoste";
  category: string;
  image: string;
  description: string;
  featured?: boolean;
  tag?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Tênis Nike Air Max Excee Masculino",
    brand: "Nike",
    category: "Tênis",
    image: "https://imgnike-a.akamaihd.net/360x360/02732251A2.jpg",
    description: "Uma leitura contemporânea do Air Max 90, com linhas alongadas e conforto para todos os dias.",
    featured: true,
    tag: "Destaque",
  },
  {
    id: 2,
    name: "Tênis Nike SB Force 58 Masculino",
    brand: "Nike",
    category: "Tênis",
    image: "https://imgnike-a.akamaihd.net/360x360/011580IDA2.jpg",
    description: "Durabilidade, flexibilidade e referências do basquete em uma silhueta feita para as ruas.",
    tag: "Popular",
  },
  {
    id: 3,
    name: "Suéter Masculino de Malha Regular",
    brand: "Lacoste",
    category: "Suéter",
    image: "https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dwd842122f/AH1957_166_20.jpg?imwidth=380&impolicy=pctp&imdensity=1",
    description: "Uma peça versátil que equilibra conforto, acabamento refinado e elegância casual.",
    featured: true,
    tag: "Seleção MR",
  },
  {
    id: 4,
    name: "Moletom Masculino Clássico",
    brand: "Lacoste",
    category: "Moletom",
    image: "https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw68e6b590/SH2662_031_24.jpg?imwidth=380&impolicy=pctp&imdensity=1",
    description: "Modelagem clássica, tecido macio e a identidade atemporal da marca.",
  },
  {
    id: 5,
    name: "Calça Esportiva Firebird",
    brand: "Adidas",
    category: "Calça",
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/b2a4ff6d6e6c44a39e8f80a5b8a26631_9366/Calca_Esportiva_Firebird_Preto_KD8315_25_model.jpg",
    description: "O estilo clássico Firebird reinterpretado para uma rotina urbana e contemporânea.",
    featured: true,
    tag: "Ícone",
  },
  {
    id: 6,
    name: "Tênis Lite Racer 4.0",
    brand: "Adidas",
    category: "Tênis",
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/79158bcae8b24765a6dce97ed8b504c7_9366/Tenis_Lite_Racer_4.0_Preto_JJ7367_01_00_standard.jpg",
    description: "Design leve e versátil com amortecimento Cloudfoam para acompanhar o dia inteiro.",
  },
  {
    id: 7,
    name: "Jaqueta Jeans Adicolor Firebird",
    brand: "Adidas",
    category: "Jaqueta",
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cf3deb85af984d44be1731fc748a8d8e_9366/JAQUETA_JEANS_ADICOLOR_FIREBIRD_TRACK_TOP_Azul_KD1517_HM1.jpg",
    description: "Uma nova interpretação em jeans para uma das linhas mais reconhecidas da Adidas.",
  },
  {
    id: 8,
    name: "Jaqueta Corinthians Total 90",
    brand: "Nike",
    category: "Jaqueta",
    image: "https://imgnike-a.akamaihd.net/360x360/061064IDA11.jpg",
    description: "A estética Total 90 retorna em uma peça que celebra uma era marcante do futebol.",
    tag: "Novidade",
  },
];

const brands = ["Todas", "Nike", "Adidas", "Lacoste"];
const categories = ["Todos", "Tênis", "Jaqueta", "Moletom", "Calça", "Suéter"];
const platformCategories = [
  { name: "Eletrônicos", icon: "electronics" },
  { name: "Vestuário", icon: "apparel" },
  { name: "Mobília", icon: "furniture" },
  { name: "Cozinha", icon: "kitchen" },
  { name: "Música", icon: "music" },
] as const;

function Icon({ name, size = 20 }: { name: "search" | "filter" | "heart" | "arrow" | "sun" | "moon" | "menu" | "close" | "shield" | "spark" | "electronics" | "apparel" | "furniture" | "kitchen" | "music"; size?: number }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    filter: <><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="8" cy="7" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="11" cy="17" r="2"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    shield: <path d="M12 2 4.5 5v6.2c0 4.7 3.1 8.9 7.5 10.8 4.4-1.9 7.5-6.1 7.5-10.8V5L12 2Z"/>,
    spark: <path d="m12 3 1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z"/>,
    electronics: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    apparel: <path d="M12 6a2.5 2.5 0 1 0-2.4-3.2M12 6 3.5 13.5a2 2 0 0 0 1.3 3.5h14.4a2 2 0 0 0 1.3-3.5L12 6Z"/>,
    furniture: <><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M4 10a2 2 0 0 0-2 2v5h20v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-2-2ZM5 17v3M19 17v3"/></>,
    kitchen: <><path d="M6 2v8M3 2v5a3 3 0 0 0 6 0V2M6 10v12M16 2v20M16 2c3 2 4 5 4 8h-4"/></>,
    music: <><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function ProductCard({ product, favorite, onFavorite, onOpen }: { product: Product; favorite: boolean; onFavorite: () => void; onOpen: () => void }) {
  return (
    <article className="product-card">
      <div className="product-media">
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button className={`favorite-btn ${favorite ? "is-active" : ""}`} onClick={onFavorite} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}>
          <Icon name="heart" size={18}/>
        </button>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw" unoptimized />
      </div>
      <div className="product-content">
        <div className="product-meta"><span>{product.brand}</span><span>{product.category}</span></div>
        <h3>{product.name}</h3>
        <button className="text-link" onClick={onOpen}>Ver detalhes <Icon name="arrow" size={17}/></button>
      </div>
    </article>
  );
}

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("Todas");
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const storedTheme = localStorage.getItem("mr-theme-v2");
      const storedFavorites = localStorage.getItem("mr-favorites");
      if (storedTheme === "light") setDark(false);
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("mr-theme-v2", dark ? "dark" : "light");
  }, [dark]);

  const filteredProducts = useMemo(() => {
    const term = query
      .trim()
      .toLocaleLowerCase("pt-BR");

    const filtered = products.filter((product) => {
      const productText =
        `${product.name} ${product.brand} ${product.category}`
          .toLocaleLowerCase("pt-BR");

      const matchesSearch =
        !term || productText.includes(term);

      const matchesFavorite =
        pathname !== "/favoritos" ||
        favorites.includes(product.id);

      const matchesBrand =
        brand === "Todas" ||
        product.brand === brand;

      const matchesCategory =
        category === "Todos" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesFavorite &&
        matchesBrand &&
        matchesCategory
      );
    });

    return [...filtered].sort((first, second) => {
      if (sort === "name-asc") {
        return first.name.localeCompare(
          second.name,
          "pt-BR"
        );
      }

      if (sort === "name-desc") {
        return second.name.localeCompare(
          first.name,
          "pt-BR"
        );
      }

      if (sort === "featured") {
        return (
          Number(Boolean(second.featured)) -
          Number(Boolean(first.featured))
        );
      }

      return first.id - second.id;
    });
  }, [
    query,
    brand,
    category,
    sort,
    favorites,
    pathname,
  ]);

  const activeFilterCount =
    Number(brand !== "Todas") +
    Number(category !== "Todos") +
    Number(sort !== "relevance");

  function toggleFavorite(id: number) {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem("mr-favorites", JSON.stringify(next));
      return next;
    });
  }

  function scrollToCatalog() {
    const catalogSection = document.getElementById("explorar");

    if (catalogSection) {
      catalogSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    router.push("/#explorar");
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand" aria-label="MR — página inicial">
          <span className="brand-mark">MR</span>
          <span className="brand-copy"><b>MR</b><small>curadoria inteligente</small></span>
        </Link>
        <nav className={`nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
          <Link className={pathname === "/" ? "current" : ""} href="/" onClick={() => setMenuOpen(false)}>Início</Link>
          <Link href="/#explorar" onClick={() => setMenuOpen(false)}>Explorar</Link>
          <Link href="/#categorias" onClick={() => setMenuOpen(false)}>Categorias</Link>
          <Link className={pathname === "/marcas" ? "current" : ""} href="/marcas" onClick={() => setMenuOpen(false)}>Marcas</Link>
          <Link className={pathname === "/favoritos" ? "current" : ""} href="/favoritos" onClick={() => setMenuOpen(false)}>Favoritos</Link>
          <Link className={pathname === "/sobre" ? "current" : ""} href="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
        </nav>
        <div className="header-actions">
          <Link className="icon-btn favorites-indicator" aria-label={`${favorites.length} ${favorites.length === 1 ? "produto favorito" : "produtos favoritos"}`} href="/favoritos"><Icon name="heart"/><span>{favorites.length}</span></Link>
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}><Icon name={dark ? "sun" : "moon"}/></button>
          <button className="icon-btn menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"><Icon name={menuOpen ? "close" : "menu"}/></button>
        </div>
      </header>

      <main>
        {pathname === "/" && <section className="home-hero" id="inicio">
          <div className="home-glow home-glow-gold"/>
          <div className="home-glow home-glow-soft"/>
          <div className="home-glass">
            <div className="home-shield-stage" aria-hidden="true">
              <div className="home-shield-front" />
            </div>

            <div className="home-slogan">
              <div
                className="home-center-logo"
                role="img"
                aria-label="MR"
              />

              <div
                className="home-gold-divider"
                aria-hidden="true"
              >
                <span />
              </div>

              <h1>
                Descubra escolhas que combinam
                <em> com você.</em>
              </h1>

              <p>
                Produtos selecionados para tornar cada descoberta
                mais simples, relevante e inspiradora.
              </p>

              <button
                className="primary-btn"
                onClick={scrollToCatalog}
              >
                Explorar produtos
                <Icon name="arrow"/>
              </button>
            </div>
          </div>
        </section>}

        {pathname === "/" && <section className="home-about" aria-labelledby="home-about-title">
          <div className="carousel-column" aria-hidden="true">
            <div className="carousel-scene">
              <div className="carousel-ring">
                {products.slice(0, 7).map((product, index) => (
                  <div className="carousel-card" key={product.id} style={{ "--card-index": index } as CSSProperties}>
                    <div className="carousel-face carousel-front">
                      <Image src={product.image} alt="" fill sizes="260px" unoptimized />
                    </div>
                    <div className="carousel-face carousel-back">
                      <Image src={product.image} alt="" fill sizes="260px" unoptimized />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="home-about-copy">
            <span className="kicker">A experiência MR</span>
            <h2 id="home-about-title">Boas escolhas começam com uma nova forma de descobrir.</h2>
            <p>Em meio a tantas opções, encontrar algo que realmente combine com você não deveria ser complicado. A MR organiza produtos, estilos e marcas em uma experiência visual criada para tornar cada descoberta mais clara, interessante e relevante.</p>
            <p>Nós não realizamos vendas. Aproximamos você de produtos selecionados e direcionamos cada escolha para lojas parceiras, com transparência e sem transformar a navegação em um excesso de informações.</p>
            <Link className="text-link about-link" href="/sobre">Conheça a nossa visão <Icon name="arrow"/></Link>
          </div>
        </section>}

        {pathname === "/" && <section className="home-categories" id="categorias" aria-labelledby="home-categories-title">
          <div className="hanger-heading">
            <h2 id="home-categories-title">Categorias</h2>
          </div>
          <p className="categories-intro">Explore universos diferentes e encontre produtos que combinam com cada parte da sua rotina.</p>
          <div className="category-orbits">
            {platformCategories.map((item) => (
              <button className="category-orb" key={item.name} onClick={scrollToCatalog}>
                <span className="category-orb-icon"><Icon name={item.icon} size={38}/></span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
          <div className="gold-glass-divider"><span /></div>
          <div className="curved-carousel" aria-label="Seleção de produtos em movimento">
            <div className="curved-carousel-scene">
              <div className="curved-carousel-ring">
                {[...products, ...products].map((product, index) => (
                  <article className="curved-carousel-panel" key={`${product.id}-${index}`} style={{ "--panel-index": index } as CSSProperties}>
                    <Image src={product.image} alt={product.name} fill sizes="240px" unoptimized />
                    <span><small>{product.category}</small>{product.brand}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>}

        {["/", "/explorar", "/marcas", "/favoritos"].includes(pathname) && <section className={`catalog section page-section ${pathname === "/" ? "home-explore" : ""}`} id={pathname === "/" ? "explorar" : "catalogo"}>
          <div className="section-heading product-heading">
            <h2>
              {pathname === "/favoritos"
                ? "Favoritos"
                : pathname === "/marcas"
                  ? "Produtos por marca"
                  : "Produtos"}
            </h2>
          </div>
          <div className="catalog-tools">
            <label className="search-box">
              <Icon name="search"/>

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Pesquisar produtos"
              />
            </label>

            <div className="standard-filter-control">
              <button
                className="standard-filter-button"
                type="button"
                aria-label="Abrir filtros"
                aria-expanded={filtersOpen}
                aria-controls="standard-filter-panel"
                onClick={() =>
                  setFiltersOpen((current) => !current)
                }
              >
                <Icon name="filter" size={21}/>

                {activeFilterCount > 0 && (
                  <strong>{activeFilterCount}</strong>
                )}
              </button>

              <span>Filtrar</span>
            </div>
          </div>

          {filtersOpen && (
            <section
              className="standard-filter-panel"
              id="standard-filter-panel"
              aria-label="Filtros de produtos"
            >
              <header>
                <h3>Filtros</h3>

                <button
                  type="button"
                  aria-label="Fechar filtros"
                  onClick={() => setFiltersOpen(false)}
                >
                  <Icon name="close" size={18}/>
                </button>
              </header>

              <div className="standard-filter-fields">
                <label>
                  <span>Marca</span>

                  <select
                    value={brand}
                    onChange={(event) =>
                      setBrand(event.target.value)
                    }
                  >
                    {brands.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Categoria</span>

                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Ordenar</span>

                  <select
                    value={sort}
                    onChange={(event) =>
                      setSort(event.target.value)
                    }
                  >
                    <option value="relevance">
                      Relevância
                    </option>

                    <option value="featured">
                      Destaques primeiro
                    </option>

                    <option value="name-asc">
                      Nome: A–Z
                    </option>

                    <option value="name-desc">
                      Nome: Z–A
                    </option>
                  </select>
                </label>
              </div>

              <footer>
                <button
                  className="standard-filter-clear"
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setBrand("Todas");
                    setCategory("Todos");
                    setSort("relevance");
                  }}
                >
                  Limpar
                </button>

                <button
                  className="standard-filter-apply"
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                >
                  Aplicar
                </button>
              </footer>
            </section>
          )}

          <div className="results-meta">
            <span>
              {filteredProducts.length}
              {filteredProducts.length === 1
                ? " produto"
                : " produtos"}
            </span>
          </div>
          {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={() => toggleFavorite(product.id)} onOpen={() => setSelected(product)}/>)}</div> : <div className="empty-state"><Icon name="search" size={32}/><h3>Nenhum produto encontrado</h3><p>Tente remover um filtro ou pesquisar outro termo.</p><button className="secondary-btn" onClick={() => { setQuery(""); setBrand("Todas"); setCategory("Todos"); }}>Limpar filtros</button></div>}
        </section>}

        {pathname === "/sobre" && <section className="manifesto section page-section" id="sobre">
          <div className="manifesto-mark">MR</div>
          <div><span className="kicker">Por trás da MR</span><h2>Escolher melhor começa por enxergar melhor.</h2></div>
          <div className="manifesto-copy"><p>A MR não vende produtos. Reunimos seleções de lojas oficiais e simplificamos sua descoberta. Ao escolher uma oferta, você segue para o parceiro responsável pela venda.</p><p>Alguns links podem gerar comissão para a MR, sem custo adicional para você. Transparência faz parte da experiência.</p></div>
        </section>}
      </main>

      <footer><div className="footer-top"><div className="footer-brand"><span className="brand-mark">MR</span><div><b>MR</b><p>A visão de hoje constrói o amanhã.</p></div></div><div><span>Explore</span><Link href="/#explorar">Produtos</Link><Link href="/#categorias">Categorias</Link><Link href="/marcas">Marcas</Link></div><div><span>Institucional</span><Link href="/sobre">Sobre a MR</Link><Link href="/sobre">Transparência</Link><Link href="/sobre">Privacidade</Link></div></div><div className="footer-bottom"><span>© 2026 MR. Todos os direitos reservados.</span><span>Catálogo independente com redirecionamento para parceiros.</span></div></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close icon-btn" onClick={() => setSelected(null)} aria-label="Fechar detalhes"><Icon name="close"/></button><div className="modal-image"><Image src={selected.image} alt={selected.name} fill sizes="(max-width: 720px) 100vw, 50vw" priority unoptimized /></div><div className="modal-content"><span className="kicker">{selected.brand} · {selected.category}</span><h2 id="modal-title">{selected.name}</h2><p>{selected.description}</p><div className="affiliate-note"><Icon name="shield"/><span><b>Compra segura na loja parceira</b><small>A MR não processa pagamentos. Você será direcionado à loja oficial.</small></span></div><button className="primary-btn" onClick={() => alert("Demo: no sistema oficial, este botão abrirá o link de afiliado rastreado.")}>Ir para a loja parceira <Icon name="arrow"/></button><button className={`secondary-btn modal-favorite ${favorites.includes(selected.id) ? "is-active" : ""}`} onClick={() => toggleFavorite(selected.id)}><Icon name="heart"/>{favorites.includes(selected.id) ? "Remover dos favoritos" : "Salvar nos favoritos"}</button></div></section></div>}
    </div>
  );
}
