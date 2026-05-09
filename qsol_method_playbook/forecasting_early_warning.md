# Forecasting & Early Warning Playbook

## Classification
`forecasting_early_warning`

## When to Use
- Planning based on gut feel or "last year plus 10%"
- Seasonal patterns poorly understood
- Frequently over or under-prepared for demand
- Cash flow surprises from unpredictable revenue
- Staffing decisions made too late
- Stock-outs or excess inventory problems

## When NOT to Use
- Less than 12 months of historical data
- Business model fundamentally changing
- External factors dominate (e.g., pure project-based work)
- When simple averages would work just as well
- Data quality too poor to support forecasting

## Data Needed
- Historical time-series data (minimum 12-24 months)
- Clear definition of what to forecast
- Known calendar effects (holidays, seasons)
- Information about promotions, outages, special events
- Business context for anomalies in history

## Simple First Implementation
1. **Collect and clean data**: Time-indexed, regular intervals
2. **Exploratory analysis**: Trend, seasonality, outliers
3. **Train/test split**: Hold out recent data for validation
4. **Build baseline model**: Start with exponential smoothing (ETS)
5. **Evaluate accuracy**: MAE, MAPE, visual inspection
6. **Deploy forecast**: Dashboard or scheduled output

### Recommended Methods
- **ETS (Exponential Smoothing)**: Good baseline, handles seasonality
- **SARIMA**: When you need to model autocorrelation
- **Prophet**: Easy to use, handles holidays well
- **XGBoost/LightGBM**: When you have external regressors

### Recommended Tools
- Python (statsmodels, prophet, sklearn)
- Time-series database or PostgreSQL with TimescaleDB
- Dashboard tool for visualization

## Advanced Implementation
- Ensemble models combining multiple approaches
- Probabilistic forecasts with uncertainty intervals
- Hierarchical forecasting (national → regional → store)
- Automated retraining and drift detection
- Scenario planning and simulation

## Risks and Mitigations
| Risk | Mitigation |
|------|------------|
| Model overfit to past patterns | Out-of-sample validation, simplicity preference |
| Structural breaks invalidate model | Monitor forecast errors, trigger retraining |
| Users over-trust point forecasts | Always show confidence intervals |
| Garbage in, garbage out | Data quality checks before training |

## QSol Examples
- Distribution: Demand forecasting for stock planning
- Services: Quote volume forecasting for staffing
- Retail: Seasonal sales forecasting

## Typical Timeline
3-6 weeks for initial forecasting system

## First Step
"Share 12+ months of the time-series data and tell us what decisions the forecast should inform."
