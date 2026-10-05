import { useState } from "react";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
  }
`;

const c = {
  primary: "#173124",
  secondary: "#625e54",
  tertiary: "#521801",
  surface: "#fbf9f5",
  onSurface: "#1b1c1a",
  onSurfaceVariant: "#424844",
  surfaceContainer: "#efeeea",
  surfaceContainerLow: "#f5f3ef",
  surfaceContainerHigh: "#eae8e4",
  surfaceContainerLowest: "#ffffff",
  outline: "#727973",
  onPrimary: "#ffffff",
};

const menuItems = [
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi8EpZCNFZ17_udIx2GQuksaRhUVVZyza9tlbdlLv2YKwMazvtwZzOlpQx6uzHgSRLyxpGDc9sLMJP29POJShrshhlx-T0dyTD1lmm73_K3_ESQa71RTkKwzoXZoTjNCHqlyXx5W8j7Nw4QmWeZHE8YpNe_MunlEJX36-SkEOKnU7qaRWQGfnSDt-ihedd-SyY6PHC6fVk-tJ_SUsuV_3TJJ8J1INRdP5IFFphZ2aGMqvNV0vpegnWzSOOupnbtOD9riDyIRkzrc4",
    alt: "Heirloom Tomato Salad",
    title: "Wild Harvested Greens",
    price: "$18",
    desc: "Compressed cucumber, locally sourced goat cheese, and a vinaigrette of cold-pressed olive oil and aged balsamic.",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlk_EuZaUKEGVa_614z7Oxhav_fuGmarDXu-tI12Ub0SQLxAtWCbQcEk04DKLOo9-xKMoIZHF2YmIeyBOjEcL1fhXOtJdo4Y1563H8QxqsWgUcD0RD22G5laGD5WCw8dtuk4LP7OnY6jTmu0_oLfW_PC_TG7mKTI5BTzA8C0wD1RTr-Q_XOgq69ASpb-bST1as5Dl2oPbV1soRVw9HJhcd_U4_nLTsRqNUVJ3adPwBrI9JGLTaq-_vnrdfl_ONgcaninW5_vQqVHg",
    alt: "Cedar Plank Salmon",
    title: "Pacific Coast Salmon",
    price: "$34",
    desc: "Pan-seared skin-on fillet, cauliflower purée, charred broccolini, and a delicate lemon-caper emulsion.",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuu0b6l_mg_FAmCRo2Vvs2AUgIKFy5zwce387hDfcnSwEwvL6hxw3TmZXYj4lby6STRv5g1Y2AyhbFF3eLoVj_4UPL_VTOZK2Lluy3w-qWBNZBIh1xcPEpIIANhutOMYltUIzxi77HS7WXQAODuEFokEC93WJ9n_SnmOk4pl4X9Uk60Eazsoye8PakBmkrLyhV91Fnv9UosbMwVyuf548SVOTplIxHYIddg5Z6BsDByrJMy8vkjvbFqH_nTVo3d9Zz2SzapQp9_58",
    alt: "Artisan Chocolate Mousse",
    title: "Obsidian Cacao",
    price: "$16",
    desc: "70% dark chocolate ganache, sea salt flakes, and a textures of raspberry including crisp meringue shards.",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeXy3oNaBOLZC1zr8oRjl0yUwEDtooFXBMTvQPB9ncD2wXkBA-HI-twh3b6vLQOsihWQI0WbrXPg59wQZ35k-F-yMrqOpjoJKlc8KHgwxHNeV8o2eumiCX8_gWn4UoqX2hX-Yz23dlLLEOMGmEvMDd6jOG2ZW-VPmA2PxPxFx5kLKdJl6MV0lShxWpTLyuzK7vA8CYvemF1ubhOM8KbbJHRNePEHkyNrmX3ZaHGxNF0bGN_et6lJeughQSDhayQF4CkaHq_R7Lucs",
    alt: "Grass Fed Ribeye",
    title: "Prime Dry-Aged Ribeye",
    price: "$52",
    desc: "45-day aged beef, smoked marrow butter, roasted fingerling potatoes, and garden herb chimichurri.",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC8YP0NJF0Usj8rfSNQWveosmKf-q9psDed0LLBLd5ffKJl_3P1mQvQ3DYnge1WOlEvfFS9ccBTZZsvyyl8jVrhDetdEkbY3B0dT9WaL9Y0LHFd_RgTcOQEVLxQ1fujPGyU8yfcYbD_72qmiyyj8L6X7Xl5U0Gu9Q8o7NxkO5Vv7U095L5Bujoo8N0-WDnR-PKSu5pzDxiw6RXv5fSbDDxBQDM0A36w7QTAh4DRvlEo1nSg5p0OKPTH_nSWZ5pl-aciLOQ-mzldDY",
    alt: "Winter Harvest Soup",
    title: "Roasted Kabocha Velvet",
    price: "$14",
    desc: "Silky squash bisque, toasted pepitas, sage-infused oil, and a touch of nutmeg creme fraiche.",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHhq9LE1lmxbX-RkgeomYlGmOGH8TtWQ3JB49WURcBgJ6ptI311lcRAz5MIKJBawKVm1w95WPEqXG_G9Zshbe1GVt8Ed-CxHv8C_Er1rmnuKO_K5QMVqrPzHUZ16IGERy7p1IvcR5QWqeMRifeDM9NYgU9smdSSHh5qSMu3DgmvZfBav8mVVbUO8TKYw3-EJDFkRnNiIFA2bZeaTCGGDjxRAaoi3HRa5hKre0eo81YRcQLrV81dFI4adgjB9dKjZ_5vCaP_0nxz_I",
    alt: "Signature Botanical Cocktail",
    title: "The Editorial Gin & Tonic",
    price: "$19",
    desc: "Artisanal small-batch gin, hand-pressed elderflower, fever-tree mediterranean tonic, and aromatic lavender.",
  },
];

const categories = ["All Items", "Starters", "Mains", "Desserts", "Beverages"];

function MenuItem({ img, alt, title, price, desc }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        aspectRatio: "4/5", overflow: "hidden", borderRadius: "12px",
        backgroundColor: c.surfaceContainer, marginBottom: "24px", position: "relative"
      }}>
        <img
          alt={alt}
          src={img}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.7s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)"
          }}
        />
        <button style={{
          position: "absolute", bottom: "16px", right: "16px",
          backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)",
          padding: "16px", borderRadius: "9999px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "none", cursor: "pointer",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s, transform 0.3s"
        }}>
          <span className="material-symbols-outlined" style={{ color: c.primary }}>add_shopping_cart</span>
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <h3 style={{
          fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 700,
          letterSpacing: "-0.025em", color: c.onSurface
        }}>{title}</h3>
        <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.25rem", color: c.primary }}>{price}</span>
      </div>
      <p style={{ color: c.onSurfaceVariant, fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>{desc}</p>
    </article>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [search, setSearch] = useState("");

  return (
    <>
      <style>{fontStyle}</style>
      <div style={{ backgroundColor: c.surface, color: c.onSurface, fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>

        {/* Header */}
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          backgroundColor: c.surface
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            width: "100%", padding: "24px 32px", maxWidth: "1280px", margin: "0 auto", boxSizing: "border-box"
          }}>
            <a href="#" style={{
              fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 700,
              color: c.primary, textDecoration: "none"
            }}>The Culinary Editorial</a>
            <nav style={{ display: "flex", alignItems: "center", gap: "32px", fontFamily: "'Noto Serif', serif", fontSize: "1.125rem", letterSpacing: "-0.025em" }}>
              <a href="#" style={{ color: c.primary, borderBottom: `2px solid ${c.primary}`, paddingBottom: "4px", textDecoration: "none" }}>Menu</a>
              <a href="#" style={{ color: c.secondary, textDecoration: "none" }}>About</a>
              <a href="#" style={{ color: c.secondary, textDecoration: "none" }}>Contact</a>
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button style={{ padding: "8px", color: c.primary, background: "none", border: "none", cursor: "pointer" }}>
                <span className="material-symbols-outlined">shopping_bag</span>
              </button>
              <div style={{ width: "40px", height: "40px", borderRadius: "9999px", overflow: "hidden", border: "1px solid rgba(194,200,194,0.2)" }}>
                <img
                  alt="Customer Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBvAVRC1DmGbtqUIgDGYHaG7g7MPrG1B8XbZqy2tasYGdK8REoEosD21rkE4wtZIztKYy7c8KU8HMGnMF8hx7dpxg8NlAzc-Xcdvd9q7S0XDS4irg8qxpI6DMS3qosvidTX3ewhusvcr9idaSMydnif47vBhTMzuT-oPI6a2MIp1c0S7dybxsyEEFqHuubjHH6k-NdJTvVNgfszBuxcqW8m6ahknljCPizXeUVCYzv0u_ExfMGKykughwDODH-hnIvokX-I-ANkOQ"
                />
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#f5f3ef", height: "1px", width: "100%" }} />
        </header>

        {/* Main */}
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 32px 96px", boxSizing: "border-box" }}>

          {/* Hero Title */}
          <section style={{ marginBottom: "64px" }}>
            <h1 style={{
              fontFamily: "'Noto Serif', serif", fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 700, color: c.onSurface, marginBottom: "16px", letterSpacing: "-0.04em"
            }}>Seasonal Collections</h1>
            <p style={{ fontSize: "1.25rem", color: c.onSurfaceVariant, maxWidth: "672px", lineHeight: 1.7 }}>
              An curated selection of contemporary culinary artistry, harvested from local soils and served with intentional simplicity.
            </p>
          </section>

          {/* Search & Filter */}
          <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between",
            gap: "32px", marginBottom: "48px",
            position: "sticky", top: "89px", backgroundColor: c.surface, paddingTop: "16px", paddingBottom: "24px", zIndex: 40
          }}>
            <div style={{ width: "100%", maxWidth: "384px" }}>
              <label style={{
                display: "block", fontSize: "0.75rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.1em", color: c.onSurfaceVariant, marginBottom: "12px"
              }}>Search the archives</label>
              <div style={{ position: "relative" }}>
                <input
                  id="search"
                  type="text"
                  placeholder="E.g. Roasted Sea Bass"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: "100%", backgroundColor: c.surfaceContainerLow, border: "none",
                    borderRadius: "12px", padding: "16px 16px 16px 48px", fontSize: "1rem",
                    color: c.onSurface, outline: "none", boxSizing: "border-box"
                  }}
                />
                <span className="material-symbols-outlined" style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: c.outline
                }}>search</span>
              </div>
            </div>
            <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "12px 24px", borderRadius: "9999px", fontWeight: 500,
                    border: "none", cursor: "pointer", transition: "all 0.2s",
                    backgroundColor: activeCategory === cat ? c.primary : c.surfaceContainerLow,
                    color: activeCategory === cat ? c.onPrimary : c.secondary,
                  }}
                >{cat}</button>
              ))}
            </nav>
          </div>

          {/* Food Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "64px 32px"
          }}>
            {menuItems.map((item, i) => (
              <MenuItem key={i} {...item} />
            ))}
          </div>

          {/* Load More */}
          <div style={{ marginTop: "96px", display: "flex", justifyContent: "center" }}>
            <button style={{
              padding: "20px 48px", borderRadius: "12px",
              border: `1px solid rgba(23,49,36,0.2)`, color: c.primary,
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              fontSize: "0.875rem", background: "none", cursor: "pointer",
              transition: "all 0.3s"
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = c.primary; e.currentTarget.style.color = c.onPrimary; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = c.primary; }}
            >
              Explore More Archives
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ backgroundColor: "#173124", width: "100%", paddingTop: "64px", paddingBottom: "32px" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "48px", padding: "0 48px", maxWidth: "1280px", margin: "0 auto", boxSizing: "border-box"
          }}>
            <div>
              <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.875rem", color: "#fbf9f5", marginBottom: "16px" }}>
                The Culinary Editorial
              </h2>
              <p style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", color: "#c2c8c2", opacity: 0.8, lineHeight: 1.7 }}>
                A dialogue between land and kitchen. Dedicated to the purity of ingredients and the art of modern hosting.
              </p>
            </div>
            <div>
              <h4 style={{ color: "white", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "24px" }}>Explore</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {["Private Dining", "Seasonal Menu", "Sustainability", "Careers"].map((l, i) => (
                  <li key={i}><a href="#" style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", color: "#c2c8c2", opacity: 0.8, textDecoration: "none" }}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: "white", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "24px" }}>Legal</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {["Privacy Policy", "Terms of Service", "Accessibility"].map((l, i) => (
                  <li key={i}><a href="#" style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", color: "#c2c8c2", opacity: 0.8, textDecoration: "none" }}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: "white", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "24px" }}>Connect</h4>
              <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                {["public", "alternate_email", "near_me"].map(icon => (
                  <a key={icon} href="#" style={{ color: "#fbf9f5", opacity: 0.8 }}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </a>
                ))}
              </div>
              <p style={{ color: "#c2c8c2", opacity: 0.8, fontSize: "0.875rem" }}>
                124 Editorial Ave, London<br />Mon—Sun: 12pm — 11pm
              </p>
            </div>
          </div>
          <div style={{
            maxWidth: "1280px", margin: "64px auto 0", padding: "32px 48px 0",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px",
            boxSizing: "border-box"
          }}>
            <p style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: "0.875rem", color: "#c2c8c2", opacity: 0.6 }}>
              © 2024 The Culinary Editorial. All rights reserved.
            </p>
            <div style={{ fontSize: "0.875rem", color: "#c2c8c2", opacity: 0.6 }}>
              <span>Designed with intention.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}