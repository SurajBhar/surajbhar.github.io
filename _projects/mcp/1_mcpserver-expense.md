---
layout: page
title: Expense Tracker MCP Server (FastMCP)
description: A local Model Context Protocol (MCP) server for personal expense tracking built with FastMCP + SQLite.
img: assets/img/p_mcp/mcp_1.png
importance: 3
category: generative-ai
related_publications: false

chart:
  plotly: true

---

This project is a local **Expense Tracker MCP (Model Context Protocol) Server** built with **FastMCP** and **SQLite**.
It exposes a set of structured tools for expense CRUD, analytics, reporting, and German tax-friendly summaries—designed to be tested directly via the FastMCP tools UI and integrated into agentic workflows.

The implementation focuses on **robustness in `fastmcp dev` mode**, where the server is imported as a standalone module (not a Python package). Key outcomes:

* No fragile relative imports
* Database schema is guaranteed on every DB connection
* Output/report paths are safe (directory vs file path)

[ View the source code on GitHub](https://github.com/SurajBhar/MCP_SERVER_Expense_Tracker)

---

```plotly
{
  "data": [
    {
      "type": "pie",
      "labels": ["Insurance", "Food", "Telecom", "business", "Shopping", "Health", "Transport", "education", "Subscriptions", "Entertainment"],
      "values": [9252.0, 7323.26, 5004.0, 3089.0, 2337.15, 2297.82, 2268.0, 1989.0, 1692.0, 572.54],
      "hole": 0.3,
      "textinfo": "percent+label",
      "textposition": "inside",
      "hovertemplate": "label=%{label}<br>value=%{value}<extra></extra>",
      "showlegend": true
    }
  ],
  "layout": {
    "title": { "text": "Spending by Category" },
    "legend": { "orientation": "v" }
  }
}


```

```plotly
{
  "data": [
    {
      "type": "scatter",
      "mode": "lines+markers",
      "name": "Total Spending",
      "x": ["2023-01","2023-02","2023-03","2023-04","2023-05","2023-06","2023-07","2023-08","2023-09","2023-10","2023-11","2023-12","2024-01","2024-02","2024-03","2024-04","2024-05","2024-06","2024-07","2024-08","2024-09","2024-10","2024-11","2024-12","2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08","2025-09","2025-10","2025-11","2025-12","2026-01"],
      "y": [791.75,1373.54,1161.17,1349.78,920.66,1752.03,798.65,879.05,785.97,828.95,855.48,787.54,862.28,1068.09,1005.64,1081.78,909.37,1800.44,1130.89,917.06,843.0,932.18,812.17,853.12,849.58,981.55,991.04,815.96,964.6,1786.48,826.24,827.87,1117.27,896.02,805.28,870.78,94.7]
    }
  ],
  "layout": {
    "title": { "text": "Spending Trends Over Time" },
    "xaxis": { "title": { "text": "Period" } },
    "yaxis": { "title": { "text": "Amount (EUR)" } },
    "hovermode": "x unified"
  }
}

```

```plotly
{
  "data": [
    {
      "type": "bar",
      "x": ["Insurance", "Food", "Telecom", "business", "Shopping", "Health", "Transport", "education", "Subscriptions", "Entertainment"],
      "y": [9252.0, 7323.26, 5004.0, 3089.0, 2337.15, 2297.82, 2268.0, 1989.0, 1692.0, 572.54]
    }
  ],
  "layout": {
    "title": { "text": "Top 10 Spending Categories" },
    "xaxis": { "title": { "text": "Category" }, "tickangle": -45 },
    "yaxis": { "title": { "text": "Total Amount (EUR)" } }
  }
}

```

---

## Key features

### Expense management

* Add, edit, delete expenses
* List expenses by date range
* Search & filter by category, amount range, note substring, tax deductible flag (with pagination)

### Analytics

* Quick stats: totals, averages, min/max, top category, most expensive day
* Category analytics with percentages
* Trend analysis grouped by day, week, month
* Month-to-month comparison
* Moving-average forecast

### Reporting and data workflows

* Interactive HTML report (Plotly)
* PNG chart generation (Matplotlib): pie, bar, line, stacked bar
* Export to CSV / JSON / Excel (optional analytics sheet)
* Import from CSV / JSON with tolerant parsing (header normalization, comma/decimal support)

### German tax support

* Mark expenses as tax-deductible
* Yearly `tax_summary` grouped into German-friendly buckets:
  Werbungskosten, Gesundheitskosten, Versicherungen, Spenden, Sonstige

---

## Architecture and directory structure

The project follows a “thin tools, fat services” design:

* `server.py` contains only MCP tool wrappers
* `services/*` contains testable business logic
* `db.py` guarantees schema on every `connect()` call

```text
expense_tracker/
  server.py
  config.py
  db.py
  utils/
    __init__.py
    dates.py
  services/
    __init__.py
    expenses_service.py
    analytics_service.py
    reports_service.py
    io_service.py
  data/
    categories.json
    expenses.db
  reports/
  outputs/
```

**Why this matters:** in `fastmcp dev server.py`, FastMCP imports the file as a top-level module.
This project avoids the common “attempted relative import” issues by using **absolute imports everywhere**.

---

## Local setup

```bash
# Install dependencies
uv add fastmcp matplotlib plotly pandas openpyxl

# Run server in dev mode
uv run fastmcp dev server.py
```

If FastMCP can’t infer the server object:

```bash
uv run fastmcp dev server.py:mcp
```

---

## Example usage (copy/paste payloads)

### Add an expense

```json
{
  "date": "2026-01-10",
  "amount": 12.50,
  "category": "food",
  "subcategory": "groceries",
  "note": "Rewe weekly shopping",
  "tax_deductible": 0,
  "currency": "EUR",
  "payment_method": "card"
}
```

### Monthly statistics

```json
{
  "start_date": "2026-01-01",
  "end_date": "2026-01-31"
}
```

### Generate an HTML report

Directory paths are supported (a filename is created automatically):

```json
{
  "start_date": "2025-12-01",
  "end_date": "2025-12-31",
  "output_path": "./reports"
}
```

### Export to Excel with analytics

```json
{
  "start_date": "2025-01-01",
  "end_date": "2025-12-31",
  "format": "excel",
  "include_analytics": true,
  "output_path": "./outputs"
}
```

---

## Implementation highlights

* **Schema-first DB layer**: `connect()` ensures the database file exists and calls `init_db()` to create/migrate the `expenses` table before any operation.
* **Robust output handling**: report/export tools accept either a directory or a full file path without errors.
* **Service modularization**: business logic is separated into CRUD, analytics, reports, and IO services, making the code easier to maintain and test.

---

## What I learned

* Designing MCP tools that are **LLM-friendly** (optional args, safe defaults, deterministic output structures)
* Avoiding common FastMCP dev pitfalls: import mechanics, tool wrappers vs callables, and filesystem outputs
* Building a small but complete data product pipeline: ingest → store → analyze → visualize → export

---

## Links

* GitHub repository: [Link](https://github.com/SurajBhar/MCP_SERVER_Expense_Tracker/tree/main)
* Categories schema: `data/categories.json`
* Local reports: `reports/`
* Exports: `outputs/`