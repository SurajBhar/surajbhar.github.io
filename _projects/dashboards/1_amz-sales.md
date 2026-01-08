---
layout: page
title: Amazon Sales Dashboard 
description: Amazon Sales Dashboard using Tableau
img: assets/img/p_amz_sales_dashboard/Home.png
importance: 1
category: visualization
related_publications: false
---

This project is a multi-page Tableau dashboard built on an *Amazon Sales* dataset and packaged as a Tableau workbook (`.twbx`) with an embedded extract (`.hyper`).  It provides executive-level KPIs and drill-down views for **revenue, profit, cost, orders, shipping time**, and **item-level performance**.

**Published on Tableau Public:** 

[Click here to interact with live dashboard](https://public.tableau.com/app/profile/suraj.bhardwaj2195/viz/Amz_Dashboard_22Sep/ItemAnalysis)

---

## What this dashboard helps you do

- Track **core business KPIs** (Revenue, Profit, Units Sold, Avg. Shipping Days)
- Understand **where profit comes from** (by Region and Country map)
- Analyze **orders and shipments over time** (Yearly trends)
- Compare **Sales Channels** and **Order Priority** distribution
- Drill into **Item Type** performance (Revenue/Profit/Cost/Orders split)

---

## Dataset

### Source & storage
- The original dataset consists of a CSV file ingested into (Tableau “textscan”), then extracted to Hyper for performance.

### Main fields used
Dimensions:
- **Region**
- **Country**
- **Item Type**
- **Sales Channel**
- **Order Priority**
- **Order Date**
- **Ship Date**
- **Order ID** (used for counting orders)

Measures:
- **Units Sold**
- **Total Revenue**
- **Total Cost**

---

## Calculated fields (from the workbook)

These are defined inside the workbook and used across views:

- **Profit**  
  `Profit = [Total Revenue] - [Total Cost]`

- **Ship Days**  
  `Ship Days = [Ship Date] - [Order Date]`

- **Total Orders**  
  `Total Orders = COUNT([Order ID])`

- **Shipment**  
  `Shipment = COUNT([Order ID])`  
  *(A duplicate of Total Orders, used in specific sheets.)*

- **color max row (highlight helper)**  
  Highlights the max performer in a view:  
  `IF SUM([Profit]) = WINDOW_MAX(SUM([Profit])) THEN 'color' ELSE 'no color' END`

---

## Dashboard pages (tabs)

The workbook contains **4 dashboards**:

1. **Home Page**
2. **Executive Page**
3. **Revenue Analysis**
4. **Item Analysis**

Each page is built from dedicated worksheets (listed below) and connected via dashboard navigation buttons.

---

## Page 1 — Home Page (Overview)

**Goal:** Give a quick snapshot of overall performance + geographic profitability.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_amz_sales_dashboard/Home.png" title="Dashboard Homepage" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Dashboard Homepage.
</div>

### KPI tiles (single-value cards)
- **Revenue** (SUM of Total Revenue)
- **Profit** (SUM of Profit)
- **Units Sold** (SUM of Units Sold)
- **Shipment Days** (AVG of Ship Days)

### Breakdown views
- **Profit Wise Regions**  
  Profit by Region (bar-style comparison) with max highlight support.

- **Profit Wise Countries**  
  A geographic map plotting profit by **Country** (color encodes SUM(Profit)).

### Interactivity
- The KPI tiles and map are designed to respond to **Region-based selections** (dashboard filter actions), enabling quick drill-down from region comparisons into the KPIs.

Worksheets used:
- `Revenue`, `Profit`, `Units Sold`, `Shipment Days`, `Profit Wise Regions`, `Profit Wise Countries`

---

## Page 2 — Executive Page (Trends & operations)

**Goal:** Provide a management view for demand and operational movement.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_amz_sales_dashboard/Executive.png" title="Executive Page" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Executive Page.
</div>

### Views included
- **Orders Per Year**  
  Orders (COUNT(Order ID)) by **Order Date (Year)**.

- **Shipments Per Year**  
  Yearly shipment trend based on **Ship Date (Year)** (using SUM(Total Cost) in the workbook view).

- **Priority Wise Orders**  
  Orders split by **Order Priority**.

- **Sales Channel Analysis**  
  Sales Channel share view (uses SUM(Total Revenue) with size/wedge-size encoding, i.e., a share visualization).

### Interactivity
- Cross-filtering is implemented via **Order Priority** and **Sales Channel** actions so that selecting a category focuses the other charts on the same subset.

Worksheets used:
- `Orders Per Year`, `Shipments Per Year`, `Priority Wise Orders`, `Sales Channel Analysis`

---

## Page 3 — Revenue Analysis (Time series)

**Goal:** Understand revenue trends over time and relate them to delivery/ship timing.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_amz_sales_dashboard/Revenue.png" title="Revenue Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Revenue Analysis.
</div>

### View included
- **Revenue Per Year**
  - X-axis: **Ship Date (Year)**
  - Measures: **SUM(Total Revenue)** (and Ship Days is included in the view definition, enabling combined analysis via tooltip/secondary measure depending on chart setup)

### Interactivity
- This page supports filtering by **Item Type** through dashboard actions.

Worksheets used:
- `Revenue Per Year`

---

## Page 4 — Item Analysis (Item Type drill-down)

**Goal:** Compare **Item Type** performance across key business metrics.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_amz_sales_dashboard/Item_Analysis.png" title="Item Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Item Analysis.
</div>

### Views included
All four views are organized by **Item Type** and highlight the best performer using the *color max row* helper.

- **Revenue Split**: SUM(Total Revenue) by Item Type  
- **Profit Split**: SUM(Profit) by Item Type  
- **Cost Split**: SUM(Total Cost) by Item Type  
- **Order Split**: Total Orders (COUNT(Order ID)) by Item Type  

### Interactivity
- The Item Analysis page uses **Item Type** actions to filter/drive the split views for fast, focused comparisons (e.g., selecting an item type to see its contribution across metrics).

Worksheets used:
- `Revenue Split`, `Profit Split`, `Cost Split`, `Order Split`

---

## Sheet inventory (for maintainability)

KPI / single-value sheets:
- `Revenue`, `Profit`, `Units Sold`, `Shipment Days`

Geography:
- `Profit Wise Countries` (map)

Comparisons:
- `Profit Wise Regions`
- `Priority Wise Orders`
- `Sales Channel Analysis`

Time series:
- `Orders Per Year`
- `Shipments Per Year`
- `Revenue Per Year`

Item drill-down:
- `Revenue Split`, `Profit Split`, `Cost Split`, `Order Split`

---

## Typical business questions this answers

- Which **regions/countries** are most profitable?
- How do **orders trend year over year**?
- Which **sales channel** drives the most revenue?
- What is the distribution of **order priority**?
- Which **item types** contribute most to revenue/profit and where do costs concentrate?
- What is the **average shipping duration** and how does it vary by selection?

---

## How to run / edit

1. Open `Amz_Dashboard_22Sep.twbx` in **Tableau Desktop**.
2. If needed, refresh the extract:
   - Data Source → Extract → Refresh
3. Review calculations:
   - Data pane → Calculated Fields (Profit, Ship Days, etc.)
4. Publish to Tableau Public:
   - Server → Tableau Public → Save to Tableau Public

---

## Recommended enhancements (if you iterate on this)
- Add a **data dictionary** page (field definitions + grain + assumptions).
- Add **parameter controls**:
  - KPI selector (Revenue vs Profit vs Units Sold)
  - Top-N slider for item types/countries
- Add “**Insight callouts**” (e.g., best region, worst region, YoY change).
- Add **profit margin %** and **average order value** KPIs if unit price/quantity is available.

---

## Author
**Suraj Bhardwaj**  
[Portfolio](https://surajbhar.github.io)
[GitHub](https://github.com/SurajBhar)  
[Tableau Public](https://public.tableau.com/app/profile/suraj.bhardwaj2195)
