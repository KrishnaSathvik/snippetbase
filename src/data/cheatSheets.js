import { v4 as uuidv4 } from 'uuid';

export const cheatSheets = [
  {
    id: uuidv4(),
    title: "PySpark Functions Cheat Sheet",
    category: "pyspark",
    description: "Complete reference for PySpark transformations, actions, and functions",
    emoji: "⚡",
    color: "#FF6B6B",
    content: `# PySpark Functions Cheat Sheet

## String Functions

\`\`\`python
from pyspark.sql.functions import *

# Case conversion
df.withColumn("upper_name", upper(col("name")))
df.withColumn("lower_name", lower(col("name")))

# String manipulation
df.withColumn("trimmed", trim(col("text")))
df.withColumn("concat", concat(col("first"), lit(" "), col("last")))
df.withColumn("replaced", regexp_replace(col("text"), "old", "new"))

# String operations
split(col("text"), ",")           # Split string
length(col("text"))               # String length
substring(col("text"), 1, 5)      # Substring
\`\`\`

## Date Functions

\`\`\`python
# Current date/time
current_date()                    # Current date
current_timestamp()               # Current timestamp

# Date manipulation
date_add(col("date"), 7)          # Add days
date_sub(col("date"), 7)          # Subtract days
datediff(col("end"), col("start")) # Difference in days

# Date parts
year(col("date"))                 # Extract year
month(col("date"))                # Extract month
dayofmonth(col("date"))           # Extract day
\`\`\`

## Aggregation Functions

\`\`\`python
# Basic aggregations
df.groupBy("category").agg(
    sum("amount"),
    avg("price"),
    count("*"),
    max("value"),
    min("value")
)

# Collect functions
collect_list("item")              # List with duplicates
collect_set("item")               # Unique values
\`\`\`

## Window Functions

\`\`\`python
from pyspark.sql.window import Window

# Define window
window = Window.partitionBy("category").orderBy("date")

# Row number
row_number().over(window)

# Rank functions
rank().over(window)
dense_rank().over(window)

# Lag/Lead
lag("value", 1).over(window)
lead("value", 1).over(window)
\`\`\`

## Array Functions

\`\`\`python
# Array operations
array_contains(col("array"), "value")  # Check if contains
explode(col("array"))                  # Expand to rows
size(col("array"))                     # Array size
array_distinct(col("array"))           # Remove duplicates
\`\`\`

## Conditional Functions

\`\`\`python
# When/Otherwise (CASE WHEN)
when(col("age") < 18, "minor")
  .when(col("age") < 65, "adult")
  .otherwise("senior")

# Coalesce (first non-null)
coalesce(col("phone"), col("email"), lit("N/A"))
\`\`\`

## Performance Tips

- ✅ Use \`filter()\` before joins
- ✅ Use \`broadcast()\` for small tables
- ✅ Cache frequently used DataFrames
- ✅ Partition data properly
- ❌ Avoid \`collect()\` on large datasets
- ❌ Avoid UDFs when possible (use native functions)
`,
    tags: ["pyspark", "functions", "reference"],
    views: 1247,
    timesUsed: 342,
    isFavorite: false,
    createdAt: new Date("2025-01-15").toISOString(),
    updatedAt: new Date("2025-01-15").toISOString()
  },

  {
    id: uuidv4(),
    title: "SQL Window Functions Visual Guide",
    category: "sql",
    description: "Master SQL window functions with visual examples and common patterns",
    emoji: "🪟",
    color: "#4ECDC4",
    content: `# SQL Window Functions Cheat Sheet

## Basic Syntax

\`\`\`sql
SELECT 
    column,
    FUNCTION() OVER (
        PARTITION BY category 
        ORDER BY date
        ROWS BETWEEN ... AND ...
    ) as result
FROM table;
\`\`\`

## ROW_NUMBER vs RANK vs DENSE_RANK

\`\`\`sql
-- Given: scores [100, 100, 95, 90]

ROW_NUMBER()  → 1, 2, 3, 4    (always unique)
RANK()        → 1, 1, 3, 4    (gaps after ties)
DENSE_RANK()  → 1, 1, 2, 3    (no gaps)
\`\`\`

## Common Patterns

### Running Total

\`\`\`sql
SUM(amount) OVER (
    PARTITION BY customer_id 
    ORDER BY order_date
) as running_total
\`\`\`

### Moving Average

\`\`\`sql
AVG(value) OVER (
    ORDER BY date 
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
) as moving_avg_3day
\`\`\`

### Previous/Next Row Values

\`\`\`sql
LAG(value, 1) OVER (ORDER BY date) as previous_value
LEAD(value, 1) OVER (ORDER BY date) as next_value
\`\`\`

### First/Last in Group

\`\`\`sql
FIRST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
) as best_seller

LAST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
) as worst_seller
\`\`\`

## Frame Clauses

\`\`\`sql
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  -- All rows before
ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING          -- 7-row window
ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING  -- All rows after
\`\`\`

## Performance Tips

- ✅ Create indexes on PARTITION BY columns
- ✅ Create indexes on ORDER BY columns
- ✅ Limit data with WHERE before window functions
- ❌ Avoid UNBOUNDED when not needed
`,
    tags: ["sql", "window-functions", "analytics"],
    views: 892,
    timesUsed: 267,
    isFavorite: false,
    createdAt: new Date("2025-01-16").toISOString(),
    updatedAt: new Date("2025-01-16").toISOString()
  },

  {
    id: uuidv4(),
    title: "dbt Jinja Template Reference",
    category: "dbt",
    description: "Essential Jinja syntax and macros for dbt development",
    emoji: "🎨",
    color: "#A8E6CF",
    content: `# dbt Jinja Cheat Sheet

## Variables

\`\`\`jinja
{# Set variable #}
{% set my_var = 'value' %}
{{ my_var }}

{# Environment variables #}
{{ target.name }}          -- prod, dev
{{ target.schema }}        -- Schema name
{{ run_started_at }}       -- Run timestamp
{{ invocation_id }}        -- Unique run ID
\`\`\`

## Conditionals

\`\`\`jinja
{% if target.name == 'prod' %}
    SELECT * FROM prod_table
{% else %}
    SELECT * FROM dev_table
{% endif %}
\`\`\`

## Loops

\`\`\`jinja
{% for col in ['col1', 'col2', 'col3'] %}
    {{ col }}{% if not loop.last %},{% endif %}
{% endfor %}

{# Loop variables #}
loop.index       -- 1, 2, 3...
loop.first       -- True on first iteration
loop.last        -- True on last iteration
\`\`\`

## Macros

\`\`\`jinja
{# Define macro #}
{% macro cents_to_dollars(column) %}
    ({{ column }} / 100)::decimal(10,2)
{% endmacro %}

{# Use macro #}
{{ cents_to_dollars('amount') }}
\`\`\`

## Common dbt Functions

\`\`\`jinja
{{ ref('model_name') }}              -- Reference model
{{ source('schema', 'table') }}      -- Reference source
{{ config(materialized='table') }}   -- Set config
{{ this }}                           -- Current model
\`\`\`

## Incremental Logic

\`\`\`jinja
{% if is_incremental() %}
    WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}
\`\`\`

## Hooks

\`\`\`jinja
{# Pre-hook #}
{{ config(
    pre_hook="DELETE FROM {{ this }} WHERE is_deleted = true"
) }}

{# Post-hook #}
{{ config(
    post_hook="GRANT SELECT ON {{ this }} TO analyst_role"
) }}
\`\`\`

## Tests

\`\`\`yaml
# Generic test with Jinja
{% test my_custom_test(model, column) %}
    SELECT *
    FROM {{ model }}
    WHERE {{ column }} IS NULL
{% endtest %}
\`\`\`

## Tips

- ✅ Use {# comments #} for documentation
- ✅ Test macros in compiled SQL
- ✅ Use whitespace control: {{- -}}
- ❌ Don't overuse Jinja - keep SQL readable
`,
    tags: ["dbt", "jinja", "templates"],
    views: 734,
    timesUsed: 198,
    isFavorite: false,
    createdAt: new Date("2025-01-17").toISOString(),
    updatedAt: new Date("2025-01-17").toISOString()
  },

  {
    id: uuidv4(),
    title: "Kafka CLI Commands",
    category: "kafka",
    description: "Essential Kafka command-line operations for topic management and debugging",
    emoji: "🚀",
    color: "#95E1D3",
    content: `# Kafka CLI Commands Cheat Sheet

## Topic Management

### Create Topic

\`\`\`bash
kafka-topics.sh --create \\
  --bootstrap-server localhost:9092 \\
  --topic my-topic \\
  --partitions 3 \\
  --replication-factor 2
\`\`\`

### List Topics

\`\`\`bash
kafka-topics.sh --list \\
  --bootstrap-server localhost:9092
\`\`\`

### Describe Topic

\`\`\`bash
kafka-topics.sh --describe \\
  --bootstrap-server localhost:9092 \\
  --topic my-topic
\`\`\`

### Delete Topic

\`\`\`bash
kafka-topics.sh --delete \\
  --bootstrap-server localhost:9092 \\
  --topic my-topic
\`\`\`

## Producer

### Console Producer

\`\`\`bash
kafka-console-producer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic my-topic

# With key
kafka-console-producer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic my-topic \\
  --property "parse.key=true" \\
  --property "key.separator=:"
\`\`\`

## Consumer

### Console Consumer

\`\`\`bash
# From latest
kafka-console-consumer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic my-topic

# From beginning
kafka-console-consumer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic my-topic \\
  --from-beginning

# With consumer group
kafka-console-consumer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic my-topic \\
  --group my-group
\`\`\`

## Consumer Groups

### List Groups

\`\`\`bash
kafka-consumer-groups.sh --list \\
  --bootstrap-server localhost:9092
\`\`\`

### Describe Group

\`\`\`bash
kafka-consumer-groups.sh --describe \\
  --bootstrap-server localhost:9092 \\
  --group my-group
\`\`\`

### Reset Offsets

\`\`\`bash
# To earliest
kafka-consumer-groups.sh \\
  --bootstrap-server localhost:9092 \\
  --group my-group \\
  --topic my-topic \\
  --reset-offsets --to-earliest \\
  --execute

# To specific offset
kafka-consumer-groups.sh \\
  --bootstrap-server localhost:9092 \\
  --group my-group \\
  --topic my-topic:0 \\
  --reset-offsets --to-offset 100 \\
  --execute
\`\`\`

## Performance Testing

### Producer Performance

\`\`\`bash
kafka-producer-perf-test.sh \\
  --topic my-topic \\
  --num-records 1000000 \\
  --record-size 100 \\
  --throughput -1 \\
  --producer-props bootstrap.servers=localhost:9092
\`\`\`

### Consumer Performance

\`\`\`bash
kafka-consumer-perf-test.sh \\
  --topic my-topic \\
  --messages 1000000 \\
  --bootstrap-server localhost:9092
\`\`\`

## Configuration

### Alter Topic Config

\`\`\`bash
kafka-configs.sh --alter \\
  --bootstrap-server localhost:9092 \\
  --entity-type topics \\
  --entity-name my-topic \\
  --add-config retention.ms=86400000
\`\`\`

### View Config

\`\`\`bash
kafka-configs.sh --describe \\
  --bootstrap-server localhost:9092 \\
  --entity-type topics \\
  --entity-name my-topic
\`\`\`

## Quick Tips

- Use \`--from-beginning\` to read all messages
- Always specify \`--execute\` for offset resets
- Check lag with \`--describe\` on consumer groups
- Use performance tests to validate throughput
`,
    tags: ["kafka", "cli", "commands"],
    views: 1089,
    timesUsed: 412,
    isFavorite: true,
    createdAt: new Date("2025-01-18").toISOString(),
    updatedAt: new Date("2025-01-18").toISOString()
  },

  {
    id: uuidv4(),
    title: "Git Commands for Data Engineers",
    category: "git",
    description: "Essential Git workflows and commands for data pipeline development",
    emoji: "🌿",
    color: "#F38181",
    content: `# Git Cheat Sheet for Data Engineers

## Basic Workflow

\`\`\`bash
# Check status
git status

# Add files
git add .                    # Add all
git add file.py              # Add specific file

# Commit
git commit -m "Add ETL pipeline"

# Push
git push origin main
\`\`\`

## Branching Strategy

\`\`\`bash
# Create and switch to branch
git checkout -b feature/new-pipeline

# Switch branches
git checkout main

# List branches
git branch -a

# Delete branch
git branch -d feature/old-pipeline
\`\`\`

## Common Data Engineering Scenarios

### Working on Pipeline Features

\`\`\`bash
# Start new feature
git checkout -b feature/customer-segmentation
# Make changes
git add .
git commit -m "Add customer segmentation logic"
git push origin feature/customer-segmentation
# Create PR, merge, then:
git checkout main
git pull origin main
git branch -d feature/customer-segmentation
\`\`\`

### Hotfix in Production

\`\`\`bash
git checkout main
git pull
git checkout -b hotfix/fix-null-handling
# Fix the bug
git add .
git commit -m "Fix null handling in aggregation"
git push origin hotfix/fix-null-handling
# Fast-track PR and merge
\`\`\`

### Stashing Work in Progress

\`\`\`bash
# Save current work
git stash save "WIP: aggregation logic"

# List stashes
git stash list

# Apply stash
git stash pop

# Apply specific stash
git stash apply stash@{0}
\`\`\`

## Undoing Changes

### Discard local changes

\`\`\`bash
git checkout -- file.py      # Discard changes in file
git reset --hard HEAD        # Discard all local changes
\`\`\`

### Undo last commit (keep changes)

\`\`\`bash
git reset --soft HEAD~1
\`\`\`

### Undo last commit (discard changes)

\`\`\`bash
git reset --hard HEAD~1
\`\`\`

## Viewing History

\`\`\`bash
# View commit history
git log --oneline --graph --decorate

# View changes
git diff                     # Unstaged changes
git diff --staged            # Staged changes
git diff main feature/new    # Between branches
\`\`\`

## Collaboration

\`\`\`bash
# Update from remote
git fetch origin
git pull origin main

# Merge branch
git checkout main
git merge feature/new-pipeline

# Rebase (keep linear history)
git checkout feature/new-pipeline
git rebase main
\`\`\`

## .gitignore for Data Projects

\`\`\`
# Python
__pycache__/
*.pyc
.venv/
venv/

# Data files
*.csv
*.parquet
*.json
data/raw/
data/processed/

# Notebooks
.ipynb_checkpoints/

# Environment
.env
*.env

# IDE
.vscode/
.idea/

# OS
.DS_Store
\`\`\`

## Tips for Data Teams

- ✅ Branch per feature/pipeline
- ✅ Commit often with clear messages
- ✅ Never commit credentials
- ✅ Never commit large data files
- ✅ Use .gitignore for data folders
- ❌ Don't commit to main directly
- ❌ Don't force push to shared branches
`,
    tags: ["git", "version-control", "workflow"],
    views: 645,
    timesUsed: 189,
    isFavorite: false,
    createdAt: new Date("2025-01-19").toISOString(),
    updatedAt: new Date("2025-01-19").toISOString()
  },

  // ===== 20 NEW CHEAT SHEETS =====

  {
    id: uuidv4(),
    title: "Docker Commands Essential",
    category: "docker",
    description: "Complete Docker reference for containers, images, and debugging",
    color: "#74B9FF",
    content: `# Docker Commands Cheat Sheet

## Container Management

### Run Container

\`\`\`bash
# Basic run
docker run ubuntu

# Interactive mode
docker run -it ubuntu bash

# Detached mode
docker run -d nginx

# With port mapping
docker run -p 8080:80 nginx

# With volume
docker run -v $(pwd):/app python:3.9

# With environment variables
docker run -e DB_HOST=localhost postgres
\`\`\`

### Container Operations

\`\`\`bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop container_id

# Remove container
docker rm container_id

# View logs
docker logs container_id
docker logs -f container_id  # Follow logs

# Execute command in container
docker exec -it container_id bash

# Inspect container
docker inspect container_id
\`\`\`

## Image Management

### Build & Push

\`\`\`bash
# Build image
docker build -t myapp:latest .

# Build with build args
docker build --build-arg VERSION=1.0 -t myapp .

# Tag image
docker tag myapp:latest myrepo/myapp:v1

# Push to registry
docker push myrepo/myapp:v1

# Pull image
docker pull ubuntu:22.04
\`\`\`

### Image Operations

\`\`\`bash
# List images
docker images

# Remove image
docker rmi image_id

# Remove unused images
docker image prune

# View image history
docker history image_id
\`\`\`

## Docker Compose

### Basic Commands

\`\`\`bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild services
docker-compose up --build

# Scale service
docker-compose up --scale web=3
\`\`\`

## Cleanup

### Remove Everything

\`\`\`bash
# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# System prune (removes everything unused)
docker system prune -a --volumes
\`\`\`

## Dockerfile Best Practices

\`\`\`dockerfile
# Multi-stage build
FROM python:3.9 as builder
WORKDIR /build
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.9-slim
COPY --from=builder /root/.local /root/.local
COPY . /app
WORKDIR /app
CMD ["python", "app.py"]
\`\`\`

## Tips

- ✅ Use \`.dockerignore\` to exclude files
- ✅ Use multi-stage builds for smaller images
- ✅ Don't run as root in production
- ✅ One process per container
- ❌ Don't store data in containers
- ❌ Don't use \`:latest\` in production
`,
    tags: ["docker", "containers", "devops"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-20").toISOString(),
    updatedAt: new Date("2025-01-20").toISOString()
  },

  {
    id: uuidv4(),
    title: "Python Data Structures Quick Reference",
    category: "python",
    description: "Lists, dicts, sets, tuples - operations and best practices",
    color: "#FFE66D",
    content: `# Python Data Structures Cheat Sheet

## Lists

\`\`\`python
# Creation
lst = [1, 2, 3, 4, 5]
lst = list(range(10))

# Access
lst[0]          # First element
lst[-1]         # Last element
lst[1:3]        # Slice [1, 2]
lst[:3]         # First 3
lst[3:]         # From 3 to end

# Modify
lst.append(6)           # Add to end
lst.insert(0, 0)        # Insert at position
lst.extend([7, 8])      # Add multiple
lst.remove(5)           # Remove value
lst.pop()               # Remove last
lst.pop(0)              # Remove at index

# Operations
len(lst)                # Length
lst.count(3)            # Count occurrences
lst.index(3)            # Find index
lst.sort()              # Sort in place
sorted(lst)             # Return sorted copy
lst.reverse()           # Reverse in place
\`\`\`

## Dictionaries

\`\`\`python
# Creation
d = {'a': 1, 'b': 2}
d = dict(a=1, b=2)

# Access
d['a']                  # Get value
d.get('a', 0)          # Get with default
d.keys()               # All keys
d.values()             # All values
d.items()              # Key-value pairs

# Modify
d['c'] = 3             # Add/update
d.update({'d': 4})     # Update multiple
d.pop('a')             # Remove and return
del d['b']             # Delete key

# Operations
'a' in d               # Check key exists
len(d)                 # Number of items
d.clear()              # Remove all items

# Dict comprehension
{k: v**2 for k, v in d.items()}
\`\`\`

## Sets

\`\`\`python
# Creation
s = {1, 2, 3, 4}
s = set([1, 2, 2, 3])  # Duplicates removed

# Operations
s.add(5)               # Add element
s.remove(3)            # Remove (error if not exists)
s.discard(3)           # Remove (no error)
s.pop()                # Remove arbitrary element

# Set operations
s1 | s2                # Union
s1 & s2                # Intersection
s1 - s2                # Difference
s1 ^ s2                # Symmetric difference

# Set comprehension
{x**2 for x in range(10)}
\`\`\`

## Tuples

\`\`\`python
# Creation
t = (1, 2, 3)
t = 1, 2, 3            # Packing
a, b, c = t            # Unpacking

# Access
t[0]                   # First element
t[-1]                  # Last element
t[1:3]                 # Slice

# Operations
len(t)                 # Length
t.count(2)             # Count occurrences
t.index(2)             # Find index

# Immutable!
# t[0] = 5  # Error!
\`\`\`

## Comprehensions

### List Comprehension

\`\`\`python
[x**2 for x in range(10)]
[x for x in range(10) if x % 2 == 0]
[x if x > 0 else 0 for x in nums]
\`\`\`

### Dict Comprehension

\`\`\`python
{x: x**2 for x in range(5)}
{k: v for k, v in d.items() if v > 10}
\`\`\`

### Set Comprehension

\`\`\`python
{x**2 for x in range(10)}
{x for x in nums if x > 0}
\`\`\`

## Performance Tips

- ✅ Use sets for membership testing
- ✅ Use dict for key lookups
- ✅ Use tuples for immutable data
- ✅ Use list comprehensions (faster than loops)
- ❌ Don't use lists for lookups (slow)
- ❌ Don't modify list while iterating
`,
    tags: ["python", "data-structures", "basics"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-21").toISOString(),
    updatedAt: new Date("2025-01-21").toISOString()
  },

  {
    id: uuidv4(),
    title: "Pandas Essential Operations",
    category: "pandas",
    description: "DataFrames, Series, filtering, grouping, and transformations",
    color: "#A8E6CF",
    content: `# Pandas Cheat Sheet

## Create DataFrames

\`\`\`python
import pandas as pd

# From dict
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})

# From CSV
df = pd.read_csv('data.csv')
df = pd.read_csv('data.csv', sep=';', encoding='utf-8')

# From SQL
df = pd.read_sql('SELECT * FROM table', connection)

# From Excel
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')
\`\`\`

## Inspect Data

\`\`\`python
df.head()              # First 5 rows
df.tail(10)            # Last 10 rows
df.info()              # Column types and nulls
df.describe()          # Statistics
df.shape               # (rows, columns)
df.columns             # Column names
df.dtypes              # Data types
\`\`\`

## Select Data

\`\`\`python
# Select columns
df['column']           # Single column (Series)
df[['col1', 'col2']]   # Multiple columns

# Select rows by position
df.iloc[0]             # First row
df.iloc[0:5]           # First 5 rows
df.iloc[:, 0:3]        # All rows, first 3 columns

# Select by label
df.loc[0]              # Row with index 0
df.loc[:, 'col1':'col3']  # Columns by name

# Boolean indexing
df[df['age'] > 25]
df[(df['age'] > 25) & (df['city'] == 'NYC')]
\`\`\`

## Modify Data

\`\`\`python
# Add column
df['new_col'] = df['col1'] + df['col2']

# Rename columns
df.rename(columns={'old': 'new'}, inplace=True)

# Drop columns
df.drop(['col1', 'col2'], axis=1, inplace=True)

# Drop rows
df.drop([0, 1], axis=0, inplace=True)

# Replace values
df['col'].replace('old', 'new', inplace=True)

# Fill missing values
df.fillna(0, inplace=True)
df.fillna(method='ffill', inplace=True)  # Forward fill

# Drop missing values
df.dropna(inplace=True)
df.dropna(subset=['col1'], inplace=True)
\`\`\`

## GroupBy Operations

\`\`\`python
# Basic groupby
df.groupby('category').sum()
df.groupby('category')['amount'].sum()

# Multiple aggregations
df.groupby('category').agg({
    'amount': ['sum', 'mean', 'count'],
    'price': 'max'
})

# Custom aggregation
df.groupby('category').agg(
    total=('amount', 'sum'),
    avg=('amount', 'mean')
)
\`\`\`

## Merge & Join

\`\`\`python
# Merge (SQL-like join)
pd.merge(df1, df2, on='key')
pd.merge(df1, df2, left_on='key1', right_on='key2')
pd.merge(df1, df2, how='left')  # left, right, inner, outer

# Concat
pd.concat([df1, df2])           # Stack vertically
pd.concat([df1, df2], axis=1)   # Stack horizontally
\`\`\`

## Sorting

\`\`\`python
# Sort by column
df.sort_values('col1')
df.sort_values(['col1', 'col2'], ascending=[True, False])

# Sort by index
df.sort_index()
\`\`\`

## Apply Functions

\`\`\`python
# Apply to column
df['col'].apply(lambda x: x * 2)

# Apply to row
df.apply(lambda row: row['col1'] + row['col2'], axis=1)

# Map values
df['col'].map({'A': 1, 'B': 2})
\`\`\`

## Export Data

\`\`\`python
# To CSV
df.to_csv('output.csv', index=False)

# To Excel
df.to_excel('output.xlsx', sheet_name='Sheet1', index=False)

# To SQL
df.to_sql('table_name', connection, if_exists='replace')
\`\`\`

## Performance Tips

- ✅ Use vectorized operations (avoid loops)
- ✅ Use \`query()\` for complex filters
- ✅ Use \`category\` dtype for repeated strings
- ✅ Use \`inplace=True\` to save memory
- ❌ Don't use \`iterrows()\` (very slow)
- ❌ Don't chain too many operations
`,
    tags: ["pandas", "python", "data-analysis"],
    views: 0,
    timesUsed: 0,
    isFavorite: true,
    createdAt: new Date("2025-01-22").toISOString(),
    updatedAt: new Date("2025-01-22").toISOString()
  },

  {
    id: uuidv4(),
    title: "Regex Patterns for Data Cleaning",
    category: "regex",
    description: "Common regex patterns for validating and extracting data",
    color: "#FF6B6B",
    content: `# Regex Cheat Sheet for Data Engineering

## Basic Syntax

\`\`\`
.       Any character
\\d      Digit [0-9]
\\D      Not digit
\\w      Word character [a-zA-Z0-9_]
\\W      Not word character
\\s      Whitespace
\\S      Not whitespace
^       Start of string
$       End of string
*       0 or more
+       1 or more
?       0 or 1
{n}     Exactly n times
{n,}    n or more times
{n,m}   Between n and m times
\`\`\`

## Email Validation

\`\`\`python
import re

pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'

# Test
re.match(pattern, 'user@example.com')  # Valid
re.match(pattern, 'invalid.email')     # Invalid
\`\`\`

## Phone Numbers

\`\`\`python
# US Phone: (123) 456-7890 or 123-456-7890
pattern = r'^(\\(\\d{3}\\)|\\d{3})[-\\s]?\\d{3}[-\\s]?\\d{4}$'

# Extract phone numbers
text = "Call 123-456-7890 or (555) 123-4567"
phones = re.findall(r'\\(?\\d{3}\\)?[-\\s]?\\d{3}[-\\s]?\\d{4}', text)
\`\`\`

## URLs

\`\`\`python
# Basic URL pattern
pattern = r'https?://[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'

# Extract URLs from text
urls = re.findall(pattern, text)

# Validate URL
url_pattern = r'^https?://[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(/.*)?$'
re.match(url_pattern, 'https://example.com/path')
\`\`\`

## Dates

\`\`\`python
# YYYY-MM-DD
date_pattern = r'\\d{4}-\\d{2}-\\d{2}'

# MM/DD/YYYY
us_date = r'\\d{2}/\\d{2}/\\d{4}'

# Extract dates
dates = re.findall(r'\\d{4}-\\d{2}-\\d{2}', text)
\`\`\`

## Credit Cards

\`\`\`python
# Visa: 4xxx-xxxx-xxxx-xxxx
visa = r'^4\\d{3}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}$'

# MasterCard: 5xxx-xxxx-xxxx-xxxx
mastercard = r'^5\\d{3}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}$'

# Mask credit card (keep last 4)
masked = re.sub(r'\\d(?=\\d{4})', '*', '1234567890123456')
# Result: ************3456
\`\`\`

## IP Addresses

\`\`\`python
# IPv4
ipv4 = r'^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$'

# Better IPv4 (validates range)
ipv4_valid = r'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
\`\`\`

## Extract Numbers

\`\`\`python
# All numbers
numbers = re.findall(r'\\d+', text)

# Decimal numbers
decimals = re.findall(r'\\d+\\.\\d+', text)

# Numbers with commas
amounts = re.findall(r'\\d{1,3}(,\\d{3})*', text)
\`\`\`

## Data Cleaning

\`\`\`python
# Remove special characters
clean = re.sub(r'[^a-zA-Z0-9\\s]', '', text)

# Remove extra whitespace
clean = re.sub(r'\\s+', ' ', text).strip()

# Extract hashtags
hashtags = re.findall(r'#\\w+', text)

# Extract mentions
mentions = re.findall(r'@\\w+', text)
\`\`\`

## Capture Groups

\`\`\`python
# Extract parts
pattern = r'(\\d{4})-(\\d{2})-(\\d{2})'
match = re.match(pattern, '2024-01-15')
year, month, day = match.groups()

# Named groups
pattern = r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})'
match = re.match(pattern, '2024-01-15')
match.group('year')  # '2024'
\`\`\`

## Replace Patterns

\`\`\`python
# Replace emails
text = re.sub(r'\\S+@\\S+', '[EMAIL]', text)

# Replace phone numbers
text = re.sub(r'\\d{3}-\\d{3}-\\d{4}', '[PHONE]', text)

# Redact SSN
text = re.sub(r'\\d{3}-\\d{2}-\\d{4}', 'XXX-XX-XXXX', text)
\`\`\`

## Tips

- ✅ Test patterns at regex101.com
- ✅ Use raw strings: r'pattern'
- ✅ Use named groups for clarity
- ✅ Compile patterns used repeatedly
- ❌ Don't use regex for complex parsing (use parser)
- ❌ Avoid greedy quantifiers when possible
`,
    tags: ["regex", "data-cleaning", "validation"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-23").toISOString(),
    updatedAt: new Date("2025-01-23").toISOString()
  },

  {
    id: uuidv4(),
    title: "Linux Shell Commands for Data Engineers",
    category: "linux",
    description: "Essential bash commands for file processing and data manipulation",
    color: "#95E1D3",
    content: `# Linux Shell Commands Cheat Sheet

## File Operations

\`\`\`bash
# List files
ls -la                 # Detailed list
ls -lh                 # Human-readable sizes
ls -lt                 # Sort by time

# Find files
find . -name "*.csv"
find . -type f -mtime -7  # Modified in last 7 days
find . -size +100M        # Files larger than 100MB

# Copy/Move/Delete
cp file1.csv file2.csv
cp -r dir1/ dir2/
mv old.csv new.csv
rm file.csv
rm -rf directory/
\`\`\`

## Text Processing

### grep (Search)

\`\`\`bash
# Basic search
grep "error" logfile.txt
grep -i "error" file.txt       # Case insensitive
grep -v "success" file.txt     # Inverse (exclude)
grep -r "pattern" directory/   # Recursive
grep -c "pattern" file.txt     # Count matches

# Multiple patterns
grep -E "error|warning" file.txt
\`\`\`

### sed (Replace)

\`\`\`bash
# Replace text
sed 's/old/new/' file.txt
sed 's/old/new/g' file.txt     # Global (all occurrences)
sed -i 's/old/new/g' file.txt  # In-place

# Delete lines
sed '/pattern/d' file.txt

# Print specific lines
sed -n '10,20p' file.txt       # Lines 10-20
\`\`\`

### awk (Process Columns)

\`\`\`bash
# Print columns
awk '{print $1}' file.txt           # First column
awk '{print $1, $3}' file.txt       # Columns 1 and 3
awk -F',' '{print $2}' data.csv     # CSV (column 2)

# Filter and process
awk '$3 > 100' file.txt             # Where column 3 > 100
awk '{sum+=$1} END {print sum}' file.txt  # Sum column 1
\`\`\`

### cut (Extract Columns)

\`\`\`bash
# Extract columns
cut -d',' -f1 data.csv        # First column of CSV
cut -d',' -f1,3 data.csv      # Columns 1 and 3
cut -c1-10 file.txt           # First 10 characters
\`\`\`

## Sorting & Counting

### sort

\`\`\`bash
sort file.txt                  # Alphabetical
sort -n file.txt               # Numerical
sort -r file.txt               # Reverse
sort -u file.txt               # Unique only
sort -k2 file.txt              # Sort by column 2
\`\`\`

### uniq

\`\`\`bash
uniq file.txt                  # Remove duplicates
uniq -c file.txt               # Count occurrences
uniq -d file.txt               # Show only duplicates
\`\`\`

### wc (Count)

\`\`\`bash
wc -l file.txt                 # Count lines
wc -w file.txt                 # Count words
wc -c file.txt                 # Count bytes
\`\`\`

## Data Pipeline Commands

### head/tail

\`\`\`bash
head -n 10 file.txt            # First 10 lines
tail -n 10 file.txt            # Last 10 lines
tail -f logfile.txt            # Follow (live updates)
\`\`\`

### CSV Processing

\`\`\`bash
# Get CSV header
head -n 1 data.csv

# Count rows (excluding header)
tail -n +2 data.csv | wc -l

# Extract column
cut -d',' -f2 data.csv | tail -n +2

# Find duplicates in column
cut -d',' -f1 data.csv | sort | uniq -d
\`\`\`

## Compression

\`\`\`bash
# gzip
gzip file.txt                  # Compress
gzip -d file.txt.gz            # Decompress
gunzip file.txt.gz

# tar
tar -czf archive.tar.gz dir/   # Create compressed archive
tar -xzf archive.tar.gz        # Extract
tar -tzf archive.tar.gz        # List contents
\`\`\`

## Disk Usage

\`\`\`bash
# Check disk space
df -h                          # Human-readable

# Directory sizes
du -sh *                       # Size of each item
du -h --max-depth=1           # One level deep
du -sh directory/             # Total size

# Find largest files
du -ah | sort -rh | head -20
\`\`\`

## Process Management

\`\`\`bash
# View processes
ps aux                         # All processes
ps aux | grep python          # Find Python processes

# Kill process
kill PID
kill -9 PID                   # Force kill

# Background jobs
command &                     # Run in background
jobs                          # List jobs
fg %1                         # Bring to foreground
\`\`\`

## Pipes & Redirection

\`\`\`bash
# Pipe output
cat file.txt | grep "error" | wc -l

# Redirect output
command > output.txt          # Overwrite
command >> output.txt         # Append
command 2> errors.txt         # Redirect errors
command &> all.txt            # Both stdout and stderr

# Chain commands
command1 && command2          # Run command2 if command1 succeeds
command1 || command2          # Run command2 if command1 fails
\`\`\`

## Common Data Pipeline

\`\`\`bash
# Count errors by type
grep "ERROR" app.log | \\
  cut -d':' -f3 | \\
  sort | \\
  uniq -c | \\
  sort -rn

# Process CSV
tail -n +2 data.csv | \\       # Skip header
  cut -d',' -f2,3 | \\         # Columns 2,3
  grep -v "NULL" | \\          # Remove NULLs
  sort -t',' -k2 -n | \\       # Sort by column 2
  head -20                      # Top 20
\`\`\`

## Tips

- ✅ Use \`man command\` for help
- ✅ Pipe commands together for complex operations
- ✅ Use \`less\` to view large files
- ✅ Test commands on small data first
- ❌ Be careful with \`rm -rf\` (no undo!)
- ❌ Don't process huge files without sampling
`,
    tags: ["linux", "bash", "shell"],
    views: 0,
    timesUsed: 0,
    isFavorite: true,
    createdAt: new Date("2025-01-24").toISOString(),
    updatedAt: new Date("2025-01-24").toISOString()
  },

  {
    id: uuidv4(),
    title: "SQL Joins Visual Guide",
    category: "sql",
    description: "Master SQL joins with visual examples and common patterns",
    color: "#4ECDC4",
    content: `# SQL Joins Cheat Sheet

## Join Types Overview

\`\`\`
INNER JOIN: Only matching rows
LEFT JOIN:  All from left + matches from right
RIGHT JOIN: All from right + matches from left
FULL JOIN:  All rows from both tables
CROSS JOIN: Cartesian product (all combinations)
\`\`\`

## INNER JOIN

\`\`\`sql
-- Only rows that match in both tables
SELECT 
    c.customer_id,
    c.name,
    o.order_id,
    o.amount
FROM customers c
INNER JOIN orders o 
    ON c.customer_id = o.customer_id;

-- Multiple conditions
INNER JOIN orders o 
    ON c.customer_id = o.customer_id 
    AND o.status = 'completed';
\`\`\`

## LEFT JOIN (LEFT OUTER JOIN)

\`\`\`sql
-- All customers, even without orders
SELECT 
    c.customer_id,
    c.name,
    o.order_id,
    o.amount
FROM customers c
LEFT JOIN orders o 
    ON c.customer_id = o.customer_id;

-- Find customers without orders
SELECT c.*
FROM customers c
LEFT JOIN orders o 
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
\`\`\`

## RIGHT JOIN (RIGHT OUTER JOIN)

\`\`\`sql
-- All orders, even without customer info
SELECT 
    c.customer_id,
    c.name,
    o.order_id,
    o.amount
FROM customers c
RIGHT JOIN orders o 
    ON c.customer_id = o.customer_id;
\`\`\`

## FULL OUTER JOIN

\`\`\`sql
-- All customers and all orders
SELECT 
    c.customer_id,
    c.name,
    o.order_id,
    o.amount
FROM customers c
FULL OUTER JOIN orders o 
    ON c.customer_id = o.customer_id;

-- Find non-matching records from either side
WHERE c.customer_id IS NULL 
   OR o.order_id IS NULL;
\`\`\`

## CROSS JOIN

\`\`\`sql
-- Every combination (Cartesian product)
SELECT 
    p.product_name,
    s.store_name
FROM products p
CROSS JOIN stores s;

-- Useful for: date spines, all combinations
-- Be careful: can create massive results!
\`\`\`

## SELF JOIN

\`\`\`sql
-- Join table to itself
-- Example: Find employees and their managers
SELECT 
    e.employee_name,
    m.employee_name as manager_name
FROM employees e
LEFT JOIN employees m 
    ON e.manager_id = m.employee_id;
\`\`\`

## Multiple Joins

\`\`\`sql
SELECT 
    c.name,
    o.order_id,
    p.product_name,
    oi.quantity
FROM customers c
INNER JOIN orders o 
    ON c.customer_id = o.customer_id
INNER JOIN order_items oi 
    ON o.order_id = oi.order_id
INNER JOIN products p 
    ON oi.product_id = p.product_id;
\`\`\`

## Join with Aggregation

\`\`\`sql
-- Customer order totals
SELECT 
    c.customer_id,
    c.name,
    COUNT(o.order_id) as order_count,
    SUM(o.amount) as total_spent
FROM customers c
LEFT JOIN orders o 
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;
\`\`\`

## Anti Join Pattern

\`\`\`sql
-- Find customers who never ordered
SELECT c.*
FROM customers c
LEFT JOIN orders o 
    ON c.customer_id = o.customer_id
WHERE o.customer_id IS NULL;

-- Using NOT EXISTS (often faster)
SELECT c.*
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.customer_id
);
\`\`\`

## Semi Join Pattern

\`\`\`sql
-- Find customers who ordered (no duplicate customers)
SELECT DISTINCT c.*
FROM customers c
INNER JOIN orders o 
    ON c.customer_id = o.customer_id;

-- Using EXISTS (often faster)
SELECT c.*
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.customer_id
);
\`\`\`

## Join Performance Tips

\`\`\`sql
-- ✅ Index join columns
CREATE INDEX idx_orders_customer 
    ON orders(customer_id);

-- ✅ Filter before joining when possible
SELECT c.*, o.*
FROM customers c
INNER JOIN (
    SELECT * FROM orders 
    WHERE order_date >= '2024-01-01'
) o ON c.customer_id = o.customer_id;

-- ✅ Use appropriate join type
-- Don't use FULL JOIN if LEFT JOIN is enough

-- ❌ Avoid Cartesian products (CROSS JOIN without condition)
-- ❌ Don't join on functions
-- Bad:  ON LOWER(c.email) = LOWER(o.email)
-- Good: ON c.email = o.email (with proper casing)
\`\`\`

## Common Join Patterns

### 1-to-1 Relationship

\`\`\`sql
-- Employee and their profile
SELECT e.*, p.*
FROM employees e
INNER JOIN employee_profiles p 
    ON e.employee_id = p.employee_id;
\`\`\`

### 1-to-Many Relationship

\`\`\`sql
-- Customer and their orders
SELECT c.*, o.*
FROM customers c
LEFT JOIN orders o 
    ON c.customer_id = o.customer_id;
\`\`\`

### Many-to-Many Relationship

\`\`\`sql
-- Students and courses (through enrollments)
SELECT s.*, c.*
FROM students s
INNER JOIN enrollments e 
    ON s.student_id = e.student_id
INNER JOIN courses c 
    ON e.course_id = c.course_id;
\`\`\`

## Tips

- ✅ Always specify join condition
- ✅ Use table aliases for readability
- ✅ Test with small datasets first
- ✅ Index foreign key columns
- ❌ Avoid SELECT * in production
- ❌ Be careful with FULL OUTER JOIN (expensive)
`,
    tags: ["sql", "joins", "database"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-25").toISOString(),
    updatedAt: new Date("2025-01-25").toISOString()
  },

  {
    id: uuidv4(),
    title: "Python Datetime Operations",
    category: "python",
    description: "Working with dates, times, and timezones in Python",
    color: "#FFE66D",
    content: `# Python Datetime Cheat Sheet

## Import

\`\`\`python
from datetime import datetime, date, time, timedelta
import pytz  # For timezones
\`\`\`

## Create Datetime Objects

\`\`\`python
# Current date/time
now = datetime.now()
today = date.today()
current_time = datetime.now().time()

# Specific date/time
dt = datetime(2024, 1, 15, 14, 30, 0)  # Year, month, day, hour, min, sec
d = date(2024, 1, 15)
t = time(14, 30, 0)
\`\`\`

## Parse from String

\`\`\`python
# Using strptime
dt = datetime.strptime('2024-01-15', '%Y-%m-%d')
dt = datetime.strptime('01/15/2024 14:30', '%m/%d/%Y %H:%M')

# Common format codes:
# %Y - Year (2024)
# %y - Year (24)
# %m - Month (01-12)
# %d - Day (01-31)
# %H - Hour 24h (00-23)
# %I - Hour 12h (01-12)
# %M - Minute (00-59)
# %S - Second (00-59)
# %p - AM/PM
\`\`\`

## Format to String

\`\`\`python
# Using strftime
now = datetime.now()
now.strftime('%Y-%m-%d')              # '2024-01-15'
now.strftime('%m/%d/%Y')              # '01/15/2024'
now.strftime('%Y-%m-%d %H:%M:%S')     # '2024-01-15 14:30:00'
now.strftime('%B %d, %Y')             # 'January 15, 2024'

# ISO format
now.isoformat()                       # '2024-01-15T14:30:00'
\`\`\`

## Date Arithmetic

\`\`\`python
# Add/subtract time
from datetime import timedelta

now = datetime.now()
tomorrow = now + timedelta(days=1)
yesterday = now - timedelta(days=1)
next_week = now + timedelta(weeks=1)
two_hours_later = now + timedelta(hours=2)

# Date difference
diff = date2 - date1
diff.days                             # Number of days
diff.total_seconds()                  # Total seconds
\`\`\`

## Extract Components

\`\`\`python
dt = datetime.now()

dt.year                               # 2024
dt.month                              # 1
dt.day                                # 15
dt.hour                               # 14
dt.minute                             # 30
dt.second                             # 0
dt.weekday()                          # Monday=0, Sunday=6
dt.strftime('%A')                     # Day name: 'Monday'
dt.strftime('%B')                     # Month name: 'January'
\`\`\`

## Timezones

\`\`\`python
import pytz

# List timezones
pytz.all_timezones

# Create timezone-aware datetime
utc_tz = pytz.UTC
eastern_tz = pytz.timezone('US/Eastern')

# Current time in timezone
now_utc = datetime.now(utc_tz)
now_eastern = datetime.now(eastern_tz)

# Convert between timezones
utc_time = datetime.now(pytz.UTC)
eastern_time = utc_time.astimezone(eastern_tz)

# Make naive datetime aware
naive_dt = datetime.now()
aware_dt = eastern_tz.localize(naive_dt)
\`\`\`

## Common Pandas Operations

\`\`\`python
import pandas as pd

# Create datetime column
df['date'] = pd.to_datetime(df['date_string'])

# Extract components
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day
df['dayofweek'] = df['date'].dt.dayofweek
df['quarter'] = df['date'].dt.quarter

# Filter by date
df[df['date'] >= '2024-01-01']
df[df['date'].between('2024-01-01', '2024-12-31')]

# Date arithmetic
df['next_day'] = df['date'] + pd.Timedelta(days=1)
df['days_since'] = (pd.Timestamp.now() - df['date']).dt.days
\`\`\`

## Unix Timestamp

\`\`\`python
# Datetime to timestamp
dt = datetime.now()
timestamp = dt.timestamp()            # 1705334400.0

# Timestamp to datetime
dt = datetime.fromtimestamp(timestamp)

# UTC timestamp
dt = datetime.utcfromtimestamp(timestamp)
\`\`\`

## Common Patterns

### Age Calculation

\`\`\`python
from datetime import date

def calculate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year
    if (today.month, today.day) < (birth_date.month, birth_date.day):
        age -= 1
    return age

birth = date(1990, 5, 15)
age = calculate_age(birth)
\`\`\`

### Business Days

\`\`\`python
import pandas as pd

# Add business days
start = pd.Timestamp('2024-01-15')
end = start + pd.offsets.BDay(5)  # 5 business days later

# Count business days
business_days = pd.bdate_range(start, end).size
\`\`\`

### Date Range

\`\`\`python
# Generate date range
dates = pd.date_range('2024-01-01', '2024-12-31', freq='D')  # Daily
months = pd.date_range('2024-01-01', '2024-12-31', freq='M')  # Monthly
\`\`\`

### First/Last Day of Month

\`\`\`python
from datetime import date
import calendar

def first_day_of_month(dt):
    return dt.replace(day=1)

def last_day_of_month(dt):
    last_day = calendar.monthrange(dt.year, dt.month)[1]
    return dt.replace(day=last_day)

dt = date(2024, 2, 15)
first = first_day_of_month(dt)  # 2024-02-01
last = last_day_of_month(dt)    # 2024-02-29 (leap year!)
\`\`\`

## PySpark DateTime

\`\`\`python
from pyspark.sql import functions as F

# Current timestamp
df.withColumn('now', F.current_timestamp())

# Parse string to date
df.withColumn('date', F.to_date('date_string', 'yyyy-MM-dd'))

# Extract components
df.withColumn('year', F.year('date'))
df.withColumn('month', F.month('date'))
df.withColumn('dayofweek', F.dayofweek('date'))

# Date arithmetic
df.withColumn('tomorrow', F.date_add('date', 1))
df.withColumn('days_diff', F.datediff('end_date', 'start_date'))
\`\`\`

## Tips

- ✅ Always use timezone-aware datetimes for UTC
- ✅ Store dates in UTC, convert to local for display
- ✅ Use ISO 8601 format (YYYY-MM-DD) for strings
- ✅ Use pandas for bulk date operations
- ❌ Don't compare naive and aware datetimes
- ❌ Don't hardcode timezones (use pytz)
`,
    tags: ["python", "datetime", "dates"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-26").toISOString(),
    updatedAt: new Date("2025-01-26").toISOString()
  },

  {
    id: uuidv4(),
    title: "Databricks Magic Commands",
    category: "databricks",
    description: "Essential magic commands and notebook utilities for Databricks",
    color: "#F38181",
    content: `# Databricks Magic Commands Cheat Sheet

## Language Magic Commands

### Python (Default)

\`\`\`python
# Default language in notebook
print("Hello from Python")
\`\`\`

### SQL

\`\`\`python
%sql
SELECT * FROM table LIMIT 10
\`\`\`

### Scala

\`\`\`python
%scala
val df = spark.read.table("table_name")
df.show()
\`\`\`

### R

\`\`\`python
%r
library(SparkR)
df <- sql("SELECT * FROM table")
\`\`\`

### Markdown

\`\`\`python
%md
# Heading
**Bold text**
\`code\`
\`\`\`

## Filesystem Commands

### List Files

\`\`\`python
%fs ls /mnt/data/
%fs ls dbfs:/user/hive/warehouse/
\`\`\`

### Copy Files

\`\`\`python
%fs cp /source/file.csv /destination/
%fs cp -r /source_dir/ /destination_dir/
\`\`\`

### Move/Remove

\`\`\`python
%fs mv /old/path.csv /new/path.csv
%fs rm /path/to/file.csv
%fs rm -r /path/to/directory/
\`\`\`

### View File Content

\`\`\`python
%fs head /path/to/file.txt
%fs head /path/to/file.txt 100  # First 100 lines
\`\`\`

### Create Directory

\`\`\`python
%fs mkdirs /path/to/new/directory
\`\`\`

## Shell Commands

### Run Shell

\`\`\`python
%sh
ls -la /dbfs/mnt/
\`\`\`

### Install Package

\`\`\`python
%sh
pip install pandas==1.5.0
\`\`\`

### Check Environment

\`\`\`python
%sh
python --version
java -version
\`\`\`

## Display Commands

### Display DataFrame

\`\`\`python
# Show DataFrame as table
display(df)

# With visualization
display(df.groupBy("category").count())
\`\`\`

### Display HTML

\`\`\`python
displayHTML("<h1>Custom HTML</h1>")
\`\`\`

## Notebook Utilities (dbutils)

### Widgets

\`\`\`python
# Create widgets
dbutils.widgets.text("env", "dev", "Environment")
dbutils.widgets.dropdown("region", "us-east-1", ["us-east-1", "us-west-2"])
dbutils.widgets.multiselect("options", "opt1", ["opt1", "opt2", "opt3"])

# Get widget value
env = dbutils.widgets.get("env")

# Remove widget
dbutils.widgets.remove("env")
dbutils.widgets.removeAll()
\`\`\`

### Secrets

\`\`\`python
# Get secret
api_key = dbutils.secrets.get(scope="my-scope", key="api-key")

# List scopes
dbutils.secrets.listScopes()

# List secrets in scope
dbutils.secrets.list(scope="my-scope")
\`\`\`

### File System (dbutils.fs)

\`\`\`python
# List files
dbutils.fs.ls("/mnt/data/")

# Copy
dbutils.fs.cp("/source", "/dest")

# Move
dbutils.fs.mv("/old", "/new")

# Remove
dbutils.fs.rm("/path", recurse=True)

# Put (write string to file)
dbutils.fs.put("/path/file.txt", "content", overwrite=True)
\`\`\`

### Notebook Commands

\`\`\`python
# Run another notebook
result = dbutils.notebook.run(
    "/path/to/notebook", 
    timeout_seconds=600,
    arguments={"param1": "value1"}
)

# Exit notebook with value
dbutils.notebook.exit("success")
\`\`\`

## Run Commands

### Run Python File

\`\`\`python
%run /path/to/script.py
\`\`\`

### Run Notebook

\`\`\`python
%run /path/to/notebook
\`\`\`

## SQL Magic with Variables

### Pass Python to SQL

\`\`\`python
table_name = "my_table"
date = "2024-01-15"

%sql
SELECT * FROM {table_name}
WHERE date = '{date}'
\`\`\`

### SQL to Python

\`\`\`python
# Query and assign to DataFrame
df = spark.sql("SELECT * FROM table")

# Or use %sql with variable
result = %sql SELECT COUNT(*) as count FROM table
count = result.first()['count']
\`\`\`

## Display Options

### Limit Display Rows

\`\`\`python
spark.conf.set("spark.sql.repl.eagerEval.maxNumRows", 100)
\`\`\`

### Pretty Print

\`\`\`python
from pyspark.sql.functions import *

# Show with truncate
df.show(20, truncate=False)

# Display as table
display(df)
\`\`\`

## Markdown Formatting

\`\`\`python
%md
# Heading 1
## Heading 2

**Bold** *Italic*

- Bullet 1
- Bullet 2

1. Numbered 1
2. Numbered 2

[Link](https://example.com)

\`\`\`code\`\`\`

> Quote

---

Table:

| Col1 | Col2 |
|------|------|
| A    | 1    |
| B    | 2    |
\`\`\`

## Performance Monitoring

### Query Execution

\`\`\`python
# Explain plan
df.explain(mode="extended")

# Show query plan
spark.sql("EXPLAIN SELECT * FROM table").show(truncate=False)
\`\`\`

### Cache Management

\`\`\`python
# Cache DataFrame
df.cache()
df.count()  # Trigger cache

# Uncache
df.unpersist()

# Clear all cache
spark.catalog.clearCache()
\`\`\`

## Common Patterns

### Parameterized Notebook

\`\`\`python
# Create widgets
dbutils.widgets.text("start_date", "2024-01-01")
dbutils.widgets.text("end_date", "2024-12-31")

# Get values
start = dbutils.widgets.get("start_date")
end = dbutils.widgets.get("end_date")

# Use in query
%sql
SELECT * FROM orders
WHERE order_date BETWEEN '{start}' AND '{end}'
\`\`\`

### Mount Storage

\`\`\`python
# Mount S3
dbutils.fs.mount(
    source="s3a://bucket-name",
    mount_point="/mnt/data",
    extra_configs={
        "fs.s3a.access.key": access_key,
        "fs.s3a.secret.key": secret_key
    }
)

# Unmount
dbutils.fs.unmount("/mnt/data")

# List mounts
dbutils.fs.mounts()
\`\`\`

### Notebook Orchestration

\`\`\`python
# Main notebook runs child notebooks
notebooks = ["etl1", "etl2", "etl3"]

for notebook in notebooks:
    result = dbutils.notebook.run(
        f"/pipelines/{notebook}",
        timeout_seconds=3600,
        arguments={"date": "2024-01-15"}
    )
    print(f"{notebook}: {result}")
\`\`\`

## Tips

- ✅ Use %fs for quick file operations
- ✅ Use widgets for parameterized notebooks
- ✅ Use dbutils.secrets for credentials
- ✅ Display DataFrames with display() for visualizations
- ❌ Don't hardcode secrets in notebooks
- ❌ Don't use %sh for production code
`,
    tags: ["databricks", "magic-commands", "notebooks"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-27").toISOString(),
    updatedAt: new Date("2025-01-27").toISOString()
  },

  {
    id: uuidv4(),
    title: "NumPy Essential Operations",
    category: "numpy",
    description: "Array operations, mathematical functions, and performance tips",
    color: "#A8E6CF",
    content: `# NumPy Cheat Sheet

## Import

\`\`\`python
import numpy as np
\`\`\`

## Create Arrays

\`\`\`python
# From list
arr = np.array([1, 2, 3, 4, 5])
arr_2d = np.array([[1, 2], [3, 4], [5, 6]])

# Zeros and ones
np.zeros(5)                    # [0., 0., 0., 0., 0.]
np.zeros((3, 4))               # 3x4 array of zeros
np.ones((2, 3))                # 2x3 array of ones

# Range
np.arange(10)                  # [0, 1, 2, ..., 9]
np.arange(5, 10)               # [5, 6, 7, 8, 9]
np.arange(0, 1, 0.1)          # [0, 0.1, 0.2, ..., 0.9]

# Linspace
np.linspace(0, 10, 5)          # [0, 2.5, 5, 7.5, 10]

# Identity matrix
np.eye(3)                      # 3x3 identity

# Random
np.random.rand(3, 4)           # Random [0, 1)
np.random.randint(0, 10, 5)    # Random integers
np.random.randn(3, 4)          # Normal distribution
\`\`\`

## Array Properties

\`\`\`python
arr = np.array([[1, 2, 3], [4, 5, 6]])

arr.shape                      # (2, 3)
arr.ndim                       # 2
arr.size                       # 6
arr.dtype                      # dtype('int64')
\`\`\`

## Indexing & Slicing

\`\`\`python
arr = np.array([0, 1, 2, 3, 4, 5])

# Basic indexing
arr[0]                         # 0
arr[-1]                        # 5
arr[2:5]                       # [2, 3, 4]
arr[::2]                       # [0, 2, 4]

# 2D indexing
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
arr_2d[0, 1]                   # 2
arr_2d[0]                      # [1, 2, 3]
arr_2d[:, 1]                   # [2, 5]

# Boolean indexing
arr[arr > 3]                   # [4, 5]
arr[(arr > 1) & (arr < 5)]     # [2, 3, 4]
\`\`\`

## Reshape

\`\`\`python
arr = np.arange(12)

# Reshape
arr.reshape(3, 4)              # 3x4 array
arr.reshape(2, -1)             # 2 rows, auto columns

# Flatten
arr_2d.flatten()               # 1D array
arr_2d.ravel()                 # 1D view (faster)

# Transpose
arr_2d.T
\`\`\`

## Mathematical Operations

\`\`\`python
arr = np.array([1, 2, 3, 4, 5])

# Element-wise
arr + 10                       # [11, 12, 13, 14, 15]
arr * 2                        # [2, 4, 6, 8, 10]
arr ** 2                       # [1, 4, 9, 16, 25]

# Array operations
arr1 + arr2                    # Element-wise add
arr1 * arr2                    # Element-wise multiply
arr1 / arr2                    # Element-wise divide

# Math functions
np.sqrt(arr)                   # Square root
np.exp(arr)                    # Exponential
np.log(arr)                    # Natural log
np.sin(arr)                    # Sine
np.abs(arr)                    # Absolute value
\`\`\`

## Aggregations

\`\`\`python
arr = np.array([[1, 2, 3], [4, 5, 6]])

# Basic aggregations
np.sum(arr)                    # 21
np.mean(arr)                   # 3.5
np.std(arr)                    # Standard deviation
np.var(arr)                    # Variance
np.min(arr)                    # 1
np.max(arr)                    # 6

# Along axis
np.sum(arr, axis=0)            # [5, 7, 9] (column sums)
np.sum(arr, axis=1)            # [6, 15] (row sums)

# Cumulative
np.cumsum(arr)                 # Cumulative sum
np.cumprod(arr)                # Cumulative product
\`\`\`

## Linear Algebra

\`\`\`python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Matrix multiplication
np.dot(A, B)
A @ B                          # Same as np.dot

# Transpose
A.T

# Inverse
np.linalg.inv(A)

# Determinant
np.linalg.det(A)

# Eigenvalues
np.linalg.eig(A)

# Solve linear equations (Ax = b)
b = np.array([1, 2])
x = np.linalg.solve(A, b)
\`\`\`

## Stacking & Splitting

\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Stack
np.vstack([a, b])              # Vertical: [[1,2,3], [4,5,6]]
np.hstack([a, b])              # Horizontal: [1,2,3,4,5,6]
np.stack([a, b])               # New axis

# Split
arr = np.arange(9)
np.split(arr, 3)               # 3 equal parts
np.array_split(arr, 4)         # 4 unequal parts if needed
\`\`\`

## Conditional Operations

\`\`\`python
arr = np.array([1, 2, 3, 4, 5])

# Where
np.where(arr > 3, 'high', 'low')  # ['low', 'low', 'low', 'high', 'high']
np.where(arr > 3)                  # Indices where True

# Clip
np.clip(arr, 2, 4)             # [2, 2, 3, 4, 4]

# Select
np.select([arr < 2, arr > 4], ['small', 'large'], default='medium')
\`\`\`

## Broadcasting

\`\`\`python
# Add scalar to array
arr = np.array([[1, 2, 3], [4, 5, 6]])
arr + 10                       # Broadcast 10 to all elements

# Add 1D to 2D
arr + np.array([10, 20, 30])  # Broadcast row-wise

# Add column vector
arr + np.array([[10], [20]])  # Broadcast column-wise
\`\`\`

## Sorting & Searching

\`\`\`python
arr = np.array([3, 1, 4, 1, 5])

# Sort
np.sort(arr)                   # [1, 1, 3, 4, 5]
np.argsort(arr)                # Indices that would sort

# Unique
np.unique(arr)                 # [1, 3, 4, 5]
np.unique(arr, return_counts=True)  # Values and counts

# Search
np.where(arr == 4)             # Indices where 4
np.argmax(arr)                 # Index of max
np.argmin(arr)                 # Index of min
\`\`\`

## Statistics

\`\`\`python
arr = np.array([1, 2, 3, 4, 5])

np.mean(arr)                   # Mean
np.median(arr)                 # Median
np.std(arr)                    # Standard deviation
np.var(arr)                    # Variance
np.percentile(arr, 75)         # 75th percentile
np.corrcoef(arr1, arr2)        # Correlation coefficient
\`\`\`

## Random Operations

\`\`\`python
# Set seed for reproducibility
np.random.seed(42)

# Random numbers
np.random.rand(5)              # Uniform [0, 1)
np.random.randn(5)             # Normal distribution
np.random.randint(0, 10, 5)    # Random integers

# Random choice
np.random.choice([1, 2, 3, 4, 5], size=3, replace=False)

# Shuffle
arr = np.array([1, 2, 3, 4, 5])
np.random.shuffle(arr)
\`\`\`

## Performance Tips

\`\`\`python
# ✅ Vectorized operations (fast)
arr * 2

# ❌ Python loops (slow)
[x * 2 for x in arr]

# ✅ Use views when possible (no copy)
arr_view = arr[1:5]

# ✅ Specify dtype to save memory
arr = np.array([1, 2, 3], dtype=np.int8)  # Instead of int64

# ✅ Use in-place operations
arr += 10  # Instead of arr = arr + 10
\`\`\`

## Common Patterns

### Normalize Array

\`\`\`python
# Min-max normalization
normalized = (arr - arr.min()) / (arr.max() - arr.min())

# Z-score normalization
normalized = (arr - arr.mean()) / arr.std()
\`\`\`

### Moving Average

\`\`\`python
def moving_average(arr, window=3):
    return np.convolve(arr, np.ones(window)/window, mode='valid')
\`\`\`

### Distance Matrix

\`\`\`python
# Euclidean distance between all point pairs
points = np.array([[1, 2], [3, 4], [5, 6]])
dist = np.linalg.norm(points[:, None] - points, axis=2)
\`\`\`

## Tips

- ✅ Use NumPy for numerical operations (100x faster than Python)
- ✅ Avoid loops - use vectorization
- ✅ Use views instead of copies when possible
- ✅ Specify dtype to control memory usage
- ❌ Don't convert to Python list for operations
- ❌ Don't use NumPy for string operations
`,
    tags: ["numpy", "python", "arrays"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-28").toISOString(),
    updatedAt: new Date("2025-01-28").toISOString()
  },

  {
    id: uuidv4(),
    title: "VS Code Shortcuts for Developers",
    category: "vscode",
    description: "Productivity keyboard shortcuts for VS Code",
    color: "#74B9FF",
    content: `# VS Code Shortcuts Cheat Sheet

## General

\`\`\`
Cmd/Ctrl + Shift + P    Command Palette
Cmd/Ctrl + P            Quick Open File
Cmd/Ctrl + ,            Settings
Cmd/Ctrl + K, Cmd/Ctrl + S    Keyboard Shortcuts
\`\`\`

## Editing

\`\`\`
Cmd/Ctrl + X            Cut line
Cmd/Ctrl + C            Copy line
Cmd/Ctrl + V            Paste
Cmd/Ctrl + Z            Undo
Cmd/Ctrl + Shift + Z    Redo
Cmd/Ctrl + /            Toggle comment
Cmd/Ctrl + D            Select next occurrence
Cmd/Ctrl + Shift + L    Select all occurrences
Alt + Up/Down           Move line up/down
Shift + Alt + Up/Down   Copy line up/down
Cmd/Ctrl + Shift + K    Delete line
\`\`\`

## Navigation

\`\`\`
Cmd/Ctrl + G            Go to line
Cmd/Ctrl + F            Find
Cmd/Ctrl + H            Replace
Cmd/Ctrl + Shift + F    Find in files
Cmd/Ctrl + T            Go to symbol
F12                     Go to definition
Alt + F12               Peek definition
Shift + F12             Find all references
Cmd/Ctrl + Shift + O    Go to symbol in file
\`\`\`

## Multi-cursor

\`\`\`
Alt + Click             Add cursor
Cmd/Ctrl + Alt + Up/Down    Add cursor above/below
Cmd/Ctrl + U            Undo last cursor operation
\`\`\`

## Terminal

\`\`\`
Cmd/Ctrl + \`           Toggle terminal
Cmd/Ctrl + Shift + \`   New terminal
\`\`\`

## Tips

- ✅ Learn 5 shortcuts per week
- ✅ Customize shortcuts for your workflow
- ✅ Use Command Palette when unsure
`,
    tags: ["vscode", "shortcuts", "productivity"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-29").toISOString(),
    updatedAt: new Date("2025-01-29").toISOString()
  },

  {
    id: uuidv4(),
    title: "HTTP Status Codes Reference",
    category: "http",
    description: "Common HTTP status codes and their meanings",
    color: "#FF6B6B",
    content: `# HTTP Status Codes Cheat Sheet

## 2xx Success

\`\`\`
200 OK                  Request succeeded
201 Created             Resource created
202 Accepted            Request accepted for processing
204 No Content          Success but no content to return
\`\`\`

## 3xx Redirection

\`\`\`
301 Moved Permanently   Permanent redirect
302 Found               Temporary redirect
304 Not Modified        Use cached version
\`\`\`

## 4xx Client Errors

\`\`\`
400 Bad Request         Invalid request
401 Unauthorized        Authentication required
403 Forbidden           Not allowed
404 Not Found           Resource not found
405 Method Not Allowed  HTTP method not supported
409 Conflict            Request conflicts with current state
422 Unprocessable       Validation errors
429 Too Many Requests   Rate limit exceeded
\`\`\`

## 5xx Server Errors

\`\`\`
500 Internal Server Error    Server error
501 Not Implemented          Method not implemented
502 Bad Gateway              Invalid response from upstream
503 Service Unavailable      Server temporarily unavailable
504 Gateway Timeout          Upstream server timeout
\`\`\`

## API Design Tips

- ✅ Use 201 for POST requests that create resources
- ✅ Use 204 for DELETE requests
- ✅ Use 409 for conflicts (duplicate email, etc.)
- ✅ Return 422 with validation details
- ❌ Don't use 200 for everything
`,
    tags: ["http", "api", "web"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-30").toISOString(),
    updatedAt: new Date("2025-01-30").toISOString()
  },

  {
    id: uuidv4(),
    title: "Python List/Dict Comprehensions",
    category: "python",
    description: "Master Python comprehensions for clean, efficient code",
    color: "#FFE66D",
    content: `# Python Comprehensions Cheat Sheet

## List Comprehensions

### Basic

\`\`\`python
# Square numbers
[x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
[x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# With if-else
[x if x > 5 else 0 for x in range(10)]
# [0, 0, 0, 0, 0, 0, 6, 7, 8, 9]
\`\`\`

### Nested

\`\`\`python
# Flatten 2D list
matrix = [[1, 2], [3, 4], [5, 6]]
[num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6]

# Matrix operations
[[row[i] for row in matrix] for i in range(len(matrix[0]))]
# Transpose: [[1, 3, 5], [2, 4, 6]]
\`\`\`

## Dict Comprehensions

\`\`\`python
# Basic
{x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# From two lists
keys = ['a', 'b', 'c']
values = [1, 2, 3]
{k: v for k, v in zip(keys, values)}
# {'a': 1, 'b': 2, 'c': 3}

# Filter dict
d = {'a': 1, 'b': 2, 'c': 3}
{k: v for k, v in d.items() if v > 1}
# {'b': 2, 'c': 3}

# Transform values
{k: v*2 for k, v in d.items()}
# {'a': 2, 'b': 4, 'c': 6}
\`\`\`

## Set Comprehensions

\`\`\`python
# Unique values
{x**2 for x in [1, 1, 2, 2, 3, 3]}
# {1, 4, 9}

# Filter
{x for x in range(20) if x % 3 == 0}
# {0, 3, 6, 9, 12, 15, 18}
\`\`\`

## Generator Expressions

\`\`\`python
# Memory efficient (doesn't create list)
gen = (x**2 for x in range(10))

# Use in functions
sum(x**2 for x in range(10))
max(x for x in range(10) if x % 2 == 0)
\`\`\`

## Common Patterns

### Filter & Transform

\`\`\`python
# Get even squares
[x**2 for x in range(10) if x % 2 == 0]

# String operations
words = ["hello", "world", "python"]
[w.upper() for w in words if len(w) > 5]
\`\`\`

### Data Cleaning

\`\`\`python
# Remove None values
[x for x in data if x is not None]

# Strip strings
[s.strip() for s in strings]

# Filter by type
[x for x in mixed_list if isinstance(x, int)]
\`\`\`

### Dictionary Operations

\`\`\`python
# Invert dict
{v: k for k, v in d.items()}

# Merge dicts by condition
{k: v for d in dict_list for k, v in d.items()}

# Group by condition
{k: v for k, v in d.items() if some_condition(v)}
\`\`\`

## Tips

- ✅ Use comprehensions for simple transformations
- ✅ Use generator expressions for large datasets
- ✅ Keep comprehensions simple (1-2 lines max)
- ❌ Don't nest comprehensions deeply (hard to read)
- ❌ Don't use for complex logic (use functions)
`,
    tags: ["python", "comprehensions", "functional"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-01-31").toISOString(),
    updatedAt: new Date("2025-01-31").toISOString()
  },

  {
    id: uuidv4(),
    title: "Airflow DAG Patterns",
    category: "airflow",
    description: "Common Airflow DAG patterns and best practices",
    color: "#FFEAA7",
    content: `# Airflow DAG Patterns Cheat Sheet

## Basic DAG Structure

\`\`\`python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data_team',
    'depends_on_past': False,
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG(
    'my_dag',
    default_args=default_args,
    description='My DAG description',
    schedule_interval=timedelta(days=1),
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['etl', 'daily']
)
\`\`\`

## Task Dependencies

\`\`\`python
# Using >> operator
task1 >> task2 >> task3

# Multiple dependencies
task1 >> [task2, task3] >> task4

# Using set_downstream
task1.set_downstream(task2)
task2.set_downstream([task3, task4])
\`\`\`

## Common Operators

\`\`\`python
# Python Operator
def my_function(**context):
    print(context['ds'])  # Execution date
    return "success"

python_task = PythonOperator(
    task_id='python_task',
    python_callable=my_function,
    dag=dag
)

# Bash Operator
bash_task = BashOperator(
    task_id='bash_task',
    bash_command='echo "Hello"',
    dag=dag
)

# SQL Operator
sql_task = PostgresOperator(
    task_id='sql_task',
    postgres_conn_id='postgres_default',
    sql='SELECT * FROM table',
    dag=dag
)
\`\`\`

## TaskFlow API (Airflow 2.0+)

\`\`\`python
from airflow.decorators import task, dag

@dag(schedule_interval='@daily', start_date=datetime(2024, 1, 1))
def my_dag():
    @task
    def extract():
        return {'data': [1, 2, 3]}
    
    @task
    def transform(data):
        return [x * 2 for x in data['data']]
    
    @task
    def load(data):
        print(f"Loading: {data}")
    
    data = extract()
    transformed = transform(data)
    load(transformed)

my_dag()
\`\`\`

## Sensors

\`\`\`python
# File Sensor
from airflow.sensors.filesystem import FileSensor

file_sensor = FileSensor(
    task_id='wait_for_file',
    filepath='/data/input.csv',
    poke_interval=60,
    timeout=3600,
    dag=dag
)

# S3 Sensor
from airflow.providers.amazon.aws.sensors.s3 import S3KeySensor

s3_sensor = S3KeySensor(
    task_id='wait_for_s3_file',
    bucket_name='my-bucket',
    bucket_key='data/input.csv',
    aws_conn_id='aws_default',
    dag=dag
)
\`\`\`

## XCom Communication

\`\`\`python
# Push value
def push_data(**context):
    context['ti'].xcom_push(key='my_key', value='my_value')

# Pull value
def pull_data(**context):
    value = context['ti'].xcom_pull(key='my_key', task_ids='push_task')
    return value
\`\`\`

## Dynamic DAGs

\`\`\`python
# Generate tasks in loop
for i in range(10):
    task = PythonOperator(
        task_id=f'process_{i}',
        python_callable=process_item,
        op_kwargs={'item_id': i},
        dag=dag
    )
\`\`\`

## Tips

- ✅ Use TaskFlow API for simple DAGs
- ✅ Set catchup=False for backfill control
- ✅ Use sensors for external dependencies
- ✅ Use XCom for small data (< 48KB)
- ❌ Don't store large data in XCom
- ❌ Don't use dynamic start dates
`,
    tags: ["airflow", "dag", "orchestration"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-01").toISOString(),
    updatedAt: new Date("2025-02-01").toISOString()
  },

  {
    id: uuidv4(),
    title: "YAML Configuration Reference",
    category: "yaml",
    description: "YAML syntax for configs, docker-compose, and CI/CD",
    color: "#A8E6CF",
    content: `# YAML Cheat Sheet

## Basic Syntax

\`\`\`yaml
# Comments start with #

# Key-value pairs
name: John Doe
age: 30
active: true

# Strings (quotes optional)
message: "Hello World"
title: This is a title

# Multi-line strings
description: |
  This is a
  multi-line string
  that preserves newlines

# Folded strings (single line)
summary: >
  This is a
  folded string
  that becomes one line
\`\`\`

## Lists

\`\`\`yaml
# Simple list
fruits:
  - apple
  - banana
  - orange

# Inline list
tags: [python, data, etl]

# List of objects
users:
  - name: Alice
    age: 25
  - name: Bob
    age: 30
\`\`\`

## Objects

\`\`\`yaml
# Nested objects
person:
  name: John
  address:
    street: "123 Main St"
    city: "New York"
    zip: 10001

# Inline object
config: {host: localhost, port: 5432}
\`\`\`

## Data Types

\`\`\`yaml
# Numbers
integer: 42
float: 3.14
scientific: 1.2e+10

# Booleans
true_value: true
false_value: false
# Also: True, False, yes, no, on, off

# Null
null_value: null
# Also: ~, Null, NULL

# Dates
date: 2024-01-15
datetime: 2024-01-15T14:30:00
\`\`\`

## Anchors & Aliases

\`\`\`yaml
# Define anchor
defaults: &defaults
  timeout: 30
  retries: 3

# Use alias
job1:
  <<: *defaults
  name: "Job 1"

job2:
  <<: *defaults
  name: "Job 2"
\`\`\`

## Common Patterns

### Docker Compose

\`\`\`yaml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    environment:
      - ENV=production
    volumes:
      - ./data:/app/data
\`\`\`

### CI/CD Config

\`\`\`yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: pytest
\`\`\`

## Tips

- ✅ Use 2 spaces for indentation (no tabs)
- ✅ Quote strings with special characters
- ✅ Use anchors for repeated values
- ❌ Don't mix tabs and spaces
`,
    tags: ["yaml", "config", "devops"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-02").toISOString(),
    updatedAt: new Date("2025-02-02").toISOString()
  },

  {
    id: uuidv4(),
    title: "JSON Operations in Python",
    category: "python",
    description: "Working with JSON data - parsing, serialization, and manipulation",
    color: "#FFE66D",
    content: `# JSON Operations Cheat Sheet

## Import

\`\`\`python
import json
\`\`\`

## Parse JSON

\`\`\`python
# From string
json_string = '{"name": "John", "age": 30}'
data = json.loads(json_string)

# From file
with open('data.json', 'r') as f:
    data = json.load(f)
\`\`\`

## Serialize to JSON

\`\`\`python
# To string
data = {'name': 'John', 'age': 30}
json_string = json.dumps(data)

# To file
with open('output.json', 'w') as f:
    json.dump(data, f)
\`\`\`

## Formatting Options

\`\`\`python
# Pretty print
json.dumps(data, indent=2)

# Sort keys
json.dumps(data, sort_keys=True)

# Custom separators
json.dumps(data, separators=(',', ':'))

# Ensure ASCII
json.dumps(data, ensure_ascii=False)
\`\`\`

## Common Patterns

\`\`\`python
# Parse nested JSON
data = json.loads(json_string)
value = data['key']['nested_key']

# Handle missing keys
value = data.get('key', 'default')

# Iterate JSON array
for item in data['items']:
    print(item['name'])

# Filter JSON
filtered = [x for x in data if x['status'] == 'active']
\`\`\`

## Tips

- ✅ Use \`json.loads()\` for strings
- ✅ Use \`json.load()\` for files
- ✅ Handle JSONDecodeError exceptions
- ❌ Don't parse untrusted JSON
`,
    tags: ["python", "json", "data"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-03").toISOString(),
    updatedAt: new Date("2025-02-03").toISOString()
  },

  {
    id: uuidv4(),
    title: "Bash Scripting Essentials",
    category: "bash",
    description: "Variables, loops, conditionals, and functions in bash",
    color: "#95E1D3",
    content: `# Bash Scripting Cheat Sheet

## Variables

\`\`\`bash
# Set variable
NAME="John"
AGE=30

# Use variable
echo $NAME
echo \${NAME}

# Command substitution
DATE=$(date)
FILES=\`ls\`

# Environment variables
echo $HOME
echo $PATH
\`\`\`

## Conditionals

\`\`\`bash
# If statement
if [ $AGE -gt 18 ]; then
    echo "Adult"
fi

# If-else
if [ -f "file.txt" ]; then
    echo "File exists"
else
    echo "File not found"
fi

# Case statement
case $VAR in
    "option1")
        echo "Option 1"
        ;;
    "option2")
        echo "Option 2"
        ;;
    *)
        echo "Default"
        ;;
esac
\`\`\`

## Loops

\`\`\`bash
# For loop
for i in {1..10}; do
    echo $i
done

# For loop with array
fruits=("apple" "banana" "orange")
for fruit in "\${fruits[@]}"; do
    echo $fruit
done

# While loop
count=0
while [ $count -lt 5 ]; do
    echo $count
    count=$((count + 1))
done
\`\`\`

## Functions

\`\`\`bash
# Define function
function greet() {
    echo "Hello, $1"
}

# Call function
greet "John"

# Return value
function add() {
    local sum=$(($1 + $2))
    echo $sum
}

result=$(add 5 3)
\`\`\`

## File Operations

\`\`\`bash
# Check file exists
if [ -f "file.txt" ]; then
    echo "File exists"
fi

# Check directory
if [ -d "directory" ]; then
    echo "Directory exists"
fi

# Read file line by line
while IFS= read -r line; do
    echo "$line"
done < file.txt
\`\`\`

## Tips

- ✅ Quote variables: "$VAR"
- ✅ Use local in functions
- ✅ Check exit codes: $?
- ❌ Don't forget spaces in [ ]
`,
    tags: ["bash", "shell", "scripting"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-04").toISOString(),
    updatedAt: new Date("2025-02-04").toISOString()
  },

  {
    id: uuidv4(),
    title: "MongoDB Query Operations",
    category: "mongodb",
    description: "Essential MongoDB queries for data operations",
    color: "#4ECDC4",
    content: `# MongoDB Query Cheat Sheet

## Find Documents

\`\`\`javascript
// Find all
db.collection.find()

// Find with filter
db.collection.find({ age: 25 })

// Find one
db.collection.findOne({ name: "John" })

// Limit results
db.collection.find().limit(10)

// Skip results
db.collection.find().skip(10).limit(10)
\`\`\`

## Query Operators

\`\`\`javascript
// Comparison
db.collection.find({ age: { $gt: 18 } })
db.collection.find({ age: { $gte: 18 } })
db.collection.find({ age: { $lt: 65 } })
db.collection.find({ age: { $lte: 65 } })
db.collection.find({ age: { $ne: 0 } })
db.collection.find({ age: { $in: [18, 25, 30] } })

// Logical
db.collection.find({ $and: [{ age: { $gt: 18 } }, { age: { $lt: 65 } }] })
db.collection.find({ $or: [{ status: "active" }, { status: "pending" }] })
db.collection.find({ $not: { age: { $lt: 18 } } })
\`\`\`

## Update Operations

\`\`\`javascript
// Update one
db.collection.updateOne(
    { name: "John" },
    { $set: { age: 31 } }
)

// Update many
db.collection.updateMany(
    { status: "pending" },
    { $set: { status: "processed" } }
)

// Upsert (insert if not exists)
db.collection.updateOne(
    { name: "John" },
    { $set: { age: 31 } },
    { upsert: true }
)
\`\`\`

## Aggregation

\`\`\`javascript
db.collection.aggregate([
    { $match: { status: "active" } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } }
])
\`\`\`

## Tips

- ✅ Use indexes for performance
- ✅ Use $set for updates
- ✅ Use aggregation for complex queries
`,
    tags: ["mongodb", "database", "nosql"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-05").toISOString(),
    updatedAt: new Date("2025-02-05").toISOString()
  },

  {
    id: uuidv4(),
    title: "PostgreSQL Essential Queries",
    category: "sql",
    description: "Common PostgreSQL patterns and functions",
    color: "#4ECDC4",
    content: `# PostgreSQL Cheat Sheet

## String Functions

\`\`\`sql
-- Concatenation
SELECT 'Hello' || ' ' || 'World';

-- Case conversion
SELECT UPPER('hello'), LOWER('WORLD');

-- Substring
SELECT SUBSTRING('Hello World', 1, 5);  -- 'Hello'

-- Replace
SELECT REPLACE('Hello World', 'World', 'PostgreSQL');

-- Trim
SELECT TRIM('  Hello  ');  -- 'Hello'
SELECT LTRIM('  Hello');   -- 'Hello'
SELECT RTRIM('Hello  ');   -- 'Hello'
\`\`\`

## Date Functions

\`\`\`sql
-- Current date/time
SELECT CURRENT_DATE;
SELECT CURRENT_TIMESTAMP;
SELECT NOW();

-- Extract parts
SELECT EXTRACT(YEAR FROM date_column);
SELECT EXTRACT(MONTH FROM date_column);
SELECT EXTRACT(DAY FROM date_column);

-- Date arithmetic
SELECT date_column + INTERVAL '1 day';
SELECT date_column - INTERVAL '1 month';
SELECT date_column + INTERVAL '1 year';
\`\`\`

## Array Functions

\`\`\`sql
-- Create array
SELECT ARRAY[1, 2, 3];

-- Array length
SELECT array_length(ARRAY[1, 2, 3], 1);

-- Unnest array
SELECT UNNEST(ARRAY[1, 2, 3]);

-- Array contains
SELECT ARRAY[1, 2, 3] @> ARRAY[1, 2];
\`\`\`

## JSON Functions

\`\`\`sql
-- Create JSON
SELECT '{"name": "John"}'::json;

-- Extract JSON
SELECT json_column->>'name';
SELECT json_column->'address'->>'city';

-- JSON array
SELECT json_array_elements('[1, 2, 3]'::json);
\`\`\`

## Common Table Expressions (CTE)

\`\`\`sql
WITH ranked_data AS (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY category ORDER BY date DESC) as rn
    FROM table
)
SELECT * FROM ranked_data WHERE rn = 1;
\`\`\`

## Tips

- ✅ Use EXPLAIN ANALYZE for query plans
- ✅ Create indexes on frequently queried columns
- ✅ Use CTEs for complex queries
- ❌ Don't use SELECT * in production
`,
    tags: ["sql", "postgresql", "database"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-06").toISOString(),
    updatedAt: new Date("2025-02-06").toISOString()
  },

  {
    id: uuidv4(),
    title: "REST API Design Patterns",
    category: "api",
    description: "Best practices for designing RESTful APIs",
    color: "#FF6B6B",
    content: `# REST API Design Cheat Sheet

## HTTP Methods

\`\`\`
GET     Retrieve resource
POST    Create resource
PUT     Update/replace resource
PATCH   Partial update
DELETE  Delete resource
\`\`\`

## URL Patterns

\`\`\`
# Resources
GET    /api/users              # List users
GET    /api/users/123           # Get user
POST   /api/users               # Create user
PUT    /api/users/123           # Update user
DELETE /api/users/123           # Delete user

# Nested resources
GET    /api/users/123/posts     # User's posts
GET    /api/users/123/posts/456 # Specific post
\`\`\`

## Query Parameters

\`\`\`
# Filtering
GET /api/users?status=active
GET /api/users?age_min=18&age_max=65

# Pagination
GET /api/users?page=1&limit=20
GET /api/users?offset=0&limit=20

# Sorting
GET /api/users?sort=name&order=asc
GET /api/users?sort=-created_at  # Descending

# Fields selection
GET /api/users?fields=id,name,email
\`\`\`

## Response Formats

\`\`\`json
// Success
{
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100
  }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": { ... }
  }
}
\`\`\`

## Status Codes

\`\`\`
200 OK              Success
201 Created         Resource created
204 No Content      Success, no body
400 Bad Request     Invalid input
401 Unauthorized    Auth required
403 Forbidden       Not allowed
404 Not Found       Resource not found
409 Conflict        Conflict
422 Unprocessable   Validation error
500 Server Error    Server error
\`\`\`

## Tips

- ✅ Use nouns for resources, not verbs
- ✅ Use plural nouns: /users not /user
- ✅ Return consistent response format
- ✅ Use proper HTTP status codes
- ❌ Don't use verbs in URLs
- ❌ Don't return 200 for errors
`,
    tags: ["api", "rest", "web"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-07").toISOString(),
    updatedAt: new Date("2025-02-07").toISOString()
  },

  {
    id: uuidv4(),
    title: "Python Error Handling",
    category: "python",
    description: "Try-except patterns, custom exceptions, and best practices",
    color: "#FFE66D",
    content: `# Python Error Handling Cheat Sheet

## Basic Try-Except

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")

# Multiple exceptions
try:
    value = int("not a number")
except (ValueError, TypeError) as e:
    print(f"Error: {e}")
\`\`\`

## Exception Hierarchy

\`\`\`python
try:
    # Code
except ValueError:
    # Handle ValueError
except TypeError:
    # Handle TypeError
except Exception as e:
    # Handle any other exception
    print(f"Unexpected error: {e}")
finally:
    # Always executes
    print("Cleanup")
\`\`\`

## Custom Exceptions

\`\`\`python
class CustomError(Exception):
    pass

class ValidationError(Exception):
    def __init__(self, message, field):
        self.message = message
        self.field = field
        super().__init__(self.message)

# Raise custom exception
raise ValidationError("Invalid value", "email")
\`\`\`

## Common Patterns

\`\`\`python
# Retry pattern
import time

def retry(func, max_attempts=3):
    for attempt in range(max_attempts):
        try:
            return func()
        except Exception as e:
            if attempt == max_attempts - 1:
                raise
            time.sleep(2 ** attempt)  # Exponential backoff

# Context manager
from contextlib import contextmanager

@contextmanager
def handle_error():
    try:
        yield
    except Exception as e:
        print(f"Error handled: {e}")

with handle_error():
    risky_operation()
\`\`\`

## Tips

- ✅ Catch specific exceptions
- ✅ Use finally for cleanup
- ✅ Log exceptions properly
- ❌ Don't catch all exceptions silently
- ❌ Don't use bare except:
`,
    tags: ["python", "exceptions", "error-handling"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-08").toISOString(),
    updatedAt: new Date("2025-02-08").toISOString()
  },

  {
    id: uuidv4(),
    title: "CSS Flexbox & Grid",
    category: "css",
    description: "Modern CSS layout techniques for responsive design",
    color: "#74B9FF",
    content: `# CSS Flexbox & Grid Cheat Sheet

## Flexbox

\`\`\`css
.container {
  display: flex;
  flex-direction: row;        /* row | column */
  justify-content: center;     /* flex-start | center | flex-end | space-between */
  align-items: center;         /* flex-start | center | flex-end | stretch */
  flex-wrap: wrap;             /* nowrap | wrap */
  gap: 20px;
}

.item {
  flex: 1;                     /* grow, shrink, basis */
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  align-self: center;
}
\`\`\`

## Grid

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.item {
  grid-column: 1 / 3;
  grid-row: 1;
  grid-area: header;
}
\`\`\`

## Tips

- ✅ Use Flexbox for 1D layouts
- ✅ Use Grid for 2D layouts
- ✅ Combine both when needed
`,
    tags: ["css", "layout", "frontend"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-09").toISOString(),
    updatedAt: new Date("2025-02-09").toISOString()
  },

  {
    id: uuidv4(),
    title: "Markdown Syntax Reference",
    category: "markdown",
    description: "Complete Markdown syntax for documentation",
    color: "#A8E6CF",
    content: `# Markdown Cheat Sheet

## Headers

\`\`\`
# H1
## H2
### H3
#### H4
##### H5
###### H6
\`\`\`

## Text Formatting

\`\`\`
**bold**
*italic*
***bold italic***
~~strikethrough~~
\`code\`
\`\`\`

## Lists

\`\`\`
- Unordered item
- Another item

1. Ordered item
2. Another item

- [ ] Checkbox
- [x] Checked
\`\`\`

## Links & Images

\`\`\`
[Link text](https://example.com)
![Alt text](image.jpg)
\`\`\`

## Code Blocks

\`\`\`python
def hello():
    print("Hello")
\`\`\`

## Tables

\`\`\`
| Col1 | Col2 |
|------|------|
| A    | 1    |
| B    | 2    |
\`\`\`

## Tips

- ✅ Use fenced code blocks with language
- ✅ Use tables for structured data
- ✅ Keep line length reasonable
`,
    tags: ["markdown", "documentation", "writing"],
    views: 0,
    timesUsed: 0,
    isFavorite: false,
    createdAt: new Date("2025-02-10").toISOString(),
    updatedAt: new Date("2025-02-10").toISOString()
  }
];

// Helper to get cheat sheets by category
export const getCheatSheetsByCategory = (category) => {
  return cheatSheets.filter(cs => cs.category === category);
};

// Helper to get all categories
export const getCategories = () => {
  return [...new Set(cheatSheets.map(cs => cs.category))];
};

