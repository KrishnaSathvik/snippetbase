import { v4 as uuidv4 } from 'uuid';

export const seedSnippets = [
  // ===== PYSPARK SNIPPETS (15) =====
  {
    id: uuidv4(),
    title: "PySpark Window Function - Running Total",
    language: "pyspark",
    code: `from pyspark.sql import Window
from pyspark.sql.functions import sum

window_spec = Window.partitionBy("customer_id")\\
                    .orderBy("date")\\
                    .rowsBetween(Window.unboundedPreceding, 0)

df = df.withColumn(
    "running_total",
    sum("amount").over(window_spec)
)`,
    description: "Calculate running total partitioned by customer, ordered by date",
    tags: ["window", "aggregation", "analytics"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 247,
    createdAt: new Date("2025-01-10").toISOString(),
    updatedAt: new Date("2025-01-20").toISOString(),
    source: ""
  },
  
  {
    id: uuidv4(),
    title: "PySpark Broadcast Join for Performance",
    language: "pyspark",
    code: `from pyspark.sql.functions import broadcast

# Broadcast small table for faster joins
large_df = spark.read.parquet("large_table")
small_df = spark.read.parquet("small_table")

result = large_df.join(
    broadcast(small_df),
    "customer_id",
    "left"
)`,
    description: "Use broadcast join when one table is small (<200MB) for significant performance gains",
    tags: ["performance", "join", "optimization"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 189,
    createdAt: new Date("2025-01-12").toISOString(),
    updatedAt: new Date("2025-01-22").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Read Delta Table with Time Travel",
    language: "pyspark",
    code: `# Read specific version
df = spark.read.format("delta")\\
    .option("versionAsOf", 0)\\
    .load("/path/to/delta/table")

# Read as of specific timestamp
df = spark.read.format("delta")\\
    .option("timestampAsOf", "2024-01-01 00:00:00")\\
    .load("/path/to/delta/table")`,
    description: "Access historical versions of Delta tables",
    tags: ["delta", "time-travel", "versioning"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 156,
    createdAt: new Date("2025-01-14").toISOString(),
    updatedAt: new Date("2025-01-24").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Handle Null Values",
    language: "pyspark",
    code: `from pyspark.sql.functions import col, when, coalesce

# Replace nulls with default value
df = df.withColumn("age", coalesce(col("age"), lit(0)))

# Conditional replacement
df = df.withColumn(
    "status",
    when(col("status").isNull(), "unknown")
    .otherwise(col("status"))
)

# Drop rows with nulls in specific columns
df = df.dropna(subset=["customer_id", "order_date"])`,
    description: "Common patterns for handling null values in PySpark",
    tags: ["data-quality", "nulls", "cleaning"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 142,
    createdAt: new Date("2025-01-15").toISOString(),
    updatedAt: new Date("2025-01-25").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Write to Delta with Partitioning",
    language: "pyspark",
    code: `# Write with partition and optimize
df.write.format("delta")\\
    .mode("overwrite")\\
    .partitionBy("year", "month")\\
    .option("overwriteSchema", "true")\\
    .save("/path/to/delta/table")

# Append with partition
df.write.format("delta")\\
    .mode("append")\\
    .partitionBy("date")\\
    .save("/path/to/delta/table")`,
    description: "Write Delta tables with efficient partitioning strategy",
    tags: ["delta", "performance", "partitioning"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 198,
    createdAt: new Date("2025-01-16").toISOString(),
    updatedAt: new Date("2025-01-26").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Explode Array Column",
    language: "pyspark",
    code: `from pyspark.sql.functions import explode, col

# Explode array into separate rows
df_exploded = df.select(
    col("customer_id"),
    explode(col("orders")).alias("order")
)

# Explode with position
from pyspark.sql.functions import posexplode

df_with_pos = df.select(
    col("customer_id"),
    posexplode(col("orders")).alias("pos", "order")
)`,
    description: "Transform array columns into individual rows",
    tags: ["transformation", "array", "explode"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 134,
    createdAt: new Date("2025-01-17").toISOString(),
    updatedAt: new Date("2025-01-27").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Cache and Persist Strategies",
    language: "pyspark",
    code: `from pyspark import StorageLevel

# Cache in memory (default)
df.cache()

# Persist with storage level
df.persist(StorageLevel.MEMORY_AND_DISK)

# Check if cached
df.is_cached

# Unpersist when done
df.unpersist()

# Persist options
# MEMORY_ONLY, MEMORY_AND_DISK, DISK_ONLY
# MEMORY_ONLY_SER, MEMORY_AND_DISK_SER`,
    description: "Optimize performance with caching and persistence strategies",
    tags: ["performance", "caching", "optimization"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 167,
    createdAt: new Date("2025-01-18").toISOString(),
    updatedAt: new Date("2025-01-28").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Repartition for Performance",
    language: "pyspark",
    code: `# Increase partitions for parallelism
df = df.repartition(200)

# Repartition by column (for better locality)
df = df.repartition("customer_id")

# Coalesce to reduce partitions (no shuffle)
df = df.coalesce(10)

# Check current partitions
print(f"Partitions: {df.rdd.getNumPartitions()}")`,
    description: "Optimize data distribution across partitions",
    tags: ["performance", "partitioning", "tuning"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2025-01-19").toISOString(),
    updatedAt: new Date("2025-01-29").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark UDF with Type Hints",
    language: "pyspark",
    code: `from pyspark.sql.functions import udf
from pyspark.sql.types import StringType, IntegerType

# Define UDF with decorator
@udf(returnType=StringType())
def categorize_age(age: int) -> str:
    if age < 18:
        return "minor"
    elif age < 65:
        return "adult"
    else:
        return "senior"

# Apply UDF
df = df.withColumn("age_category", categorize_age(col("age")))`,
    description: "Create user-defined functions with proper type hints",
    tags: ["udf", "function", "transformation"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 145,
    createdAt: new Date("2025-01-20").toISOString(),
    updatedAt: new Date("2025-01-30").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark JSON Parsing",
    language: "pyspark",
    code: `from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StructField, StringType, IntegerType

# Define schema
schema = StructType([
    StructField("name", StringType(), True),
    StructField("age", IntegerType(), True),
    StructField("city", StringType(), True)
])

# Parse JSON column
df = df.withColumn("parsed", from_json(col("json_data"), schema))

# Extract nested fields
df = df.select("id", "parsed.*")`,
    description: "Parse and extract data from JSON columns",
    tags: ["json", "parsing", "schema"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 129,
    createdAt: new Date("2025-01-21").toISOString(),
    updatedAt: new Date("2025-01-31").toISOString(),
    source: ""
  },

  // ===== SQL SNIPPETS (12) =====
  {
    id: uuidv4(),
    title: "SQL Deduplication with ROW_NUMBER",
    language: "sql",
    code: `WITH ranked_data AS (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id, order_date 
      ORDER BY created_at DESC
    ) as rn
  FROM orders
)
SELECT * 
FROM ranked_data 
WHERE rn = 1;`,
    description: "Remove duplicates keeping the most recent record per group",
    tags: ["deduplication", "window", "data-quality"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 312,
    createdAt: new Date("2025-01-11").toISOString(),
    updatedAt: new Date("2025-01-21").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "SQL Running Total with Window Function",
    language: "sql",
    code: `SELECT 
  order_date,
  amount,
  SUM(amount) OVER (
    ORDER BY order_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as running_total
FROM orders
ORDER BY order_date;`,
    description: "Calculate cumulative sum ordered by date",
    tags: ["window", "aggregation", "analytics"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 267,
    createdAt: new Date("2025-01-13").toISOString(),
    updatedAt: new Date("2025-01-23").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "SQL Pivot Table",
    language: "sql",
    code: `SELECT 
  product_name,
  SUM(CASE WHEN month = 'Jan' THEN revenue ELSE 0 END) as jan_revenue,
  SUM(CASE WHEN month = 'Feb' THEN revenue ELSE 0 END) as feb_revenue,
  SUM(CASE WHEN month = 'Mar' THEN revenue ELSE 0 END) as mar_revenue
FROM sales
GROUP BY product_name;

-- Or using PIVOT (SQL Server, Oracle)
SELECT *
FROM (
  SELECT product_name, month, revenue
  FROM sales
) AS source_table
PIVOT (
  SUM(revenue)
  FOR month IN ([Jan], [Feb], [Mar])
) AS pivot_table;`,
    description: "Transform rows into columns for reporting",
    tags: ["pivot", "transformation", "reporting"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 198,
    createdAt: new Date("2025-01-15").toISOString(),
    updatedAt: new Date("2025-01-25").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "SQL Recursive CTE for Hierarchies",
    language: "sql",
    code: `WITH RECURSIVE employee_hierarchy AS (
  -- Base case: top-level employees
  SELECT 
    employee_id,
    name,
    manager_id,
    1 as level
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive case
  SELECT 
    e.employee_id,
    e.name,
    e.manager_id,
    eh.level + 1
  FROM employees e
  INNER JOIN employee_hierarchy eh 
    ON e.manager_id = eh.employee_id
)
SELECT * FROM employee_hierarchy
ORDER BY level, name;`,
    description: "Query hierarchical data like org charts or category trees",
    tags: ["cte", "recursive", "hierarchy"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 145,
    createdAt: new Date("2025-01-17").toISOString(),
    updatedAt: new Date("2025-01-27").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "SQL Window Functions - LAG and LEAD",
    language: "sql",
    code: `SELECT 
  order_date,
  amount,
  LAG(amount, 1) OVER (ORDER BY order_date) as prev_amount,
  LEAD(amount, 1) OVER (ORDER BY order_date) as next_amount,
  amount - LAG(amount, 1) OVER (ORDER BY order_date) as change_from_prev
FROM orders
ORDER BY order_date;`,
    description: "Access previous and next rows for comparisons",
    tags: ["window", "lag", "lead", "analytics"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 234,
    createdAt: new Date("2025-01-19").toISOString(),
    updatedAt: new Date("2025-01-29").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Optimize Delta Table with Z-Order",
    language: "pyspark",
    code: `from delta.tables import DeltaTable

# Optimize Delta table
delta_table = DeltaTable.forPath(spark, "/path/to/delta/table")

# Optimize (compacts small files)
delta_table.optimize().executeCompaction()

# Z-Order by frequently filtered columns
delta_table.optimize().executeZOrderBy("customer_id", "order_date")

# Vacuum old files (default 7 days retention)
delta_table.vacuum(168)  # 7 days in hours`,
    description: "Optimize Delta Lake tables for better query performance",
    tags: ["delta", "optimization", "z-order"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 201,
    createdAt: new Date("2025-01-21").toISOString(),
    updatedAt: new Date("2025-01-31").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Read Multiple File Formats",
    language: "pyspark",
    code: `# CSV with schema inference
df_csv = spark.read.option("header", "true")\\
    .option("inferSchema", "true")\\
    .csv("path/to/files/*.csv")

# Parquet (auto schema)
df_parquet = spark.read.parquet("path/to/files/*.parquet")

# JSON with multiline
df_json = spark.read.option("multiline", "true")\\
    .json("path/to/files/*.json")

# Delta
df_delta = spark.read.format("delta")\\
    .load("path/to/delta/table")

# Excel (requires spark-excel)
df_excel = spark.read.format("excel")\\
    .option("header", "true")\\
    .load("path/to/file.xlsx")`,
    description: "Common patterns for reading different file formats",
    tags: ["read", "io", "formats"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 167,
    createdAt: new Date("2025-01-22").toISOString(),
    updatedAt: new Date("2025-02-01").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Dynamic Column Renaming",
    language: "pyspark",
    code: `from pyspark.sql.functions import col

# Rename all columns to lowercase
df = df.toDF(*[c.lower() for c in df.columns])

# Remove spaces from column names
df = df.toDF(*[c.replace(" ", "_") for c in df.columns])

# Add prefix to all columns
df = df.toDF(*[f"src_{c}" for c in df.columns])

# Rename specific columns with dict
rename_dict = {"old_name1": "new_name1", "old_name2": "new_name2"}
for old, new in rename_dict.items():
    df = df.withColumnRenamed(old, new)`,
    description: "Dynamically rename columns in PySpark DataFrames",
    tags: ["transformation", "columns", "rename"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 143,
    createdAt: new Date("2025-01-23").toISOString(),
    updatedAt: new Date("2025-02-02").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Sampling and Statistical Functions",
    language: "pyspark",
    code: `# Random sampling (10%)
sample_df = df.sample(fraction=0.1, seed=42)

# Sample with replacement
sample_df = df.sample(withReplacement=True, fraction=0.1)

# Get summary statistics
df.describe().show()

# Correlation between columns
df.stat.corr("column1", "column2")

# Covariance
df.stat.cov("column1", "column2")

# Percentiles/quantiles
df.stat.approxQuantile("age", [0.25, 0.5, 0.75], 0.01)`,
    description: "Sampling and statistical analysis in PySpark",
    tags: ["statistics", "sampling", "analytics"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 112,
    createdAt: new Date("2025-01-24").toISOString(),
    updatedAt: new Date("2025-02-03").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "PySpark Conditional Aggregation",
    language: "pyspark",
    code: `from pyspark.sql.functions import sum, col, when

# Count with conditions
df.groupBy("category").agg(
    sum(when(col("status") == "active", 1).otherwise(0)).alias("active_count"),
    sum(when(col("status") == "inactive", 1).otherwise(0)).alias("inactive_count"),
    sum(when(col("amount") > 100, col("amount")).otherwise(0)).alias("high_value_total")
)`,
    description: "Perform conditional aggregations in group by operations",
    tags: ["aggregation", "conditional", "groupby"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 156,
    createdAt: new Date("2025-01-25").toISOString(),
    updatedAt: new Date("2025-02-04").toISOString(),
    source: ""
  },

  // ===== MORE SQL SNIPPETS =====
  {
    id: uuidv4(),
    title: "SQL Generate Date Series",
    language: "sql",
    code: `-- PostgreSQL
SELECT generate_series(
  '2024-01-01'::date,
  '2024-12-31'::date,
  '1 day'::interval
)::date as date;

-- Snowflake
SELECT DATEADD(day, SEQ4(), '2024-01-01') as date
FROM TABLE(GENERATOR(ROWCOUNT => 365));

-- BigQuery
SELECT DATE_ADD('2024-01-01', INTERVAL day_offset DAY) as date
FROM UNNEST(GENERATE_ARRAY(0, 364)) as day_offset;`,
    description: "Generate a series of dates for calendar tables",
    tags: ["date", "calendar", "series"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2025-01-26").toISOString(),
    updatedAt: new Date("2025-02-05").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "SQL Cumulative Distribution and Percentiles",
    language: "sql",
    code: `SELECT 
  customer_id,
  revenue,
  PERCENT_RANK() OVER (ORDER BY revenue) as percentile,
  CUME_DIST() OVER (ORDER BY revenue) as cumulative_dist,
  NTILE(4) OVER (ORDER BY revenue) as quartile,
  NTILE(10) OVER (ORDER BY revenue) as decile
FROM customer_revenue
ORDER BY revenue DESC;`,
    description: "Calculate percentiles and distribution metrics",
    tags: ["window", "percentile", "analytics"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 134,
    createdAt: new Date("2025-01-27").toISOString(),
    updatedAt: new Date("2025-02-06").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "SQL Find Gaps in Sequences",
    language: "sql",
    code: `WITH numbered AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (ORDER BY id) as rn
  FROM orders
),
gaps AS (
  SELECT 
    id + 1 as gap_start,
    LEAD(id) OVER (ORDER BY id) - 1 as gap_end
  FROM numbered
  WHERE LEAD(id) OVER (ORDER BY id) - id > 1
)
SELECT * FROM gaps
WHERE gap_end IS NOT NULL;`,
    description: "Identify missing values in sequential data",
    tags: ["data-quality", "gaps", "sequence"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 98,
    createdAt: new Date("2025-01-28").toISOString(),
    updatedAt: new Date("2025-02-07").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "SQL Slowly Changing Dimension Type 2",
    language: "sql",
    code: `-- Update existing record (close it)
UPDATE dim_customer
SET 
  end_date = CURRENT_DATE,
  is_current = FALSE
WHERE customer_id = :customer_id
  AND is_current = TRUE;

-- Insert new record
INSERT INTO dim_customer (
  customer_id,
  name,
  email,
  start_date,
  end_date,
  is_current
)
VALUES (
  :customer_id,
  :name,
  :email,
  CURRENT_DATE,
  '9999-12-31',
  TRUE
);`,
    description: "Implement SCD Type 2 for dimension tables",
    tags: ["scd", "dimension", "data-warehouse"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 189,
    createdAt: new Date("2025-01-29").toISOString(),
    updatedAt: new Date("2025-02-08").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "SQL Unpivot/Melt Data",
    language: "sql",
    code: `-- PostgreSQL / BigQuery
SELECT 
  product_id,
  'Jan' as month,
  jan_sales as sales
FROM sales
UNION ALL
SELECT product_id, 'Feb', feb_sales FROM sales
UNION ALL
SELECT product_id, 'Mar', mar_sales FROM sales;

-- SQL Server UNPIVOT
SELECT product_id, month, sales
FROM sales
UNPIVOT (
  sales FOR month IN (jan_sales, feb_sales, mar_sales)
) as unpvt;`,
    description: "Transform columns into rows (unpivot/melt operation)",
    tags: ["transformation", "unpivot", "reshape"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 145,
    createdAt: new Date("2025-01-30").toISOString(),
    updatedAt: new Date("2025-02-09").toISOString(),
    source: ""
  },

  // ===== PYTHON SNIPPETS (10) =====
  {
    id: uuidv4(),
    title: "Python Retry Decorator with Exponential Backoff",
    language: "python",
    code: `import time
from functools import wraps

def retry(max_attempts=3, delay=1, backoff=2):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            attempt = 0
            current_delay = delay
            
            while attempt < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempt += 1
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed: {e}. Retrying in {current_delay}s...")
                    time.sleep(current_delay)
                    current_delay *= backoff
            
        return wrapper
    return decorator

@retry(max_attempts=3, delay=1, backoff=2)
def api_call():
    # Your API call here
    pass`,
    description: "Automatically retry failed operations with exponential backoff",
    tags: ["decorator", "retry", "error-handling"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 289,
    createdAt: new Date("2025-01-12").toISOString(),
    updatedAt: new Date("2025-01-22").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Python Dataclass for Data Validation",
    language: "python",
    code: `from dataclasses import dataclass
from typing import Optional
from datetime import datetime

@dataclass
class Order:
    order_id: str
    customer_id: str
    amount: float
    order_date: datetime
    status: str = "pending"
    notes: Optional[str] = None
    
    def __post_init__(self):
        # Validation
        if self.amount <= 0:
            raise ValueError("Amount must be positive")
        if self.status not in ["pending", "completed", "cancelled"]:
            raise ValueError(f"Invalid status: {self.status}")

# Usage
order = Order(
    order_id="ORD123",
    customer_id="CUST456",
    amount=99.99,
    order_date=datetime.now()
)`,
    description: "Use dataclasses for clean data structures with validation",
    tags: ["dataclass", "validation", "typing"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 176,
    createdAt: new Date("2025-01-14").toISOString(),
    updatedAt: new Date("2025-01-24").toISOString(),
    source: ""
  },

  // ===== DBT SNIPPETS (8) =====
  {
    id: uuidv4(),
    title: "dbt Incremental Model Template",
    language: "dbt",
    code: `{{
  config(
    materialized='incremental',
    unique_key='id',
    on_schema_change='fail'
  )
}}

SELECT * FROM {{ ref('staging_orders') }}

{% if is_incremental() %}
  -- Only process new records
  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}`,
    description: "Efficient incremental model that only processes new data",
    tags: ["incremental", "performance", "materialization"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 312,
    createdAt: new Date("2025-01-13").toISOString(),
    updatedAt: new Date("2025-01-23").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "dbt Data Quality Tests",
    language: "dbt",
    code: `# schema.yml
version: 2

models:
  - name: customers
    columns:
      - name: customer_id
        tests:
          - unique
          - not_null
      
      - name: email
        tests:
          - unique
          - not_null
          - accepted_values:
              values: ['gmail.com', 'yahoo.com', 'outlook.com']
              quote: false
      
      - name: created_at
        tests:
          - not_null
          - dbt_utils.expression_is_true:
              expression: ">= '2020-01-01'"
      
      - name: lifetime_value
        tests:
          - not_null
          - dbt_utils.expression_is_true:
              expression: ">= 0"`,
    description: "Common data quality tests for validating models",
    tags: ["testing", "data-quality", "validation"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 267,
    createdAt: new Date("2025-01-16").toISOString(),
    updatedAt: new Date("2025-01-26").toISOString(),
    source: ""
  },

  // ===== KAFKA SNIPPETS (5) =====
  {
    id: uuidv4(),
    title: "Kafka Producer with Error Handling",
    language: "python",
    code: `from kafka import KafkaProducer
import json

def create_producer():
    return KafkaProducer(
        bootstrap_servers=['localhost:9092'],
        value_serializer=lambda v: json.dumps(v).encode('utf-8'),
        acks='all',
        retries=3,
        max_in_flight_requests_per_connection=1
    )

def send_message(producer, topic, message):
    try:
        future = producer.send(topic, message)
        record_metadata = future.get(timeout=10)
        print(f"Message sent to {record_metadata.topic} partition {record_metadata.partition}")
    except Exception as e:
        print(f"Failed to send message: {e}")
    finally:
        producer.flush()

# Usage
producer = create_producer()
send_message(producer, 'orders', {'order_id': '123', 'amount': 99.99})`,
    description: "Robust Kafka producer with error handling and serialization",
    tags: ["kafka", "producer", "error-handling"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 198,
    createdAt: new Date("2025-01-18").toISOString(),
    updatedAt: new Date("2025-01-28").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Kafka Consumer with Commit Strategy",
    language: "python",
    code: `from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'orders',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=False,
    group_id='my-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

for message in consumer:
    try:
        # Process message
        data = message.value
        print(f"Processing: {data}")
        
        # Your processing logic here
        process_order(data)
        
        # Manual commit after successful processing
        consumer.commit()
        
    except Exception as e:
        print(f"Error processing message: {e}")
        # Don't commit on error - message will be reprocessed`,
    description: "Kafka consumer with manual offset management",
    tags: ["kafka", "consumer", "offset"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 187,
    createdAt: new Date("2025-01-20").toISOString(),
    updatedAt: new Date("2025-01-30").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Python Logging Configuration for Data Pipelines",
    language: "python",
    code: `import logging
from logging.handlers import RotatingFileHandler

def setup_logger(name, log_file, level=logging.INFO):
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # File handler
    handler = RotatingFileHandler(
        log_file, 
        maxBytes=10*1024*1024,  # 10MB
        backupCount=5
    )
    handler.setFormatter(formatter)
    
    # Console handler
    console = logging.StreamHandler()
    console.setFormatter(formatter)
    
    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)
    logger.addHandler(console)
    
    return logger

# Usage
logger = setup_logger('pipeline', 'pipeline.log')
logger.info("Pipeline started")`,
    description: "Production-ready logging setup for data pipelines",
    tags: ["logging", "monitoring", "best-practices"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 167,
    createdAt: new Date("2025-01-17").toISOString(),
    updatedAt: new Date("2025-01-27").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Python Environment Variables and Secrets",
    language: "python",
    code: `import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Get environment variables with defaults
DATABASE_URL = os.getenv("DATABASE_URL", "localhost:5432")
API_KEY = os.getenv("API_KEY")

# Validate required variables
required_vars = ["DATABASE_URL", "API_KEY"]
missing = [var for var in required_vars if not os.getenv(var)]
if missing:
    raise ValueError(f"Missing required env vars: {missing}")

# Use pathlib for file paths
DATA_DIR = Path(os.getenv("DATA_DIR", "/data"))
DATA_DIR.mkdir(parents=True, exist_ok=True)`,
    description: "Manage environment variables and secrets securely",
    tags: ["config", "security", "environment"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 189,
    createdAt: new Date("2025-01-18").toISOString(),
    updatedAt: new Date("2025-01-28").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Python Parallel Processing with ThreadPoolExecutor",
    language: "python",
    code: `from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def process_file(filename):
    # Your processing logic
    time.sleep(1)
    return f"Processed {filename}"

files = [f"file_{i}.csv" for i in range(10)]

# Process files in parallel
with ThreadPoolExecutor(max_workers=5) as executor:
    # Submit all tasks
    futures = {executor.submit(process_file, f): f for f in files}
    
    # Process results as they complete
    for future in as_completed(futures):
        filename = futures[future]
        try:
            result = future.result()
            print(result)
        except Exception as e:
            print(f"Error processing {filename}: {e}")`,
    description: "Process multiple files in parallel for faster pipelines",
    tags: ["parallel", "performance", "threading"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 201,
    createdAt: new Date("2025-01-19").toISOString(),
    updatedAt: new Date("2025-01-29").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Python Data Validation with Pydantic",
    language: "python",
    code: `from pydantic import BaseModel, validator, Field
from typing import Optional
from datetime import datetime

class OrderRecord(BaseModel):
    order_id: str
    customer_id: str
    amount: float = Field(gt=0, description="Must be positive")
    order_date: datetime
    status: str
    items: list[str]
    
    @validator('status')
    def validate_status(cls, v):
        allowed = ['pending', 'completed', 'cancelled']
        if v not in allowed:
            raise ValueError(f'Status must be one of {allowed}')
        return v
    
    @validator('order_id')
    def validate_order_id(cls, v):
        if not v.startswith('ORD'):
            raise ValueError('Order ID must start with ORD')
        return v

# Usage
try:
    order = OrderRecord(
        order_id="ORD123",
        customer_id="CUST456",
        amount=99.99,
        order_date=datetime.now(),
        status="pending",
        items=["item1", "item2"]
    )
except ValueError as e:
    print(f"Validation error: {e}")`,
    description: "Validate data schemas with automatic type checking",
    tags: ["validation", "pydantic", "data-quality"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 223,
    createdAt: new Date("2025-01-20").toISOString(),
    updatedAt: new Date("2025-01-30").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Python Date and Time Utilities",
    language: "python",
    code: `from datetime import datetime, timedelta
import pytz

# Current timestamp
now = datetime.now()
utc_now = datetime.now(pytz.UTC)

# Parse string to datetime
date_str = "2024-01-15 10:30:00"
dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")

# Format datetime to string
formatted = dt.strftime("%Y-%m-%d")

# Date arithmetic
yesterday = now - timedelta(days=1)
next_week = now + timedelta(weeks=1)

# First/last day of month
from calendar import monthrange
first_day = dt.replace(day=1)
last_day = dt.replace(day=monthrange(dt.year, dt.month)[1])

# Convert timezone
eastern = pytz.timezone('US/Eastern')
dt_eastern = utc_now.astimezone(eastern)`,
    description: "Common date and time operations for data engineering",
    tags: ["datetime", "timezone", "utilities"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2025-01-21").toISOString(),
    updatedAt: new Date("2025-01-31").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Python Context Manager for Database Connections",
    language: "python",
    code: `from contextlib import contextmanager
import psycopg2

@contextmanager
def get_db_connection(host, database, user, password):
    conn = None
    try:
        conn = psycopg2.connect(
            host=host,
            database=database,
            user=user,
            password=password
        )
        yield conn
        conn.commit()
    except Exception as e:
        if conn:
            conn.rollback()
        raise e
    finally:
        if conn:
            conn.close()

# Usage
with get_db_connection('localhost', 'mydb', 'user', 'pass') as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders")
    results = cursor.fetchall()`,
    description: "Safe database connection handling with context managers",
    tags: ["database", "context-manager", "best-practices"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 145,
    createdAt: new Date("2025-01-22").toISOString(),
    updatedAt: new Date("2025-02-01").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Python JSON Handling and Pretty Printing",
    language: "python",
    code: `import json
from datetime import datetime

# Custom JSON encoder for dates
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data = {
    "order_id": "123",
    "timestamp": datetime.now(),
    "items": [{"name": "item1", "price": 10.99}]
}

# Write to file with pretty printing
with open("output.json", "w") as f:
    json.dump(data, f, cls=DateTimeEncoder, indent=2)

# Read from file
with open("output.json", "r") as f:
    loaded = json.load(f)

# Convert to/from JSON string
json_str = json.dumps(data, cls=DateTimeEncoder)
parsed = json.loads(json_str)`,
    description: "Handle JSON data with custom encoders and formatting",
    tags: ["json", "serialization", "io"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 134,
    createdAt: new Date("2025-01-23").toISOString(),
    updatedAt: new Date("2025-02-02").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Python pandas Data Profiling",
    language: "python",
    code: `import pandas as pd

def profile_dataframe(df):
    """Generate data quality profile"""
    profile = {
        'shape': df.shape,
        'columns': list(df.columns),
        'dtypes': df.dtypes.to_dict(),
        'missing': df.isnull().sum().to_dict(),
        'missing_pct': (df.isnull().sum() / len(df) * 100).to_dict(),
        'duplicates': df.duplicated().sum(),
        'memory_mb': df.memory_usage(deep=True).sum() / 1024**2
    }
    
    # Numeric column stats
    numeric_cols = df.select_dtypes(include=['number']).columns
    profile['numeric_stats'] = df[numeric_cols].describe().to_dict()
    
    return profile

# Usage
df = pd.read_csv('data.csv')
report = profile_dataframe(df)
print(json.dumps(report, indent=2))`,
    description: "Generate data quality profile for pandas DataFrames",
    tags: ["pandas", "data-quality", "profiling"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 156,
    createdAt: new Date("2025-01-24").toISOString(),
    updatedAt: new Date("2025-02-03").toISOString(),
    source: ""
  },

  // ===== MORE DBT SNIPPETS =====
  {
    id: uuidv4(),
    title: "dbt Macro for Safe Column Selection",
    language: "dbt",
    code: `{# macros/get_column_values.sql #}
{% macro get_columns_except(relation, except_list) %}
  {%- set relation_columns = adapter.get_columns_in_relation(relation) -%}
  {%- set column_names = relation_columns | map(attribute='name') | list -%}
  {%- set columns_to_select = column_names | reject('in', except_list) | list -%}
  {{ return(columns_to_select) }}
{% endmacro %}

{# Usage in model #}
SELECT 
  {% for col in get_columns_except(ref('source_table'), ['password', 'ssn']) %}
    {{ col }}{{ "," if not loop.last }}
  {% endfor %}
FROM {{ ref('source_table') }}`,
    description: "Dynamically select columns excluding sensitive fields",
    tags: ["macro", "security", "dynamic"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 123,
    createdAt: new Date("2025-01-25").toISOString(),
    updatedAt: new Date("2025-02-04").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "dbt Surrogate Key Generation",
    language: "dbt",
    code: `{{
  config(
    materialized='incremental',
    unique_key='surrogate_key'
  )
}}

SELECT
  {{ dbt_utils.generate_surrogate_key([
      'customer_id',
      'order_date'
  ]) }} as surrogate_key,
  customer_id,
  order_date,
  amount,
  status
FROM {{ ref('staging_orders') }}

{% if is_incremental() %}
  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}`,
    description: "Generate deterministic surrogate keys from multiple columns",
    tags: ["surrogate-key", "incremental", "dbt-utils"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 167,
    createdAt: new Date("2025-01-26").toISOString(),
    updatedAt: new Date("2025-02-05").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "dbt Custom Schema Tests",
    language: "dbt",
    code: `{# tests/generic/test_valid_email.sql #}
{% test valid_email(model, column_name) %}

SELECT {{ column_name }}
FROM {{ model }}
WHERE {{ column_name }} IS NOT NULL
  AND {{ column_name }} !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$'

{% endtest %}

{# schema.yml usage #}
version: 2
models:
  - name: customers
    columns:
      - name: email
        tests:
          - valid_email`,
    description: "Create custom reusable test for email validation",
    tags: ["testing", "custom", "validation"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 98,
    createdAt: new Date("2025-01-27").toISOString(),
    updatedAt: new Date("2025-02-06").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "dbt Snapshot for SCD Type 2",
    language: "dbt",
    code: `{% snapshot customers_snapshot %}

{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='updated_at',
      invalidate_hard_deletes=True
    )
}}

SELECT * FROM {{ source('staging', 'customers') }}

{% endsnapshot %}

{# This creates dbt_valid_from, dbt_valid_to, dbt_scd_id columns #}`,
    description: "Track slowly changing dimensions with dbt snapshots",
    tags: ["snapshot", "scd", "history"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 189,
    createdAt: new Date("2025-01-28").toISOString(),
    updatedAt: new Date("2025-02-07").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "dbt Union Multiple Sources",
    language: "dbt",
    code: `{{
  config(
    materialized='view'
  )
}}

{% set sources = [
    {'name': 'orders_2022', 'year': 2022},
    {'name': 'orders_2023', 'year': 2023},
    {'name': 'orders_2024', 'year': 2024}
] %}

{% for source in sources %}
  SELECT
    order_id,
    customer_id,
    amount,
    {{ source.year }} as year,
    order_date
  FROM {{ source('raw', source.name) }}
  {% if not loop.last %} UNION ALL {% endif %}
{% endfor %}`,
    description: "Dynamically union multiple source tables",
    tags: ["union", "dynamic", "multi-source"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 145,
    createdAt: new Date("2025-01-29").toISOString(),
    updatedAt: new Date("2025-02-08").toISOString(),
    source: ""
  },

  // ===== AIRFLOW DAG SNIPPETS =====
  {
    id: uuidv4(),
    title: "Airflow DAG with TaskGroups",
    language: "python",
    code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.task_group import TaskGroup
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-eng',
    'depends_on_past': False,
    'email_on_failure': True,
    'email': ['alerts@example.com'],
    'retries': 2,
    'retry_delay': timedelta(minutes=5)
}

with DAG(
    'data_pipeline',
    default_args=default_args,
    description='Daily data processing pipeline',
    schedule_interval='0 2 * * *',  # 2 AM daily
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['production', 'daily']
) as dag:
    
    start = PythonOperator(
        task_id='start',
        python_callable=lambda: print("Pipeline started")
    )
    
    with TaskGroup('extract_data') as extract:
        extract_orders = PythonOperator(
            task_id='extract_orders',
            python_callable=extract_orders_func
        )
        extract_customers = PythonOperator(
            task_id='extract_customers',
            python_callable=extract_customers_func
        )
    
    with TaskGroup('transform') as transform:
        transform_orders = PythonOperator(
            task_id='transform_orders',
            python_callable=transform_orders_func
        )
    
    load = PythonOperator(
        task_id='load',
        python_callable=load_func
    )
    
    start >> extract >> transform >> load`,
    description: "Organize complex DAGs with TaskGroups for better readability",
    tags: ["airflow", "dag", "orchestration"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 212,
    createdAt: new Date("2025-01-30").toISOString(),
    updatedAt: new Date("2025-02-09").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Airflow Sensor for File Arrival",
    language: "python",
    code: `from airflow import DAG
from airflow.sensors.filesystem import FileSensor
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

with DAG(
    'file_processing_dag',
    schedule_interval='*/15 * * * *',  # Every 15 minutes
    start_date=datetime(2024, 1, 1),
    catchup=False
) as dag:
    
    # Wait for file to arrive
    wait_for_file = FileSensor(
        task_id='wait_for_file',
        filepath='/data/incoming/orders_*.csv',
        fs_conn_id='file_system',
        poke_interval=60,  # Check every 60 seconds
        timeout=3600,  # Timeout after 1 hour
        mode='poke'
    )
    
    process_file = PythonOperator(
        task_id='process_file',
        python_callable=process_orders_file
    )
    
    wait_for_file >> process_file`,
    description: "Wait for files before processing with sensors",
    tags: ["airflow", "sensor", "file"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 167,
    createdAt: new Date("2025-01-31").toISOString(),
    updatedAt: new Date("2025-02-10").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Airflow XCom for Task Communication",
    language: "python",
    code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def extract_data(**context):
    # Extract data
    data = {"records": 1000, "status": "success"}
    # Push to XCom
    context['ti'].xcom_push(key='extract_results', value=data)
    return data

def transform_data(**context):
    # Pull from XCom
    ti = context['ti']
    extract_results = ti.xcom_pull(
        task_ids='extract', 
        key='extract_results'
    )
    print(f"Processing {extract_results['records']} records")
    
    transformed = {"transformed_records": extract_results['records']}
    return transformed

with DAG(
    'xcom_example',
    start_date=datetime(2024, 1, 1)
) as dag:
    
    extract = PythonOperator(
        task_id='extract',
        python_callable=extract_data
    )
    
    transform = PythonOperator(
        task_id='transform',
        python_callable=transform_data
    )
    
    extract >> transform`,
    description: "Pass data between Airflow tasks using XCom",
    tags: ["airflow", "xcom", "communication"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2025-02-01").toISOString(),
    updatedAt: new Date("2025-02-11").toISOString(),
    source: ""
  },

  // ===== DATABRICKS SNIPPETS =====
  {
    id: uuidv4(),
    title: "Databricks Autoloader (CloudFiles)",
    language: "python",
    code: `# Stream files from cloud storage
df = (spark.readStream
  .format("cloudFiles")
  .option("cloudFiles.format", "json")
  .option("cloudFiles.schemaLocation", "/schema/location")
  .option("cloudFiles.inferColumnTypes", "true")
  .load("s3://bucket/path/"))

# Write stream with checkpointing
(df.writeStream
  .format("delta")
  .option("checkpointLocation", "/checkpoint/location")
  .trigger(availableNow=True)  # Process all available files
  .start("/delta/output/path"))`,
    description: "Incrementally ingest files from cloud storage with Auto Loader",
    tags: ["databricks", "streaming", "autoloader"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 234,
    createdAt: new Date("2025-02-02").toISOString(),
    updatedAt: new Date("2025-02-12").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Databricks Widgets for Parameterized Notebooks",
    language: "python",
    code: `# Create widgets
dbutils.widgets.text("start_date", "2024-01-01", "Start Date")
dbutils.widgets.dropdown("environment", "dev", ["dev", "prod"], "Environment")
dbutils.widgets.multiselect("regions", "us-east", ["us-east", "us-west", "eu"], "Regions")

# Get widget values
start_date = dbutils.widgets.get("start_date")
environment = dbutils.widgets.get("environment")
regions = dbutils.widgets.get("regions").split(",")

# Use in your code
print(f"Running for {environment} environment")
print(f"Start date: {start_date}")
print(f"Regions: {regions}")

# Remove widgets when done
dbutils.widgets.removeAll()`,
    description: "Create interactive parameters for Databricks notebooks",
    tags: ["databricks", "widgets", "parameters"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 189,
    createdAt: new Date("2025-02-03").toISOString(),
    updatedAt: new Date("2025-02-13").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Databricks Secrets Management",
    language: "python",
    code: `# Access secrets from Azure Key Vault or Databricks Secrets
# No hardcoded credentials!

# Database connection
jdbc_url = dbutils.secrets.get(scope="prod-scope", key="db-url")
username = dbutils.secrets.get(scope="prod-scope", key="db-username")
password = dbutils.secrets.get(scope="prod-scope", key="db-password")

# Connect to database
df = (spark.read
  .format("jdbc")
  .option("url", jdbc_url)
  .option("dbtable", "orders")
  .option("user", username)
  .option("password", password)
  .load())

# API key
api_key = dbutils.secrets.get(scope="prod-scope", key="api-key")

# AWS credentials
aws_access_key = dbutils.secrets.get(scope="aws-scope", key="access-key")
aws_secret_key = dbutils.secrets.get(scope="aws-scope", key="secret-key")`,
    description: "Securely access secrets and credentials in Databricks",
    tags: ["databricks", "security", "secrets"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 198,
    createdAt: new Date("2025-02-04").toISOString(),
    updatedAt: new Date("2025-02-14").toISOString(),
    source: ""
  },
  // ===== MACHINE LEARNING SNIPPETS (10) =====
  {
    id: uuidv4(),
    title: "ML Train-Test Split with Stratification",
    language: "python",
    code: `from sklearn.model_selection import train_test_split

# Simple split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Stratified split (maintains class distribution)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.2, 
    stratify=y,  # Maintains class balance
    random_state=42
)

# Train-Val-Test split
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

print(f"Train: {len(X_train)}, Val: {len(X_val)}, Test: {len(X_test)}")`,
    description: "Split data into train/validation/test sets with proper stratification",
    tags: ["sklearn", "ml", "preprocessing"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 287,
    createdAt: new Date("2025-02-05").toISOString(),
    updatedAt: new Date("2025-02-15").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "ML Pipeline with Preprocessing",
    language: "python",
    code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

# Create preprocessing + model pipeline
pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Fit and predict in one step
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

# Pipeline ensures same preprocessing on train and test
score = pipeline.score(X_test, y_test)
print(f"Accuracy: {score:.3f}")`,
    description: "Create ML pipeline with preprocessing steps and model",
    tags: ["sklearn", "pipeline", "preprocessing"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 312,
    createdAt: new Date("2025-02-06").toISOString(),
    updatedAt: new Date("2025-02-16").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Cross-Validation for Model Evaluation",
    language: "python",
    code: `from sklearn.model_selection import cross_val_score, cross_validate
from sklearn.ensemble import RandomForestClassifier
import numpy as np

model = RandomForestClassifier(n_estimators=100, random_state=42)

# Simple cross-validation
scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
print(f"CV Accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})")

# Multiple metrics
scoring = ['accuracy', 'precision', 'recall', 'f1']
cv_results = cross_validate(model, X, y, cv=5, scoring=scoring)

for metric in scoring:
    scores = cv_results[f'test_{metric}']
    print(f"{metric}: {scores.mean():.3f} (+/- {scores.std():.3f})")`,
    description: "Evaluate model performance using k-fold cross-validation",
    tags: ["sklearn", "evaluation", "cross-validation"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 234,
    createdAt: new Date("2025-02-07").toISOString(),
    updatedAt: new Date("2025-02-17").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Feature Engineering with pandas",
    language: "python",
    code: `import pandas as pd
import numpy as np

# Date features
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek
df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)

# Binning continuous variables
df['age_group'] = pd.cut(df['age'], bins=[0, 18, 35, 50, 100], 
                          labels=['youth', 'adult', 'middle', 'senior'])

# Log transform skewed features
df['log_income'] = np.log1p(df['income'])  # log1p handles zeros

# Interaction features
df['price_per_sqft'] = df['price'] / df['square_feet']

# Encoding categorical variables
df = pd.get_dummies(df, columns=['category'], prefix='cat')`,
    description: "Common feature engineering patterns for ML",
    tags: ["pandas", "feature-engineering", "preprocessing"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 198,
    createdAt: new Date("2025-02-08").toISOString(),
    updatedAt: new Date("2025-02-18").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Handle Imbalanced Classification",
    language: "python",
    code: `from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler
from imblearn.pipeline import Pipeline as ImbPipeline
from sklearn.ensemble import RandomForestClassifier

# Check class distribution
print(f"Class distribution: {pd.Series(y).value_counts()}")

# SMOTE oversampling
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)

# Combined over/under sampling in pipeline
sampling_pipeline = ImbPipeline([
    ('over', SMOTE(sampling_strategy=0.5)),
    ('under', RandomUnderSampler(sampling_strategy=0.8)),
    ('model', RandomForestClassifier())
])

sampling_pipeline.fit(X_train, y_train)

# Use class_weight parameter (no resampling)
model = RandomForestClassifier(class_weight='balanced')`,
    description: "Handle imbalanced datasets with SMOTE and sampling strategies",
    tags: ["imbalanced", "smote", "classification"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 176,
    createdAt: new Date("2025-02-09").toISOString(),
    updatedAt: new Date("2025-02-19").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Hyperparameter Tuning with GridSearch",
    language: "python",
    code: `from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
import numpy as np

model = RandomForestClassifier(random_state=42)

# Grid Search - exhaustive search
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15, None],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(model, param_grid, cv=5, scoring='f1', n_jobs=-1)
grid_search.fit(X_train, y_train)

print(f"Best params: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.3f}")

# Randomized Search - faster for large param spaces
param_dist = {
    'n_estimators': [50, 100, 200, 300],
    'max_depth': [5, 10, 15, 20, None],
    'min_samples_split': [2, 5, 10, 15]
}

random_search = RandomizedSearchCV(model, param_dist, n_iter=20, cv=5, n_jobs=-1)
random_search.fit(X_train, y_train)`,
    description: "Find optimal hyperparameters using grid or random search",
    tags: ["sklearn", "hyperparameter", "tuning"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 221,
    createdAt: new Date("2025-02-10").toISOString(),
    updatedAt: new Date("2025-02-20").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Save and Load ML Models",
    language: "python",
    code: `import joblib
import pickle
from datetime import datetime

# Train model
model.fit(X_train, y_train)

# Save with joblib (recommended for sklearn)
joblib.dump(model, 'model.joblib')

# Save with pickle
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Save with metadata
model_data = {
    'model': model,
    'train_date': datetime.now(),
    'accuracy': model.score(X_test, y_test),
    'features': list(X_train.columns)
}
joblib.dump(model_data, 'model_with_metadata.joblib')

# Load model
loaded_model = joblib.load('model.joblib')
predictions = loaded_model.predict(X_test)`,
    description: "Save and load trained ML models with metadata",
    tags: ["model-persistence", "joblib", "mlops"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 267,
    createdAt: new Date("2025-02-11").toISOString(),
    updatedAt: new Date("2025-02-21").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Confusion Matrix and Classification Report",
    language: "python",
    code: `from sklearn.metrics import confusion_matrix, classification_report, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# Predictions
y_pred = model.predict(X_test)

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)

# Visual confusion matrix
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=model.classes_)
disp.plot()
plt.show()

# Detailed classification report
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))

# Per-class metrics
from sklearn.metrics import precision_score, recall_score, f1_score
print(f"Precision: {precision_score(y_test, y_pred, average='weighted'):.3f}")
print(f"Recall: {recall_score(y_test, y_pred, average='weighted'):.3f}")
print(f"F1: {f1_score(y_test, y_pred, average='weighted'):.3f}")`,
    description: "Evaluate classification models with confusion matrix and metrics",
    tags: ["evaluation", "metrics", "classification"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 189,
    createdAt: new Date("2025-02-12").toISOString(),
    updatedAt: new Date("2025-02-22").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Feature Importance Analysis",
    language: "python",
    code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Get feature importance
feature_importance = pd.DataFrame({
    'feature': X_train.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print(feature_importance.head(10))

# Plot top 10 features
top_features = feature_importance.head(10)
plt.figure(figsize=(10, 6))
plt.barh(top_features['feature'], top_features['importance'])
plt.xlabel('Importance')
plt.title('Top 10 Most Important Features')
plt.gca().invert_yaxis()
plt.tight_layout()
plt.show()`,
    description: "Analyze and visualize feature importance from tree-based models",
    tags: ["feature-importance", "interpretation", "visualization"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 203,
    createdAt: new Date("2025-02-13").toISOString(),
    updatedAt: new Date("2025-02-23").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "pandas Profiling for EDA",
    language: "python",
    code: `import pandas as pd
from ydata_profiling import ProfileReport

# Load data
df = pd.read_csv('data.csv')

# Quick overview
print(df.info())
print(df.describe())
print(df.isnull().sum())

# Generate comprehensive profile report
profile = ProfileReport(df, 
    title="Data Profiling Report",
    explorative=True,
    dark_mode=True
)

# Save report
profile.to_file("data_profile.html")

# In Jupyter: display inline
# profile.to_widgets()

# Quick pandas EDA
print("\\nBasic Stats:")
print(f"Shape: {df.shape}")
print(f"Duplicates: {df.duplicated().sum()}")
print(f"Memory: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")`,
    description: "Automated exploratory data analysis with pandas profiling",
    tags: ["eda", "profiling", "pandas"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 156,
    createdAt: new Date("2025-02-14").toISOString(),
    updatedAt: new Date("2025-02-24").toISOString(),
    source: ""
  },

  // ===== LANGCHAIN / RAG SNIPPETS (10) =====
  {
    id: uuidv4(),
    title: "LangChain Basic RAG Pipeline",
    language: "python",
    code: `from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

# 1. Load documents
loader = TextLoader('documents.txt')
documents = loader.load()

# 2. Split into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(documents)

# 3. Create embeddings and vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# 4. Create RAG chain
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0),
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3})
)

# 5. Query
response = qa_chain.run("What is the main topic?")
print(response)`,
    description: "Complete RAG pipeline with LangChain for question answering",
    tags: ["langchain", "rag", "retrieval"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 423,
    createdAt: new Date("2025-02-15").toISOString(),
    updatedAt: new Date("2025-02-25").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "LangChain Document Loading from Multiple Sources",
    language: "python",
    code: `from langchain.document_loaders import (
    PyPDFLoader, CSVLoader, UnstructuredMarkdownLoader,
    DirectoryLoader, WebBaseLoader
)

# Load PDF
pdf_loader = PyPDFLoader("document.pdf")
pdf_docs = pdf_loader.load()

# Load all PDFs in directory
pdf_dir_loader = DirectoryLoader("./pdfs", glob="**/*.pdf", loader_cls=PyPDFLoader)
all_pdfs = pdf_dir_loader.load()

# Load CSV
csv_loader = CSVLoader("data.csv")
csv_docs = csv_loader.load()

# Load from web
web_loader = WebBaseLoader("https://example.com/article")
web_docs = web_loader.load()

# Load Markdown
md_loader = UnstructuredMarkdownLoader("README.md")
md_docs = md_loader.load()

# Combine all documents
all_docs = pdf_docs + csv_docs + web_docs + md_docs
print(f"Loaded {len(all_docs)} documents")`,
    description: "Load documents from various sources (PDF, CSV, web, markdown)",
    tags: ["langchain", "document-loading", "rag"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 312,
    createdAt: new Date("2025-02-16").toISOString(),
    updatedAt: new Date("2025-02-26").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "LangChain Advanced Text Splitting",
    language: "python",
    code: `from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
    TokenTextSplitter,
    MarkdownTextSplitter
)

# Recursive character splitting (recommended)
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\\n\\n", "\\n", " ", ""]
)

# Token-based splitting (for LLM context limits)
token_splitter = TokenTextSplitter(
    chunk_size=512,  # tokens
    chunk_overlap=50
)

# Markdown-aware splitting (preserves structure)
md_splitter = MarkdownTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

# Split documents
chunks = text_splitter.split_documents(documents)

# Add metadata to chunks
for i, chunk in enumerate(chunks):
    chunk.metadata['chunk_id'] = i
    chunk.metadata['source_type'] = 'pdf'

print(f"Created {len(chunks)} chunks")`,
    description: "Advanced text splitting strategies for RAG",
    tags: ["langchain", "text-splitting", "chunking"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 267,
    createdAt: new Date("2025-02-17").toISOString(),
    updatedAt: new Date("2025-02-27").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "LangChain Conversational RAG with Memory",
    language: "python",
    code: `from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.llms import OpenAI
from langchain.vectorstores import Chroma

# Create memory for conversation history
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True,
    output_key="answer"
)

# Create conversational RAG chain
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=OpenAI(temperature=0),
    retriever=vectorstore.as_retriever(),
    memory=memory,
    return_source_documents=True
)

# Multi-turn conversation
response1 = qa_chain({"question": "What is machine learning?"})
print(response1['answer'])

# Follow-up question (uses conversation history)
response2 = qa_chain({"question": "Can you give me an example?"})
print(response2['answer'])

# View sources
for doc in response2['source_documents']:
    print(f"Source: {doc.metadata['source']}")`,
    description: "Build conversational RAG system with memory",
    tags: ["langchain", "conversational", "memory"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 389,
    createdAt: new Date("2025-02-18").toISOString(),
    updatedAt: new Date("2025-02-28").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "LangChain Custom Prompt Templates",
    language: "python",
    code: `from langchain.prompts import PromptTemplate, ChatPromptTemplate
from langchain.llms import OpenAI

# Simple prompt template
template = """You are a helpful data engineer assistant.

Question: {question}

Answer the question based on your knowledge of {topic}.
"""

prompt = PromptTemplate(
    input_variables=["question", "topic"],
    template=template
)

# Format prompt
formatted = prompt.format(
    question="What is PySpark?",
    topic="big data processing"
)

# Chat prompt template (for chat models)
chat_template = ChatPromptTemplate.from_messages([
    ("system", "You are a {role} assistant specialized in {domain}."),
    ("human", "{input}")
])

# Few-shot prompt template
few_shot_template = """Given a question, provide a concise answer.

Examples:
Q: What is SQL?
A: SQL is a language for querying databases.

Q: What is Python?
A: Python is a programming language.

Q: {question}
A:"""`,
    description: "Create reusable prompt templates for LLM applications",
    tags: ["langchain", "prompts", "templates"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 234,
    createdAt: new Date("2025-02-19").toISOString(),
    updatedAt: new Date("2025-03-01").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "LangChain Agents with Tools",
    language: "python",
    code: `from langchain.agents import initialize_agent, Tool, AgentType
from langchain.llms import OpenAI
from langchain.utilities import SerpAPIWrapper, PythonREPL

# Define tools
search = SerpAPIWrapper()
python_repl = PythonREPL()

tools = [
    Tool(
        name="Search",
        func=search.run,
        description="Search the internet for current information"
    ),
    Tool(
        name="Python",
        func=python_repl.run,
        description="Execute Python code to perform calculations"
    )
]

# Initialize agent
agent = initialize_agent(
    tools=tools,
    llm=OpenAI(temperature=0),
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# Run agent
result = agent.run("What is the current stock price of AAPL and calculate 10% increase?")
print(result)`,
    description: "Create LangChain agents that can use multiple tools",
    tags: ["langchain", "agents", "tools"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 198,
    createdAt: new Date("2025-02-20").toISOString(),
    updatedAt: new Date("2025-03-02").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "LangChain Embeddings Comparison",
    language: "python",
    code: `from langchain.embeddings import (
    OpenAIEmbeddings,
    HuggingFaceEmbeddings,
    CohereEmbeddings
)
import numpy as np

text = "This is a sample text for embedding"

# OpenAI embeddings (high quality, paid)
openai_embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
openai_vector = openai_embeddings.embed_query(text)
print(f"OpenAI dim: {len(openai_vector)}")

# HuggingFace embeddings (free, local)
hf_embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
hf_vector = hf_embeddings.embed_query(text)
print(f"HuggingFace dim: {len(hf_vector)}")

# Cohere embeddings (good quality, paid)
cohere_embeddings = CohereEmbeddings(model="embed-english-v3.0")
cohere_vector = cohere_embeddings.embed_query(text)

# Batch embeddings (faster for multiple texts)
texts = ["text 1", "text 2", "text 3"]
batch_vectors = openai_embeddings.embed_documents(texts)`,
    description: "Compare different embedding providers for RAG",
    tags: ["embeddings", "langchain", "rag"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 176,
    createdAt: new Date("2025-02-21").toISOString(),
    updatedAt: new Date("2025-03-03").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "LangChain Retrieval with Metadata Filtering",
    language: "python",
    code: `from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# Create documents with metadata
docs_with_metadata = [
    Document(
        page_content="PySpark tutorial",
        metadata={"source": "blog", "author": "john", "year": 2024}
    ),
    Document(
        page_content="SQL best practices",
        metadata={"source": "book", "author": "jane", "year": 2023}
    )
]

# Create vector store
vectorstore = Chroma.from_documents(
    docs_with_metadata,
    OpenAIEmbeddings()
)

# Search with metadata filter
results = vectorstore.similarity_search(
    "data engineering",
    filter={"year": 2024}  # Only 2024 documents
)

# Complex filters
results = vectorstore.similarity_search(
    "python tutorial",
    filter={
        "year": {"$gte": 2023},  # Year >= 2023
        "source": {"$in": ["blog", "tutorial"]}  # source is blog OR tutorial
    },
    k=5
)`,
    description: "Advanced retrieval with metadata filtering in vector stores",
    tags: ["retrieval", "metadata", "filtering"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 212,
    createdAt: new Date("2025-02-22").toISOString(),
    updatedAt: new Date("2025-03-04").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "LangChain Output Parsers",
    language: "python",
    code: `from langchain.output_parsers import (
    PydanticOutputParser,
    StructuredOutputParser,
    CommaSeparatedListOutputParser
)
from pydantic import BaseModel, Field

# Pydantic parser for structured data
class Person(BaseModel):
    name: str = Field(description="person's name")
    age: int = Field(description="person's age")
    occupation: str = Field(description="person's job")

parser = PydanticOutputParser(pydantic_object=Person)

prompt = PromptTemplate(
    template="Extract person info.\\n{format_instructions}\\n{query}",
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()}
)

# Comma-separated list parser
list_parser = CommaSeparatedListOutputParser()
list_prompt = PromptTemplate(
    template="List 5 {topic}.\\n{format_instructions}",
    input_variables=["topic"],
    partial_variables={"format_instructions": list_parser.get_format_instructions()}
)

# Use parser
output = llm(prompt.format(query="John is 30 and works as engineer"))
parsed = parser.parse(output)
print(parsed.name, parsed.age, parsed.occupation)`,
    description: "Parse LLM outputs into structured data formats",
    tags: ["langchain", "parsing", "structured-output"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 189,
    createdAt: new Date("2025-02-23").toISOString(),
    updatedAt: new Date("2025-03-05").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "LangChain Streaming Responses",
    language: "python",
    code: `from langchain.llms import OpenAI
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# Streaming LLM
streaming_llm = OpenAI(
    temperature=0.7,
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()]
)

# Simple streaming
for chunk in streaming_llm.stream("Write a poem about data engineering"):
    print(chunk, end="", flush=True)

# Streaming in chain
prompt = PromptTemplate.from_template("Tell me about {topic}")
chain = LLMChain(llm=streaming_llm, prompt=prompt)

# Custom callback for capturing chunks
chunks = []
class ChunkCollector(StreamingStdOutCallbackHandler):
    def on_llm_new_token(self, token: str, **kwargs):
        chunks.append(token)
        print(token, end="", flush=True)

chain.run(topic="machine learning", callbacks=[ChunkCollector()])`,
    description: "Stream LLM responses for better user experience",
    tags: ["langchain", "streaming", "callbacks"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 167,
    createdAt: new Date("2025-02-24").toISOString(),
    updatedAt: new Date("2025-03-06").toISOString(),
    source: ""
  },

  // ===== OPENAI / GENAI SNIPPETS (8) =====
  {
    id: uuidv4(),
    title: "OpenAI GPT-4 API with Function Calling",
    language: "python",
    code: `import openai
import json

openai.api_key = "your-api-key"

# Define functions
functions = [
    {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City name"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
        }
    }
]

# Call GPT-4 with functions
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "What's the weather in San Francisco?"}],
    functions=functions,
    function_call="auto"
)

# Check if function was called
if response.choices[0].message.get("function_call"):
    function_args = json.loads(response.choices[0].message.function_call.arguments)
    print(f"Function: {response.choices[0].message.function_call.name}")
    print(f"Args: {function_args}")`,
    description: "Use OpenAI GPT-4 with function calling for structured outputs",
    tags: ["openai", "gpt4", "function-calling"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 456,
    createdAt: new Date("2025-02-25").toISOString(),
    updatedAt: new Date("2025-03-07").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "OpenAI Embeddings for Semantic Search",
    language: "python",
    code: `import openai
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

openai.api_key = "your-api-key"

def get_embedding(text, model="text-embedding-ada-002"):
    response = openai.Embedding.create(
        input=text,
        model=model
    )
    return response['data'][0]['embedding']

# Create embeddings for documents
documents = [
    "PySpark is a distributed computing framework",
    "SQL is used for database queries",
    "Python is a programming language"
]

doc_embeddings = [get_embedding(doc) for doc in documents]

# Search query
query = "big data processing"
query_embedding = get_embedding(query)

# Calculate similarities
similarities = cosine_similarity([query_embedding], doc_embeddings)[0]

# Get most similar documents
ranked = sorted(zip(documents, similarities), key=lambda x: x[1], reverse=True)
for doc, score in ranked:
    print(f"{score:.3f}: {doc}")`,
    description: "Generate and use OpenAI embeddings for semantic search",
    tags: ["openai", "embeddings", "semantic-search"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 378,
    createdAt: new Date("2025-02-26").toISOString(),
    updatedAt: new Date("2025-03-08").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "OpenAI Chat with System Prompts",
    language: "python",
    code: `import openai

openai.api_key = "your-api-key"

# System prompt defines assistant behavior
messages = [
    {
        "role": "system", 
        "content": "You are a senior data engineer with 10 years of experience. Provide concise, technical answers."
    },
    {
        "role": "user",
        "content": "How do I optimize a slow PySpark job?"
    }
]

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=messages,
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)

# Multi-turn conversation
messages.append({
    "role": "assistant",
    "content": response.choices[0].message.content
})

messages.append({
    "role": "user",
    "content": "Can you show me a code example?"
})

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=messages
)`,
    description: "Use OpenAI Chat API with system prompts and conversation history",
    tags: ["openai", "chat", "system-prompt"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 334,
    createdAt: new Date("2025-02-27").toISOString(),
    updatedAt: new Date("2025-03-09").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "OpenAI Streaming Responses",
    language: "python",
    code: `import openai

openai.api_key = "your-api-key"

# Enable streaming
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Write a data pipeline tutorial"}],
    stream=True
)

# Process stream
full_response = ""
for chunk in response:
    if chunk.choices[0].delta.get("content"):
        content = chunk.choices[0].delta.content
        full_response += content
        print(content, end="", flush=True)

print("\\n\\nFull response length:", len(full_response))

# Streaming with error handling
try:
    for chunk in response:
        if chunk.choices[0].finish_reason == "stop":
            break
        content = chunk.choices[0].delta.get("content", "")
        print(content, end="", flush=True)
except Exception as e:
    print(f"Error during streaming: {e}")`,
    description: "Stream OpenAI responses for real-time user experience",
    tags: ["openai", "streaming", "real-time"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 289,
    createdAt: new Date("2025-02-28").toISOString(),
    updatedAt: new Date("2025-03-10").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Prompt Engineering Best Practices",
    language: "python",
    code: `import openai

# ❌ BAD: Vague prompt
bad_prompt = "Tell me about data"

# ✅ GOOD: Specific, clear prompt
good_prompt = """
Explain the difference between batch and stream processing in data engineering.
Include:
1. Key characteristics of each
2. Use cases
3. One example tool for each

Keep response under 200 words.
"""

# Few-shot prompting
few_shot_prompt = """
Convert natural language to SQL.

Examples:
Q: Show all customers
A: SELECT * FROM customers;

Q: Count orders by customer
A: SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id;

Q: Find customers who spent over $1000
A: """

# Chain of thought prompting
cot_prompt = """
Problem: A data pipeline processes 100GB of data per hour. It takes 2 hours to complete.
If we double the cluster size, how long will it take?

Let's think step by step:
1. """

# Role-based prompting
role_prompt = """
You are a senior data architect reviewing a system design.
[System design here]
Provide a detailed critique focusing on scalability and reliability.
"""`,
    description: "Effective prompt engineering techniques for better LLM outputs",
    tags: ["prompt-engineering", "best-practices", "llm"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 412,
    createdAt: new Date("2025-03-01").toISOString(),
    updatedAt: new Date("2025-03-11").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "OpenAI Token Counting and Cost Estimation",
    language: "python",
    code: `import tiktoken
import openai

def count_tokens(text, model="gpt-4"):
    """Count tokens in text for a specific model"""
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))

def estimate_cost(prompt, max_tokens=500, model="gpt-4"):
    """Estimate API cost for a request"""
    # GPT-4 pricing (as of 2024)
    prices = {
        "gpt-4": {"input": 0.03, "output": 0.06},  # per 1k tokens
        "gpt-3.5-turbo": {"input": 0.0015, "output": 0.002}
    }
    
    input_tokens = count_tokens(prompt, model)
    output_tokens = max_tokens
    
    input_cost = (input_tokens / 1000) * prices[model]["input"]
    output_cost = (output_tokens / 1000) * prices[model]["output"]
    
    return {
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "total_cost": input_cost + output_cost
    }

# Example
prompt = "Explain PySpark in detail"
cost = estimate_cost(prompt, max_tokens=1000)
print(f"Estimated cost: \${cost['total_cost']:.4f}")`,
    description: "Count tokens and estimate OpenAI API costs before making requests",
    tags: ["openai", "tokens", "cost-estimation"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 256,
    createdAt: new Date("2025-03-02").toISOString(),
    updatedAt: new Date("2025-03-12").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "OpenAI Retry Logic with Exponential Backoff",
    language: "python",
    code: `import openai
import time
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10)
)
def call_openai_with_retry(messages, model="gpt-4"):
    """Call OpenAI API with automatic retry on failures"""
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=messages
        )
        return response.choices[0].message.content
    except openai.error.RateLimitError:
        print("Rate limit hit, retrying...")
        raise
    except openai.error.APIError as e:
        print(f"API error: {e}, retrying...")
        raise

# Manual retry with exponential backoff
def call_with_backoff(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            return openai.ChatCompletion.create(
                model="gpt-4",
                messages=messages
            )
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            wait_time = 2 ** attempt
            print(f"Retry {attempt + 1} after {wait_time}s")
            time.sleep(wait_time)`,
    description: "Implement robust retry logic for OpenAI API calls",
    tags: ["openai", "retry", "error-handling"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 223,
    createdAt: new Date("2025-03-03").toISOString(),
    updatedAt: new Date("2025-03-13").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "OpenAI JSON Mode for Structured Output",
    language: "python",
    code: `import openai
import json

openai.api_key = "your-api-key"

# Force JSON output
response = openai.ChatCompletion.create(
    model="gpt-4-1106-preview",  # Must use models that support JSON mode
    response_format={"type": "json_object"},
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant that outputs JSON."
        },
        {
            "role": "user",
            "content": """Extract person information and return as JSON with keys: 
            name, age, occupation, skills (array).
            
            Text: John Smith is a 30-year-old data engineer. He knows Python, SQL, and PySpark."""
        }
    ]
)

# Parse JSON response
result = json.loads(response.choices[0].message.content)
print(json.dumps(result, indent=2))

# Example output:
# {
#   "name": "John Smith",
#   "age": 30,
#   "occupation": "data engineer",
#   "skills": ["Python", "SQL", "PySpark"]
# }`,
    description: "Use OpenAI JSON mode for guaranteed structured outputs",
    tags: ["openai", "json", "structured-output"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 301,
    createdAt: new Date("2025-03-04").toISOString(),
    updatedAt: new Date("2025-03-14").toISOString(),
    source: ""
  },

  // ===== VECTOR DATABASE SNIPPETS (6) =====
  {
    id: uuidv4(),
    title: "Pinecone Vector Database Setup",
    language: "python",
    code: `import pinecone
import openai

# Initialize Pinecone
pinecone.init(
    api_key="your-pinecone-key",
    environment="us-west1-gcp"
)

# Create index
index_name = "document-embeddings"
if index_name not in pinecone.list_indexes():
    pinecone.create_index(
        name=index_name,
        dimension=1536,  # OpenAI embedding dimension
        metric="cosine"
    )

# Connect to index
index = pinecone.Index(index_name)

# Upsert vectors
vectors = [
    ("id1", [0.1] * 1536, {"text": "Sample document 1"}),
    ("id2", [0.2] * 1536, {"text": "Sample document 2"})
]
index.upsert(vectors=vectors)

# Query
query_vector = [0.15] * 1536
results = index.query(
    vector=query_vector,
    top_k=5,
    include_metadata=True
)

for match in results.matches:
    print(f"Score: {match.score}, Text: {match.metadata['text']}")`,
    description: "Set up and use Pinecone vector database for embeddings",
    tags: ["pinecone", "vector-db", "embeddings"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 367,
    createdAt: new Date("2025-03-05").toISOString(),
    updatedAt: new Date("2025-03-15").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "ChromaDB Local Vector Store",
    language: "python",
    code: `import chromadb
from chromadb.config import Settings

# Initialize ChromaDB (persistent)
client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./chroma_db"
))

# Create collection
collection = client.create_collection(
    name="documents",
    metadata={"description": "Document embeddings"}
)

# Add documents
collection.add(
    documents=["This is document 1", "This is document 2"],
    metadatas=[{"source": "file1.txt"}, {"source": "file2.txt"}],
    ids=["id1", "id2"]
)

# Query
results = collection.query(
    query_texts=["document about data"],
    n_results=2
)

print(results)

# Update documents
collection.update(
    ids=["id1"],
    documents=["Updated document 1"]
)

# Delete
collection.delete(ids=["id2"])`,
    description: "Use ChromaDB for local vector storage with persistence",
    tags: ["chromadb", "vector-db", "local"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 289,
    createdAt: new Date("2025-03-06").toISOString(),
    updatedAt: new Date("2025-03-16").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "FAISS Vector Search",
    language: "python",
    code: `import faiss
import numpy as np

# Create sample embeddings
dimension = 128
n_vectors = 1000
vectors = np.random.random((n_vectors, dimension)).astype('float32')

# Create FAISS index (L2 distance)
index = faiss.IndexFlatL2(dimension)
index.add(vectors)

print(f"Index size: {index.ntotal}")

# Search
query = np.random.random((1, dimension)).astype('float32')
k = 5  # top 5 results
distances, indices = index.search(query, k)

print("Top 5 similar vectors:")
for i, (dist, idx) in enumerate(zip(distances[0], indices[0])):
    print(f"{i+1}. Index: {idx}, Distance: {dist:.4f}")

# More efficient index (IVF)
nlist = 100  # number of clusters
quantizer = faiss.IndexFlatL2(dimension)
index_ivf = faiss.IndexIVFFlat(quantizer, dimension, nlist)
index_ivf.train(vectors)
index_ivf.add(vectors)

# Set search parameters
index_ivf.nprobe = 10
distances, indices = index_ivf.search(query, k)`,
    description: "Fast similarity search with FAISS vector index",
    tags: ["faiss", "vector-search", "similarity"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 245,
    createdAt: new Date("2025-03-07").toISOString(),
    updatedAt: new Date("2025-03-17").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Weaviate Vector Database",
    language: "python",
    code: `import weaviate

# Connect to Weaviate
client = weaviate.Client("http://localhost:8080")

# Create schema
schema = {
    "class": "Document",
    "vectorizer": "text2vec-openai",
    "properties": [
        {"name": "content", "dataType": ["text"]},
        {"name": "source", "dataType": ["string"]},
        {"name": "timestamp", "dataType": ["date"]}
    ]
}
client.schema.create_class(schema)

# Add objects
client.data_object.create(
    class_name="Document",
    data_object={
        "content": "PySpark is great for big data",
        "source": "blog.txt"
    }
)

# Semantic search
result = client.query.get(
    "Document",
    ["content", "source"]
).with_near_text({
    "concepts": ["big data processing"]
}).with_limit(5).do()

# Hybrid search (keyword + vector)
result = client.query.get(
    "Document",
    ["content", "source"]
).with_hybrid(
    query="PySpark",
    alpha=0.5  # 0=keyword only, 1=vector only
).do()`,
    description: "Use Weaviate vector database with semantic search",
    tags: ["weaviate", "vector-db", "semantic-search"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 212,
    createdAt: new Date("2025-03-08").toISOString(),
    updatedAt: new Date("2025-03-18").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Qdrant Vector Search Engine",
    language: "python",
    code: `from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

# Initialize Qdrant
client = QdrantClient(host="localhost", port=6333)

# Create collection
client.create_collection(
    collection_name="documents",
    vectors_config=VectorParams(size=384, distance=Distance.COSINE)
)

# Insert vectors
points = [
    PointStruct(
        id=1,
        vector=[0.1] * 384,
        payload={"text": "Document 1", "category": "tech"}
    ),
    PointStruct(
        id=2,
        vector=[0.2] * 384,
        payload={"text": "Document 2", "category": "science"}
    )
]
client.upsert(collection_name="documents", points=points)

# Search
search_result = client.search(
    collection_name="documents",
    query_vector=[0.15] * 384,
    limit=5,
    query_filter={
        "must": [{"key": "category", "match": {"value": "tech"}}]
    }
)

for point in search_result:
    print(f"Score: {point.score}, Text: {point.payload['text']}")`,
    description: "Use Qdrant for fast vector similarity search",
    tags: ["qdrant", "vector-search", "similarity"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 198,
    createdAt: new Date("2025-03-09").toISOString(),
    updatedAt: new Date("2025-03-19").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Vector Similarity Metrics Comparison",
    language: "python",
    code: `import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from scipy.spatial.distance import cosine, euclidean

# Sample vectors
vec1 = np.array([1, 2, 3, 4, 5])
vec2 = np.array([2, 3, 4, 5, 6])

# Cosine Similarity (0 to 1, higher = more similar)
cos_sim = cosine_similarity([vec1], [vec2])[0][0]
print(f"Cosine Similarity: {cos_sim:.4f}")

# Euclidean Distance (lower = more similar)
eucl_dist = euclidean_distances([vec1], [vec2])[0][0]
print(f"Euclidean Distance: {eucl_dist:.4f}")

# Dot Product (unnormalized similarity)
dot_prod = np.dot(vec1, vec2)
print(f"Dot Product: {dot_prod:.4f}")

# Manhattan Distance
manhattan = np.sum(np.abs(vec1 - vec2))
print(f"Manhattan Distance: {manhattan:.4f}")

# When to use each:
# - Cosine: Direction matters (text, embeddings)
# - Euclidean: Magnitude matters (physical distance)
# - Dot Product: Fast, but not normalized
# - Manhattan: Robust to outliers`,
    description: "Compare different vector similarity metrics for search",
    tags: ["similarity", "metrics", "vector-search"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2025-03-10").toISOString(),
    updatedAt: new Date("2025-03-20").toISOString(),
    source: ""
  },

  // ===== DATA QUALITY SNIPPETS (6) =====
  {
    id: uuidv4(),
    title: "Great Expectations Data Validation",
    language: "python",
    code: `import great_expectations as gx
import pandas as pd

# Create data context
context = gx.get_context()

# Load data
df = pd.read_csv("data.csv")

# Create validator
validator = context.sources.pandas_default.read_dataframe(df)

# Add expectations
validator.expect_table_row_count_to_be_between(min_value=100, max_value=10000)
validator.expect_column_values_to_not_be_null(column="customer_id")
validator.expect_column_values_to_be_unique(column="order_id")
validator.expect_column_values_to_be_in_set(
    column="status", 
    value_set=["pending", "completed", "cancelled"]
)
validator.expect_column_mean_to_be_between(
    column="amount",
    min_value=0,
    max_value=1000
)

# Validate
results = validator.validate()
print(f"Validation success: {results.success}")
print(f"Failed expectations: {len([r for r in results.results if not r.success])}")`,
    description: "Validate data quality with Great Expectations framework",
    tags: ["great-expectations", "data-quality", "validation"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 334,
    createdAt: new Date("2025-03-11").toISOString(),
    updatedAt: new Date("2025-03-21").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "pandas Data Quality Checks",
    language: "python",
    code: `import pandas as pd
import numpy as np

def data_quality_report(df):
    """Generate comprehensive data quality report"""
    report = {}
    
    # Basic info
    report['total_rows'] = len(df)
    report['total_columns'] = len(df.columns)
    report['memory_usage_mb'] = df.memory_usage(deep=True).sum() / 1024**2
    
    # Missing values
    report['missing_values'] = df.isnull().sum().to_dict()
    report['missing_percentage'] = (df.isnull().sum() / len(df) * 100).to_dict()
    
    # Duplicates
    report['duplicate_rows'] = df.duplicated().sum()
    
    # Data types
    report['dtypes'] = df.dtypes.astype(str).to_dict()
    
    # Numeric columns stats
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    report['numeric_stats'] = df[numeric_cols].describe().to_dict()
    
    # Cardinality
    report['unique_counts'] = df.nunique().to_dict()
    
    # Outliers (IQR method)
    outliers = {}
    for col in numeric_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        outliers[col] = ((df[col] < (Q1 - 1.5 * IQR)) | (df[col] > (Q3 + 1.5 * IQR))).sum()
    report['outliers'] = outliers
    
    return report

# Usage
df = pd.read_csv("data.csv")
quality_report = data_quality_report(df)
print(quality_report)`,
    description: "Generate comprehensive data quality report with pandas",
    tags: ["pandas", "data-quality", "validation"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 298,
    createdAt: new Date("2025-03-12").toISOString(),
    updatedAt: new Date("2025-03-22").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Data Profiling with pandas-profiling",
    language: "python",
    code: `from ydata_profiling import ProfileReport
import pandas as pd

# Load data
df = pd.read_csv("data.csv")

# Generate full profile report
profile = ProfileReport(
    df,
    title="Data Quality Report",
    explorative=True,
    dark_mode=False,
    # Configuration options
    correlations={
        "auto": {"calculate": True},
        "pearson": {"calculate": True},
        "spearman": {"calculate": True}
    },
    missing_diagrams={
        "bar": True,
        "matrix": True,
        "heatmap": True
    },
    interactions={"continuous": True},
    vars={
        "num": {"low_categorical_threshold": 5}
    }
)

# Save report
profile.to_file("data_profile_report.html")

# Get specific insights
print(f"Dataset shape: {profile.description_set['table']['n']}")
print(f"Missing cells: {profile.description_set['table']['n_cells_missing']}")
print(f"Duplicate rows: {profile.description_set['table']['n_duplicates']}")`,
    description: "Generate automated data profiling reports",
    tags: ["profiling", "eda", "data-quality"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 267,
    createdAt: new Date("2025-03-13").toISOString(),
    updatedAt: new Date("2025-03-23").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Schema Validation with Pandera",
    language: "python",
    code: `import pandas as pd
import pandera as pa
from pandera import Column, Check, DataFrameSchema

# Define schema
schema = DataFrameSchema({
    "customer_id": Column(int, Check.greater_than(0), nullable=False),
    "email": Column(str, Check.str_matches(r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$')),
    "age": Column(int, Check.in_range(18, 120)),
    "purchase_amount": Column(float, Check.greater_than_or_equal_to(0)),
    "status": Column(str, Check.isin(["active", "inactive", "suspended"])),
    "created_at": Column(pa.DateTime),
}, strict=True)  # Strict mode rejects extra columns

# Validate dataframe
try:
    df = pd.read_csv("customers.csv")
    validated_df = schema.validate(df)
    print("✓ Data validation passed")
except pa.errors.SchemaError as e:
    print(f"✗ Validation failed: {e}")

# Validate on read
@pa.check_input(schema)
def process_customers(df: pd.DataFrame):
    # Process validated data
    return df[df['status'] == 'active']

# Lazy validation (collect all errors)
try:
    schema.validate(df, lazy=True)
except pa.errors.SchemaErrors as err:
    print("Validation errors:")
    print(err.failure_cases)`,
    description: "Enforce data schemas and validate DataFrames with Pandera",
    tags: ["pandera", "schema", "validation"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 234,
    createdAt: new Date("2025-03-14").toISOString(),
    updatedAt: new Date("2025-03-24").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Data Quality Monitoring Dashboard",
    language: "python",
    code: `import pandas as pd
from datetime import datetime
import json

class DataQualityMonitor:
    def __init__(self):
        self.metrics = []
    
    def check_data_quality(self, df, dataset_name):
        """Run all quality checks"""
        timestamp = datetime.now()
        
        metrics = {
            "timestamp": timestamp.isoformat(),
            "dataset": dataset_name,
            "row_count": len(df),
            "column_count": len(df.columns),
            "completeness": (1 - df.isnull().sum().sum() / df.size) * 100,
            "duplicates": df.duplicated().sum(),
            "duplicate_pct": (df.duplicated().sum() / len(df)) * 100
        }
        
        # Check for data drift (if baseline exists)
        if len(self.metrics) > 0:
            baseline = self.metrics[-1]
            metrics['row_count_change'] = len(df) - baseline['row_count']
            metrics['completeness_change'] = metrics['completeness'] - baseline['completeness']
        
        self.metrics.append(metrics)
        return metrics
    
    def get_summary(self):
        """Get summary of all runs"""
        df = pd.DataFrame(self.metrics)
        return df.describe()
    
    def export_metrics(self, filepath="quality_metrics.json"):
        """Export metrics"""
        with open(filepath, 'w') as f:
            json.dump(self.metrics, f, indent=2)

# Usage
monitor = DataQualityMonitor()
df = pd.read_csv("data.csv")
report = monitor.check_data_quality(df, "sales_data")
print(json.dumps(report, indent=2))`,
    description: "Monitor data quality metrics over time",
    tags: ["monitoring", "data-quality", "metrics"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 201,
    createdAt: new Date("2025-03-15").toISOString(),
    updatedAt: new Date("2025-03-25").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Detect Data Anomalies",
    language: "python",
    code: `import pandas as pd
import numpy as np
from scipy import stats

def detect_anomalies(df, column, method='zscore', threshold=3):
    """Detect anomalies in a numeric column"""
    
    if method == 'zscore':
        # Z-score method
        z_scores = np.abs(stats.zscore(df[column].dropna()))
        anomalies = z_scores > threshold
        
    elif method == 'iqr':
        # IQR method
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        anomalies = (df[column] < lower) | (df[column] > upper)
        
    elif method == 'isolation_forest':
        # Isolation Forest (requires sklearn)
        from sklearn.ensemble import IsolationForest
        clf = IsolationForest(contamination=0.1, random_state=42)
        anomalies = clf.fit_predict(df[[column]]) == -1
    
    return df[anomalies]

# Usage
df = pd.read_csv("data.csv")

# Detect outliers in amount column
outliers_zscore = detect_anomalies(df, 'amount', method='zscore')
outliers_iqr = detect_anomalies(df, 'amount', method='iqr')

print(f"Z-score outliers: {len(outliers_zscore)}")
print(f"IQR outliers: {len(outliers_iqr)}")

# Visualize
import matplotlib.pyplot as plt
plt.boxplot(df['amount'])
plt.title("Amount Distribution with Outliers")
plt.show()`,
    description: "Detect anomalies and outliers in data using multiple methods",
    tags: ["anomaly-detection", "outliers", "data-quality"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 223,
    createdAt: new Date("2025-03-16").toISOString(),
    updatedAt: new Date("2025-03-26").toISOString(),
    source: ""
  },

  // ===== FEATURE ENGINEERING SNIPPETS (5) =====
  {
    id: uuidv4(),
    title: "sklearn Feature Engineering Pipeline",
    language: "python",
    code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer

# Define numeric and categorical features
numeric_features = ['age', 'income', 'credit_score']
categorical_features = ['occupation', 'education', 'city']

# Numeric transformer
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Categorical transformer
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

# Combine transformers
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Full pipeline with model
from sklearn.ensemble import RandomForestClassifier
full_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier())
])

# Fit and transform
full_pipeline.fit(X_train, y_train)
predictions = full_pipeline.predict(X_test)`,
    description: "Create feature engineering pipeline with sklearn transformers",
    tags: ["sklearn", "pipeline", "feature-engineering"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 289,
    createdAt: new Date("2025-03-22").toISOString(),
    updatedAt: new Date("2025-04-01").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Target Encoding for Categorical Features",
    language: "python",
    code: `import pandas as pd
from sklearn.model_selection import KFold

def target_encode(train, test, categorical_col, target_col, n_folds=5):
    """
    Target encoding with cross-validation to prevent overfitting
    """
    # Initialize
    train_encoded = pd.Series(index=train.index, dtype=float)
    test_encoded = pd.Series(index=test.index, dtype=float)
    
    # Global mean for smoothing
    global_mean = train[target_col].mean()
    
    # K-fold encoding for training set
    kf = KFold(n_splits=n_folds, shuffle=True, random_state=42)
    
    for train_idx, val_idx in kf.split(train):
        # Calculate means on train fold
        means = train.iloc[train_idx].groupby(categorical_col)[target_col].mean()
        
        # Encode validation fold
        train_encoded.iloc[val_idx] = train.iloc[val_idx][categorical_col].map(means)
        
        # Fill unknown categories with global mean
        train_encoded.iloc[val_idx].fillna(global_mean, inplace=True)
    
    # Encode test set using full training set
    means = train.groupby(categorical_col)[target_col].mean()
    test_encoded = test[categorical_col].map(means)
    test_encoded.fillna(global_mean, inplace=True)
    
    return train_encoded, test_encoded

# Usage
train_encoded, test_encoded = target_encode(
    train_df, test_df, 
    categorical_col='city',
    target_col='conversion'
)

train_df['city_encoded'] = train_encoded
test_df['city_encoded'] = test_encoded`,
    description: "Implement target encoding with cross-validation for high-cardinality features",
    tags: ["feature-engineering", "encoding", "categorical"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 256,
    createdAt: new Date("2025-03-23").toISOString(),
    updatedAt: new Date("2025-04-02").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Time-based Feature Engineering",
    language: "python",
    code: `import pandas as pd
import numpy as np

def create_time_features(df, date_column):
    """Extract comprehensive time-based features"""
    df = df.copy()
    df[date_column] = pd.to_datetime(df[date_column])
    
    # Basic time components
    df['year'] = df[date_column].dt.year
    df['month'] = df[date_column].dt.month
    df['day'] = df[date_column].dt.day
    df['day_of_week'] = df[date_column].dt.dayofweek
    df['day_of_year'] = df[date_column].dt.dayofyear
    df['week_of_year'] = df[date_column].dt.isocalendar().week
    df['quarter'] = df[date_column].dt.quarter
    
    # Binary indicators
    df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)
    df['is_month_start'] = df[date_column].dt.is_month_start.astype(int)
    df['is_month_end'] = df[date_column].dt.is_month_end.astype(int)
    df['is_quarter_start'] = df[date_column].dt.is_quarter_start.astype(int)
    df['is_quarter_end'] = df[date_column].dt.is_quarter_end.astype(int)
    
    # Cyclical features (important for ML!)
    df['day_of_week_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
    df['day_of_week_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)
    df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
    df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)
    
    # Time since epoch (for trend modeling)
    df['days_since_epoch'] = (df[date_column] - pd.Timestamp('1970-01-01')).dt.days
    
    return df

# Usage
df = create_time_features(df, 'transaction_date')`,
    description: "Extract comprehensive time-based features including cyclical encodings",
    tags: ["feature-engineering", "time-series", "datetime"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 334,
    createdAt: new Date("2025-03-24").toISOString(),
    updatedAt: new Date("2025-04-03").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Aggregate Features from Related Tables",
    language: "python",
    code: `import pandas as pd

def create_aggregate_features(main_df, related_df, group_key):
    """
    Create aggregate features from a related table
    Example: Customer features from their orders
    """
    # Basic aggregations
    agg_features = related_df.groupby(group_key).agg({
        'order_id': 'count',  # Number of orders
        'amount': ['sum', 'mean', 'median', 'std', 'min', 'max'],
        'quantity': ['sum', 'mean'],
        'order_date': ['min', 'max']  # First and last order dates
    })
    
    # Flatten column names
    agg_features.columns = ['_'.join(col).strip() for col in agg_features.columns]
    agg_features = agg_features.reset_index()
    
    # Time-based features
    agg_features['days_since_first_order'] = (
        pd.Timestamp('now') - agg_features['order_date_min']
    ).dt.days
    agg_features['days_since_last_order'] = (
        pd.Timestamp('now') - agg_features['order_date_max']
    ).dt.days
    agg_features['customer_lifetime_days'] = (
        agg_features['order_date_max'] - agg_features['order_date_min']
    ).dt.days
    
    # Derived features
    agg_features['avg_order_frequency'] = (
        agg_features['customer_lifetime_days'] / agg_features['order_id_count']
    )
    agg_features['amount_per_order'] = (
        agg_features['amount_sum'] / agg_features['order_id_count']
    )
    
    # Merge back to main dataframe
    main_df = main_df.merge(agg_features, on=group_key, how='left')
    
    return main_df

# Usage
customer_df = create_aggregate_features(
    main_df=customers,
    related_df=orders,
    group_key='customer_id'
)`,
    description: "Create aggregate features from related tables for entity-level predictions",
    tags: ["feature-engineering", "aggregation", "joins"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 278,
    createdAt: new Date("2025-03-25").toISOString(),
    updatedAt: new Date("2025-04-04").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Feature Selection Methods",
    language: "python",
    code: `from sklearn.feature_selection import (
    SelectKBest, f_classif, mutual_info_classif,
    RFE, SelectFromModel
)
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

# Method 1: Statistical tests (fast)
selector_stat = SelectKBest(score_func=f_classif, k=10)
X_selected_stat = selector_stat.fit_transform(X, y)
selected_features_stat = X.columns[selector_stat.get_support()].tolist()

# Method 2: Mutual Information (handles non-linear)
selector_mi = SelectKBest(score_func=mutual_info_classif, k=10)
X_selected_mi = selector_mi.fit_transform(X, y)

# Method 3: Recursive Feature Elimination (RFE)
model = RandomForestClassifier(n_estimators=100, random_state=42)
rfe = RFE(estimator=model, n_features_to_select=10)
X_selected_rfe = rfe.fit_transform(X, y)
selected_features_rfe = X.columns[rfe.support_].tolist()

# Method 4: Model-based selection (tree importance)
selector_model = SelectFromModel(
    estimator=RandomForestClassifier(n_estimators=100),
    threshold='median'  # Select features above median importance
)
X_selected_model = selector_model.fit_transform(X, y)
selected_features_model = X.columns[selector_model.get_support()].tolist()

# Compare feature importance
feature_scores = pd.DataFrame({
    'feature': X.columns,
    'f_score': selector_stat.scores_,
    'mi_score': selector_mi.scores_
}).sort_values('f_score', ascending=False)

print(feature_scores.head(10))`,
    description: "Compare multiple feature selection methods (statistical, MI, RFE, model-based)",
    tags: ["feature-selection", "sklearn", "dimensionality-reduction"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 267,
    createdAt: new Date("2025-03-26").toISOString(),
    updatedAt: new Date("2025-04-05").toISOString(),
    source: ""
  },

  // ===== MLOPS SNIPPETS (5) =====
  {
    id: uuidv4(),
    title: "MLflow Experiment Tracking",
    language: "python",
    code: `import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Set experiment
mlflow.set_experiment("customer-churn-prediction")

# Start run
with mlflow.start_run(run_name="random-forest-v1"):
    # Log parameters
    n_estimators = 100
    max_depth = 10
    mlflow.log_param("n_estimators", n_estimators)
    mlflow.log_param("max_depth", max_depth)
    
    # Train model
    model = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth)
    model.fit(X_train, y_train)
    
    # Log metrics
    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)
    mlflow.log_metric("train_accuracy", train_score)
    mlflow.log_metric("test_accuracy", test_score)
    
    # Log model
    mlflow.sklearn.log_model(model, "model")
    
    # Log artifacts
    feature_importance = pd.DataFrame({
        'feature': X_train.columns,
        'importance': model.feature_importances_
    })
    feature_importance.to_csv("feature_importance.csv")
    mlflow.log_artifact("feature_importance.csv")

print(f"Run ID: {mlflow.active_run().info.run_id}")`,
    description: "Track ML experiments with MLflow for reproducibility",
    tags: ["mlflow", "mlops", "experiment-tracking"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 389,
    createdAt: new Date("2025-03-17").toISOString(),
    updatedAt: new Date("2025-03-27").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Model Deployment with FastAPI",
    language: "python",
    code: `from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

# Load model
model = joblib.load("model.joblib")

app = FastAPI(title="ML Model API")

class PredictionInput(BaseModel):
    features: list[float]

class PredictionOutput(BaseModel):
    prediction: int
    probability: float

@app.post("/predict", response_model=PredictionOutput)
async def predict(input_data: PredictionInput):
    """Make prediction"""
    # Reshape input
    features = np.array(input_data.features).reshape(1, -1)
    
    # Predict
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][prediction]
    
    return PredictionOutput(
        prediction=int(prediction),
        probability=float(probability)
    )

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Run: uvicorn main:app --reload
# Test: curl -X POST "http://localhost:8000/predict" \\
#   -H "Content-Type: application/json" \\
#   -d '{"features": [1.0, 2.0, 3.0]}'`,
    description: "Deploy ML model as REST API with FastAPI",
    tags: ["fastapi", "deployment", "mlops"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 412,
    createdAt: new Date("2025-03-18").toISOString(),
    updatedAt: new Date("2025-03-28").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Model Versioning and Registry",
    language: "python",
    code: `import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()

# Register model
model_name = "customer-churn-model"
run_id = "abc123"  # From training run

model_uri = f"runs:/{run_id}/model"
mlflow.register_model(model_uri, model_name)

# Transition model to staging
client.transition_model_version_stage(
    name=model_name,
    version=1,
    stage="Staging"
)

# Add description
client.update_model_version(
    name=model_name,
    version=1,
    description="Random Forest model trained on 2024 data"
)

# Promote to production
client.transition_model_version_stage(
    name=model_name,
    version=1,
    stage="Production",
    archive_existing_versions=True  # Archive old production versions
)

# Load production model
production_model = mlflow.pyfunc.load_model(
    model_uri=f"models:/{model_name}/Production"
)

# Make predictions
predictions = production_model.predict(X_test)`,
    description: "Manage model versions and lifecycle with MLflow Model Registry",
    tags: ["mlflow", "model-registry", "versioning"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 278,
    createdAt: new Date("2025-03-19").toISOString(),
    updatedAt: new Date("2025-03-29").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Model Performance Monitoring",
    language: "python",
    code: `import pandas as pd
from datetime import datetime
from sklearn.metrics import accuracy_score, f1_score

class ModelMonitor:
    def __init__(self, model, baseline_metrics):
        self.model = model
        self.baseline = baseline_metrics
        self.predictions_log = []
    
    def log_prediction(self, features, prediction, actual=None):
        """Log a prediction for monitoring"""
        log_entry = {
            "timestamp": datetime.now(),
            "features": features,
            "prediction": prediction,
            "actual": actual
        }
        self.predictions_log.append(log_entry)
    
    def check_drift(self, recent_window=100):
        """Check for model drift"""
        if len(self.predictions_log) < recent_window:
            return {"drift_detected": False, "message": "Not enough data"}
        
        recent = self.predictions_log[-recent_window:]
        recent_df = pd.DataFrame(recent)
        
        # Calculate metrics on recent data
        if recent_df['actual'].notna().sum() > 0:
            y_true = recent_df[recent_df['actual'].notna()]['actual']
            y_pred = recent_df[recent_df['actual'].notna()]['prediction']
            
            accuracy = accuracy_score(y_true, y_pred)
            f1 = f1_score(y_true, y_pred, average='weighted')
            
            # Compare to baseline
            accuracy_drop = self.baseline['accuracy'] - accuracy
            
            drift_detected = accuracy_drop > 0.05  # 5% threshold
            
            return {
                "drift_detected": drift_detected,
                "current_accuracy": accuracy,
                "baseline_accuracy": self.baseline['accuracy'],
                "accuracy_drop": accuracy_drop
            }
        
        return {"drift_detected": False, "message": "No actuals available"}

# Usage
monitor = ModelMonitor(model, {"accuracy": 0.85})
monitor.log_prediction([1, 2, 3], prediction=1, actual=1)
drift_report = monitor.check_drift()`,
    description: "Monitor deployed model performance and detect drift",
    tags: ["monitoring", "drift-detection", "mlops"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 245,
    createdAt: new Date("2025-03-20").toISOString(),
    updatedAt: new Date("2025-03-30").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Docker Container for ML Model",
    language: "dockerfile",
    code: `# Dockerfile for ML model deployment
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model and code
COPY model.joblib .
COPY app.py .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

# requirements.txt:
# fastapi==0.104.1
# uvicorn==0.24.0
# scikit-learn==1.3.2
# joblib==1.3.2
# pydantic==2.5.0
# numpy==1.26.2

# Build: docker build -t ml-model:v1 .
# Run: docker run -p 8000:8000 ml-model:v1
# Test: curl http://localhost:8000/health`,
    description: "Containerize ML model with Docker for deployment",
    tags: ["docker", "containerization", "deployment"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 312,
    createdAt: new Date("2025-03-21").toISOString(),
    updatedAt: new Date("2025-03-31").toISOString(),
    source: ""
  },

  // ===== KAFKA SNIPPETS (2) =====
  {
    id: uuidv4(),
    title: "Kafka Producer with Error Handling",
    language: "kafka",
    code: `from kafka import KafkaProducer
import json
import logging

# Initialize producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    acks='all',  # Wait for all replicas
    retries=3,
    max_in_flight_requests_per_connection=1  # Ensure ordering
)

def send_message(topic, message):
    try:
        # Send message
        future = producer.send(topic, value=message)
        
        # Block until message is sent
        record_metadata = future.get(timeout=10)
        
        logging.info(f"Message sent to {record_metadata.topic} "
                    f"partition {record_metadata.partition} "
                    f"offset {record_metadata.offset}")
        return True
        
    except Exception as e:
        logging.error(f"Failed to send message: {e}")
        return False

# Usage
message = {"user_id": 123, "action": "purchase"}
send_message('user-events', message)

# Flush and close
producer.flush()
producer.close()`,
    description: "Kafka producer with proper error handling and acknowledgments",
    tags: ["kafka", "producer", "streaming"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 145,
    createdAt: new Date("2024-11-15").toISOString(),
    updatedAt: new Date("2024-11-20").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Kafka Consumer with Commit Strategy",
    language: "kafka",
    code: `from kafka import KafkaConsumer
import json
import logging

# Initialize consumer
consumer = KafkaConsumer(
    'user-events',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=False,  # Manual commit for reliability
    group_id='my-consumer-group',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

def process_message(message):
    """Process the message"""
    try:
        print(f"Processing: {message.value}")
        # Your processing logic here
        return True
    except Exception as e:
        logging.error(f"Processing failed: {e}")
        return False

# Consume messages
try:
    for message in consumer:
        if process_message(message):
            # Commit after successful processing
            consumer.commit()
        else:
            # Skip to next message or implement retry logic
            logging.warning("Message processing failed, skipping")
            
except KeyboardInterrupt:
    logging.info("Consumer interrupted")
finally:
    consumer.close()`,
    description: "Kafka consumer with manual offset commit for reliable processing",
    tags: ["kafka", "consumer", "streaming"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 132,
    createdAt: new Date("2024-11-16").toISOString(),
    updatedAt: new Date("2024-11-21").toISOString(),
    source: ""
  },

  // ===== AIRFLOW SNIPPETS (3) =====
  {
    id: uuidv4(),
    title: "Airflow DAG with TaskGroups",
    language: "airflow",
    code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.task_group import TaskGroup
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-team',
    'depends_on_past': False,
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=5)
}

with DAG(
    'data_pipeline_with_groups',
    default_args=default_args,
    description='Pipeline with organized task groups',
    schedule_interval='0 2 * * *',
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['data-engineering']
) as dag:

    with TaskGroup('extract') as extract_group:
        extract_api = PythonOperator(
            task_id='extract_from_api',
            python_callable=extract_api_data
        )
        extract_db = PythonOperator(
            task_id='extract_from_db',
            python_callable=extract_db_data
        )
    
    with TaskGroup('transform') as transform_group:
        clean = PythonOperator(
            task_id='clean_data',
            python_callable=clean_data
        )
        aggregate = PythonOperator(
            task_id='aggregate_data',
            python_callable=aggregate_data
        )
        clean >> aggregate
    
    load = PythonOperator(
        task_id='load_to_warehouse',
        python_callable=load_data
    )
    
    extract_group >> transform_group >> load`,
    description: "Organize complex DAGs using TaskGroups for better readability",
    tags: ["airflow", "dag", "taskgroups"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2024-11-17").toISOString(),
    updatedAt: new Date("2024-11-22").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Airflow Sensor for File Arrival",
    language: "airflow",
    code: `from airflow import DAG
from airflow.sensors.filesystem import FileSensor
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-team',
    'retries': 3,
    'retry_delay': timedelta(minutes=5)
}

with DAG(
    'file_sensor_pipeline',
    default_args=default_args,
    schedule_interval='*/15 * * * *',
    start_date=datetime(2024, 1, 1),
    catchup=False
) as dag:

    # Wait for file to arrive
    wait_for_file = FileSensor(
        task_id='wait_for_data_file',
        filepath='/data/input/file_{{ ds }}.csv',
        poke_interval=30,  # Check every 30 seconds
        timeout=600,  # Timeout after 10 minutes
        mode='poke'
    )
    
    # Process file once it arrives
    process = PythonOperator(
        task_id='process_file',
        python_callable=process_data_file,
        op_kwargs={'filepath': '/data/input/file_{{ ds }}.csv'}
    )
    
    wait_for_file >> process`,
    description: "Use FileSensor to wait for files before processing",
    tags: ["airflow", "sensor", "file-processing"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 156,
    createdAt: new Date("2024-11-18").toISOString(),
    updatedAt: new Date("2024-11-23").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Airflow XCom for Task Communication",
    language: "airflow",
    code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def extract_data(**context):
    """Extract data and push to XCom"""
    data = {'records': 1000, 'timestamp': str(datetime.now())}
    # Push to XCom
    context['ti'].xcom_push(key='extract_result', value=data)
    return data

def transform_data(**context):
    """Pull data from XCom and transform"""
    # Pull from XCom
    ti = context['ti']
    data = ti.xcom_pull(task_ids='extract', key='extract_result')
    
    print(f"Received {data['records']} records")
    
    # Transform and push
    transformed = {'processed_records': data['records'], 'status': 'success'}
    ti.xcom_push(key='transform_result', value=transformed)
    return transformed

def load_data(**context):
    """Pull transformed data and load"""
    ti = context['ti']
    data = ti.xcom_pull(task_ids='transform', key='transform_result')
    
    print(f"Loading {data['processed_records']} records")
    return 'Loaded successfully'

with DAG(
    'xcom_example',
    schedule_interval='@daily',
    start_date=datetime(2024, 1, 1),
    catchup=False
) as dag:

    extract = PythonOperator(
        task_id='extract',
        python_callable=extract_data
    )
    
    transform = PythonOperator(
        task_id='transform',
        python_callable=transform_data
    )
    
    load = PythonOperator(
        task_id='load',
        python_callable=load_data
    )
    
    extract >> transform >> load`,
    description: "Share data between Airflow tasks using XCom",
    tags: ["airflow", "xcom", "data-passing"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 167,
    createdAt: new Date("2024-11-19").toISOString(),
    updatedAt: new Date("2024-11-24").toISOString(),
    source: ""
  },

  // ===== DATABRICKS SNIPPETS (3) =====
  {
    id: uuidv4(),
    title: "Databricks Autoloader (CloudFiles)",
    language: "databricks",
    code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import current_timestamp

# Autoloader for incremental file ingestion
df = (spark.readStream
    .format("cloudFiles")
    .option("cloudFiles.format", "json")
    .option("cloudFiles.schemaLocation", "/mnt/schema/location")
    .option("cloudFiles.inferColumnTypes", "true")
    .option("cloudFiles.schemaHints", "id INT, name STRING")
    .load("/mnt/data/input/")
)

# Add metadata
df_with_metadata = df.withColumn("ingestion_time", current_timestamp())

# Write to Delta table
(df_with_metadata.writeStream
    .format("delta")
    .option("checkpointLocation", "/mnt/checkpoints/autoloader")
    .option("mergeSchema", "true")
    .trigger(availableNow=True)  # Process all available files then stop
    .table("bronze.raw_data")
)

# For continuous streaming:
# .trigger(processingTime='1 minute')`,
    description: "Use Databricks Autoloader for scalable incremental file ingestion",
    tags: ["databricks", "autoloader", "streaming"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 234,
    createdAt: new Date("2024-11-20").toISOString(),
    updatedAt: new Date("2024-11-25").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Databricks Widgets for Parameterized Notebooks",
    language: "databricks",
    code: `# Create widgets
dbutils.widgets.text("date", "2024-01-01", "Processing Date")
dbutils.widgets.dropdown("env", "dev", ["dev", "staging", "prod"], "Environment")
dbutils.widgets.multiselect("tables", "orders", ["orders", "customers", "products"])

# Get widget values
processing_date = dbutils.widgets.get("date")
environment = dbutils.widgets.get("env")
tables = dbutils.widgets.get("tables").split(",")

print(f"Processing date: {processing_date}")
print(f"Environment: {environment}")
print(f"Tables: {tables}")

# Use in queries
df = spark.sql(f"""
    SELECT * 
    FROM {environment}.orders 
    WHERE date = '{processing_date}'
""")

# Remove widgets when done
# dbutils.widgets.removeAll()

# Example notebook workflow:
# %run /Shared/common/setup
# process_data(date=processing_date, env=environment)`,
    description: "Create interactive parameterized notebooks with Databricks widgets",
    tags: ["databricks", "widgets", "parameters"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 189,
    createdAt: new Date("2024-11-21").toISOString(),
    updatedAt: new Date("2024-11-26").toISOString(),
    source: ""
  },

  {
    id: uuidv4(),
    title: "Databricks Secrets Management",
    language: "databricks",
    code: `# Create secret scope (via Databricks CLI or UI)
# databricks secrets create-scope --scope my-scope

# Store secrets (via CLI)
# databricks secrets put --scope my-scope --key db-password

# Access secrets in notebook
db_password = dbutils.secrets.get(scope="my-scope", key="db-password")
api_key = dbutils.secrets.get(scope="my-scope", key="api-key")

# Use in JDBC connection
jdbc_url = "jdbc:postgresql://hostname:5432/database"
connection_properties = {
    "user": "admin",
    "password": db_password,
    "driver": "org.postgresql.Driver"
}

df = spark.read.jdbc(
    url=jdbc_url,
    table="public.customers",
    properties=connection_properties
)

# Use in API calls
import requests

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

response = requests.get("https://api.example.com/data", headers=headers)

# List available secrets (names only, not values)
secrets = dbutils.secrets.list(scope="my-scope")
for secret in secrets:
    print(secret.key)`,
    description: "Securely manage credentials using Databricks Secrets",
    tags: ["databricks", "secrets", "security"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 201,
    createdAt: new Date("2024-11-22").toISOString(),
    updatedAt: new Date("2024-11-27").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark Schema Enforcement and Evolution",
    language: "pyspark",
    code: `from pyspark.sql.types import StructType, StructField, StringType, IntegerType, TimestampType

# Define strict schema
schema = StructType([
    StructField("id", IntegerType(), False),
    StructField("name", StringType(), False),
    StructField("email", StringType(), True),
    StructField("created_at", TimestampType(), False)
])

# Read with schema enforcement
df = spark.read.schema(schema).json("data.json")

# Schema evolution with merge
df.write.format("delta") \\
    .mode("append") \\
    .option("mergeSchema", "true") \\
    .save("/delta/table")

# Validate schema matches
expected_schema = schema
actual_schema = df.schema
if actual_schema != expected_schema:
    raise ValueError(f"Schema mismatch! Expected: {expected_schema}, Got: {actual_schema}")`,
    description: "Enforce schemas and handle schema evolution in PySpark",
    tags: ["pyspark", "schema", "data-quality"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2025-04-01").toISOString(),
    updatedAt: new Date("2025-04-10").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark Dynamic Partitioning Strategy",
    language: "pyspark",
    code: `from pyspark.sql.functions import col, year, month, dayofmonth

# Dynamic partitioning by date
df_with_parts = df.withColumn("year", year(col("date"))) \\
    .withColumn("month", month(col("date"))) \\
    .withColumn("day", dayofmonth(col("date")))

# Write with dynamic partitions
df_with_parts.write.mode("overwrite") \\
    .partitionBy("year", "month", "day") \\
    .parquet("s3://bucket/partitioned_data")

# Partition pruning for faster queries
df_filtered = spark.read.parquet("s3://bucket/partitioned_data") \\
    .filter((col("year") == 2024) & (col("month") == 3))

# Get partition counts
partition_counts = df.groupBy("year", "month").count().orderBy("year", "month")
partition_counts.show()

# Repartition before write for optimal file sizes
df.repartition(100, "customer_id").write.partitionBy("date").parquet("output")`,
    description: "Implement dynamic partitioning strategies for optimized queries",
    tags: ["pyspark", "partitioning", "performance"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 234,
    createdAt: new Date("2025-04-02").toISOString(),
    updatedAt: new Date("2025-04-11").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark Memory Management",
    language: "pyspark",
    code: `from pyspark import StorageLevel

# Check current memory usage
spark.sparkContext._jsc.sc().getExecutorMemoryStatus()

# Unpersist unused DataFrames
df.unpersist()

# Use different storage levels
df.persist(StorageLevel.MEMORY_AND_DISK)  # Spill to disk if needed
df.persist(StorageLevel.MEMORY_ONLY)      # Memory only, recompute if lost
df.persist(StorageLevel.DISK_ONLY)        # Disk only

# Repartition to reduce memory pressure
df_optimized = df.repartition(100)  # Increase partitions

# Coalesce for fewer partitions (no shuffle)
df_coalesced = df.coalesce(10)

# Monitor partition sizes
partition_sizes = df.rdd.mapPartitions(lambda x: [sum(1 for _ in x)]).collect()
print(f"Partition sizes: {partition_sizes}")

# Clear checkpoints
spark.sparkContext.setCheckpointDir("hdfs://tmp/checkpoints")
df.checkpoint()`,
    description: "Manage memory and optimize resource usage in PySpark",
    tags: ["pyspark", "memory", "performance"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 189,
    createdAt: new Date("2025-04-03").toISOString(),
    updatedAt: new Date("2025-04-12").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark Complex Nested JSON Parsing",
    language: "pyspark",
    code: `from pyspark.sql.functions import from_json, col, explode, get_json_object
from pyspark.sql.types import StructType, StructField, ArrayType, StringType, IntegerType

# Define nested schema
nested_schema = StructType([
    StructField("user", StructType([
        StructField("id", IntegerType()),
        StructField("name", StringType())
    ])),
    StructField("orders", ArrayType(StructType([
        StructField("order_id", StringType()),
        StructField("amount", IntegerType())
    ])))
])

# Parse JSON column
df = df.withColumn("parsed", from_json(col("json_string"), nested_schema))

# Extract nested fields
df_exploded = df.select(
    col("parsed.user.id").alias("user_id"),
    col("parsed.user.name").alias("user_name"),
    explode(col("parsed.orders")).alias("order")
).select(
    "user_id",
    "user_name",
    col("order.order_id"),
    col("order.amount")
)

# Alternative: Use get_json_object for simple extraction
df.withColumn("user_id", get_json_object(col("json_string"), "$.user.id"))`,
    description: "Parse complex nested JSON structures in PySpark",
    tags: ["pyspark", "json", "parsing"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 201,
    createdAt: new Date("2025-04-04").toISOString(),
    updatedAt: new Date("2025-04-13").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark Salting for Data Skew",
    language: "pyspark",
    code: `from pyspark.sql.functions import col, rand, concat, lit, floor

# Add salt column to distribute skewed keys
salt_factor = 10
df_salted = df.withColumn("salt", floor(rand() * salt_factor))

# Add salt to join key
df_salted = df_salted.withColumn(
    "salted_key", 
    concat(col("join_key"), lit("_"), col("salt"))
)

# Replicate smaller table with salt
df_small_replicated = df_small.select("*")
for i in range(salt_factor):
    df_temp = df_small.withColumn("salt", lit(i))
    df_temp = df_temp.withColumn(
        "salted_key",
        concat(col("join_key"), lit("_"), col("salt"))
    )
    if i == 0:
        df_small_salted = df_temp
    else:
        df_small_salted = df_small_salted.union(df_temp)

# Join on salted key
df_joined = df_salted.join(df_small_salted, "salted_key")

# Remove salt columns
df_result = df_joined.drop("salt", "salted_key")`,
    description: "Handle data skew with salting technique for better performance",
    tags: ["pyspark", "performance", "skew"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 156,
    createdAt: new Date("2025-04-05").toISOString(),
    updatedAt: new Date("2025-04-14").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark Data Quality Checks",
    language: "pyspark",
    code: `from pyspark.sql.functions import col, count, when, isnan, isnull, sum as _sum

def data_quality_report(df, required_columns):
    """Generate comprehensive data quality report"""
    
    # Total rows
    total_rows = df.count()
    
    # Check for nulls in each column
    null_counts = df.select([
        _sum(when(col(c).isNull(), 1).otherwise(0)).alias(c) 
        for c in df.columns
    ]).collect()[0].asDict()
    
    # Check for required columns
    missing_cols = set(required_columns) - set(df.columns)
    
    # Duplicate check
    duplicate_count = df.count() - df.dropDuplicates().count()
    
    # Numeric range checks
    numeric_stats = df.select([
        col(c) for c in df.columns 
        if dict(df.dtypes)[c] in ['int', 'bigint', 'double', 'float']
    ]).summary()
    
    quality_report = {
        "total_rows": total_rows,
        "null_counts": null_counts,
        "missing_columns": list(missing_cols),
        "duplicate_rows": duplicate_count,
        "numeric_stats": numeric_stats
    }
    
    return quality_report

# Usage
report = data_quality_report(df, ["id", "name", "email"])
print(report)`,
    description: "Implement comprehensive data quality checks in PySpark",
    tags: ["pyspark", "data-quality", "validation"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 223,
    createdAt: new Date("2025-04-06").toISOString(),
    updatedAt: new Date("2025-04-15").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark Incremental Processing Pattern",
    language: "pyspark",
    code: `from pyspark.sql.functions import col, max as _max, current_timestamp
from delta.tables import DeltaTable

# Get last processed timestamp
last_run = spark.sql("""
    SELECT MAX(processed_at) as last_processed 
    FROM metadata.job_runs 
    WHERE job_name = 'daily_etl'
""").collect()[0]["last_processed"]

# Read only new data
df_new = spark.read.parquet("s3://data/source") \\
    .filter(col("updated_at") > last_run)

# Process new data
df_processed = df_new.transform(clean_data) \\
    .transform(enrich_data) \\
    .withColumn("processed_at", current_timestamp())

# Delta merge for upserts
delta_table = DeltaTable.forPath(spark, "s3://data/target")
delta_table.alias("target").merge(
    df_processed.alias("source"),
    "target.id = source.id"
).whenMatchedUpdateAll() \\
 .whenNotMatchedInsertAll() \\
 .execute()

# Update metadata
spark.sql(f"""
    INSERT INTO metadata.job_runs 
    VALUES ('daily_etl', current_timestamp(), {df_new.count()})
""")`,
    description: "Implement incremental data processing pattern for efficiency",
    tags: ["pyspark", "incremental", "delta"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 267,
    createdAt: new Date("2025-04-07").toISOString(),
    updatedAt: new Date("2025-04-16").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark Custom Aggregation Functions",
    language: "pyspark",
    code: `from pyspark.sql.functions import pandas_udf, PandasUDFType, col, percentile_approx
from pyspark.sql.types import DoubleType
import pandas as pd

# Define custom aggregation with pandas UDF
@pandas_udf(DoubleType(), PandasUDFType.GROUPED_AGG)
def weighted_average(values, weights):
    """Calculate weighted average"""
    return (values * weights).sum() / weights.sum()

# Use custom aggregation
df_agg = df.groupBy("category").agg(
    weighted_average(col("price"), col("quantity")).alias("weighted_avg_price")
)

# Multiple custom aggregations
df_stats = df.groupBy("category").agg(
    weighted_average(col("price"), col("quantity")).alias("weighted_avg"),
    percentile_approx("price", 0.5).alias("median_price"),
    percentile_approx("price", [0.25, 0.75]).alias("quartiles")
)

# Custom aggregation with collect_list
from pyspark.sql.functions import collect_list, size, array_max

df.groupBy("user_id").agg(
    collect_list("product_id").alias("products"),
    size(collect_list("product_id")).alias("num_products"),
    array_max(collect_list("price")).alias("max_price")
)`,
    description: "Create and use custom aggregation functions in PySpark",
    tags: ["pyspark", "aggregation", "udf"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 145,
    createdAt: new Date("2025-04-08").toISOString(),
    updatedAt: new Date("2025-04-17").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark DataFrame to Pandas Conversion",
    language: "pyspark",
    code: `# Strategy 1: Simple conversion (small data only!)
pandas_df = spark_df.toPandas()

# Strategy 2: Sample before converting
pandas_sample = spark_df.sample(0.01).toPandas()  # 1% sample

# Strategy 3: Convert partitions to pandas (for parallel processing)
def process_partition(iterator):
    import pandas as pd
    for pdf in iterator:
        # Process pandas DataFrame
        pdf['new_col'] = pdf['old_col'] * 2
        yield pdf

df_result = spark_df.mapInPandas(process_partition, schema=spark_df.schema)

# Strategy 4: Use Arrow for faster conversion
spark.conf.set("spark.sql.execution.arrow.pyspark.enabled", "true")
pandas_df = spark_df.toPandas()  # Much faster with Arrow

# Strategy 5: Convert specific columns only
pandas_subset = spark_df.select("col1", "col2").toPandas()

# Strategy 6: Limit rows before conversion
pandas_limited = spark_df.limit(10000).toPandas()

# Convert back to Spark
spark_df_new = spark.createDataFrame(pandas_df)`,
    description: "Efficiently convert between PySpark and Pandas DataFrames",
    tags: ["pyspark", "pandas", "conversion"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 198,
    createdAt: new Date("2025-04-09").toISOString(),
    updatedAt: new Date("2025-04-18").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "PySpark Structured Streaming Watermarks",
    language: "pyspark",
    code: `from pyspark.sql.functions import window, col, current_timestamp

# Read stream with watermark for late data
df_stream = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "events") \\
    .load()

# Parse and add watermark (10 minutes)
df_watermarked = df_stream \\
    .selectExpr("CAST(value AS STRING)") \\
    .select(from_json(col("value"), schema).alias("data")) \\
    .select("data.*") \\
    .withWatermark("event_time", "10 minutes")

# Windowed aggregation with watermark
df_windowed = df_watermarked \\
    .groupBy(
        window(col("event_time"), "5 minutes"),
        col("user_id")
    ) \\
    .count()

# Write stream with checkpoint
query = df_windowed.writeStream \\
    .outputMode("append") \\
    .format("delta") \\
    .option("checkpointLocation", "/tmp/checkpoint") \\
    .start("/delta/output")

# Monitor stream
query.status
query.lastProgress
query.awaitTermination()`,
    description: "Handle late data with watermarks in Structured Streaming",
    tags: ["pyspark", "streaming", "watermark"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 167,
    createdAt: new Date("2025-04-10").toISOString(),
    updatedAt: new Date("2025-04-19").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Advanced Window Functions",
    language: "sql",
    code: `-- Multiple window functions in one query
SELECT 
    customer_id,
    order_date,
    amount,
    -- Running total
    SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) as running_total,
    -- Moving average (last 3 orders)
    AVG(amount) OVER (
        PARTITION BY customer_id 
        ORDER BY order_date 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as moving_avg_3,
    -- Rank (with gaps)
    RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) as rank,
    -- Dense rank (no gaps)
    DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) as dense_rank,
    -- Percentile
    PERCENT_RANK() OVER (PARTITION BY customer_id ORDER BY amount) as percentile,
    -- First and last values
    FIRST_VALUE(amount) OVER (PARTITION BY customer_id ORDER BY order_date) as first_order,
    LAST_VALUE(amount) OVER (
        PARTITION BY customer_id 
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as last_order
FROM orders;`,
    description: "Advanced window function patterns for analytics",
    tags: ["sql", "window-functions", "analytics"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 289,
    createdAt: new Date("2025-04-11").toISOString(),
    updatedAt: new Date("2025-04-20").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Efficient Pagination (Keyset Method)",
    language: "sql",
    code: `-- ❌ BAD: OFFSET is slow for large offsets
SELECT * FROM orders
ORDER BY id
LIMIT 20 OFFSET 1000000;  -- Very slow!

-- ✅ GOOD: Keyset pagination (seek method)
SELECT * FROM orders
WHERE id > 12345  -- Last ID from previous page
ORDER BY id
LIMIT 20;

-- ✅ BETTER: With composite key for uniqueness
SELECT * FROM orders
WHERE (created_at, id) > ('2024-01-15 10:30:00', 12345)
ORDER BY created_at, id
LIMIT 20;

-- With bookmark for next page
WITH page AS (
    SELECT *, 
           ROW_NUMBER() OVER (ORDER BY created_at, id) as rn
    FROM orders
    WHERE (created_at, id) > (@last_created_at, @last_id)
    ORDER BY created_at, id
    LIMIT 21  -- Fetch 21 to check if there's a next page
)
SELECT *,
       CASE WHEN rn = 21 THEN true ELSE false END as has_next_page
FROM page
WHERE rn <= 20;`,
    description: "Implement efficient pagination for large datasets",
    tags: ["sql", "pagination", "performance"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 267,
    createdAt: new Date("2025-04-12").toISOString(),
    updatedAt: new Date("2025-04-21").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Complex JSON Queries (PostgreSQL)",
    language: "sql",
    code: `-- PostgreSQL JSON operations
SELECT 
    id,
    data->>'name' as name,
    data->'address'->>'city' as city,
    data->'orders' as orders_json,
    jsonb_array_length(data->'orders') as order_count,
    -- Extract from JSON array
    jsonb_array_elements(data->'orders') as individual_orders
FROM users;

-- Filter by JSON field
SELECT * FROM users
WHERE data->>'country' = 'USA'
  AND (data->'age')::int > 25;

-- Update JSON field
UPDATE users
SET data = jsonb_set(data, '{address,city}', '"New York"')
WHERE id = 1;

-- Aggregate JSON values
SELECT 
    data->>'country' as country,
    COUNT(*) as user_count,
    AVG((data->>'age')::int) as avg_age
FROM users
GROUP BY data->>'country';

-- Expand JSON array to rows
SELECT 
    u.id,
    u.data->>'name' as user_name,
    o->>'order_id' as order_id,
    (o->>'amount')::decimal as amount
FROM users u
CROSS JOIN LATERAL jsonb_array_elements(u.data->'orders') as o;`,
    description: "Query and manipulate JSON data in SQL",
    tags: ["sql", "json", "postgresql"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 234,
    createdAt: new Date("2025-04-13").toISOString(),
    updatedAt: new Date("2025-04-22").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Index Optimization Strategies",
    language: "sql",
    code: `-- Create indexes for common queries
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date DESC);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_orders ON orders(customer_id)
WHERE status = 'active';

-- Covering index (include all columns needed)
CREATE INDEX idx_orders_covering ON orders(customer_id, order_date)
INCLUDE (amount, status);

-- Multi-column index for range + equality
CREATE INDEX idx_date_range_customer ON orders(order_date, customer_id);

-- Check index usage (PostgreSQL)
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT 
    schemaname,
    tablename,
    indexname
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexname NOT LIKE 'pg_%';

-- Analyze query plan
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE customer_id = 123
  AND order_date > '2024-01-01'
ORDER BY order_date DESC;`,
    description: "Create and optimize indexes for better query performance",
    tags: ["sql", "indexes", "performance"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 312,
    createdAt: new Date("2025-04-14").toISOString(),
    updatedAt: new Date("2025-04-23").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Upsert Patterns (MERGE/ON CONFLICT)",
    language: "sql",
    code: `-- PostgreSQL: ON CONFLICT (upsert)
INSERT INTO products (id, name, price, stock)
VALUES (1, 'Widget', 29.99, 100)
ON CONFLICT (id) 
DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    stock = products.stock + EXCLUDED.stock,
    updated_at = CURRENT_TIMESTAMP;

-- SQL Server: MERGE statement
MERGE INTO products AS target
USING (VALUES (1, 'Widget', 29.99, 100)) AS source (id, name, price, stock)
ON target.id = source.id
WHEN MATCHED THEN
    UPDATE SET 
        name = source.name,
        price = source.price,
        stock = target.stock + source.stock
WHEN NOT MATCHED THEN
    INSERT (id, name, price, stock)
    VALUES (source.id, source.name, source.price, source.stock);

-- Conditional upsert
INSERT INTO products (id, name, price, stock)
VALUES (1, 'Widget', 29.99, 100)
ON CONFLICT (id)
DO UPDATE SET
    price = EXCLUDED.price
WHERE products.price > EXCLUDED.price;  -- Only update if new price is lower

-- Bulk upsert from another table
INSERT INTO products (id, name, price, stock)
SELECT id, name, price, stock FROM staging_products
ON CONFLICT (id)
DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    stock = EXCLUDED.stock;`,
    description: "Implement upsert operations (insert or update) efficiently",
    tags: ["sql", "upsert", "merge"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 298,
    createdAt: new Date("2025-04-15").toISOString(),
    updatedAt: new Date("2025-04-24").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Data Sampling Techniques",
    language: "sql",
    code: `-- Random sample (different methods)

-- 1. Simple random sample (10%)
SELECT * FROM large_table
WHERE RANDOM() < 0.1;

-- 2. TABLESAMPLE (faster for large tables)
SELECT * FROM large_table
TABLESAMPLE BERNOULLI (10);  -- 10% sample

-- 3. TABLESAMPLE SYSTEM (even faster, block-level)
SELECT * FROM large_table
TABLESAMPLE SYSTEM (10);

-- 4. Stratified sampling (sample from each group)
WITH grouped AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY category ORDER BY RANDOM()) as rn,
           COUNT(*) OVER (PARTITION BY category) as group_size
    FROM large_table
)
SELECT * FROM grouped
WHERE rn <= GREATEST(group_size * 0.1, 100);  -- At least 100 per group

-- 5. Systematic sampling (every Nth row)
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY id) as rn
    FROM large_table
) WHERE rn % 10 = 0;

-- 6. Reservoir sampling (fixed size sample)
WITH RECURSIVE sample AS (
    SELECT *, ROW_NUMBER() OVER () as rn
    FROM large_table
    LIMIT 1000
)
SELECT * FROM sample;`,
    description: "Various sampling techniques for large datasets",
    tags: ["sql", "sampling", "performance"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2025-04-16").toISOString(),
    updatedAt: new Date("2025-04-25").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Time-Series Analytics",
    language: "sql",
    code: `-- Time-series aggregations and analytics

-- 1. Fill gaps in time series
WITH time_spine AS (
    SELECT generate_series(
        '2024-01-01'::date,
        '2024-12-31'::date,
        '1 day'::interval
    ) as date
)
SELECT 
    t.date,
    COALESCE(d.revenue, 0) as revenue,
    COALESCE(d.orders, 0) as orders
FROM time_spine t
LEFT JOIN daily_metrics d ON t.date = d.date
ORDER BY t.date;

-- 2. Moving averages with multiple windows
SELECT 
    date,
    revenue,
    AVG(revenue) OVER (
        ORDER BY date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as ma_7day,
    AVG(revenue) OVER (
        ORDER BY date 
        ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
    ) as ma_30day
FROM daily_metrics;

-- 3. Year-over-year comparison
SELECT 
    date,
    revenue,
    LAG(revenue, 365) OVER (ORDER BY date) as revenue_last_year,
    revenue - LAG(revenue, 365) OVER (ORDER BY date) as yoy_change,
    ROUND(100.0 * (revenue - LAG(revenue, 365) OVER (ORDER BY date)) / 
          NULLIF(LAG(revenue, 365) OVER (ORDER BY date), 0), 2) as yoy_pct
FROM daily_metrics;

-- 4. Detect anomalies (beyond 2 std devs)
WITH stats AS (
    SELECT 
        AVG(revenue) as mean,
        STDDEV(revenue) as stddev
    FROM daily_metrics
)
SELECT 
    d.*,
    CASE 
        WHEN ABS(d.revenue - s.mean) > 2 * s.stddev THEN 'anomaly'
        ELSE 'normal'
    END as status
FROM daily_metrics d, stats s;`,
    description: "Time-series analytics patterns for trend analysis",
    tags: ["sql", "time-series", "analytics"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 256,
    createdAt: new Date("2025-04-17").toISOString(),
    updatedAt: new Date("2025-04-26").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Query Optimization Best Practices",
    language: "sql",
    code: `-- ❌ BAD: SELECT *
SELECT * FROM large_table;

-- ✅ GOOD: Select only needed columns
SELECT id, name, email FROM large_table;

-- ❌ BAD: Function on indexed column
SELECT * FROM orders WHERE DATE(created_at) = '2024-01-15';

-- ✅ GOOD: Sargable query (can use index)
SELECT * FROM orders 
WHERE created_at >= '2024-01-15' 
  AND created_at < '2024-01-16';

-- ❌ BAD: OR with different columns
SELECT * FROM users WHERE email = 'test@example.com' OR phone = '1234567890';

-- ✅ GOOD: Use UNION ALL for OR conditions
SELECT * FROM users WHERE email = 'test@example.com'
UNION ALL
SELECT * FROM users WHERE phone = '1234567890' AND email != 'test@example.com';

-- ❌ BAD: NOT IN with subquery (slow for large sets)
SELECT * FROM orders WHERE customer_id NOT IN (SELECT id FROM deleted_customers);

-- ✅ GOOD: Use NOT EXISTS or LEFT JOIN
SELECT o.* FROM orders o
WHERE NOT EXISTS (SELECT 1 FROM deleted_customers d WHERE d.id = o.customer_id);

-- ✅ BETTER: Optimize JOIN order (smaller table first in hash join)
SELECT /*+ LEADING(small_table large_table) */ *
FROM large_table l
JOIN small_table s ON l.id = s.foreign_id;

-- Use EXPLAIN ANALYZE to verify
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE customer_id = 123;`,
    description: "Common SQL optimization patterns and anti-patterns",
    tags: ["sql", "optimization", "performance"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 345,
    createdAt: new Date("2025-04-18").toISOString(),
    updatedAt: new Date("2025-04-27").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Cohort Retention Analysis",
    language: "sql",
    code: `-- Cohort retention analysis
WITH first_purchase AS (
    SELECT 
        customer_id,
        MIN(DATE_TRUNC('month', order_date)) as cohort_month
    FROM orders
    GROUP BY customer_id
),
monthly_activity AS (
    SELECT 
        f.cohort_month,
        DATE_TRUNC('month', o.order_date) as activity_month,
        COUNT(DISTINCT o.customer_id) as active_customers
    FROM first_purchase f
    JOIN orders o ON f.customer_id = o.customer_id
    GROUP BY f.cohort_month, DATE_TRUNC('month', o.order_date)
),
cohort_size AS (
    SELECT cohort_month, COUNT(*) as cohort_size
    FROM first_purchase
    GROUP BY cohort_month
)
SELECT 
    m.cohort_month,
    m.activity_month,
    EXTRACT(MONTH FROM AGE(m.activity_month, m.cohort_month)) as months_since_first,
    m.active_customers,
    c.cohort_size,
    ROUND(100.0 * m.active_customers / c.cohort_size, 2) as retention_rate
FROM monthly_activity m
JOIN cohort_size c ON m.cohort_month = c.cohort_month
ORDER BY m.cohort_month, months_since_first;`,
    description: "Analyze user cohorts and retention over time",
    tags: ["sql", "cohort", "analytics"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 201,
    createdAt: new Date("2025-04-19").toISOString(),
    updatedAt: new Date("2025-04-28").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "SQL Data Masking for Privacy",
    language: "sql",
    code: `-- Create view with masked sensitive data
CREATE OR REPLACE VIEW customers_masked AS
SELECT 
    id,
    -- Mask email (show only domain)
    CONCAT('***@', SPLIT_PART(email, '@', 2)) as email,
    -- Mask phone (show only last 4 digits)
    CONCAT('***-***-', RIGHT(phone, 4)) as phone,
    -- Mask SSN completely
    'XXX-XX-XXXX' as ssn,
    -- Mask credit card (show last 4)
    CONCAT('****-****-****-', RIGHT(credit_card, 4)) as credit_card,
    -- Full name to initials
    CONCAT(LEFT(first_name, 1), '. ', LEFT(last_name, 1), '.') as name,
    -- Address city and state only
    city,
    state,
    -- Age range instead of exact age
    CASE 
        WHEN age < 18 THEN 'Under 18'
        WHEN age BETWEEN 18 AND 24 THEN '18-24'
        WHEN age BETWEEN 25 AND 34 THEN '25-34'
        WHEN age BETWEEN 35 AND 44 THEN '35-44'
        WHEN age BETWEEN 45 AND 54 THEN '45-54'
        WHEN age >= 55 THEN '55+'
    END as age_range
FROM customers;

-- Dynamic data masking based on user role
CREATE FUNCTION mask_sensitive_data(
    value TEXT,
    user_role TEXT
) RETURNS TEXT AS $$
BEGIN
    RETURN CASE 
        WHEN user_role IN ('admin', 'dba') THEN value
        WHEN user_role = 'analyst' THEN LEFT(value, 3) || '***'
        ELSE '***'
    END;
END;
$$ LANGUAGE plpgsql;`,
    description: "Implement data masking strategies for sensitive information",
    tags: ["sql", "privacy", "security"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 167,
    createdAt: new Date("2025-04-20").toISOString(),
    updatedAt: new Date("2025-04-29").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "dbt Incremental Model with Delete Logic",
    language: "dbt",
    code: `{{
  config(
    materialized='incremental',
    unique_key='id',
    on_schema_change='append_new_columns'
  )
}}

WITH source_data AS (
    SELECT * FROM {{ source('raw', 'events') }}
    {% if is_incremental() %}
    WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
    {% endif %}
),

-- Mark deleted records
deleted_records AS (
    SELECT id FROM {{ this }}
    WHERE id NOT IN (SELECT id FROM source_data)
    {% if is_incremental() %}
    AND is_deleted = FALSE
    {% endif %}
)

-- New and updated records
SELECT 
    s.*,
    FALSE as is_deleted,
    CURRENT_TIMESTAMP as dbt_updated_at
FROM source_data s

{% if is_incremental() %}

UNION ALL

-- Mark records as deleted
SELECT 
    t.*,
    TRUE as is_deleted,
    CURRENT_TIMESTAMP as dbt_updated_at
FROM {{ this }} t
INNER JOIN deleted_records d ON t.id = d.id
{% endif %}`,
    description: "Incremental model that handles soft deletes properly",
    tags: ["dbt", "incremental", "delete"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 198,
    createdAt: new Date("2025-04-21").toISOString(),
    updatedAt: new Date("2025-04-30").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "dbt Dynamic Schema Based on Environment",
    language: "dbt",
    code: `-- In dbt_project.yml
models:
  my_project:
    staging:
      +schema: "{{ 'stg' if target.name == 'prod' else 'dev_stg' }}"
    marts:
      +schema: "{{ 'analytics' if target.name == 'prod' else 'dev_analytics' }}"

-- In macros/generate_schema_name.sql
{% macro generate_schema_name(custom_schema_name, node) -%}
    {%- set default_schema = target.schema -%}
    {%- if target.name == 'prod' -%}
        {{ custom_schema_name | trim }}
    {%- else -%}
        {{ default_schema }}_{{ custom_schema_name | trim }}
    {%- endif -%}
{%- endmacro %}

-- In model with environment-specific config
{{ 
  config(
    schema='analytics',
    database="{{ 'prod_db' if target.name == 'prod' else 'dev_db' }}",
    tags=["{{ target.name }}"]
  ) 
}}

SELECT * FROM {{ source('raw', 'data') }}`,
    description: "Dynamically set schemas and databases based on environment",
    tags: ["dbt", "schema", "environment"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 245,
    createdAt: new Date("2025-04-22").toISOString(),
    updatedAt: new Date("2025-05-01").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "dbt Generic Test for Business Logic",
    language: "dbt",
    code: `-- In tests/generic/test_valid_business_hours.sql
{% test valid_business_hours(model, column_name, start_hour=9, end_hour=17) %}

WITH validation AS (
    SELECT 
        {{ column_name }},
        EXTRACT(HOUR FROM {{ column_name }}) as hour
    FROM {{ model }}
),

validation_errors AS (
    SELECT *
    FROM validation
    WHERE hour < {{ start_hour }} OR hour > {{ end_hour }}
)

SELECT *
FROM validation_errors

{% endtest %}

-- In tests/generic/test_ratio_between.sql
{% test ratio_between(model, numerator, denominator, min_value=0, max_value=1) %}

WITH ratio_calc AS (
    SELECT 
        {{ numerator }}::float / NULLIF({{ denominator }}::float, 0) as ratio
    FROM {{ model }}
)

SELECT *
FROM ratio_calc
WHERE ratio < {{ min_value }} OR ratio > {{ max_value }}

{% endtest %}

-- Usage in schema.yml
version: 2
models:
  - name: fct_orders
    columns:
      - name: order_timestamp
        tests:
          - valid_business_hours:
              start_hour: 8
              end_hour: 18
      - name: discount_amount
        tests:
          - ratio_between:
              numerator: discount_amount
              denominator: order_amount
              min_value: 0
              max_value: 0.5`,
    description: "Create reusable custom tests for business logic validation",
    tags: ["dbt", "testing", "generic-test"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 267,
    createdAt: new Date("2025-04-23").toISOString(),
    updatedAt: new Date("2025-05-02").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "dbt Macro for Dynamic Column Pivoting",
    language: "dbt",
    code: `-- In macros/pivot_column.sql
{% macro pivot_column(
    source_table,
    pivot_column,
    value_column,
    agg_function='SUM',
    prefix='',
    include_nulls=False
) %}

{% set query %}
    SELECT DISTINCT {{ pivot_column }}
    FROM {{ source_table }}
    {% if not include_nulls %}
    WHERE {{ pivot_column }} IS NOT NULL
    {% endif %}
    ORDER BY {{ pivot_column }}
{% endset %}

{% set results = run_query(query) %}
{% if execute %}
    {% set pivot_values = results.columns[0].values() %}
{% else %}
    {% set pivot_values = [] %}
{% endif %}

SELECT
    {% for value in pivot_values %}
    {{ agg_function }}(
        CASE WHEN {{ pivot_column }} = '{{ value }}' 
        THEN {{ value_column }} 
        END
    ) as {{ prefix }}{{ value | replace(' ', '_') | replace('-', '_') | lower }}
    {% if not loop.last %},{% endif %}
    {% endfor %}

{% endmacro %}

-- Usage in model
SELECT
    customer_id,
    order_date,
    {{ pivot_column(
        source_table=ref('stg_orders'),
        pivot_column='product_category',
        value_column='amount',
        agg_function='SUM',
        prefix='revenue_'
    ) }}
FROM {{ ref('stg_orders') }}
GROUP BY customer_id, order_date`,
    description: "Create dynamic pivot tables with macro",
    tags: ["dbt", "macro", "pivot"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 189,
    createdAt: new Date("2025-04-24").toISOString(),
    updatedAt: new Date("2025-05-03").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "dbt Slowly Changing Dimension Type 3",
    language: "dbt",
    code: `-- SCD Type 3: Keep current and previous values
{{
  config(
    materialized='incremental',
    unique_key='customer_id'
  )
}}

WITH source_data AS (
    SELECT * FROM {{ source('raw', 'customers') }}
),

{% if is_incremental() %}
existing_data AS (
    SELECT * FROM {{ this }}
),

changes AS (
    SELECT 
        s.customer_id,
        s.email as current_email,
        s.address as current_address,
        s.phone as current_phone,
        -- Check if any tracked columns changed
        CASE 
            WHEN s.email != e.current_email THEN e.current_email
            ELSE e.previous_email
        END as previous_email,
        CASE 
            WHEN s.address != e.current_address THEN e.current_address
            ELSE e.previous_address
        END as previous_address,
        CASE 
            WHEN s.phone != e.current_phone THEN e.current_phone
            ELSE e.previous_phone
        END as previous_phone,
        CASE 
            WHEN s.email != e.current_email THEN CURRENT_TIMESTAMP
            ELSE e.email_changed_at
        END as email_changed_at,
        CASE 
            WHEN s.address != e.current_address THEN CURRENT_TIMESTAMP
            ELSE e.address_changed_at
        END as address_changed_at
    FROM source_data s
    LEFT JOIN existing_data e ON s.customer_id = e.customer_id
)

SELECT * FROM changes

{% else %}

-- Initial load
SELECT 
    customer_id,
    email as current_email,
    address as current_address,
    phone as current_phone,
    NULL as previous_email,
    NULL as previous_address,
    NULL as previous_phone,
    NULL as email_changed_at,
    NULL as address_changed_at
FROM source_data

{% endif %}`,
    description: "Implement SCD Type 3 to track current and previous values",
    tags: ["dbt", "scd", "dimension"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2025-04-25").toISOString(),
    updatedAt: new Date("2025-05-04").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "dbt Audit Columns Macro",
    language: "dbt",
    code: `-- In macros/add_audit_columns.sql
{% macro add_audit_columns() %}
    CURRENT_TIMESTAMP as dbt_created_at,
    CURRENT_TIMESTAMP as dbt_updated_at,
    '{{ invocation_id }}' as dbt_invocation_id,
    '{{ target.name }}' as dbt_target_name,
    '{{ run_started_at }}' as dbt_run_started_at
{% endmacro %}

-- In macros/update_audit_columns.sql
{% macro update_audit_columns(existing_table_alias='target') %}
    {{ existing_table_alias }}.dbt_created_at,
    CURRENT_TIMESTAMP as dbt_updated_at,
    '{{ invocation_id }}' as dbt_invocation_id,
    '{{ target.name }}' as dbt_target_name,
    '{{ run_started_at }}' as dbt_run_started_at
{% endmacro %}

-- Usage in incremental model
{{
  config(
    materialized='incremental',
    unique_key='id'
  )
}}

SELECT
    id,
    name,
    email,
    {% if is_incremental() %}
    {{ update_audit_columns() }}
    {% else %}
    {{ add_audit_columns() }}
    {% endif %}
FROM {{ source('raw', 'users') }}

{% if is_incremental() %}
WHERE updated_at > (SELECT MAX(dbt_updated_at) FROM {{ this }})
{% endif %}`,
    description: "Add standardized audit columns to all models",
    tags: ["dbt", "macro", "audit"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 223,
    createdAt: new Date("2025-04-26").toISOString(),
    updatedAt: new Date("2025-05-05").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "dbt Pre/Post Hooks for Data Quality",
    language: "dbt",
    code: `-- In dbt_project.yml
models:
  my_project:
    +pre-hook:
      - "{{ log_model_start() }}"
    +post-hook:
      - "{{ validate_row_count() }}"
      - "{{ grant_select_to_role() }}"

-- In macros/validate_row_count.sql
{% macro validate_row_count(min_rows=1) %}
    {% set query %}
        SELECT COUNT(*) as row_count FROM {{ this }}
    {% endset %}
    
    {% if execute %}
        {% set result = run_query(query) %}
        {% set row_count = result.columns[0].values()[0] %}
        
        {% if row_count < min_rows %}
            {% do exceptions.raise_compiler_error(
                "Row count validation failed: " ~ row_count ~ " rows (expected >= " ~ min_rows ~ ")"
            ) %}
        {% else %}
            {% do log("✓ Row count validation passed: " ~ row_count ~ " rows", info=True) %}
        {% endif %}
    {% endif %}
{% endmacro %}

-- In macros/grant_select_to_role.sql
{% macro grant_select_to_role(role='analyst_role') %}
    {% if target.name == 'prod' %}
        GRANT SELECT ON {{ this }} TO {{ role }}
    {% endif %}
{% endmacro %}

-- Model-specific hooks
{{ 
  config(
    post_hook=[
      "{{ validate_row_count(min_rows=1000) }}",
      "CREATE INDEX IF NOT EXISTS idx_{{ this.name }}_customer_id ON {{ this }} (customer_id)"
    ]
  ) 
}}`,
    description: "Use pre/post hooks for data quality checks and operations",
    tags: ["dbt", "hooks", "data-quality"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 256,
    createdAt: new Date("2025-04-27").toISOString(),
    updatedAt: new Date("2025-05-06").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "dbt Source Freshness Monitoring",
    language: "dbt",
    code: `-- In models/staging/sources.yml
version: 2

sources:
  - name: raw
    database: production
    schema: raw_data
    freshness:
      warn_after: {count: 12, period: hour}
      error_after: {count: 24, period: hour}
    loaded_at_field: _loaded_at
    
    tables:
      - name: orders
        description: "Raw order data from production database"
        freshness:
          warn_after: {count: 1, period: hour}
          error_after: {count: 2, period: hour}
        columns:
          - name: order_id
            tests:
              - unique
              - not_null
      
      - name: customers
        freshness:
          warn_after: {count: 6, period: hour}
          error_after: {count: 12, period: hour}
      
      - name: daily_snapshots
        freshness:
          warn_after: {count: 26, period: hour}
          error_after: {count: 50, period: hour}

-- Run freshness check
-- dbt source freshness

-- In macros/check_custom_freshness.sql
{% macro check_custom_freshness(source_name, table_name, max_age_hours=24) %}
    {% set query %}
        SELECT 
            MAX(_loaded_at) as last_load,
            EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - MAX(_loaded_at)))/3600 as hours_old
        FROM {{ source(source_name, table_name) }}
    {% endset %}
    
    {% if execute %}
        {% set result = run_query(query) %}
        {% set hours_old = result.columns[1].values()[0] %}
        
        {% if hours_old > max_age_hours %}
            {% do exceptions.raise_compiler_error(
                "Source freshness check failed: Data is " ~ hours_old ~ " hours old"
            ) %}
        {% endif %}
    {% endif %}
{% endmacro %}`,
    description: "Monitor source data freshness and alert on stale data",
    tags: ["dbt", "freshness", "monitoring"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 212,
    createdAt: new Date("2025-04-28").toISOString(),
    updatedAt: new Date("2025-05-07").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Kafka Exactly-Once Semantics Producer",
    language: "kafka",
    code: `from kafka import KafkaProducer
import json

# Configure producer for exactly-once semantics
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    acks='all',  # Wait for all replicas
    enable_idempotence=True,  # Enable idempotence for exactly-once
    max_in_flight_requests_per_connection=5,
    retries=10,
    transactional_id='my-transactional-id'  # Required for transactions
)

# Initialize transactions
producer.init_transactions()

try:
    # Begin transaction
    producer.begin_transaction()
    
    # Send messages atomically
    for i in range(100):
        message = {"id": i, "value": f"message-{i}"}
        producer.send('my-topic', value=message)
    
    # Commit transaction
    producer.commit_transaction()
    print("Transaction committed successfully")
    
except Exception as e:
    # Abort transaction on error
    producer.abort_transaction()
    print(f"Transaction aborted: {e}")
    
finally:
    producer.close()`,
    description: "Implement exactly-once semantics for guaranteed message delivery",
    tags: ["kafka", "exactly-once", "transactions"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 189,
    createdAt: new Date("2025-04-29").toISOString(),
    updatedAt: new Date("2025-05-08").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Kafka Consumer with Manual Partition Assignment",
    language: "kafka",
    code: `from kafka import KafkaConsumer, TopicPartition
import logging

# Create consumer with manual assignment
consumer = KafkaConsumer(
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=False,
    group_id='manual-assignment-group',
    value_deserializer=lambda m: m.decode('utf-8')
)

# Manually assign specific partitions
partitions = [
    TopicPartition('my-topic', 0),
    TopicPartition('my-topic', 1),
    TopicPartition('my-topic', 2)
]
consumer.assign(partitions)

# Seek to specific offsets
for partition in partitions:
    # Seek to beginning
    consumer.seek_to_beginning(partition)
    
    # Or seek to specific offset
    # consumer.seek(partition, 1000)
    
    # Or seek to end
    # consumer.seek_to_end(partition)

# Get current position
for partition in partitions:
    position = consumer.position(partition)
    print(f"Partition {partition.partition}: offset {position}")

# Consume messages
try:
    for message in consumer:
        print(f"Partition {message.partition}, Offset {message.offset}: {message.value}")
        
        # Manual commit after processing
        consumer.commit()
        
except KeyboardInterrupt:
    pass
finally:
    consumer.close()`,
    description: "Manually assign partitions and control offset positioning",
    tags: ["kafka", "consumer", "partitions"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 167,
    createdAt: new Date("2025-04-30").toISOString(),
    updatedAt: new Date("2025-05-09").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Kafka Schema Registry Integration (Avro)",
    language: "kafka",
    code: `from confluent_kafka import Producer, Consumer
from confluent_kafka.avro import AvroProducer, AvroConsumer
from confluent_kafka.avro.cached_schema_registry_client import CachedSchemaRegistryClient

# Define Avro schema
value_schema = {
    "type": "record",
    "name": "User",
    "fields": [
        {"name": "id", "type": "int"},
        {"name": "name", "type": "string"},
        {"name": "email", "type": "string"}
    ]
}

# Configure Schema Registry
schema_registry_conf = {
    'url': 'http://localhost:8081'
}

# Create Avro Producer
producer = AvroProducer({
    'bootstrap.servers': 'localhost:9092',
    'schema.registry.url': 'http://localhost:8081'
}, default_value_schema=value_schema)

# Produce message with Avro serialization
user = {"id": 1, "name": "John Doe", "email": "john@example.com"}
producer.produce(topic='users', value=user)
producer.flush()

# Create Avro Consumer
consumer = AvroConsumer({
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'avro-consumer-group',
    'schema.registry.url': 'http://localhost:8081',
    'auto.offset.reset': 'earliest'
})

consumer.subscribe(['users'])

# Consume with automatic deserialization
try:
    while True:
        msg = consumer.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            print(f"Error: {msg.error()}")
            continue
        
        # Message is automatically deserialized
        user = msg.value()
        print(f"Received user: {user}")
        
except KeyboardInterrupt:
    pass
finally:
    consumer.close()`,
    description: "Use Schema Registry with Avro for schema evolution",
    tags: ["kafka", "avro", "schema-registry"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 234,
    createdAt: new Date("2025-05-01").toISOString(),
    updatedAt: new Date("2025-05-10").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Kafka Streams Stateful Processing",
    language: "kafka",
    code: `from kafka import KafkaConsumer, KafkaProducer
import json
from collections import defaultdict

# Simulated Kafka Streams stateful processing
# (Python doesn't have native Kafka Streams, but this shows the pattern)

class StatefulProcessor:
    def __init__(self):
        self.state_store = defaultdict(dict)
    
    def process_message(self, message):
        """Process message with state"""
        user_id = message['user_id']
        event_type = message['event_type']
        
        # Update state
        if event_type == 'login':
            self.state_store[user_id]['last_login'] = message['timestamp']
            self.state_store[user_id]['login_count'] = \\
                self.state_store[user_id].get('login_count', 0) + 1
        
        elif event_type == 'purchase':
            self.state_store[user_id]['total_spent'] = \\
                self.state_store[user_id].get('total_spent', 0) + message['amount']
            self.state_store[user_id]['purchase_count'] = \\
                self.state_store[user_id].get('purchase_count', 0) + 1
        
        # Return enriched message
        enriched = message.copy()
        enriched['user_state'] = self.state_store[user_id]
        return enriched

# Consumer and processor
consumer = KafkaConsumer(
    'events',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

processor = StatefulProcessor()

for message in consumer:
    enriched = processor.process_message(message.value)
    producer.send('enriched-events', value=enriched)`,
    description: "Implement stateful stream processing with state stores",
    tags: ["kafka", "streams", "stateful"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 178,
    createdAt: new Date("2025-05-02").toISOString(),
    updatedAt: new Date("2025-05-11").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Kafka Dead Letter Queue Pattern",
    language: "kafka",
    code: `from kafka import KafkaConsumer, KafkaProducer
import json
import logging

# Configure consumer
consumer = KafkaConsumer(
    'main-topic',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    enable_auto_commit=False
)

# Configure DLQ producer
dlq_producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def process_message(message):
    """Process message with error handling"""
    try:
        # Your processing logic
        data = message.value
        
        # Validation
        if 'required_field' not in data:
            raise ValueError("Missing required field")
        
        # Process
        result = transform_data(data)
        return result
        
    except Exception as e:
        return None, str(e)

# Main processing loop
for message in consumer:
    result, error = process_message(message)
    
    if error:
        # Send to DLQ with error metadata
        dlq_message = {
            'original_message': message.value,
            'error': error,
            'original_topic': message.topic,
            'original_partition': message.partition,
            'original_offset': message.offset,
            'failed_at': datetime.now().isoformat()
        }
        
        dlq_producer.send('dead-letter-queue', value=dlq_message)
        logging.error(f"Message sent to DLQ: {error}")
    
    # Commit offset after handling
    consumer.commit()

# Monitor DLQ
dlq_consumer = KafkaConsumer(
    'dead-letter-queue',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for dlq_message in dlq_consumer:
    logging.warning(f"DLQ message: {dlq_message.value}")
    # Alert or retry logic here`,
    description: "Implement dead letter queue pattern for failed messages",
    tags: ["kafka", "dlq", "error-handling"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 201,
    createdAt: new Date("2025-05-03").toISOString(),
    updatedAt: new Date("2025-05-12").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Databricks Unity Catalog Table Management",
    language: "databricks",
    code: `# Create catalog and schema
spark.sql("CREATE CATALOG IF NOT EXISTS prod_catalog")
spark.sql("CREATE SCHEMA IF NOT EXISTS prod_catalog.sales")

# Create managed table
spark.sql("""
    CREATE TABLE IF NOT EXISTS prod_catalog.sales.orders (
        order_id STRING,
        customer_id STRING,
        amount DECIMAL(10,2),
        order_date DATE
    )
    USING DELTA
    PARTITIONED BY (order_date)
    TBLPROPERTIES ('delta.enableChangeDataFeed' = 'true')
""")

# Create external table
spark.sql("""
    CREATE EXTERNAL TABLE IF NOT EXISTS prod_catalog.sales.external_orders
    LOCATION 's3://bucket/orders/'
""")

# Grant permissions
spark.sql("GRANT SELECT ON TABLE prod_catalog.sales.orders TO \`analysts@company.com\`")
spark.sql("GRANT MODIFY ON TABLE prod_catalog.sales.orders TO \`engineers@company.com\`")

# Table properties
spark.sql("ALTER TABLE prod_catalog.sales.orders SET TBLPROPERTIES ('owner' = 'data-team')")

# Show table lineage
display(spark.sql("DESCRIBE EXTENDED prod_catalog.sales.orders"))

# Enable audit logging
spark.sql("ALTER TABLE prod_catalog.sales.orders SET TBLPROPERTIES ('delta.logRetentionDuration' = '365 days')")`,
    description: "Manage tables in Unity Catalog with proper governance",
    tags: ["databricks", "unity-catalog", "governance"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 256,
    createdAt: new Date("2025-05-04").toISOString(),
    updatedAt: new Date("2025-05-13").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Databricks Optimize and Vacuum Automation",
    language: "databricks",
    code: `from delta.tables import DeltaTable

# Optimize single table
spark.sql("OPTIMIZE delta.\`/mnt/delta/orders\` ZORDER BY (customer_id, order_date)")

# Optimize with predicate pushdown
spark.sql("""
    OPTIMIZE delta.\`/mnt/delta/orders\`
    WHERE order_date >= '2024-01-01'
    ZORDER BY customer_id
""")

# Vacuum old files (delete files older than retention)
spark.sql("VACUUM delta.\`/mnt/delta/orders\` RETAIN 168 HOURS")  # 7 days

# Optimize all tables in a database
def optimize_database(database_name):
    tables = spark.sql(f"SHOW TABLES IN {database_name}").collect()
    
    for table in tables:
        table_name = f"{database_name}.{table.tableName}"
        print(f"Optimizing {table_name}...")
        
        try:
            # Optimize
            spark.sql(f"OPTIMIZE {table_name}")
            
            # Vacuum (optional)
            spark.sql(f"VACUUM {table_name} RETAIN 168 HOURS")
            
            print(f"✓ {table_name} optimized")
        except Exception as e:
            print(f"✗ {table_name} failed: {e}")

# Schedule as notebook job
optimize_database("prod_catalog.sales")

# Check table stats
spark.sql("""
    DESCRIBE DETAIL delta.\`/mnt/delta/orders\`
""").display()`,
    description: "Automate Delta table optimization and maintenance",
    tags: ["databricks", "optimize", "delta"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 289,
    createdAt: new Date("2025-05-05").toISOString(),
    updatedAt: new Date("2025-05-14").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Databricks Delta Live Tables Pipeline",
    language: "databricks",
    code: `# Bronze table - raw ingestion
@dlt.table(
    comment="Raw orders from source system",
    table_properties={
        "quality": "bronze",
        "pipelines.autoOptimize.zOrderCols": "order_id"
    }
)
def orders_bronze():
    return (
        spark.readStream
        .format("cloudFiles")
        .option("cloudFiles.format", "json")
        .load("/mnt/source/orders")
    )

# Silver table - cleaned and validated
@dlt.table(
    comment="Cleaned orders with validation",
    table_properties={"quality": "silver"}
)
@dlt.expect_or_drop("valid_order_id", "order_id IS NOT NULL")
@dlt.expect_or_drop("valid_amount", "amount > 0")
def orders_silver():
    return (
        dlt.read_stream("orders_bronze")
        .select(
            "order_id",
            "customer_id",
            col("amount").cast("decimal(10,2)"),
            to_date("order_date").alias("order_date")
        )
        .dropDuplicates(["order_id"])
    )

# Gold table - aggregated for analytics
@dlt.table(
    comment="Daily order aggregates",
    table_properties={"quality": "gold"}
)
def daily_order_summary():
    return (
        dlt.read("orders_silver")
        .groupBy("order_date")
        .agg(
            count("order_id").alias("total_orders"),
            sum("amount").alias("total_revenue"),
            countDistinct("customer_id").alias("unique_customers")
        )
    )`,
    description: "Build medallion architecture with Delta Live Tables",
    tags: ["databricks", "dlt", "medallion"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 312,
    createdAt: new Date("2025-05-06").toISOString(),
    updatedAt: new Date("2025-05-15").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Databricks Photon Acceleration Tips",
    language: "databricks",
    code: `# Enable Photon in cluster config
# In UI: Cluster → Edit → Runtime: Select Photon runtime
# Or via API:
spark.conf.set("spark.databricks.photon.enabled", "true")

# Photon works best with:
# 1. Parquet and Delta formats
df = spark.read.format("delta").load("/path/to/delta/table")

# 2. Partition pruning
df_filtered = df.filter((col("year") == 2024) & (col("month") == 3))

# 3. Column pruning (select only needed columns)
df_selected = df.select("id", "name", "amount")

# 4. Native SQL operations (vs UDFs)
# ✅ GOOD: Native operations
df.withColumn("total", col("price") * col("quantity"))

# ❌ BAD: Python UDFs (slower with Photon)
@udf("double")
def calculate_total(price, qty):
    return price * qty

# 5. Broadcast joins for small tables
from pyspark.sql.functions import broadcast
df_large.join(broadcast(df_small), "id")

# 6. Use adaptive query execution
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")

# Check if Photon is being used
spark.sql("EXPLAIN COST SELECT * FROM table").show(truncate=False)
# Look for "Photon" in the plan

# Photon benefits: 2-3x faster for:
# - Aggregations
# - Joins
# - Window functions
# - String operations`,
    description: "Optimize queries to take advantage of Photon acceleration",
    tags: ["databricks", "photon", "performance"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 223,
    createdAt: new Date("2025-05-07").toISOString(),
    updatedAt: new Date("2025-05-16").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Databricks Cluster Configuration Best Practices",
    language: "databricks",
    code: `# Optimal cluster configuration (JSON format for CLI/API)
{
  "cluster_name": "production-etl",
  "spark_version": "13.3.x-scala2.12",
  "node_type_id": "i3.2xlarge",
  "driver_node_type_id": "i3.2xlarge",
  "num_workers": 8,
  "autoscale": {
    "min_workers": 2,
    "max_workers": 10
  },
  "autotermination_minutes": 30,
  "spark_conf": {
    "spark.databricks.delta.preview.enabled": "true",
    "spark.sql.adaptive.enabled": "true",
    "spark.sql.adaptive.coalescePartitions.enabled": "true",
    "spark.databricks.io.cache.enabled": "true",
    "spark.sql.shuffle.partitions": "auto"
  },
  "spark_env_vars": {
    "PYSPARK_PYTHON": "/databricks/python3/bin/python3"
  },
  "enable_elastic_disk": true,
  "runtime_engine": "PHOTON"
}

# Python code for cluster management
from databricks.sdk import WorkspaceClient

w = WorkspaceClient()

# Create cluster programmatically
cluster = w.clusters.create(
    cluster_name="dynamic-cluster",
    spark_version="13.3.x-scala2.12",
    node_type_id="i3.xlarge",
    num_workers=4,
    autotermination_minutes=20
)

# Monitor cluster metrics
cluster_id = "your-cluster-id"
events = w.clusters.list_events(cluster_id=cluster_id)

# Resize cluster based on workload
w.clusters.resize(cluster_id=cluster_id, num_workers=8)`,
    description: "Configure Databricks clusters for optimal performance",
    tags: ["databricks", "cluster", "configuration"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 198,
    createdAt: new Date("2025-05-08").toISOString(),
    updatedAt: new Date("2025-05-17").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Airflow Dynamic DAG Generation",
    language: "airflow",
    code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

# Configuration for multiple similar DAGs
CONFIGS = [
    {"name": "sales", "schedule": "0 2 * * *", "tables": ["orders", "customers"]},
    {"name": "marketing", "schedule": "0 3 * * *", "tables": ["campaigns", "leads"]},
    {"name": "finance", "schedule": "0 4 * * *", "tables": ["transactions", "invoices"]}
]

def process_table(table_name, **context):
    print(f"Processing {table_name}")
    # Your processing logic here

def create_dag(config):
    """Dynamically create DAG based on config"""
    dag_id = f"etl_{config['name']}"
    
    default_args = {
        'owner': 'data-team',
        'depends_on_past': False,
        'retries': 2,
        'retry_delay': timedelta(minutes=5)
    }
    
    with DAG(
        dag_id=dag_id,
        default_args=default_args,
        description=f"ETL pipeline for {config['name']}",
        schedule_interval=config['schedule'],
        start_date=datetime(2024, 1, 1),
        catchup=False,
        tags=[config['name'], 'dynamic']
    ) as dag:
        
        start = PythonOperator(
            task_id='start',
            python_callable=lambda: print(f"Starting {config['name']} pipeline")
        )
        
        # Create task for each table
        for table in config['tables']:
            task = PythonOperator(
                task_id=f"process_{table}",
                python_callable=process_table,
                op_kwargs={'table_name': table}
            )
            start >> task
        
        return dag

# Generate DAGs
for config in CONFIGS:
    globals()[f"etl_{config['name']}"] = create_dag(config)`,
    description: "Generate multiple similar DAGs dynamically from configuration",
    tags: ["airflow", "dynamic", "dag-generation"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 278,
    createdAt: new Date("2025-05-09").toISOString(),
    updatedAt: new Date("2025-05-18").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Airflow Custom Operator for API Calls",
    language: "airflow",
    code: `from airflow.models import BaseOperator
from airflow.utils.decorators import apply_defaults
import requests
import logging

class APIOperator(BaseOperator):
    """Custom operator for making API calls with retry logic"""
    
    @apply_defaults
    def __init__(
        self,
        endpoint: str,
        method: str = 'GET',
        headers: dict = None,
        data: dict = None,
        expected_status: int = 200,
        *args, **kwargs
    ):
        super().__init__(*args, **kwargs)
        self.endpoint = endpoint
        self.method = method
        self.headers = headers or {}
        self.data = data
        self.expected_status = expected_status
    
    def execute(self, context):
        """Make API call"""
        logging.info(f"Calling {self.method} {self.endpoint}")
        
        try:
            response = requests.request(
                method=self.method,
                url=self.endpoint,
                headers=self.headers,
                json=self.data,
                timeout=30
            )
            
            if response.status_code != self.expected_status:
                raise Exception(
                    f"API returned {response.status_code}: {response.text}"
                )
            
            result = response.json()
            logging.info(f"API call successful: {result}")
            
            # Push result to XCom
            return result
            
        except requests.exceptions.RequestException as e:
            logging.error(f"API call failed: {e}")
            raise

# Usage in DAG
from airflow import DAG
from datetime import datetime

with DAG(
    'api_integration',
    start_date=datetime(2024, 1, 1),
    schedule_interval='@daily',
    catchup=False
) as dag:
    
    fetch_data = APIOperator(
        task_id='fetch_user_data',
        endpoint='https://api.example.com/users',
        method='GET',
        headers={'Authorization': 'Bearer token'}
    )
    
    post_data = APIOperator(
        task_id='create_user',
        endpoint='https://api.example.com/users',
        method='POST',
        data={'name': 'John Doe', 'email': 'john@example.com'},
        expected_status=201
    )`,
    description: "Create reusable custom operator for API integrations",
    tags: ["airflow", "custom-operator", "api"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 234,
    createdAt: new Date("2025-05-10").toISOString(),
    updatedAt: new Date("2025-05-19").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Airflow SLA Monitoring and Alerts",
    language: "airflow",
    code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.email import send_email
from datetime import datetime, timedelta

def sla_miss_callback(dag, task_list, blocking_task_list, slas, blocking_tis):
    """Custom callback when SLA is missed"""
    email_content = f"""
    <h3>SLA Missed!</h3>
    <p>DAG: {dag.dag_id}</p>
    <p>Tasks that missed SLA:</p>
    <ul>
    """
    
    for sla in slas:
        email_content += f"""
        <li>
            Task: {sla.task_id}<br>
            Expected: {sla.dag_id}<br>
            Timestamp: {sla.timestamp}
        </li>
        """
    
    email_content += "</ul>"
    
    # Send alert
    send_email(
        to=['data-team@company.com'],
        subject=f'SLA MISS: {dag.dag_id}',
        html_content=email_content
    )

default_args = {
    'owner': 'data-team',
    'depends_on_past': False,
    'email': ['alerts@company.com'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
    'sla': timedelta(hours=2)  # Global SLA
}

with DAG(
    'sla_monitoring',
    default_args=default_args,
    description='DAG with SLA monitoring',
    schedule_interval='0 1 * * *',
    start_date=datetime(2024, 1, 1),
    catchup=False,
    sla_miss_callback=sla_miss_callback
) as dag:
    
    # Task with specific SLA
    critical_task = PythonOperator(
        task_id='critical_processing',
        python_callable=lambda: print("Processing"),
        sla=timedelta(minutes=30)  # Must complete in 30 min
    )
    
    # Task without SLA override (uses default)
    normal_task = PythonOperator(
        task_id='normal_processing',
        python_callable=lambda: print("Processing")
    )
    
    critical_task >> normal_task

# Monitor SLAs programmatically
from airflow.models import SlaMiss
from airflow.utils.session import provide_session

@provide_session
def check_sla_misses(session=None):
    sla_misses = session.query(SlaMiss).filter(
        SlaMiss.timestamp >= datetime.now() - timedelta(days=1)
    ).all()
    
    for sla in sla_misses:
        print(f"SLA miss: {sla.dag_id}.{sla.task_id}")`,
    description: "Implement SLA monitoring with custom alerts",
    tags: ["airflow", "sla", "monitoring"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 267,
    createdAt: new Date("2025-05-11").toISOString(),
    updatedAt: new Date("2025-05-20").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Airflow Backfill Strategy Pattern",
    language: "airflow",
    code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

def smart_backfill_processor(**context):
    """Process with awareness of backfill vs regular run"""
    execution_date = context['execution_date']
    is_backfill = context['dag_run'].is_backfill if context.get('dag_run') else False
    
    print(f"Processing date: {execution_date}")
    print(f"Is backfill: {is_backfill}")
    
    if is_backfill:
        # Use different strategy for backfill
        # - Larger batch sizes
        # - Less aggressive caching
        # - Skip notifications
        print("Using backfill strategy")
        batch_size = 10000
    else:
        # Regular incremental processing
        print("Using incremental strategy")
        batch_size = 1000
    
    # Your processing logic
    process_data(execution_date, batch_size)

def process_data(date, batch_size):
    print(f"Processing {date} with batch size {batch_size}")

default_args = {
    'owner': 'data-team',
    'depends_on_past': True,  # Important for backfills
    'wait_for_downstream': True,  # Don't start next until previous done
    'retries': 1,
    'retry_delay': timedelta(minutes=5)
}

with DAG(
    'backfill_friendly',
    default_args=default_args,
    description='DAG optimized for backfills',
    schedule_interval='@daily',
    start_date=datetime(2024, 1, 1),
    catchup=True,  # Enable backfill
    max_active_runs=5  # Limit parallel backfill runs
) as dag:
    
    process = PythonOperator(
        task_id='process_data',
        python_callable=smart_backfill_processor,
        provide_context=True
    )

# Run backfill via CLI:
# airflow dags backfill backfill_friendly \\
#   --start-date 2024-01-01 \\
#   --end-date 2024-01-31 \\
#   --reset-dagruns

# Or programmatically:
from airflow.models import DagBag

def trigger_backfill(dag_id, start_date, end_date):
    """Trigger backfill programmatically"""
    dag_bag = DagBag()
    dag = dag_bag.get_dag(dag_id)
    
    dag.cli.backfill(
        dag_id=dag_id,
        start_date=start_date,
        end_date=end_date,
        mark_success=False
    )`,
    description: "Implement smart backfill strategy for historical data processing",
    tags: ["airflow", "backfill", "strategy"],
    author: "Chris M.",
    isFavorite: false,
    timesUsed: 212,
    createdAt: new Date("2025-05-12").toISOString(),
    updatedAt: new Date("2025-05-21").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Airflow TaskFlow API (Modern Pattern)",
    language: "airflow",
    code: `from airflow.decorators import dag, task
from datetime import datetime, timedelta

@dag(
    schedule_interval='@daily',
    start_date=datetime(2024, 1, 1),
    catchup=False,
    default_args={
        'owner': 'data-team',
        'retries': 2,
        'retry_delay': timedelta(minutes=5)
    },
    tags=['taskflow', 'modern']
)
def modern_etl_pipeline():
    """Modern ETL pipeline using TaskFlow API"""
    
    @task
    def extract_data():
        """Extract data from source"""
        print("Extracting data...")
        data = {
            'records': 1000,
            'source': 'api',
            'timestamp': datetime.now().isoformat()
        }
        return data  # Automatically pushed to XCom
    
    @task
    def transform_data(data: dict):
        """Transform the extracted data"""
        print(f"Transforming {data['records']} records...")
        transformed = {
            **data,
            'processed': True,
            'transformed_at': datetime.now().isoformat()
        }
        return transformed
    
    @task
    def load_data(data: dict):
        """Load data to destination"""
        print(f"Loading {data['records']} records...")
        print(f"Data: {data}")
        return {'status': 'success', 'records_loaded': data['records']}
    
    @task
    def send_notification(result: dict):
        """Send completion notification"""
        print(f"Pipeline completed: {result}")
        # Send email, Slack message, etc.
    
    # Define task dependencies with >>
    extracted = extract_data()
    transformed = transform_data(extracted)
    loaded = load_data(transformed)
    send_notification(loaded)

# Instantiate the DAG
dag_instance = modern_etl_pipeline()

# TaskFlow benefits:
# - Automatic XCom handling
# - Type hints for better IDE support
# - Cleaner, more Pythonic code
# - Less boilerplate
# - Easier testing`,
    description: "Use modern TaskFlow API for cleaner DAG definitions",
    tags: ["airflow", "taskflow", "modern"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 301,
    createdAt: new Date("2025-05-13").toISOString(),
    updatedAt: new Date("2025-05-22").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Docker Multi-stage Build for PySpark",
    language: "dockerfile",
    code: `# Multi-stage Dockerfile for PySpark application
FROM openjdk:11-slim as base

# Install Python
RUN apt-get update && apt-get install -y \\
    python3.9 \\
    python3-pip \\
    && rm -rf /var/lib/apt/lists/*

# Stage 1: Build dependencies
FROM base as builder

WORKDIR /build

# Copy requirements
COPY requirements.txt .

# Install dependencies in a virtual environment
RUN python3 -m pip install --user --no-cache-dir -r requirements.txt

# Download Spark
RUN wget https://archive.apache.org/dist/spark/spark-3.4.0/spark-3.4.0-bin-hadoop3.tgz \\
    && tar -xzf spark-3.4.0-bin-hadoop3.tgz \\
    && mv spark-3.4.0-bin-hadoop3 /opt/spark

# Stage 2: Runtime
FROM base as runtime

# Copy Spark from builder
COPY --from=builder /opt/spark /opt/spark

# Copy Python packages from builder
COPY --from=builder /root/.local /root/.local

# Set environment variables
ENV SPARK_HOME=/opt/spark
ENV PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin
ENV PYTHONPATH=$SPARK_HOME/python:$SPARK_HOME/python/lib/py4j-0.10.9-src.zip
ENV PATH=/root/.local/bin:$PATH

# Copy application code
WORKDIR /app
COPY src/ ./src/
COPY config/ ./config/

# Create user for security
RUN useradd -m sparkuser
USER sparkuser

# Default command
CMD ["spark-submit", "--master", "local[*]", "src/main.py"]

# Build: docker build -t pyspark-app:latest .
# Run: docker run pyspark-app:latest`,
    description: "Efficient multi-stage Docker build for PySpark applications",
    tags: ["docker", "pyspark", "multi-stage"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 267,
    createdAt: new Date("2025-05-14").toISOString(),
    updatedAt: new Date("2025-05-23").toISOString(),
    source: ""
  },
  {
    id: uuidv4(),
    title: "Docker Compose for Local Data Stack",
    language: "dockerfile",
    code: `# docker-compose.yml for local data engineering stack
version: '3.8'

services:
  postgres:
    image: postgres:14
    container_name: local-postgres
    environment:
      POSTGRES_USER: dataeng
      POSTGRES_PASSWORD: password
      POSTGRES_DB: warehouse
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dataeng"]
      interval: 10s
      timeout: 5s
      retries: 5

  kafka:
    image: confluentinc/cp-kafka:7.4.0
    container_name: local-kafka
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  zookeeper:
    image: confluentinc/cp-zookeeper:7.4.0
    container_name: local-zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  spark:
    image: bitnami/spark:3.4.0
    container_name: local-spark
    environment:
      - SPARK_MODE=master
      - SPARK_MASTER_HOST=spark
      - SPARK_MASTER_PORT=7077
    ports:
      - "8080:8080"
      - "7077:7077"
    volumes:
      - ./spark-apps:/opt/spark-apps
      - ./spark-data:/opt/spark-data

  airflow:
    image: apache/airflow:2.6.0
    container_name: local-airflow
    depends_on:
      - postgres
    environment:
      AIRFLOW__CORE__EXECUTOR: LocalExecutor
      AIRFLOW__CORE__SQL_ALCHEMY_CONN: postgresql+psycopg2://dataeng:password@postgres/airflow
      AIRFLOW__CORE__LOAD_EXAMPLES: 'false'
    ports:
      - "8081:8080"
    volumes:
      - ./dags:/opt/airflow/dags
      - ./logs:/opt/airflow/logs
    command: >
      bash -c "airflow db init &&
               airflow users create --username admin --password admin --firstname Admin --lastname User --role Admin --email admin@example.com &&
               airflow webserver"

  jupyter:
    image: jupyter/pyspark-notebook:latest
    container_name: local-jupyter
    ports:
      - "8888:8888"
    volumes:
      - ./notebooks:/home/jovyan/work
    environment:
      JUPYTER_ENABLE_LAB: "yes"

volumes:
  postgres_data:

# Usage:
# Start: docker-compose up -d
# Stop: docker-compose down
# View logs: docker-compose logs -f [service]
# Access:
#   - Postgres: localhost:5432
#   - Kafka: localhost:9092
#   - Spark UI: localhost:8080
#   - Airflow: localhost:8081
#   - Jupyter: localhost:8888`,
    description: "Complete local data stack with Docker Compose",
    tags: ["docker", "compose", "local-development"],
    author: "Chris M.",
    isFavorite: true,
    timesUsed: 345,
    createdAt: new Date("2025-05-15").toISOString(),
    updatedAt: new Date("2025-05-24").toISOString(),
    source: ""
  },

];

// Helper to get snippets by language
export const getSnippetsByLanguage = (language) => {
  return seedSnippets.filter(s => s.language === language);
};

// Helper to get favorite snippets
export const getFavoriteSnippets = () => {
  return seedSnippets.filter(s => s.isFavorite);
};

// Helper to get most used snippets
export const getMostUsedSnippets = (limit = 10) => {
  return [...seedSnippets]
    .sort((a, b) => b.timesUsed - a.timesUsed)
    .slice(0, limit);
};