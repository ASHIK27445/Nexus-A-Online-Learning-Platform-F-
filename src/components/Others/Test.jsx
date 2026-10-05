import { useState } from "react";

const tailwindConfig = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
  .editorial-shadow {
    box-shadow: 0 12px 32px rgba(27, 28, 26, 0.04);
  }
  .font-headline { font-family: 'Noto Serif', serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-label { font-family: 'Inter', sans-serif; }
  .font-serif { font-family: 'Noto Serif', serif; }
`;

const colors = {
  primary: "#173124",
  secondary: "#625e54",
  tertiary: "#521801",
  surface: "#fbf9f5",
  onSurface: "#1b1c1a",
  onSurfaceVariant: "#424844",
  surfaceContainerLow: "#f5f3ef",
  surfaceContainerHigh: "#eae8e4",
  surfaceContainerHighest: "#e4e2de",
  onPrimary: "#ffffff",
};

export default function Test() {
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "18:00",
    guests: "2 People",
    name: "",
  });

  return (
    <>
      <style>{tailwindConfig}</style>
      <div style={{ backgroundColor: colors.surface, color: colors.onSurface, fontFamily: "'Inter', sans-serif" }}>
        {/* TopNavBar */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          backgroundColor: "rgba(251,249,245,0.8)", backdropFilter: "blur(20px)"
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            width: "100%", padding: "24px 32px", maxWidth: "1280px", margin: "0 auto"
          }}>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", fontWeight: 700, color: colors.primary }}>
              The Culinary Editorial
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              <a href="#" style={{
                fontFamily: "'Noto Serif', serif", fontSize: "1.125rem", letterSpacing: "-0.025em",
                color: colors.primary, borderBottom: `2px solid ${colors.primary}`, paddingBottom: "4px", textDecoration: "none"
              }}>Menu</a>
              <a href="#" style={{
                fontFamily: "'Noto Serif', serif", fontSize: "1.125rem", letterSpacing: "-0.025em",
                color: colors.secondary, textDecoration: "none"
              }}>About</a>
              <a href="#" style={{
                fontFamily: "'Noto Serif', serif", fontSize: "1.125rem", letterSpacing: "-0.025em",
                color: colors.secondary, textDecoration: "none"
              }}>Contact</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button style={{ background: "none", border: "none", color: colors.primary, cursor: "pointer" }}>
                <span className="material-symbols-outlined">shopping_bag</span>
              </button>
              <img
                alt="Customer Profile"
                style={{ width: "40px", height: "40px", borderRadius: "9999px", objectFit: "cover" }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3LoeAPy7piXGTMCIXvZAX85MGMJrwymmZTkG1_aigEZ4a8h2vuoeBvhSRD_NdCvmmOswXiTlo2UEILJ0zN6qaGr4E_rLGNlc_1AB9x9BctDvla17H1JMQK5Uiy87chP5jeeFN0l4jSEDVdgnLkS1Xl6DMA4mJxFxv2tsa-XblENQciLYr4KLhPAg0BDI-LYj4Dgj1cSK-y6l64pvA-8OK82PGXOK3DHoidU3WjVoUcJoQZCNO4ciCKfU14cihwMn5eyBrWuOkc9M"
              />
            </div>
          </div>
          <div style={{ backgroundColor: "#f5f3ef", height: "1px", width: "100%" }}></div>
        </nav>

        <main>
          {/* Hero Section */}
          <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
              <img
                alt="Signature Dish"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqrwm9NoJEjb7FuKfpws0sd6A7rgv40sg66RwEBnyQ-MV0uAPvHm6pfFyIw5wJolhqzHEHh2nYkfS1CTxAu4m1rBhr1ibiA0b2UEPWZ7XO5WFgkX6KITh7iVmSIe9iJj2M_9VFYNzdd1yHyhlYoaHjzMuXB6CNaGOsutkAE68VKi9fmpQDrMKVVkb8z9Z3rGoWwjzQUCmL5uwFr-jAL6y_LedCz1mOpPjkgT669Ru5uNwv3U76CKDoMw4aQ3uH6lcbxhsLXWBAOWI"
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(23,49,36,0.4), transparent, #fbf9f5)"
              }}></div>
            </div>
            <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 16px", maxWidth: "896px" }}>
              <h1 style={{
                fontFamily: "'Noto Serif', serif", fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
                fontWeight: 700, color: "white", marginBottom: "32px", letterSpacing: "-0.025em",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)"
              }}>
                Exquisite Dining, Modern Roots
              </h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", alignItems: "center" }}>
                <button style={{
                  backgroundColor: colors.primary, color: colors.onPrimary,
                  padding: "16px 40px", borderRadius: "12px", fontWeight: 500,
                  fontSize: "1.125rem", border: "none", cursor: "pointer"
                }}>Book a Table</button>
                <button style={{
                  backgroundColor: "#eae8e4", color: colors.primary,
                  padding: "16px 40px", borderRadius: "12px", fontWeight: 500,
                  fontSize: "1.125rem", border: "none", cursor: "pointer"
                }}>Explore Menu</button>
              </div>
            </div>
          </section>

          {/* Culinary Philosophy */}
          <section style={{ padding: "96px 32px", maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <div style={{ aspectRatio: "4/5", borderRadius: "12px", overflow: "hidden", boxShadow: "0 12px 32px rgba(27,28,26,0.04)" }}>
                  <img
                    alt="Chef at Work"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrx9j_jQErA7_EUiZvF4BsbP3HbT5a3ZK-Pcu1Yva37gqNF4tQETcrLWvgV3zGGqMT8TV6SjTHaQTWhAqaL4r8Al6n8SSlKVsyQ6leZudOSmqg_Xx5wggszzswjwk0hXcyJxBn8wBvd69yleRkazLo_VrF5hjjEfjNfw1J6B4hCDpJSJZAIPY0_UWGIgSaNeP-bjU7p9GXhuJ-78u834m4mQFUwR06952ntW6kZl2HZfPfU_LHmuDKIUj6zjQCFAVOijKxTG1_7Ik"
                  />
                </div>
                <div style={{
                  position: "absolute", bottom: "-32px", right: "-32px", width: "50%",
                  aspectRatio: "1/1", borderRadius: "12px", overflow: "hidden",
                  boxShadow: "0 12px 32px rgba(27,28,26,0.04)"
                }}>
                  <img
                    alt="Fresh Ingredients"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1VKxQnEQbT_Xci9ngnksOSlo8P1_wiWh-cHbLjWg_fU9l105YnQmtc6P8jh-WRVmenOefDOxwRVqdgbbkKRL9zIgVzeWJ76y4-JLRR0Z6rCR2Ph9h8J6Pu98rUGfOmTd-H5rKDqFgdLZEz2gT1gUYXeVMP4WsHeMwQkYtDOaEsKjh95IfyFtKE6JZgxUyWHJLhXqjFC4FFtMyvfupwcJXH7dJ5VQEGlmw2OOe8km-Aeby2Tyu7BW27A0MAvfYKZLnFLunq8R8bT0"
                  />
                </div>
              </div>
              <div>
                <span style={{
                  color: colors.tertiary, fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.875rem",
                  marginBottom: "16px", display: "block"
                }}>Our Story</span>
                <h2 style={{
                  fontFamily: "'Noto Serif', serif", fontSize: "clamp(2rem, 4vw, 3rem)",
                  marginBottom: "32px", lineHeight: 1.2
                }}>A Symphony of Soil and Sea</h2>
                <p style={{ color: colors.onSurfaceVariant, fontSize: "1.125rem", lineHeight: 1.8, marginBottom: "24px" }}>
                  The Culinary Editorial was born from a singular vision: to treat every plate as a published piece of art. We source our inspiration from the untamed coastlines and fertile valleys of our region, translating raw nature into refined experiences.
                </p>
                <p style={{ color: colors.onSurfaceVariant, fontSize: "1.125rem", lineHeight: 1.8, fontStyle: "italic", marginBottom: "32px" }}>
                  "Luxury is not in the excess, but in the intentionality of each ingredient."
                </p>
                <a href="#" style={{
                  color: colors.primary, fontWeight: 700,
                  borderBottom: `1px solid rgba(23,49,36,0.2)`, paddingBottom: "4px", textDecoration: "none"
                }}>Discover Our Origins</a>
              </div>
            </div>
          </section>

          {/* Popular Selections */}
          <section style={{ backgroundColor: colors.surfaceContainerLow, padding: "96px 32px" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px" }}>
                <div>
                  <span style={{
                    color: colors.tertiary, letterSpacing: "0.1em", textTransform: "uppercase",
                    fontSize: "0.875rem", marginBottom: "16px", display: "block"
                  }}>Curated Favorites</span>
                  <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                    The Season's Best
                  </h2>
                </div>
                <a href="#" style={{ color: colors.primary, fontWeight: 500, textDecoration: "none" }}>View Full Menu</a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px" }}>
                {[
                  {
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHTRyEHGIDqtYW04wnNnbkQBBgri7pdBGKthzoSNz-AkOqfiH0Ct9E3owJLCEXZIPLc0EOxPHReVSsON0ZRXyq68e5HWEHCsL3sSorxLC3UVUWpyOxMdGayrSBHhe7EnZx7Gbo8-omK-pkzyIn71sxCAXwFWwoaQpgaSZk2ppghWQSfyM7lYogkDVo_nH_LvUJ-1uzpVZAMsKWZ4sJxhRatQS_yTREwu7uZnWhawilZxdnO0rJBmer6oVOC5z1VStcRrZf3YfYwFg",
                    alt: "Smoked Ribs", title: "Heritage Smoked Beef",
                    desc: "Oak-smoked for 12 hours, served with truffle mash.", price: "$42"
                  },
                  {
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzoNyHeWnoPEni5Ay6AKnXm4Ll1iCZzB0AUB_5KSAVs24SX4Y9BVU3zRbJV6Ta4JN3PmoxTEOHeP-2VdGohoIRZOftENo7NeXQhqfMK8ewLCpFyighgWV3ada5X8PyXbNOl_GOVsoicTncoMTAHUbmFbhFqYTXqmL1swkL5NlGsVWKOWcShK5lSR1gYc0ECUuJ3E3Z06y1lv6jU28us4GxK-jU3OZ0k2u4_SRqJXm42NZgRy51wGJYANC219elhfyBpF7q4DPZ66Q",
                    alt: "Signature Salad", title: "The Garden Editorial",
                    desc: "Seasonal greens, compressed melon, honey-walnut crust.", price: "$28"
                  },
                  {
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmLWeODUA2Z3IWaZapG1s3BFSZciRO8WM7R-3SgXvnQug3luuwTC-JtC-iPlJSMXd8tTaHzbRq0b85m8C_Ym81hpM6PQLVAQTAupfjxFnj4eyIQ0mYJzDcSfvh6YJZcChGwkuQxrzUJAEJQU2yRMulVmFfiNc9OTk3ZVrIT2XfbCln-orpD1SwyIytzNG9p6etSRJBkz2Sq9tQyBe-fh7DDWKeKloW2-oY4A8R4uiI9DEtITl9kZVhsrVmDfGbJZJnDQqfJlKGUd8",
                    alt: "Seared Scallops", title: "Pan-Seared Scallops",
                    desc: "Atlantic scallops, cauliflower purée, burnt lemon oil.", price: "$36"
                  }
                ].map((item, i) => (
                  <div key={i} style={{ cursor: "pointer" }} className="menu-item-group">
                    <div style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: "8px", marginBottom: "24px" }}>
                      <img
                        alt={item.alt}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                        src={item.img}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.5rem", marginBottom: "8px" }}>{item.title}</h3>
                        <p style={{ color: colors.onSurfaceVariant, fontSize: "0.875rem" }}>{item.desc}</p>
                      </div>
                      <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.25rem", color: colors.primary }}>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Reservations */}
          <section style={{ padding: "96px 32px", maxWidth: "896px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "16px" }}>
                Secure Your Table
              </h2>
              <p style={{ color: colors.onSurfaceVariant }}>Join us for an evening of quiet luxury and culinary mastery.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.875rem", color: colors.secondary }}>Date</label>
                  <input
                    type="date"
                    value={reservationData.date}
                    onChange={e => setReservationData({ ...reservationData, date: e.target.value })}
                    style={{
                      width: "100%", backgroundColor: colors.surfaceContainerLow, border: "none",
                      borderRadius: "8px", padding: "16px", fontSize: "1rem", outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.875rem", color: colors.secondary }}>Time</label>
                  <select
                    value={reservationData.time}
                    onChange={e => setReservationData({ ...reservationData, time: e.target.value })}
                    style={{
                      width: "100%", backgroundColor: colors.surfaceContainerLow, border: "none",
                      borderRadius: "8px", padding: "16px", fontSize: "1rem", outline: "none", boxSizing: "border-box"
                    }}
                  >
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.875rem", color: colors.secondary }}>Guests</label>
                  <select
                    value={reservationData.guests}
                    onChange={e => setReservationData({ ...reservationData, guests: e.target.value })}
                    style={{
                      width: "100%", backgroundColor: colors.surfaceContainerLow, border: "none",
                      borderRadius: "8px", padding: "16px", fontSize: "1rem", outline: "none", boxSizing: "border-box"
                    }}
                  >
                    <option>2 People</option>
                    <option>4 People</option>
                    <option>6+ People</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.875rem", color: colors.secondary }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={reservationData.name}
                    onChange={e => setReservationData({ ...reservationData, name: e.target.value })}
                    style={{
                      width: "100%", backgroundColor: colors.surfaceContainerLow, border: "none",
                      borderRadius: "8px", padding: "16px", fontSize: "1rem", outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => alert("Reservation confirmed!")}
                style={{
                  width: "100%", backgroundColor: colors.primary, color: colors.onPrimary,
                  padding: "20px", borderRadius: "12px", fontWeight: 700, fontSize: "1.125rem",
                  border: "none", cursor: "pointer"
                }}
              >
                Confirm Reservation
              </button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer style={{ backgroundColor: "#173124", color: "#fbf9f5", width: "100%", paddingTop: "64px", paddingBottom: "32px" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px", padding: "0 48px", maxWidth: "1280px", margin: "0 auto"
          }}>
            <div>
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: "1.875rem", marginBottom: "16px" }}>The Culinary Editorial</div>
              <p style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: "1rem", opacity: 0.8, lineHeight: 1.7, marginBottom: "24px" }}>
                Hosting the modern palate with timeless grace.
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                {["public", "share", "alternate_email"].map(icon => (
                  <a key={icon} href="#" style={{ color: "#fbf9f5", opacity: 0.8 }}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "24px" }}>Contact</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {["124 Editorial Ave, London", "+44 (0) 20 7946 0123", "maitred@Test.com"].map((item, i) => (
                  <li key={i} style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", color: "#c2c8c2", opacity: 0.8 }}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "24px" }}>Quick Links</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {["Privacy Policy", "Terms of Service", "Sustainability", "Careers"].map((link, i) => (
                  <li key={i}>
                    <a href="#" style={{
                      fontFamily: "'Noto Serif', serif", fontStyle: "italic",
                      color: "#c2c8c2", opacity: 0.8, textDecoration: "none"
                    }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "24px" }}>Newsletter</h4>
              <p style={{ fontSize: "0.875rem", marginBottom: "16px", opacity: 0.8 }}>Join our mailing list for seasonal menu updates.</p>
              <div style={{
                display: "flex", backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px", padding: "4px"
              }}>
                <input
                  type="email"
                  placeholder="Email address"
                  style={{
                    backgroundColor: "transparent", border: "none", color: "white",
                    fontSize: "0.875rem", outline: "none", flexGrow: 1, padding: "0 12px"
                  }}
                />
                <button style={{
                  backgroundColor: "#fbf9f5", color: "#173124", padding: "8px",
                  borderRadius: "6px", border: "none", cursor: "pointer", display: "flex", alignItems: "center"
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>send</span>
                </button>
              </div>
            </div>
          </div>
          <div style={{
            maxWidth: "1280px", margin: "0 auto", padding: "32px 48px 0",
            marginTop: "64px", borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px"
          }}>
            <p style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: "0.875rem", color: "#c2c8c2", opacity: 0.6 }}>
              © 2024 The Culinary Editorial. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "24px" }}>
              {["Instagram", "LinkedIn", "Vimeo"].map((s, i) => (
                <a key={i} href="#" style={{ fontSize: "0.875rem", color: "#c2c8c2", opacity: 0.6, textDecoration: "none" }}>{s}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}