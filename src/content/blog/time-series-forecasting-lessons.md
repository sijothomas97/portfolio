---
title: "Lessons from Financial Time Series Forecasting"
description: "What real financial data taught me about stationarity, ARIMA vs GARCH, walk-forward validation, and the metrics that actually matter."
pubDate: 2024-12-01
tags: ["Time Series", "Python", "Statistics", "Finance", "ARIMA", "GARCH"]
draft: false
---

For my MSc research, I built a comprehensive time series forecasting system for financial market prediction. Here's what the textbooks don't tell you about working with real financial data.

## Stationarity Is Everything

The first rule of time series forecasting: your data must be stationary (constant mean, variance, and autocovariance over time). Financial data almost never is. I spent more time transforming data into a stationary form than on any other step. The ADF test says "stationary" more often than you'd think — always cross-check with the KPSS test and visual inspection of rolling statistics.

## ARIMA Is a Starting Point, Not a Solution

ARIMA models are excellent for learning the fundamentals, but they assume constant variance — which financial data violently violates. Stock returns exhibit volatility clustering: calm periods cluster together, and turbulent periods cluster together. This is where GARCH models become essential.

The practical insight: use ARIMA for the mean equation (predicting direction) and GARCH for the variance equation (predicting volatility). Together, they capture dynamics that neither can alone.

## Walk-Forward Validation Is Non-Negotiable

Standard cross-validation (random splits) is invalid for time series because it leaks future information. I implemented walk-forward validation: train on data up to time T, forecast T+1, then expand the training window and repeat. This is slower but gives honest performance estimates.

## The Metrics That Matter

RMSE and MAE tell you about magnitude error, but for financial forecasting, **directional accuracy** often matters more. Did the model correctly predict whether the price would go up or down? A model with higher RMSE but better directional accuracy can be more profitable than one with lower RMSE that frequently gets the direction wrong.

## Key Takeaway

Financial time series forecasting humbles you. Models that look great in-sample often fall apart out-of-sample. The combination of rigorous statistical testing, multiple complementary models, and honest validation is what separates useful forecasts from curve-fitting.
