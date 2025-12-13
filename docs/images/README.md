# Screenshot Guide for Vegate Frontend

This directory should contain screenshots showcasing the key features of the Vegate platform. Replace the placeholder references in the main README.md with actual screenshots.

## Required Screenshots

### 1. `logo.png`

- **Description**: Vegate logo/branding
- **Recommended Size**: 200x200px or similar
- **Purpose**: Header branding for README

### 2. `strategy-builder.png`

- **Description**: Screenshot of the Strategy Creation page showing the natural language input
- **Key Elements to Capture**:
  - Strategy name and description fields
  - Large textarea with example prompt
  - "Generate Strategy" button
  - Tips card showing best practices
- **Recommended Location**: `/strategies/create` page
- **Recommended Size**: 1200x800px

### 3. `backtest-results.png`

- **Description**: Screenshot of a completed backtest with performance metrics
- **Key Elements to Capture**:
  - Equity curve chart
  - Performance metrics (P&L, Return %, Sharpe Ratio, Max Drawdown)
  - Trade history table
  - Status indicators
- **Recommended Location**: `/backtests/{backtest_id}` page
- **Recommended Size**: 1400x900px

### 4. `replay-mode.png`

- **Description**: Screenshot of Replay Mode showing candlestick chart with trade markers
- **Key Elements to Capture**:
  - Interactive candlestick chart
  - Entry/exit markers on the chart
  - Playback controls
  - Trade information sidebar
- **Recommended Location**: Replay mode within strategy detail or backtest result page
- **Recommended Size**: 1400x800px

### 5. `live-deployment.png`

- **Description**: Screenshot of an active live deployment dashboard
- **Key Elements to Capture**:
  - Real-time equity curve
  - Live performance metrics
  - Running/Stopped status badge
  - Broker connection information
  - Live logs panel or trade history
- **Recommended Location**: `/deployments/{deployment_id}` page
- **Recommended Size**: 1400x900px

### 6. `performance-metrics.png`

- **Description**: Close-up of the detailed performance metrics section
- **Key Elements to Capture**:
  - Metrics cards showing P&L, returns, win rate
  - Risk metrics (Sharpe, max drawdown, volatility)
  - Trade statistics
  - Visual chart showing equity progression
- **Recommended Location**: Strategy detail or backtest results page
- **Recommended Size**: 1200x600px

### 7. `broker-connections.png`

- **Description**: Screenshot of the Broker Connections page
- **Key Elements to Capture**:
  - Connected accounts table (if any)
  - Grid of available brokers (Alpaca, IG, Interactive Brokers, etc.)
  - "Add New Connection" section with broker icons
  - Status badges (Available, Coming Soon)
- **Recommended Location**: `/brokers` page
- **Recommended Size**: 1200x800px

## Screenshot Guidelines

### Best Practices

1. **Use light mode** for consistency (or provide both light/dark versions)
2. **Show realistic data** - Use example strategies with plausible metrics
3. **Clean UI** - Close unnecessary tabs/windows, hide personal information
4. **High resolution** - At least 1200px wide for main screenshots
5. **Crop appropriately** - Remove unnecessary browser chrome, focus on the app
6. **Annotations** (optional) - Add arrows or highlights to draw attention to key features

### Tools for Screenshots

- **Windows**: Windows + Shift + S (Snipping Tool)
- **Mac**: Cmd + Shift + 4 (Screenshot utility)
- **Browser DevTools**: F12 → Device toolbar for consistent viewport sizes
- **Editing**: Use tools like Snagit, Greenshot, or online editors to annotate

### File Naming Convention

- Use lowercase with hyphens: `strategy-builder.png`
- Use descriptive names that match the feature
- Keep file sizes reasonable (compress if >500KB)

## Example Data to Display

When taking screenshots, use realistic example data:

### Strategy Example

```
Name: RSI Mean Reversion
Description: Buy oversold conditions, sell overbought
Prompt: "Buy when RSI(14) drops below 30 and MACD crosses above signal line.
Sell when RSI reaches 70 or price hits 3% profit or 1.5% stop loss.
Trade SPY during market hours only."
```

### Backtest Metrics Example

- Symbol: SPY
- Total Return: +24.5%
- Sharpe Ratio: 1.85
- Max Drawdown: -8.2%
- Win Rate: 58%
- Total Trades: 47

### Live Deployment Example

- Status: RUNNING
- Broker: Alpaca (Paper)
- Current P&L: +$1,247.50 (+6.2%)
- Duration: 14 days
- Active Positions: 1

## After Adding Screenshots

Once you've added the screenshots:

1. Verify all image paths in the main README.md work correctly
2. Ensure images are properly sized (not too large for GitHub)
3. Commit images to the repository
4. Consider adding alt text for accessibility
