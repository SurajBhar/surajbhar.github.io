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

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p_sql_project/sql_project_erd.svg" title="ERD Diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ERD Diagram!
</div>

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

## Key SQL highlights (click to expand)

<details markdown="1"><summary><b>Schema (DDL)</b> — tables, keys, constraints, relationships</summary>

```sql
CREATE TABLE GENDERS (
  GENDER_ID CHAR(1) NOT NULL PRIMARY KEY,
  LABEL VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE OFFICES (
  OFFICE_ID CHAR(9) NOT NULL PRIMARY KEY,
  LOCATION_NAME VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE SKILLS (
  SKILL_ID CHAR(9) NOT NULL PRIMARY KEY,
  SKILL_NAME VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE TEAM_MEMBERS (
  MEMBER_ID CHAR(6) NOT NULL PRIMARY KEY,
  FIRST_NAME VARCHAR(20) NOT NULL,
  LAST_NAME VARCHAR(20) NOT NULL,
  EMAIL VARCHAR(50) NOT NULL UNIQUE,
  AGE INT CHECK (AGE >= 18 AND AGE <= 70),
  GENDER_ID CHAR(1),
  JOIN_DATE DATE,
  ROLE VARCHAR(30),
  SKILL_ID CHAR(9),
  OFFICE_ID CHAR(9),
  FOREIGN KEY (GENDER_ID) REFERENCES GENDERS(GENDER_ID),
  FOREIGN KEY (SKILL_ID) REFERENCES SKILLS(SKILL_ID),
  FOREIGN KEY (OFFICE_ID) REFERENCES OFFICES(OFFICE_ID)
);

CREATE TABLE PROJECTS (
  PROJECT_ID CHAR(6) NOT NULL PRIMARY KEY,
  PROJECT_NAME VARCHAR(50) NOT NULL,
  DOMAIN VARCHAR(30),
  START_DATE DATE,
  LEAD_ID CHAR(6),
  FOREIGN KEY (LEAD_ID) REFERENCES TEAM_MEMBERS(MEMBER_ID)
);

CREATE TABLE DATASETS (
  DATASET_ID CHAR(6) NOT NULL PRIMARY KEY,
  DATASET_NAME VARCHAR(50),
  SIZE_MB INT CHECK (SIZE_MB >= 0),
  CREATED_DATE DATE,
  PROJECT_ID CHAR(6),
  FOREIGN KEY (PROJECT_ID) REFERENCES PROJECTS(PROJECT_ID)
);
```
</details> <details markdown="1"> <summary><b>Seed data</b> — realistic inserts for members, projects, datasets</summary>

```sql
-- Insert values into GENDERS
INSERT INTO GENDERS (GENDER_ID, LABEL) VALUES
('M', 'Male'),
('F', 'Female');

-- Insert values into OFFICES
INSERT INTO OFFICES (OFFICE_ID, LOCATION_NAME) VALUES
('OFF001', 'Berlin AI Hub'),
('OFF002', 'Heidelberg Data Lab');

-- Insert values into SKILLS
INSERT INTO SKILLS (SKILL_ID, SKILL_NAME) VALUES
('SKL001', 'Machine Learning'),
('SKL002', 'Data Engineering'),
('SKL003', 'NLP'),
('SKL004', 'Computer Vision');

-- Insert values into TEAM_MEMBERS
INSERT INTO TEAM_MEMBERS (
  MEMBER_ID, FIRST_NAME, LAST_NAME, EMAIL, AGE, GENDER_ID, JOIN_DATE, ROLE, SKILL_ID, OFFICE_ID
) VALUES
('MB001', 'Suraj', 'Bhardwaj', 'suraj.unisiegen@gmail.com', 28, 'M', DATE('2023-04-01'), 'Data Scientist', 'SKL001', 'OFF001'),
('MB002', 'Ankush', 'Bhardwaj', 'ankush.bhardwaj@gmail.com', 29, 'M', DATE('2022-10-15'), 'ML Engineer', 'SKL002', 'OFF002'),
('MB003', 'Vijay', 'Kumar', 'vijay.kumar@gmail.com', 24, 'M', DATE('2024-01-12'), 'Junior Data Analyst', 'SKL003', 'OFF002'),
('MB004', 'Sujata', 'Kumari', 'sujata.kumari@gmail.com', 30, 'F', DATE('2023-05-21'), 'AI Researcher', 'SKL004', 'OFF001'),
('MB005', 'Soniya', 'Bhardwaj', 'soniya.bhardwaj@gmail.com', 32, 'F', DATE('2021-07-01'), 'Data Engineer', 'SKL002', 'OFF002');

-- Insert values into PROJECTS
INSERT INTO PROJECTS (
  PROJECT_ID, PROJECT_NAME, DOMAIN, START_DATE, LEAD_ID
) VALUES
('PRJ01', 'Cancer Risk Prediction', 'Healthcare AI', DATE('2023-06-01'), 'MB001'),
('PRJ02', 'Real-time Analytics Pipeline', 'Infra', DATE('2023-01-10'), 'MB002'),
('PRJ03', 'Chatbot Training', 'Customer NLP', DATE('2024-03-01'), 'MB003');

-- Insert values into DATASETS
INSERT INTO DATASETS (
  DATASET_ID, DATASET_NAME, SIZE_MB, CREATED_DATE, PROJECT_ID
) VALUES
('DST01', 'TCGA Gene Data', 2048, DATE('2023-06-15'), 'PRJ01'),
('DST02', 'Log Aggregation Set', 5120, DATE('2023-02-01'), 'PRJ02'),
('DST03', 'Chat History Dump', 1024, DATE('2024-03-10'), 'PRJ03');
```

</details> <details markdown="1"> <summary><b>Analytics queries</b> — joins + aggregation (team, projects, datasets)</summary>

{% raw %}
```sql
-- 1. List members with their role, skill, gender and office
SELECT
  TM.FIRST_NAME || ' ' || TM.LAST_NAME AS FULL_NAME,
  TM.ROLE,
  S.SKILL_NAME,
  G.LABEL AS GENDER,
  O.LOCATION_NAME
FROM TEAM_MEMBERS TM
JOIN SKILLS S ON TM.SKILL_ID = S.SKILL_ID
JOIN GENDERS G ON TM.GENDER_ID = G.GENDER_ID
JOIN OFFICES O ON TM.OFFICE_ID = O.OFFICE_ID;

-- 2. Number of projects per domain
SELECT DOMAIN, COUNT(*) AS PROJECT_COUNT
FROM PROJECTS
GROUP BY DOMAIN;

-- 3. Average dataset size per project
SELECT
  P.PROJECT_NAME,
  AVG(D.SIZE_MB) AS AVG_DATASET_SIZE
FROM DATASETS D
JOIN PROJECTS P ON D.PROJECT_ID = P.PROJECT_ID
GROUP BY P.PROJECT_NAME;

-- 4. Members who lead projects
SELECT
  TM.FIRST_NAME || ' ' || TM.LAST_NAME AS LEADER,
  P.PROJECT_NAME
FROM TEAM_MEMBERS TM
JOIN PROJECTS P ON TM.MEMBER_ID = P.LEAD_ID;
```
{% endraw %}

</details> <details markdown="1"> <summary><b>Change simulation</b> — update + delete + validation query</summary>

{% raw %}
```sql
-- UPDATE: Promote a team member
UPDATE TEAM_MEMBERS
SET ROLE = 'Senior Data Scientist'
WHERE MEMBER_ID = 'MB001';

-- DELETE: Remove a dataset
DELETE FROM DATASETS
WHERE DATASET_ID = 'DST02';

-- Check orphaned projects (no dataset)
SELECT P.PROJECT_NAME
FROM PROJECTS P
LEFT JOIN DATASETS D ON P.PROJECT_ID = D.PROJECT_ID
WHERE D.DATASET_ID IS NULL;
```
{% endraw %}

</details> <details markdown="1"> <summary><b>Advanced SQL</b> — CTE + window function + enriched joins</summary>

{% raw %}
```sql
-- ALTER: Add a phone number column to TEAM_MEMBERS
ALTER TABLE TEAM_MEMBERS
ADD PHONE_NUMBER VARCHAR(20)

-- CTE: List members and how many projects they lead (including 0)
WITH ProjectCount AS (
  SELECT
    TM.MEMBER_ID,
    TM.FIRST_NAME,
    TM.LAST_NAME,
    COUNT(P.PROJECT_ID) AS PROJECTS_LED
  FROM TEAM_MEMBERS TM
  LEFT JOIN PROJECTS P ON TM.MEMBER_ID = P.LEAD_ID
  GROUP BY TM.MEMBER_ID, TM.FIRST_NAME, TM.LAST_NAME
)
SELECT * FROM ProjectCount
ORDER BY PROJECTS_LED DESC

-- Window Function: Rank members by age within each office
SELECT
  TM.FIRST_NAME,
  TM.LAST_NAME,
  O.LOCATION_NAME,
  TM.AGE,
  RANK() OVER (PARTITION BY O.OFFICE_ID ORDER BY TM.AGE DESC) AS AGE_RANK
FROM TEAM_MEMBERS TM
JOIN OFFICES O ON TM.OFFICE_ID = O.OFFICE_ID
ORDER BY O.LOCATION_NAME, AGE_RANK

-- Join: Show dataset details with project and project lead's full name
SELECT
  D.DATASET_NAME,
  D.SIZE_MB,
  P.PROJECT_NAME,
  TM.FIRST_NAME || ' ' || TM.LAST_NAME AS PROJECT_LEAD
FROM DATASETS D
JOIN PROJECTS P ON D.PROJECT_ID = P.PROJECT_ID
JOIN TEAM_MEMBERS TM ON P.LEAD_ID = TM.MEMBER_ID
ORDER BY D.SIZE_MB DESC
```
{% endraw %}

</details> <details markdown="1"> <summary><b>CSV export queries</b> — outputs designed for dashboards & reporting</summary>

{% raw %}
```sql
-- 06_01_export_team_members.sql
-- 1. Full list of team members with metadata (ideal for team directory report)
SELECT
  TM.MEMBER_ID AS "Member ID",
  TM.FIRST_NAME || ' ' || TM.LAST_NAME AS "Full Name",
  TM.EMAIL AS "Email",
  TM.PHONE_NUMBER AS "Phone",
  TM.ROLE AS "Role",
  S.SKILL_NAME AS "Primary Skill",
  G.LABEL AS "Gender",
  TM.AGE AS "Age",
  O.LOCATION_NAME AS "Office",
  TM.JOIN_DATE AS "Joining Date"
FROM TEAM_MEMBERS TM
JOIN SKILLS S ON TM.SKILL_ID = S.SKILL_ID
JOIN GENDERS G ON TM.GENDER_ID = G.GENDER_ID
JOIN OFFICES O ON TM.OFFICE_ID = O.OFFICE_ID
ORDER BY TM.JOIN_DATE;

-- 06_02_export_projects_summary.sql
-- 2. Project summary report with project lead and dataset count
SELECT
  P.PROJECT_ID AS "Project ID",
  P.PROJECT_NAME AS "Project Name",
  P.DOMAIN AS "Domain",
  P.START_DATE AS "Start Date",
  TM.FIRST_NAME || ' ' || TM.LAST_NAME AS "Project Lead",
  COUNT(D.DATASET_ID) AS "Datasets Linked"
FROM PROJECTS P
JOIN TEAM_MEMBERS TM ON P.LEAD_ID = TM.MEMBER_ID
LEFT JOIN DATASETS D ON P.PROJECT_ID = D.PROJECT_ID
GROUP BY P.PROJECT_ID, P.PROJECT_NAME, P.DOMAIN, P.START_DATE, TM.FIRST_NAME, TM.LAST_NAME
ORDER BY P.START_DATE;

-- 06_03_export_datasets_inventory.sql
-- 3. Dataset inventory with project name and size
SELECT
  D.DATASET_NAME AS "Dataset Name",
  D.SIZE_MB AS "Size (MB)",
  D.CREATED_DATE AS "Created On",
  P.PROJECT_NAME AS "Linked Project",
  P.DOMAIN AS "Domain"
FROM DATASETS D
JOIN PROJECTS P ON D.PROJECT_ID = P.PROJECT_ID
ORDER BY D.SIZE_MB DESC;

-- 06_04_export_skills_distribution.sql
-- 4. Skills Distribution Report
SELECT
  S.SKILL_NAME AS "Skill",
  COUNT(TM.MEMBER_ID) AS "Number of Members"
FROM SKILLS S
LEFT JOIN TEAM_MEMBERS TM ON TM.SKILL_ID = S.SKILL_ID
GROUP BY S.SKILL_NAME
ORDER BY "Number of Members" DESC;
```
{% endraw %}

</details>

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
[LinkedIn](https://www.linkedin.com/in/bhardwaj-suraj/)
[GitHub](https://github.com/SurajBhar)
[Website](https://surajbhar.github.io)
