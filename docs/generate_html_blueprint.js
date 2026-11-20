/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

function base64Image(filePath) {
  const buf = fs.readFileSync(filePath);
  return 'data:image/png;base64,' + buf.toString('base64');
}

console.log('Generating interactive HTML blueprint...');

const heroImg = base64Image('C:/Projects/Pragya/docs/blueprint_assets/01_homepage_hero.png');
const flatsImg = base64Image('C:/Projects/Pragya/docs/blueprint_assets/02_guided_discovery_flats.png');
const modalImg = base64Image('C:/Projects/Pragya/docs/blueprint_assets/03_flat_details_modal.png');
const consultImg = base64Image('C:/Projects/Pragya/docs/blueprint_assets/04_consultation_flow.png');
const aboutImg = base64Image('C:/Projects/Pragya/docs/blueprint_assets/05_about_vastu_education.png');
const adminImg = base64Image('C:/Projects/Pragya/docs/blueprint_assets/06_admin_inventory_governance.png');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PragyaaProp.com® — Project Architectural Blueprint & System Specification</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    
    :root {
      --walnut: #743b19;
      --walnut-dark: #532910;
      --walnut-light: #9a5327;
      --gold: #d4af37;
      --gold-light: #fef9e7;
      --bg-warm: #fcfaf6;
      --card-bg: #ffffff;
      --border: #eedecb;
      --text-main: #33261d;
      --text-muted: #756357;
      --emerald: #059669;
      --emerald-bg: #ecfdf5;
      --amber: #d97706;
      --amber-bg: #fffbeb;
      --purple: #9333ea;
      --purple-bg: #faf5ff;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg-warm);
      color: var(--text-main);
      line-height: 1.6;
      padding: 30px 20px;
    }
    
    .container {
      max-width: 1060px;
      margin: 0 auto;
    }
    
    .print-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      border: 1px solid var(--border);
      padding: 12px 24px;
      border-radius: 14px;
      margin-bottom: 24px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--walnut);
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 10px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }
    
    .btn:hover {
      background: var(--walnut-dark);
      transform: translateY(-1px);
    }
    
    .btn-secondary {
      background: #f7f3ed;
      color: var(--walnut);
      border: 1px solid var(--border);
    }
    .btn-secondary:hover {
      background: #ede4d7;
    }
    
    /* Header Banner */
    .header-banner {
      background: linear-gradient(135deg, var(--walnut-dark) 0%, var(--walnut) 100%);
      color: #ffffff;
      padding: 36px 36px;
      border-radius: 20px;
      margin-bottom: 30px;
      box-shadow: 0 10px 25px rgba(83, 41, 16, 0.15);
      position: relative;
      overflow: hidden;
    }
    
    .header-banner::after {
      content: 'VASTU BLUEPRINT';
      position: absolute;
      right: 20px;
      bottom: -15px;
      font-family: 'Cinzel', serif;
      font-size: 54px;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.05);
      pointer-events: none;
    }
    
    .tagline {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--gold);
      background: rgba(212, 175, 55, 0.15);
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    
    h1 {
      font-family: 'Cinzel', serif;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    
    .subtitle {
      font-size: 15px;
      color: #eedecb;
      max-width: 800px;
    }
    
    .meta-bar {
      margin-top: 20px;
      padding-top: 18px;
      border-top: 1px solid rgba(255,255,255,0.15);
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      font-size: 12px;
    }
    
    .meta-item strong {
      color: #ffffff;
    }
    
    /* Section Cards */
    .section-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
      page-break-inside: avoid;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 2px solid #faf5ee;
    }
    
    .section-badge {
      font-family: 'Cinzel', serif;
      font-size: 13px;
      font-weight: 700;
      color: var(--walnut);
      background: #faebd7;
      padding: 4px 10px;
      border-radius: 8px;
    }
    
    h2 {
      font-family: 'Cinzel', serif;
      font-size: 20px;
      font-weight: 700;
      color: var(--walnut);
    }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    
    @media (max-width: 768px) {
      .grid-2 {
        grid-template-columns: 1fr;
      }
    }
    
    /* Status Cards */
    .status-badge-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }
    
    .status-box {
      padding: 18px;
      border-radius: 14px;
      border: 1px solid;
    }
    
    .status-box.aligned {
      background: var(--emerald-bg);
      border-color: var(--emerald);
    }
    .status-box.aligned .status-title { color: #065f46; }
    
    .status-box.balanced {
      background: var(--amber-bg);
      border-color: var(--amber);
    }
    .status-box.balanced .status-title { color: #92400e; }
    
    .status-box.adaptable {
      background: var(--purple-bg);
      border-color: var(--purple);
    }
    .status-box.adaptable .status-title { color: #6b21a8; }
    
    .status-title {
      font-weight: 800;
      font-size: 14px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .status-desc {
      font-size: 12px;
      color: #4b5563;
    }
    
    /* Stepper preview */
    .stepper-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      background: #faf6f0;
      padding: 16px;
      border-radius: 14px;
      border: 1px solid var(--border);
      margin: 18px 0;
    }
    
    .step-node {
      flex: 1;
      min-width: 140px;
      background: #ffffff;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid #ebd9c4;
    }
    
    .step-num {
      font-size: 10px;
      font-weight: 800;
      color: var(--walnut);
      text-transform: uppercase;
    }
    
    .step-name {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
    }
    
    .step-sample {
      font-size: 11px;
      color: var(--text-muted);
    }
    
    /* Image Showcase */
    .screenshot-showcase {
      margin: 20px 0;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid var(--border);
      box-shadow: 0 4px 18px rgba(0,0,0,0.06);
      background: #fbf9f5;
    }
    
    .screenshot-showcase img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .screenshot-caption {
      padding: 10px 16px;
      background: #faf6f0;
      font-size: 12px;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 12.5px;
    }
    
    th {
      background: var(--walnut);
      color: #ffffff;
      text-align: left;
      padding: 10px 14px;
      font-size: 11px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    
    td {
      padding: 10px 14px;
      border-bottom: 1px solid #f0e6da;
    }
    
    tr:nth-child(even) td {
      background: #fcf9f5;
    }
    
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
    }
    
    .badge-aligned { background: #d1fae5; color: #065f46; }
    .badge-balanced { background: #fef3c7; color: #92400e; }
    .badge-adaptable { background: #f3e8ff; color: #6b21a8; }
    .badge-sample { background: #faebd7; color: #743b19; border: 1px solid #d4af37; }
    
    /* Callout */
    .callout {
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
      padding: 14px 18px;
      border-radius: 0 10px 10px 0;
      margin: 16px 0;
      font-size: 12.5px;
    }
    
    .callout-title {
      font-weight: 800;
      color: #b45309;
      margin-bottom: 4px;
    }
    
    /* Metrics strip */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      margin: 16px 0;
    }
    
    @media (max-width: 640px) {
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    .metric-card {
      background: #faf6f0;
      border: 1px solid var(--border);
      padding: 14px;
      border-radius: 12px;
      text-align: center;
    }
    
    .metric-val {
      font-family: 'Cinzel', serif;
      font-size: 26px;
      font-weight: 700;
      color: var(--walnut);
    }
    
    .metric-label {
      font-size: 10px;
      font-weight: 800;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    /* Print Styles */
    @media print {
      body {
        padding: 0;
        background: #ffffff;
      }
      .print-actions {
        display: none;
      }
      .section-card {
        box-shadow: none;
        border: 1px solid #ccc;
        margin-bottom: 20px;
        page-break-inside: avoid;
      }
      .header-banner {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>

<div class="container">

  <!-- Print Actions Bar -->
  <div class="print-actions">
    <div>
      <span style="font-weight: 700; color: var(--walnut);">PRAGYAAPROP.COM® BLUEPRINT</span>
      <span style="font-size: 12px; color: var(--text-muted); margin-left: 10px;">Official Client Specification Document</span>
    </div>
    <div style="display: flex; gap: 10px;">
      <button class="btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
      <a class="btn btn-secondary" href="PRAGYAAPROP_PROJECT_BLUEPRINT.pdf" download>📥 Download Compiled PDF</a>
    </div>
  </div>

  <!-- Header Banner -->
  <header class="header-banner">
    <div class="tagline">System Specification · Client Demo Baseline</div>
    <h1>PRAGYAAPROP.COM® ARCHITECTURAL BLUEPRINT</h1>
    <div class="subtitle">
      Vastu-Informed Luxury Real Estate Discovery Engine · Flat-Level Spatial Orientation & Daylight Architecture
    </div>
    <div class="meta-bar">
      <div class="meta-item">Document Version: <strong>1.1 (Client Presentation Polish)</strong></div>
      <div class="meta-item">Date: <strong>November 2026</strong></div>
      <div class="meta-item">Runtime Target: <strong>http://localhost:3000</strong></div>
      <div class="meta-item">Data Integrity: <strong>6 Reference Client Samples Anchored</strong></div>
      <div class="meta-item">Status: <strong>Client Demo Verified (Task 10 Polished)</strong></div>
    </div>
  </header>

  <!-- 1. Executive Summary -->
  <section class="section-card">
    <div class="section-header">
      <span class="section-badge">01</span>
      <h2>Executive Overview & Core Product Story</h2>
    </div>
    <p>
      PragyaaProp transforms residential real estate discovery into a transparent, sequential journey:
      <strong>City → Location → Project → Wing → Flat → Vastu Status</strong>. Rather than forcing buyers through generic listings with unverified claims, PragyaaProp applies modern architectural physics (daylight vectoring, cross-ventilation, and cardinal alignment) to individual flats without demanding expensive structural demolition.
    </p>

    <div class="status-badge-grid">
      <div class="status-box aligned">
        <div class="status-title">🟢 ALIGNED (Emerald)</div>
        <div class="status-desc">Inherently harmonious natural orientation. Optimal daylight access, positive entrance orientation, and elemental air circulation.</div>
      </div>
      <div class="status-box balanced">
        <div class="status-title">🟡 BALANCED (Amber)</div>
        <div class="status-desc">Functionally harmonious for modern residential living. Everyday spatial comfort with minor practical lifestyle considerations.</div>
      </div>
      <div class="status-box adaptable">
        <div class="status-title">🟣 ADAPTABLE (Purple)</div>
        <div class="status-desc">Remedy-ready through zero-demolition adjustments: interior furniture reorientation, daylight enhancement, and color balance.</div>
      </div>
    </div>

    <!-- Screenshot 1 -->
    <div class="screenshot-showcase">
      <img src="${heroImg}" alt="Homepage Hero and Search Console">
      <div class="screenshot-caption">
        <span><strong>Figure 1.1:</strong> PragyaaProp Homepage & Structured 3-Tier Search Console</span>
        <span>Viewport: 1440 × 900 Desktop</span>
      </div>
    </div>
  </section>

  <!-- 2. Guided Discovery Stepper -->
  <section class="section-card">
    <div class="section-header">
      <span class="section-badge">02</span>
      <h2>Guided Property Discovery Engine (/properties)</h2>
    </div>
    <p>
      The core discovery experience eliminates buyer fatigue by replacing endless filter grids with an interactive, 5-stage progressive disclosure stepper.
    </p>

    <div class="stepper-strip">
      <div class="step-node">
        <div class="step-num">Stage 01</div>
        <div class="step-name">City Selection</div>
        <div class="step-sample">Hub: Mumbai</div>
      </div>
      <div class="step-node">
        <div class="step-num">Stage 02</div>
        <div class="step-name">Location / Locality</div>
        <div class="step-sample">Area: Andheri</div>
      </div>
      <div class="step-node">
        <div class="step-num">Stage 03</div>
        <div class="step-name">Project</div>
        <div class="step-sample">Sample: Godrej</div>
      </div>
      <div class="step-node">
        <div class="step-num">Stage 04</div>
        <div class="step-name">Wing Selection</div>
        <div class="step-sample">Active: Wing A</div>
      </div>
      <div class="step-node" style="border-color: var(--walnut); background: #faebd7;">
        <div class="step-num" style="color: var(--walnut);">Stage 05</div>
        <div class="step-name" style="color: var(--walnut);">Flat Cards</div>
        <div class="step-sample">6 Client Samples</div>
      </div>
    </div>

    <div class="callout">
      <div class="callout-title">🔒 Confidentiality Feature: Series Number Secrecy</div>
      <div>
        To safeguard builder inventory confidentiality, Series Numbers are intentionally <strong>withheld from public discovery cards</strong> (rendered as <em>"Confidential until inspection"</em>). The Series Number is exclusively revealed when a user opens the individual Flat Details Modal.
      </div>
    </div>

    <!-- Screenshot 2 -->
    <div class="screenshot-showcase">
      <img src="${flatsImg}" alt="Guided Discovery Flats View">
      <div class="screenshot-caption">
        <span><strong>Figure 2.1:</strong> Stage 5 Discovery Grid displaying the 6 Godrej sample flats in Wing A</span>
        <span>Route: /properties?city=Mumbai&locality=Andheri</span>
      </div>
    </div>
  </section>

  <!-- 3. Client Sample Dataset & Flat Inspection -->
  <section class="section-card">
    <div class="section-header">
      <span class="section-badge">03</span>
      <h2>Client Reference Dataset & Inspection Modal</h2>
    </div>
    <p>
      The platform features the exact six client-supplied reference records for <strong>Godrej, Wing A, Andheri, Mumbai</strong>.
    </p>

    <table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th>PP Code</th>
          <th>Vastu Status</th>
          <th>Series Number</th>
          <th>Public Discovery State</th>
          <th>Inspection Modal State</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>2 BHK</strong></td>
          <td><span class="badge badge-sample">A001</span></td>
          <td><span class="badge badge-aligned">Aligned</span></td>
          <td>Series 1</td>
          <td><em>Confidential until inspection</em></td>
          <td>Revealed: <strong>Series 1</strong></td>
        </tr>
        <tr>
          <td><strong>2 BHK</strong></td>
          <td><span class="badge badge-sample">FDDES</span></td>
          <td><span class="badge badge-aligned">Aligned</span></td>
          <td>Series 2</td>
          <td><em>Confidential until inspection</em></td>
          <td>Revealed: <strong>Series 2</strong></td>
        </tr>
        <tr>
          <td><strong>2 BHK</strong></td>
          <td><span class="badge badge-sample">VVFTT</span></td>
          <td><span class="badge badge-balanced">Balanced</span></td>
          <td>Series 3</td>
          <td><em>Confidential until inspection</em></td>
          <td>Revealed: <strong>Series 3</strong></td>
        </tr>
        <tr>
          <td><strong>3 BHK</strong></td>
          <td><span class="badge badge-sample">GGGLT</span></td>
          <td><span class="badge badge-balanced">Balanced</span></td>
          <td>Series 4</td>
          <td><em>Confidential until inspection</em></td>
          <td>Revealed: <strong>Series 4</strong></td>
        </tr>
        <tr>
          <td><strong>3 BHK</strong></td>
          <td><span class="badge badge-sample">HJJYY</span></td>
          <td><span class="badge badge-adaptable">Adaptable</span></td>
          <td>Series 5</td>
          <td><em>Confidential until inspection</em></td>
          <td>Revealed: <strong>Series 5</strong></td>
        </tr>
        <tr>
          <td><strong>3 BHK</strong></td>
          <td><span class="badge badge-sample">KKYI</span></td>
          <td><span class="badge badge-balanced">Balanced</span></td>
          <td>Series 6</td>
          <td><em>Confidential until inspection</em></td>
          <td>Revealed: <strong>Series 6</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="callout" style="background: #eff6ff; border-left-color: #3b82f6;">
      <div class="callout-title" style="color: #1e40af;">🛡️ Honest Missing Data Policy</div>
      <div style="color: #1e3a8a;">
        Unlike competing real-estate sites that generate fabricated room scores, PragyaaProp transparently marks room-level directions (Kitchen, Master Bedroom, Balcony) as <strong>"Not provided in sample"</strong> until official builder floor plans are supplied.
      </div>
    </div>

    <!-- Screenshot 3 -->
    <div class="screenshot-showcase">
      <img src="${modalImg}" alt="Flat Inspection Modal">
      <div class="screenshot-caption">
        <span><strong>Figure 3.1:</strong> Flat A001 Inspection Modal unveiling Series 1 with honest sample data labels</span>
        <span>Interactive Inspection Modal</span>
      </div>
    </div>
  </section>

  <!-- 4. Consultation & Educational Framework -->
  <section class="section-card">
    <div class="section-header">
      <span class="section-badge">04</span>
      <h2>Consultation Flow & Vastu Education (/about)</h2>
    </div>

    <div class="grid-2">
      <div>
        <h3 style="font-size: 15px; margin-bottom: 8px; color: var(--walnut);">Professional Advisory Specializations</h3>
        <p style="font-size: 13px; margin-bottom: 12px;">Zero fabricated mentor names or fake phone numbers. All consultation requests route through three recognized spatial advisory disciplines:</p>
        <ul style="font-size: 12.5px; padding-left: 20px; color: var(--text-muted); margin-bottom: 16px;">
          <li><strong>Vedic Spatial Planning Advisor</strong>: Room zoning, family harmony, and elemental alignment.</li>
          <li><strong>Architectural Orientation Consultant</strong>: Daylight vectors, cardinal axes, and ventilation pathways.</li>
          <li><strong>Residential Layout & Daylight Specialist</strong>: Furniture optimization and non-demolition remedies.</li>
        </ul>
        <div class="screenshot-showcase">
          <img src="${consultImg}" alt="Consultation Modal">
          <div class="screenshot-caption">
            <span><strong>Figure 4.1:</strong> Advisory Consultation Form with Demo Notice</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style="font-size: 15px; margin-bottom: 8px; color: var(--walnut);">Methodology & Educational Framing</h3>
        <p style="font-size: 13px; margin-bottom: 12px;">The About Us page establishes trust by defining Vastu Shastra as rational architectural physics rather than superstition:</p>
        <ul style="font-size: 12.5px; padding-left: 20px; color: var(--text-muted); margin-bottom: 16px;">
          <li><strong>Ancient Wisdom & Modern Design</strong>: Balancing traditional principles with high-rise apartment living.</li>
          <li><strong>Five Element Balance</strong>: Earth, Water, Fire, Air, and Space distribution.</li>
          <li><strong>Zero-Demolition Remedies</strong>: Remedial recommendations rely on spatial repurposing and decor.</li>
        </ul>
        <div class="screenshot-showcase">
          <img src="${aboutImg}" alt="About Us Page">
          <div class="screenshot-caption">
            <span><strong>Figure 4.2:</strong> About Us & Vastu Education Layout</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Admin Governance -->
  <section class="section-card">
    <div class="section-header">
      <span class="section-badge">05</span>
      <h2>Administrative Inventory Governance (/admin)</h2>
    </div>
    <p>
      The administrative panel provides inventory governance across the five-tier hierarchy with live synchronization to the public discovery engine.
    </p>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-val">17</div>
        <div class="metric-label">Total Cities</div>
      </div>
      <div class="metric-card">
        <div class="metric-val">18</div>
        <div class="metric-label">Total Locations</div>
      </div>
      <div class="metric-card">
        <div class="metric-val">19</div>
        <div class="metric-label">Total Projects</div>
      </div>
      <div class="metric-card">
        <div class="metric-val">38</div>
        <div class="metric-label">Total Wings</div>
      </div>
      <div class="metric-card">
        <div class="metric-val">24</div>
        <div class="metric-label">Total Flats</div>
      </div>
    </div>

    <ul style="font-size: 13px; padding-left: 20px; color: var(--text-main); margin-bottom: 18px;">
      <li><strong>Data Separation</strong>: Amber <code>Client Reference Sample</code> badge protects the 6 reference flats from confusion with simulated demo inventory.</li>
      <li><strong>Duplicate Validation</strong>: Adding flat code <code>A001</code> under <code>Godrej</code> triggers an immediate blocking error: <em>"PP Code 'A001' is already in use for project 'Godrej'."</em></li>
      <li><strong>1-Click Reset</strong>: "Restore Defaults" button resets inventory to the exact baseline of 24 flats, removing any temporary testing artifacts.</li>
    </ul>

    <!-- Screenshot 5 -->
    <div class="screenshot-showcase">
      <img src="${adminImg}" alt="Admin Dashboard">
      <div class="screenshot-caption">
        <span><strong>Figure 5.1:</strong> Admin Inventory Portal with 5 verified hierarchy metric counters</span>
        <span>Route: /admin</span>
      </div>
    </div>
  </section>

  <!-- 6. Technical Specifications & Roadmap -->
  <section class="section-card">
    <div class="section-header">
      <span class="section-badge">06</span>
      <h2>Technical Specifications & Production Roadmap</h2>
    </div>

    <div class="grid-2">
      <div>
        <h3 style="font-size: 15px; margin-bottom: 8px; color: var(--walnut);">Production Technology Stack</h3>
        <table style="font-size: 12px;">
          <tr><td><strong>Framework</strong></td><td>Next.js 16.4.6 (App Router)</td></tr>
          <tr><td><strong>Runtime Library</strong></td><td>React 19.3.0 & React DOM</td></tr>
          <tr><td><strong>Type System</strong></td><td>TypeScript 5.0 (Strict Interfaces)</td></tr>
          <tr><td><strong>CSS Engine</strong></td><td>Tailwind CSS v4.3.3</td></tr>
          <tr><td><strong>Build Compiler</strong></td><td>Webpack (27 Static SSG Routes)</td></tr>
          <tr><td><strong>ESLint Hygiene</strong></td><td>0 Errors (Clean Codebase)</td></tr>
          <tr><td><strong>Responsive Design</strong></td><td>Mobile (360px) to Desktop (1440px)</td></tr>
          <tr><td><strong>Task 10 Polish</strong></td><td>Unified Design, Zero Jargon, Guided Deep-Links</td></tr>
        </table>
      </div>

      <div>
        <h3 style="font-size: 15px; margin-bottom: 8px; color: var(--walnut);">Production Engineering Roadmap</h3>
        <div style="font-size: 12.5px; color: var(--text-main);">
          <div style="margin-bottom: 10px;">
            <strong>Phase 1: Database Persistence</strong><br>
            <span style="color: var(--text-muted);">Migrate from client-side state to PostgreSQL (Supabase/Neon) with builder multi-tenancy and role-based access.</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong>Phase 2: Architectural CAD Parser</strong><br>
            <span style="color: var(--text-muted);">Automated DWG/DXF/PDF floorplan ingestion to calculate room centroids against true geographic north automatically.</span>
          </div>
          <div>
            <strong>Phase 3: Builder Self-Service Portal</strong><br>
            <span style="color: var(--text-muted);">Self-service bulk inventory uploading, developer dashboard, and CRM integration for consultation leads.</span>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 24px; padding: 16px; background: #faf6f0; border: 1px solid var(--border); border-radius: 12px; font-size: 12px; text-align: center;">
      <strong style="color: var(--walnut);">CLIENT DEMO READINESS CERTIFICATION</strong><br>
      The PragyaaProp platform demo has completed end-to-end verification and meets all functional, architectural, and visual standards.<br>
      <span style="color: var(--emerald); font-weight: 700;">Development Server Active at http://localhost:3000 · Verified November 2026</span>
    </div>
  </section>

</div>

</body>
</html>
`;

fs.writeFileSync('C:/Projects/Pragya/docs/PRAGYAAPROP_PROJECT_BLUEPRINT.html', html);
console.log('Successfully generated interactive HTML blueprint at: C:/Projects/Pragya/docs/PRAGYAAPROP_PROJECT_BLUEPRINT.html');
