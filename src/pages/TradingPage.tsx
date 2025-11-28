import {
    ArrowUp,
    ChevronDown,
    Clock
} from 'lucide-react';
import { useState } from 'react';

// Shadcn UI Components (assumed available in @/components/ui)
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Mock Data Generators ---
const generateOrderBook = (count: number, startPrice: number, type: 'ask' | 'bid') => {
  return Array.from({ length: count }).map((_, i) => {
    const price = type === 'ask' 
      ? startPrice + (i * 0.5) + Math.random() 
      : startPrice - (i * 0.5) - Math.random();
    const size = Math.random() * 2;
    // Calculate a random "depth" percentage for the visual bar
    const total = Math.random() * 100; 
    return { 
      price: price.toFixed(2), 
      size: size.toFixed(4), 
      total: (size * price).toFixed(2),
      depth: Math.floor(Math.random() * 90) + 10 // % width of background bar
    };
  });
};

const generateTrades = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    price: (42000 + Math.random() * 100).toFixed(2),
    amount: (Math.random() * 0.5).toFixed(4),
    time: new Date(Date.now() - i * 1000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
    side: Math.random() > 0.5 ? 'buy' : 'sell'
  }));
};

const mockOpenOrders = [
  { id: 1, time: '12:30:45', pair: 'BTC/USDT', type: 'Limit', side: 'Buy', price: '41,500.00', amount: '0.500', filled: '0.00%', total: '20,750.00' },
  { id: 2, time: '11:15:20', pair: 'ETH/USDT', type: 'Market', side: 'Sell', price: '2,250.00', amount: '12.000', filled: '45.00%', total: '27,000.00' },
];

// --- COMPONENT 1: ORDER BOOK ---
const OrderBook = () => {
  const asks = generateOrderBook(12, 42100, 'ask').reverse(); // Lowest ask at bottom
  const bids = generateOrderBook(12, 42090, 'bid'); // Highest bid at top

  const Row = ({ item, type }: { item: any, type: 'ask' | 'bid' }) => (
    <div className="group relative flex items-center justify-between text-xs py-[2px] cursor-pointer hover:bg-zinc-800/50">
      {/* Depth Visual Bar */}
      <div 
        className={`absolute top-0 bottom-0 ${type === 'ask' ? 'right-0 bg-rose-900/20' : 'right-0 bg-emerald-900/20'} z-0`}
        style={{ width: `${item.depth}%` }}
      />
      
      <span className={`relative z-10 w-1/3 text-left pl-2 font-mono ${type === 'ask' ? 'text-rose-500' : 'text-emerald-500'}`}>
        {item.price}
      </span>
      <span className="relative z-10 w-1/3 text-right font-mono text-zinc-400 group-hover:text-zinc-200">
        {item.size}
      </span>
      <span className="relative z-10 w-1/3 text-right pr-2 font-mono text-zinc-500 hidden xl:block">
        {item.total}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col h-full border-l border-zinc-800 bg-zinc-950">
      <div className="p-3 border-b border-zinc-800 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-zinc-200">Order Book</h3>
        <div className="flex gap-1">
           {/* Simple icons representing view modes (all, bids only, asks only) */}
           <div className="h-4 w-4 bg-zinc-800 rounded cursor-pointer" />
           <div className="h-4 w-4 bg-zinc-800 rounded cursor-pointer" />
        </div>
      </div>
      
      <div className="flex text-[10px] text-zinc-500 px-2 py-1 uppercase font-medium">
        <span className="w-1/3 text-left">Price(USDT)</span>
        <span className="w-1/3 text-right">Amount(BTC)</span>
        <span className="w-1/3 text-right hidden xl:block">Total</span>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* Asks (Sells) */}
        <div className="flex-1 overflow-hidden">
          {asks.map((item, i) => <Row key={i} item={item} type="ask" />)}
        </div>

        {/* Current Price Indicator */}
        <div className="py-2 px-3 my-1 border-y border-zinc-800 bg-zinc-900/50 flex items-center gap-2">
          <span className="text-lg font-bold text-emerald-500 font-mono">42,095.50</span>
          <ArrowUp className="w-4 h-4 text-emerald-500" />
          <span className="text-xs text-zinc-400">$42,095.50</span>
        </div>

        {/* Bids (Buys) */}
        <div className="flex-1 overflow-hidden">
           {bids.map((item, i) => <Row key={i} item={item} type="bid" />)}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 2: MARKET TRADES ---
const MarketTrades = () => {
  const trades = generateTrades(15);

  return (
    <div className="flex flex-col h-full border-l border-zinc-800 bg-zinc-950">
      <div className="p-3 border-b border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-200">Market Trades</h3>
      </div>
      <div className="flex text-[10px] text-zinc-500 px-2 py-1 uppercase font-medium">
        <span className="w-1/3 text-left">Price(USDT)</span>
        <span className="w-1/3 text-right">Amount(BTC)</span>
        <span className="w-1/3 text-right">Time</span>
      </div>
      <ScrollArea className="flex-1">
        {trades.map((trade, i) => (
          <div key={i} className="flex items-center justify-between text-xs py-1 px-2 hover:bg-zinc-800/50 cursor-pointer">
            <span className={`w-1/3 text-left font-mono ${trade.side === 'buy' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trade.price}
            </span>
            <span className="w-1/3 text-right font-mono text-zinc-300">
              {trade.amount}
            </span>
            <span className="w-1/3 text-right font-mono text-zinc-500">
              {trade.time}
            </span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

// --- COMPONENT 3: ORDER CREATION CARD ---
const OrderForm = () => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState('limit');

  return (
    <div className="flex flex-col h-full border-l border-zinc-800 bg-zinc-950 p-4">
      {/* Buy/Sell Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button 
          variant={side === 'buy' ? 'default' : 'outline'} 
          className={`w-full font-bold ${side === 'buy' ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent' : 'bg-transparent border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          onClick={() => setSide('buy')}
        >
          Buy
        </Button>
        <Button 
          variant={side === 'sell' ? 'default' : 'outline'}
          className={`w-full font-bold ${side === 'sell' ? 'bg-rose-600 hover:bg-rose-700 text-white border-transparent' : 'bg-transparent border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          onClick={() => setSide('sell')}
        >
          Sell
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Badge variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 cursor-pointer">Limit</Badge>
        <span className="text-xs text-zinc-500 hover:text-emerald-500 cursor-pointer">Market</span>
        <span className="text-xs text-zinc-500 hover:text-emerald-500 cursor-pointer">Stop Limit</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Price (USDT)</span>
            <span>Best Ask</span>
          </div>
          <div className="relative">
            <Input 
              type="text" 
              defaultValue="42095.50" 
              className="bg-zinc-900 border-zinc-700 text-right font-mono pr-8 focus-visible:ring-emerald-600 focus-visible:ring-offset-0" 
            />
            <span className="absolute right-3 top-2.5 text-xs text-zinc-500 font-bold">USDT</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Amount (BTC)</span>
          </div>
          <div className="relative">
            <Input 
              type="text" 
              placeholder="0.00" 
              className="bg-zinc-900 border-zinc-700 text-right font-mono pr-8 focus-visible:ring-emerald-600 focus-visible:ring-offset-0" 
            />
            <span className="absolute right-3 top-2.5 text-xs text-zinc-500 font-bold">BTC</span>
          </div>
        </div>

        {/* Slider */}
        <div className="pt-2 pb-4">
           <Slider defaultValue={[25]} max={100} step={25} className={`w-full ${side === 'buy' ? 'text-emerald-600' : 'text-rose-600'}`} />
           <div className="flex justify-between text-[10px] text-zinc-500 mt-2 font-mono">
             <span className="cursor-pointer hover:text-white">0%</span>
             <span className="cursor-pointer hover:text-white">25%</span>
             <span className="cursor-pointer hover:text-white">50%</span>
             <span className="cursor-pointer hover:text-white">75%</span>
             <span className="cursor-pointer hover:text-white">100%</span>
           </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-500">
             <span>Total (USDT)</span>
          </div>
          <div className="relative">
             <Input 
              type="text" 
              placeholder="0.00" 
              readOnly
              className="bg-zinc-900 border-zinc-700 text-right font-mono pr-8 opacity-70" 
            />
            <span className="absolute right-3 top-2.5 text-xs text-zinc-500 font-bold">USDT</span>
          </div>
        </div>

        <div className="pt-2">
           <div className="flex justify-between text-xs text-zinc-400 mb-2">
              <span>Avail</span>
              <span className="font-mono text-zinc-200">14,203.44 USDT</span>
           </div>
           <Button className={`w-full font-bold h-10 ${side === 'buy' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>
             {side === 'buy' ? 'Buy BTC' : 'Sell BTC'}
           </Button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 4: ORDER MANAGEMENT ---
const OrderManagement = () => {
  return (
    <div className="flex flex-col h-full bg-zinc-950 border-t border-zinc-800">
      <Tabs defaultValue="open-orders" className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900/50">
          <TabsList className="bg-transparent h-10 p-0">
            <TabsTrigger value="open-orders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-500 text-zinc-400 h-full px-4 text-xs font-semibold">
              Open Orders (2)
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-500 text-zinc-400 h-full px-4 text-xs font-semibold">
              Order History
            </TabsTrigger>
            <TabsTrigger value="assets" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-500 text-zinc-400 h-full px-4 text-xs font-semibold">
              Assets
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-zinc-400">
               <input type="checkbox" id="hide-other" className="rounded border-zinc-700 bg-zinc-900" />
               <label htmlFor="hide-other">Hide other pairs</label>
            </div>
            <Button variant="ghost" size="sm" className="h-6 text-xs text-zinc-400 hover:text-white">
               Cancel All
            </Button>
          </div>
        </div>

        <TabsContent value="open-orders" className="flex-1 p-0 m-0">
          <div className="w-full overflow-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/50 text-zinc-500 sticky top-0">
                <tr>
                  <th className="font-medium p-3">Time</th>
                  <th className="font-medium p-3">Pair</th>
                  <th className="font-medium p-3">Type</th>
                  <th className="font-medium p-3">Side</th>
                  <th className="font-medium p-3 text-right">Price</th>
                  <th className="font-medium p-3 text-right">Amount</th>
                  <th className="font-medium p-3 text-right">Filled</th>
                  <th className="font-medium p-3 text-right">Total</th>
                  <th className="font-medium p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {mockOpenOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="p-3 font-mono text-zinc-400">{order.time}</td>
                    <td className="p-3 font-bold">{order.pair}</td>
                    <td className="p-3">{order.type}</td>
                    <td className={`p-3 font-semibold ${order.side === 'Buy' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {order.side}
                    </td>
                    <td className="p-3 text-right font-mono">{order.price}</td>
                    <td className="p-3 text-right font-mono">{order.amount}</td>
                    <td className="p-3 text-right font-mono">{order.filled}</td>
                    <td className="p-3 text-right font-mono">{order.total}</td>
                    <td className="p-3 text-center">
                      <Button variant="ghost" size="sm" className="h-6 text-xs text-zinc-400 hover:text-rose-500 hover:bg-rose-950/30">
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Empty state placeholder for other tabs */}
            <div className="p-8 text-center text-zinc-600 text-xs hidden">
               No open orders
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- MAIN LAYOUT COMPONENT ---
export default function TradingPage() {
  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      
      {/* 1. Header (Simplified for Context) */}
      <header className="h-14 border-b border-zinc-800 flex items-center px-4 bg-zinc-950 flex-shrink-0">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center text-zinc-950 font-bold text-xs">TP</div>
            TradePulse
          </span>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-zinc-400">
            <span className="text-zinc-100">Markets</span>
            <span className="hover:text-zinc-100 cursor-pointer">Trade</span>
            <span className="hover:text-zinc-100 cursor-pointer">Derivatives</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
           {/* Asset Snapshot in Header */}
           <div className="hidden lg:flex flex-col items-end mr-4">
              <span className="text-[10px] text-zinc-500 uppercase">Est. Balance</span>
              <span className="text-sm font-mono font-medium">$24,050.23</span>
           </div>
           <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">
             JD
           </div>
        </div>
      </header>

      {/* 2. Sub-Header (Ticker Info) */}
      <div className="h-14 border-b border-zinc-800 flex items-center px-4 bg-zinc-950 flex-shrink-0">
         <div className="flex items-center gap-2 cursor-pointer hover:bg-zinc-900 p-1 rounded pr-3">
            <h1 className="text-xl font-bold">BTC/USDT</h1>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
         </div>
         <Separator orientation="vertical" className="h-6 mx-4 bg-zinc-800" />
         <div className="flex items-center gap-6 text-xs">
            <div className="flex flex-col">
               <span className="text-emerald-500 font-bold text-sm font-mono">42,095.50</span>
               <span className="text-zinc-500">≈ $42,095.50</span>
            </div>
            <div className="flex flex-col">
               <span className="text-zinc-500 text-[10px]">24h Change</span>
               <span className="text-emerald-500 font-mono">+2.45%</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
               <span className="text-zinc-500 text-[10px]">24h High</span>
               <span className="text-zinc-200 font-mono">43,100.00</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
               <span className="text-zinc-500 text-[10px]">24h Low</span>
               <span className="text-zinc-200 font-mono">41,200.00</span>
            </div>
            <div className="flex flex-col hidden md:flex">
               <span className="text-zinc-500 text-[10px]">24h Vol(BTC)</span>
               <span className="text-zinc-200 font-mono">14,230.55</span>
            </div>
         </div>
      </div>

      {/* 3. Main Grid Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN: Chart & Order Management (Flexible width) */}
        <div className="flex-1 flex flex-col min-w-0">
           {/* Chart Placeholder (Taking up 60-70% height) */}
           <div className="flex-[2] relative border-b border-zinc-800 bg-zinc-900/20 p-4">
              {/* Fake Chart Visuals just for aesthetics */}
              <div className="absolute top-4 left-4 flex gap-2">
                 <Button variant="ghost" size="sm" className="h-6 text-xs bg-zinc-800 text-zinc-300">Time</Button>
                 <Button variant="ghost" size="sm" className="h-6 text-xs text-zinc-500">15m</Button>
                 <Button variant="ghost" size="sm" className="h-6 text-xs text-emerald-500 bg-zinc-900">1H</Button>
                 <Button variant="ghost" size="sm" className="h-6 text-xs text-zinc-500">4H</Button>
                 <Button variant="ghost" size="sm" className="h-6 text-xs text-zinc-500">1D</Button>
                 <Separator orientation="vertical" className="h-4 bg-zinc-700 mx-1 self-center" />
                 <Button variant="ghost" size="sm" className="h-6 text-xs text-zinc-500"><Clock className="w-3 h-3 mr-1"/> Indicators</Button>
              </div>
              <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-sm">
                 TradingView Chart Component
              </div>
           </div>

           {/* BOTTOM PANEL: Order Management */}
           <div className="flex-1 min-h-[250px] max-h-[350px]">
              <OrderManagement />
           </div>
        </div>

        {/* MIDDLE COLUMN: Orderbook & Recent Trades (Fixed width) */}
        <div className="hidden lg:flex flex-col w-[300px] border-l border-zinc-800">
           <div className="h-[60%] border-b border-zinc-800">
              <OrderBook />
           </div>
           <div className="h-[40%]">
              <MarketTrades />
           </div>
        </div>

        {/* RIGHT COLUMN: Order Creation (Fixed width) */}
        <div className="hidden xl:flex flex-col w-[300px] border-l border-zinc-800">
           <OrderForm />
        </div>

      </div>
    </div>
  );
}