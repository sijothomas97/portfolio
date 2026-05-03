---
title: "Automobile Price Prediction: Machine Learning"
description: "ML ensemble system using stacking regression with Ridge, RandomForest, and GradientBoosting to predict used vehicle prices accurately."
featured: true
featuredOrder: 3
tags: ["Machine Learning", "Regression", "Python", "Ensemble Methods"]
techStack: ["Python", "Scikit-Learn", "Ridge", "RandomForest", "GradientBoosting", "Pandas", "Pipelines"]
github: "https://github.com/sijothomas97/adv-ml-car-price-prediction"
date: 2023-10-01
---

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
