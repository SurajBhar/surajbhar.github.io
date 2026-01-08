---
layout: page
title: Data Science Team Management
description: Relational Database Design & Analysis for Data Science Team Management
img: assets/img/p_sql_project/sql_project_erd.png
importance: 1
category: data
related_publications: false
---

A relational database project that models **how a data science team operates day-to-day**: people, skills, office locations, projects, and the datasets produced by those projects.  
I designed a **normalized schema**, populated realistic seed data, and wrote analytics + reporting queries that are ready to export as CSV for dashboards.

Built and tested on **IBM Db2 Cloud (Lite plan)**, keeping practical cloud constraints in mind (small footprint, clean schema, predictable queries).

[View the source on GitHub](https://github.com/SurajBhar/data_science_sql_project)

---

## What this project demonstrates

- Relational **schema design & normalization** with clear entity boundaries
- **Data integrity** via primary keys, foreign keys, and validation constraints (`CHECK`, `UNIQUE`)
- Analytics with **joins, aggregation, CTEs, and window functions**
- “Reporting-ready” **export queries** with readable column aliases for BI tools

---

## Visual overview

**ERD / Schema**
![ERD](/assets/img/p_sql_project/sql_project_erd.svg)

---

## Data model at a glance

**Core entities**
- `TEAM_MEMBERS` (who works in the team)
- `PROJECTS` (what the team builds)
- `DATASETS` (what projects produce)

**Reference entities**
- `SKILLS`, `OFFICES`, `GENDERS`

**Relationships**
- `TEAM_MEMBERS` → (`SKILLS`, `OFFICES`, `GENDERS`)
- `PROJECTS.LEAD_ID` → `TEAM_MEMBERS.MEMBER_ID`
- `DATASETS.PROJECT_ID` → `PROJECTS.PROJECT_ID`

---

## How to run (IBM Db2 Cloud)

1. Create an **IBM Db2** instance (Lite plan) and open the **Db2 Console → Run SQL**.
2. Execute scripts in this order:
   - `01_create_tables.sql`
   - `02_insert_data.sql`
   - `02_01_view_tables.sql` (sanity check)
3. Run analytics modules:
   - `03_advanced_queries.sql`
   - `04_update_delete_operations.sql` then `04_01_view_changes.sql`
   - `05_advanced_queries.sql`
4. Run export scripts one-by-one:
   - `06_01_export_team_members.sql`
   - `06_02_export_projects_summary.sql`
   - `06_03_export_datasets_inventory.sql`
   - `06_04_export_skills_distribution.sql`

**Export tip (Db2 UI):** run the query → use the result grid’s export option → save as CSV.

---

## Notes on design decisions

- **Normalization first:** reference tables (`SKILLS`, `OFFICES`, `GENDERS`) avoid repetition and keep updates safe.
- **Integrity constraints:** examples include email uniqueness and range checks (e.g., realistic age bounds, non-negative dataset size).
- **Lite-plan friendly:** schema and sample data stay small while still representing real operational structure.

---

## What I would add next

- A small Python notebook to automate export (`ibm_db` + `pandas`) and regenerate charts
- Indexing + query plan checks for larger datasets
- An audit table for tracking role changes / dataset lifecycle events

---

## Author

Suraj Bhardwaj  
[LinkedIn](https://www.linkedin.com/in/bhardwaj-suraj/) · [GitHub](https://github.com/SurajBhar) · [Website](https://surajbhar.github.io)
