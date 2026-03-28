# Portfolio Content

All copy for the portfolio. Use this verbatim — no lorem ipsum, no placeholder text.

---

## 1. Site Metadata

| Field | Value |
|-------|-------|
| Site Title | Sijo Thomas |
| Default Meta Description | AI & Machine Learning Engineer specialising in Generative AI, LLM & RAG, AWS, NLP, and Python. 5+ years building production ML systems. |
| OG Image Alt | Sijo Thomas — AI/ML Engineer Portfolio |

---

## 2. Hero Section

**Name**: Sijo Thomas

**Title**: AI / ML Engineer

**One-liner**: Building intelligent systems with GenAI, RAG, and cloud-native ML pipelines.

**CTA Primary**: View My Projects → `/projects`

**CTA Secondary**: Download CV → `/resume.pdf`

**Social Links**:
- LinkedIn: https://www.linkedin.com/in/sijothomas97/
- GitHub: https://github.com/sijothomas97
- Email: sijo.thomas0097@gmail.com

---

## 3. About Section

**Heading**: About Me

**Photo Alt Text**: Sijo Thomas, AI/ML Engineer

**Narrative**:

With over five years building AI-driven solutions across enterprise and startup environments, I specialise in turning complex ML models into production-ready systems that deliver measurable business impact.

My journey started at Infosys, where I spent four years developing AI/ML tools — from fraud detection engines to intelligent ticket triaging systems — serving clients across financial services and IT operations. At Wipro, I worked on Dell's price optimisation platform, applying machine learning to real-time pricing strategies. I then moved to Mentrose as a Full Stack ML Engineer, building e-commerce applications with integrated ML capabilities.

Currently at Croner-i, I architect GenAI and RAG systems on AWS, transforming how compliance teams interact with complex regulatory data. My MSc in Data Science from Manchester Metropolitan University grounds my practical work in rigorous research methodology.

I'm passionate about the intersection of AI and real-world problem solving — building systems that don't just work in notebooks, but ship to production and make a difference.

---

## 4. Skills Section

**Heading**: Technical Skills

**Subheading**: Technologies and tools I use to build production ML systems.

### Categories

**Languages & Frameworks**:
- Python
- Flask
- C#
- .NET
- JavaScript
- TypeScript
- Node.js

**Databases**:
- MySQL
- PostgreSQL
- SQL Server
- MongoDB

**Data Analysis & Visualisation**:
- Pandas
- NumPy
- Matplotlib
- Seaborn
- MS Excel

**ML & Deep Learning**:
- TensorFlow
- PyTorch
- Scikit-Learn
- LangChain
- Hugging Face

**Cloud Services**:
- AWS (SageMaker, Lambda, S3, Bedrock)
- Azure

**Development Tools**:
- Git
- Docker
- VS Code
- Jupyter Notebook
- Linux

---

## 5. Project Case Studies

### 5.1 Financial Market Prediction: Time Series Forecasting

**Frontmatter**:
- featured: true
- featuredOrder: 1
- tags: Python, Time Series, Statistical Modeling, Finance
- techStack: Python, ARIMA, SARIMA, ARCH, GARCH, ARDL, Pandas, Matplotlib, Statsmodels
- github: https://github.com/sijothomas97/time-series-on-stocks-data
- date: 2023-11-01

**Card Description** (max 160 chars):
Advanced time series forecasting system using ARIMA, SARIMA, and GARCH models to predict financial market trends from historical data.

**Case Study Body**:

## The Problem

Predicting financial market movements is one of the most challenging problems in data science. Traditional approaches often fail to capture the complex temporal patterns, volatility clustering, and seasonality inherent in financial time series data. Investors and analysts need reliable forecasting models that can account for these dynamics to make informed decisions.

## My Approach

I built a comprehensive Python-based forecasting pipeline that implements and compares five advanced time series models:

**ARIMA & SARIMA** for capturing linear temporal dependencies and seasonal patterns in stock price movements. I performed extensive stationarity testing (ADF test, KPSS test) and used ACF/PACF plots to determine optimal lag orders.

**ARCH & GARCH** for modelling volatility clustering — the phenomenon where periods of high volatility tend to cluster together in financial markets. These models capture the heteroskedasticity that ARIMA-family models miss.

**ARDL** (Autoregressive Distributed Lag) for examining both short-run dynamics and long-run equilibrium relationships between variables.

Each model was rigorously evaluated using walk-forward validation rather than simple train/test splits, which better simulates real-world forecasting conditions. I compared models using RMSE, MAE, and directional accuracy metrics.

**Key technical decisions**:
- Used rolling window cross-validation to prevent look-ahead bias
- Implemented automatic parameter selection via grid search for ARIMA(p,d,q) orders
- Applied Box-Cox transformations to stabilise variance before modelling
- Built a modular pipeline allowing easy model swapping and comparison

## Results

- Compared 5 models across multiple evaluation metrics and forecast horizons
- GARCH models significantly outperformed ARIMA for volatility forecasting, confirming the presence of volatility clustering in the dataset
- SARIMA captured seasonal patterns that improved forecast accuracy during predictable market cycles
- The walk-forward validation framework provides a reusable template for any time series forecasting task
- Full analysis documented with visualisations comparing predicted vs actual values across all models

## What I Learned

Financial time series require multiple complementary models — no single approach captures all dynamics. The combination of trend-focused (ARIMA/SARIMA) and volatility-focused (ARCH/GARCH) models provides a more complete picture than any individual model alone.

---

### 5.2 Handwritten Text Recognition: Deep Learning

**Frontmatter**:
- featured: true
- featuredOrder: 2
- tags: Deep Learning, Computer Vision, CNN, Python
- techStack: Python, TensorFlow, ResNet, AlexNet, VGG, OpenCV, NumPy
- github: https://github.com/sijothomas97/handwritten-text-reading
- date: 2023-09-01

**Card Description** (max 160 chars):
Deep learning OCR system using ResNet, AlexNet, and VGG architectures to recognise and digitise handwritten text from images.

**Case Study Body**:

## The Problem

Handwritten text recognition remains a significant challenge in computer vision. Unlike printed text, handwriting varies enormously between individuals — in slant, spacing, character formation, and stroke thickness. Accurate OCR (Optical Character Recognition) for handwritten text has applications in document digitisation, postal automation, and historical archive preservation, but requires models that can generalise across diverse handwriting styles.

## My Approach

I designed and trained three state-of-the-art convolutional neural network architectures to compare their effectiveness for handwritten text recognition:

**ResNet (Residual Networks)** — Leveraging skip connections to train deeper networks without degradation. The residual learning framework allows the model to learn identity mappings, making it feasible to train 50+ layer networks that capture fine-grained handwriting features.

**AlexNet** — As a baseline deep CNN, providing a reference point for comparing more advanced architectures. While simpler, it established the performance floor and helped identify where architectural innovations made the biggest difference.

**VGG (Visual Geometry Group)** — Using a uniform architecture of small 3x3 convolution filters stacked deeply, demonstrating that network depth with small receptive fields can capture complex spatial hierarchies in handwritten characters.

**Pipeline**:
1. Image preprocessing: grayscale conversion, noise reduction, contrast normalisation, binarisation
2. Data augmentation: rotation, scaling, elastic deformation to simulate handwriting variation
3. Model training with learning rate scheduling and early stopping
4. Ensemble evaluation comparing accuracy, precision, recall, and F1-score

## Results

- Successfully trained and compared all three architectures on handwritten text datasets
- ResNet achieved the highest recognition accuracy, benefiting from deeper feature extraction via skip connections
- Data augmentation with elastic deformation improved generalisation by simulating natural handwriting variation
- Built a complete pipeline from raw image input to character prediction output

## What I Learned

Transfer learning and architectural innovations (especially skip connections) have a profound impact on vision tasks. The preprocessing pipeline proved just as important as the model architecture — clean, well-augmented input data was the single biggest lever for improving accuracy.

---

### 5.3 Automobile Price Prediction: Machine Learning

**Frontmatter**:
- featured: true
- featuredOrder: 3
- tags: Machine Learning, Regression, Python, Ensemble Methods
- techStack: Python, Scikit-Learn, Ridge, RandomForest, GradientBoosting, Pandas, Pipelines
- github: https://github.com/sijothomas97/adv-ml-car-price-prediction
- date: 2023-10-01

**Card Description** (max 160 chars):
ML ensemble system using stacking regression with Ridge, RandomForest, and GradientBoosting to predict used vehicle prices accurately.

**Case Study Body**:

## The Problem

Accurately pricing used vehicles is inherently complex — values depend on dozens of interacting features including make, model, age, mileage, condition, location, and market trends. Both sellers and buyers benefit from data-driven price estimates, but simple linear models fail to capture the non-linear relationships between features and price.

## My Approach

I built an advanced machine learning pipeline that combines multiple regression algorithms through ensemble stacking for robust price prediction:

**Base Models**:
- **Ridge Regression** — Providing a strong linear baseline with L2 regularisation to handle multicollinearity between correlated features (e.g., age and mileage)
- **RandomForestRegressor** — Capturing non-linear relationships and feature interactions through bagging, with built-in feature importance ranking
- **GradientBoostingRegressor** — Sequential boosting to reduce prediction errors iteratively, excelling at capturing complex patterns

**Ensemble Strategy**:
- **Stacking Regressor** — Combined base model predictions as features for a meta-learner (RidgeCV), which learned optimal weights for each model's contribution
- **RidgeCV** as meta-learner with built-in cross-validated alpha selection

**Engineering**:
- Built end-to-end Scikit-Learn `Pipelines` with custom transformers for feature preprocessing
- Implemented separate preprocessing paths for numerical (scaling) and categorical (encoding) features using `ColumnTransformer`
- Cross-validated all hyperparameters using `GridSearchCV`

## Results

- Stacking ensemble outperformed all individual base models on held-out test data
- GradientBoosting contributed most to the ensemble, followed by RandomForest
- Feature importance analysis revealed mileage, age, and brand as the top three price predictors
- The pipeline architecture allows easy addition of new features or model substitution without restructuring code

## What I Learned

Ensemble methods consistently outperform individual models for tabular regression tasks. More importantly, investing in proper feature engineering and pipeline architecture paid larger dividends than hyperparameter tuning — clean, well-structured preprocessing is the foundation of any production ML system.

---

### 5.4 Data Structure Implementations: C#

**Frontmatter**:
- featured: false
- tags: C#, Data Structures, Algorithms, .NET
- techStack: C#, .NET, Visual Studio
- github: https://github.com/sijothomas97/student-enrolment-dictionary
- date: 2023-06-01

**Card Description** (max 160 chars):
Comprehensive C# implementations of Dictionary, Queue, Binary Search Tree, and Graph data structures with BFS, DFS, and self-balancing.

**Case Study Body**:

## The Problem

Understanding fundamental data structures is essential for building efficient software. This series of projects implements core data structures from scratch in C#, demonstrating algorithmic thinking and efficient memory management.

## Implementations

**Dictionary** — Hash-based key-value store with collision resolution, supporting O(1) average-case lookups for a student enrolment system.

**Queue** — Both linear and circular queue implementations, demonstrating FIFO operations with efficient memory utilisation for a customer service simulation.

**Binary Search Tree (BST)** — Dynamic insertion, deletion, and traversal (in-order, pre-order, post-order) with self-balancing techniques to maintain O(log n) operations.

**Graph** — Supporting both adjacency list and adjacency matrix representations, with BFS and DFS traversal algorithms implemented for a social network analysis use case.

## Tech Stack
C#, .NET Framework, Visual Studio

## Repositories
- [Dictionary](https://github.com/sijothomas97/student-enrolment-dictionary)
- [Queue](https://github.com/sijothomas97/customer-queue-app)
- [Binary Search Tree](https://github.com/sijothomas97/bst-console-app)
- [Graph](https://github.com/sijothomas97/social-network-graph)

---

## 6. Professional Experience

**Heading**: Professional Experience

### Croner-i (Jul 2025 — Present)
**Role**: Machine Learning Engineer | AWS

- Architecting GenAI and RAG systems on AWS, enabling intelligent document processing and semantic search across large regulatory datasets
- Building production LLM pipelines using LangChain, vector databases, and AWS services (Bedrock, Lambda, S3) for compliance teams
- Designing retrieval-augmented generation workflows that transform how users interact with complex regulatory information

### Mentrose (Apr 2024 — Mar 2025)
**Role**: Full Stack ML Engineer | Web App Developer

- Developed end-to-end e-commerce web applications integrating ML-powered features including recommendation engines and predictive analytics
- Built full-stack solutions combining Python/Flask backends with modern frontend frameworks, deployed to cloud infrastructure
- Implemented data pipelines for real-time product analytics and customer behaviour modelling

### Wipro Ltd (Jan 2022 — Jul 2022)
**Role**: Backend Engineer | Python, ML — Dell Account

- Contributed to Dell's price optimisation platform, applying machine learning models to dynamic pricing strategies across product lines
- Built Python-based backend services for data ingestion, model inference, and pricing API endpoints
- Collaborated with cross-functional teams to translate business pricing rules into ML model features

### Infosys Ltd (Oct 2017 — Dec 2021)
**Role**: Full Stack AI/ML Developer — AI/ML Solutions Team

- **Fraud Detection Tool**: Developed ML-based anomaly detection system for identifying fraudulent transactions in financial services, processing high-volume transaction data in near real-time
- **Microservices Automation Tool**: Built automation pipelines for microservice deployment and monitoring, reducing manual operational overhead
- **AI/ML Ticket Triaging Tool**: Created an intelligent ticket classification system that automatically categorised and routed support tickets across 50+ service categories, reducing manual triage effort
- **Data Masking Tool**: Implemented automated data anonymisation solution for PII protection, ensuring compliance with data privacy regulations across multiple client datasets

---

## 7. Education

**Heading**: Education

### MSc, Data Science
**Institution**: Manchester Metropolitan University
**Year**: December 2023
**Note**: Research focus on machine learning and statistical modelling

### Bachelor of Computer Application (BCA)
**Institution**: Mahatma Gandhi University
**Year**: March 2017

---

## 8. Contact Section

### Homepage CTA
**Heading**: Let's Work Together
**Description**: I'm open to ML engineering roles, consulting opportunities, and technical collaboration. Let's build something intelligent.
**CTA**: Get in Touch → `/contact`

### Contact Page
**Heading**: Get in Touch
**Description**: Have a project in mind or want to discuss ML engineering opportunities? Send me a message and I'll get back to you.

**Form Fields**:
- Name (required)
- Email (required)
- Message (required, textarea)

**Submit Button**: Send Message

**Below Form**:
- LinkedIn: https://www.linkedin.com/in/sijothomas97/
- GitHub: https://github.com/sijothomas97
- Email: sijo.thomas0097@gmail.com

---

## 9. Footer

**Copyright**: © {currentYear} Sijo Thomas. All rights reserved.

**Social Links**: LinkedIn | GitHub | Email (same URLs as above)

---

## 10. 404 Page

**Heading**: Page Not Found

**Description**: The page you're looking for doesn't exist or has been moved.

**CTA**: Back to Home → `/`

---

## 11. Blog Posts (Seed Content)

### Post 1: Building RAG Systems on AWS — A Practical Guide

**Frontmatter**:
- pubDate: 2025-01-15
- tags: RAG, AWS, LLM, GenAI, Python, LangChain
- readingTime: 8 min read

**Content**:

Retrieval-Augmented Generation (RAG) has become the go-to architecture for building LLM-powered applications that need access to domain-specific knowledge. After building several production RAG systems on AWS, here are the practical lessons I've learned.

### Why RAG Over Fine-Tuning

For most enterprise use cases, RAG beats fine-tuning on three fronts: cost (no GPU training), freshness (update the knowledge base without retraining), and control (you can trace every answer back to its source document). Fine-tuning has its place for style adaptation and specialised reasoning, but RAG handles the majority of "chat with your data" scenarios.

### The Architecture

A production RAG pipeline on AWS typically looks like this:

1. **Document Ingestion**: S3 bucket receives documents (PDFs, HTML, etc.) → Lambda function triggers processing
2. **Chunking & Embedding**: Documents are split into semantic chunks (I prefer 512-token chunks with 50-token overlap) and embedded using models via Amazon Bedrock
3. **Vector Storage**: Embeddings stored in a vector database (OpenSearch Serverless with vector engine, or Pinecone/ChromaDB depending on scale)
4. **Retrieval**: User query is embedded → top-k similar chunks retrieved via cosine similarity
5. **Generation**: Retrieved chunks + user query sent as context to an LLM (Claude via Bedrock) for answer generation

### Key Lessons

**Chunking strategy matters more than model choice.** I've seen RAG accuracy swing by 15-20% based purely on how documents are chunked. Semantic chunking (splitting on paragraph/section boundaries) consistently outperforms fixed-size chunking for structured documents.

**Hybrid search beats pure vector search.** Combining vector similarity with keyword search (BM25) catches cases where the semantic embedding misses exact terminology — especially important for technical or regulatory domains.

**Evaluation is the hardest part.** Building the pipeline is straightforward. Knowing whether it actually works well is harder. I use a combination of retrieval recall (are the right chunks being found?) and answer faithfulness (is the LLM hallucinating beyond the context?) to measure quality.

**Start simple, add complexity only when needed.** Your first RAG system should be: chunk documents → embed → retrieve → generate. Add re-ranking, query expansion, and multi-step retrieval only after you've measured where the bottlenecks are.

### Tools I Recommend

- **LangChain** for orchestration (but keep the chains simple)
- **Amazon Bedrock** for both embedding and generation models
- **OpenSearch Serverless** for vector storage at scale
- **LangSmith** for tracing and debugging retrieval quality

RAG is deceptively simple in concept but nuanced in practice. The difference between a demo and a production system is in the details — chunking, evaluation, and retrieval quality tuning.

---

### Post 2: Lessons from Financial Time Series Forecasting

**Frontmatter**:
- pubDate: 2024-12-01
- tags: Time Series, Python, Statistics, Finance, ARIMA, GARCH
- readingTime: 6 min read

**Content**:

For my MSc research, I built a comprehensive time series forecasting system for financial market prediction. Here's what the textbooks don't tell you about working with real financial data.

### Stationarity Is Everything

The first rule of time series forecasting: your data must be stationary (constant mean, variance, and autocovariance over time). Financial data almost never is. I spent more time transforming data into a stationary form than on any other step. The ADF test says "stationary" more often than you'd think — always cross-check with the KPSS test and visual inspection of rolling statistics.

### ARIMA Is a Starting Point, Not a Solution

ARIMA models are excellent for learning the fundamentals, but they assume constant variance — which financial data violently violates. Stock returns exhibit volatility clustering: calm periods cluster together, and turbulent periods cluster together. This is where GARCH models become essential.

The practical insight: use ARIMA for the mean equation (predicting direction) and GARCH for the variance equation (predicting volatility). Together, they capture dynamics that neither can alone.

### Walk-Forward Validation Is Non-Negotiable

Standard cross-validation (random splits) is invalid for time series because it leaks future information. I implemented walk-forward validation: train on data up to time T, forecast T+1, then expand the training window and repeat. This is slower but gives honest performance estimates.

### The Metrics That Matter

RMSE and MAE tell you about magnitude error, but for financial forecasting, **directional accuracy** often matters more. Did the model correctly predict whether the price would go up or down? A model with higher RMSE but better directional accuracy can be more profitable than one with lower RMSE that frequently gets the direction wrong.

### Key Takeaway

Financial time series forecasting humbles you. Models that look great in-sample often fall apart out-of-sample. The combination of rigorous statistical testing, multiple complementary models, and honest validation is what separates useful forecasts from curve-fitting.

---

### Post 3: Rebuilding My Portfolio with Astro

**Frontmatter**:
- pubDate: 2025-03-01
- tags: Astro, Tailwind, Portfolio, Web Development
- readingTime: 4 min read

**Content**:

I recently rebuilt my portfolio from a GitHub README into a proper website using Astro. Here's why I made the switch and what I learned.

### The Problem with README Portfolios

My old portfolio was a single `README.md` using Jekyll's minimal theme. It worked — GitHub Pages rendered it, recruiters could see it. But it had real limitations: no dark mode, no navigation, limited mobile experience, 17MB of GIF files loading on every visit, and no way to present projects as detailed case studies.

### Why Astro

As an ML engineer, I didn't want to spend weeks learning React just to build a portfolio. Astro ships zero JavaScript by default — pages are pure HTML and CSS unless you explicitly add interactivity. This means near-perfect Lighthouse scores without any optimisation effort.

The content collections feature sold me. Each project and blog post is a Markdown file with typed frontmatter. Adding a new project means creating a new `.md` file — no touching any component code.

### The Stack

- **Astro 5** for the framework
- **Tailwind CSS** for styling (dark mode is just a `dark:` prefix away)
- **GSAP** for a single hero animation (loaded only on the homepage)
- **GitHub Actions** for automatic deployment

### What I'd Do Differently

I over-designed the first iteration. The portfolio should showcase my ML work, not be a frontend showcase. I stripped back the animations, simplified the layout, and focused on making the content — especially project case studies — as strong as possible.

### The Result

The new site loads in under 2 seconds, scores 95+ on Lighthouse, works beautifully on mobile, and — most importantly — presents my work in a way that actually helps hiring managers understand what I can do.

If you're an ML/data engineer considering a portfolio rebuild, Astro is worth a look. It gets out of your way and lets the content shine.
