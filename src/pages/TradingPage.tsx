import {
    ArrowUp,
    ChevronDown,
    Maximize2,
    MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';

// Shadcn UI Components (assumed available)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Mock Data (Kept same for functionality) ---
const generateOrderBook = (count: number, startPrice: number, type: 'ask' | 'bid') => {
  return Array.from({ length: count }).map((_, i) => {
    const price = type === 'ask' 
      ? startPrice + (i * 0.5) + Math.random() 
      : startPrice - (i * 0.5) - Math.random();
    const size = Math.random() * 2;
    const total = Math.random() * 100; 
    return { 
      price: price.toFixed(2), 
      size: size.toFixed(4), 
      total: (size * price).toFixed(2),
      depth: Math.floor(Math.random() * 90) + 10 
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

// --- COMPONENT 1: ORDER BOOK (Refined) ---
const OrderBook = () => {
  const asks = generateOrderBook(14, 42100, 'ask').reverse();
  const bids = generateOrderBook(14, 42090, 'bid');

  const Row = ({ item, type }: { item: any, type: 'ask' | 'bid' }) => (
    <div className="group relative flex items-center justify-between text-[11px] leading-4 cursor-pointer hover:bg-zinc-800/40">
      <div 
        className={`absolute top-0 bottom-0 ${type === 'ask' ? 'right-0 bg-rose-500/10' : 'right-0 bg-emerald-500/10'} z-0`}
        style={{ width: `${item.depth}%` }}
      />
      <span className={`relative z-10 w-1/3 text-left pl-3 font-mono font-medium ${type === 'ask' ? 'text-rose-500' : 'text-emerald-500'}`}>
        {item.price}
      </span>
      <span className="relative z-10 w-1/3 text-right font-mono text-zinc-400 group-hover:text-zinc-200">
        {item.size}
      </span>
      <span className="relative z-10 w-1/3 text-right pr-3 font-mono text-zinc-500 hidden xl:block">
        {item.total}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#0E0E10] border-l border-zinc-800/60">
      <div className="px-3 py-2 flex justify-between items-center border-b border-zinc-800/60">
        <h3 className="text-xs font-semibold text-zinc-400">Order Book</h3>
        <div className="flex gap-1">
           <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-zinc-800 rounded-sm">
             <MoreHorizontal className="h-3 w-3 text-zinc-500" />
           </Button>
        </div>
      </div>
      
      <div className="flex text-[10px] text-zinc-500 px-3 py-1 font-medium">
        <span className="w-1/3 text-left">Price(USDT)</span>
        <span className="w-1/3 text-right">Amount(BTC)</span>
        <span className="w-1/3 text-right hidden xl:block">Total</span>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-hidden">
          {asks.map((item, i) => <Row key={i} item={item} type="ask" />)}
        </div>
        
        <div className="py-2 px-3 my-0.5 border-y border-zinc-800/60 flex items-center gap-3">
          <span className="text-base font-bold text-emerald-500 font-mono tracking-tight">42,095.50</span>
          <span className="text-xs text-zinc-500 font-mono">$42,095.50</span>
        </div>

        <div className="flex-1 overflow-hidden">
           {bids.map((item, i) => <Row key={i} item={item} type="bid" />)}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 2: MARKET TRADES (Refined) ---
const MarketTrades = () => {
  const trades = generateTrades(18);

  return (
    <div className="flex flex-col h-full bg-[#0E0E10] border-l border-zinc-800/60">
      <div className="px-3 py-2 border-b border-zinc-800/60">
        <h3 className="text-xs font-semibold text-zinc-400">Market Trades</h3>
      </div>
      <div className="flex text-[10px] text-zinc-500 px-3 py-1 font-medium">
        <span className="w-1/3 text-left">Price(USDT)</span>
        <span className="w-1/3 text-right">Amount(BTC)</span>
        <span className="w-1/3 text-right">Time</span>
      </div>
      <ScrollArea className="flex-1">
        {trades.map((trade, i) => (
          <div key={i} className="flex items-center justify-between text-[11px] leading-4 py-0.5 px-3 hover:bg-zinc-800/40 cursor-pointer">
            <span className={`w-1/3 text-left font-mono font-medium ${trade.side === 'buy' ? 'text-emerald-500' : 'text-rose-500'}`}>
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

// --- COMPONENT 3: ORDER CREATION (Refined) ---
const OrderForm = () => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');

  return (
    <div className="flex flex-col h-full bg-[#0E0E10] border-l border-zinc-800/60 px-4 py-4">
      <div className="grid grid-cols-2 gap-0 mb-5 bg-zinc-900/50 p-1 rounded-sm">
        <Button 
          variant="ghost"
          size="sm"
          className={`w-full text-xs font-bold rounded-sm h-7 transition-all ${side === 'buy' ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          onClick={() => setSide('buy')}
        >
          Buy
        </Button>
        <Button 
          variant="ghost"
          size="sm"
          className={`w-full text-xs font-bold rounded-sm h-7 transition-all ${side === 'sell' ? 'bg-rose-600 text-white hover:bg-rose-700 hover:text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          onClick={() => setSide('sell')}
        >
          Sell
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-xs font-medium text-zinc-100 border-b-2 border-zinc-500 pb-0.5 cursor-pointer">Limit</span>
        <span className="text-xs font-medium text-zinc-500 hover:text-zinc-300 cursor-pointer">Market</span>
        <span className="text-xs font-medium text-zinc-500 hover:text-zinc-300 cursor-pointer">Stop Limit</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-zinc-500">
            <span>Price (USDT)</span>
          </div>
          <div className="relative">
            <Input 
              type="text" 
              defaultValue="42095.50" 
              className="bg-zinc-900/50 border-transparent hover:border-zinc-700 focus:border-emerald-600 text-right font-mono text-xs pr-10 h-9 rounded-sm transition-colors" 
            />
            <span className="absolute right-3 top-2.5 text-[10px] text-zinc-500 font-bold">USDT</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-zinc-500">
            <span>Amount (BTC)</span>
          </div>
          <div className="relative">
            <Input 
              type="text" 
              placeholder="0.00" 
              className="bg-zinc-900/50 border-transparent hover:border-zinc-700 focus:border-emerald-600 text-right font-mono text-xs pr-10 h-9 rounded-sm transition-colors" 
            />
            <span className="absolute right-3 top-2.5 text-[10px] text-zinc-500 font-bold">BTC</span>
          </div>
        </div>

        <div className="pt-2 pb-2">
           <Slider defaultValue={[25]} max={100} step={25} className={`w-full ${side === 'buy' ? 'text-emerald-600' : 'text-rose-600'}`} />
        </div>

        <div className="space-y-1.5">
          <div className="relative">
             <Input 
              type="text" 
              placeholder="Total (USDT)" 
              readOnly
              className="bg-zinc-900/30 border-transparent text-right font-mono text-xs pr-10 h-9 rounded-sm opacity-80" 
            />
            <span className="absolute right-3 top-2.5 text-[10px] text-zinc-500 font-bold">USDT</span>
          </div>
        </div>

        <div className="pt-4">
           <div className="flex justify-between text-[11px] text-zinc-400 mb-2">
              <span>Avail:</span>
              <span className="font-mono text-zinc-200">14,203.44 USDT</span>
           </div>
           
           {side === 'buy' ? (
              <Button className="w-full font-bold h-9 bg-emerald-600 hover:bg-emerald-700 rounded-sm text-sm">
                Buy BTC
              </Button>
           ) : (
              <Button className="w-full font-bold h-9 bg-rose-600 hover:bg-rose-700 rounded-sm text-sm">
                Sell BTC
              </Button>
           )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 4: ORDER MANAGEMENT (New Snackbar Style) ---
const OrderManagement = () => {
  return (
    <div className="flex flex-col h-full bg-[#0E0E10] border-t border-zinc-800/60">
      <Tabs defaultValue="open-orders" className="w-full h-full flex flex-col">
        {/* SNACKBAR / FLOATING TABS DESIGN */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="bg-zinc-900/80 p-1 rounded-lg inline-flex items-center">
             <TabsList className="bg-transparent h-7 p-0 gap-1">
              <TabsTrigger 
                value="open-orders" 
                className="rounded-md data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400 h-full px-3 text-[11px] font-medium transition-all"
              >
                Open Orders (2)
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="rounded-md data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400 h-full px-3 text-[11px] font-medium transition-all"
              >
                Order History
              </TabsTrigger>
              <TabsTrigger 
                value="assets" 
                className="rounded-md data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400 h-full px-3 text-[11px] font-medium transition-all"
              >
                Assets
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors">
               <div className="w-3 h-3 rounded-sm border border-zinc-600" />
               <span>Hide other pairs</span>
            </div>
          </div>
        </div>

        <TabsContent value="open-orders" className="flex-1 p-0 m-0">
          <div className="w-full overflow-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="text-zinc-500 border-b border-zinc-800/40">
                <tr>
                  <th className="font-medium p-3 font-normal">Time</th>
                  <th className="font-medium p-3 font-normal">Pair</th>
                  <th className="font-medium p-3 font-normal">Type</th>
                  <th className="font-medium p-3 font-normal">Side</th>
                  <th className="font-medium p-3 text-right font-normal">Price</th>
                  <th className="font-medium p-3 text-right font-normal">Amount</th>
                  <th className="font-medium p-3 text-right font-normal">Filled</th>
                  <th className="font-medium p-3 text-right font-normal">Total</th>
                  <th className="font-medium p-3 text-center font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                {mockOpenOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="p-3 font-mono text-zinc-400">{order.time}</td>
                    <td className="p-3 font-bold text-zinc-200">{order.pair}</td>
                    <td className="p-3">{order.type}</td>
                    <td className={`p-3 font-semibold ${order.side === 'Buy' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {order.side}
                    </td>
                    <td className="p-3 text-right font-mono">{order.price}</td>
                    <td className="p-3 text-right font-mono">{order.amount}</td>
                    <td className="p-3 text-right font-mono">{order.filled}</td>
                    <td className="p-3 text-right font-mono">{order.total}</td>
                    <td className="p-3 text-center">
                      <Button variant="ghost" size="sm" className="h-5 px-2 text-[10px] text-zinc-400 hover:text-rose-500 hover:bg-rose-950/20 rounded-sm">
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- MAIN LAYOUT COMPONENT ---
export default function TradingPage() {
  return (
    <div className="flex flex-col h-screen bg-[#0b0e11] text-zinc-100 overflow-hidden font-sans">
      
      {/* 1. Header - Ultra Sleek & Compact */}
      <header className="h-12 border-b border-zinc-800/60 flex items-center px-4 bg-[#0E0E10] flex-shrink-0 z-50">
        <div className="flex items-center gap-6 mr-6">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-white cursor-pointer">
             <div className="w-5 h-5 bg-emerald-500 rounded-sm flex items-center justify-center">
               <ArrowUp className="w-3 h-3 text-black" />
             </div>
             TradePulse
          </div>
          
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-zinc-400">
            <a href="#" className="text-white">Markets</a>
            <a href="#" className="hover:text-white transition-colors">Spot</a>
            <a href="#" className="hover:text-white transition-colors">Futures</a>
          </nav>
        </div>

        <Separator orientation="vertical" className="h-4 bg-zinc-700 mr-4 hidden lg:block" />

        {/* Ticker Info - Compact Redesign */}
        <div className="flex items-center gap-4 flex-1">
           <div className="flex items-center gap-2 cursor-pointer hover:bg-zinc-800/50 p-1.5 rounded-sm transition-colors group">
              <span className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">BTC/USDT</span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
           </div>

           <div className="flex items-center gap-4 text-xs">
              <span className="text-emerald-500 font-bold text-base font-mono">42,095.50</span>
              <div className="flex flex-col leading-none gap-0.5">
                 <span className="text-[10px] text-zinc-500">24h Change</span>
                 <span className="text-emerald-500 font-mono font-medium">+2.45%</span>
              </div>
              <div className="flex flex-col leading-none gap-0.5 hidden sm:flex">
                 <span className="text-[10px] text-zinc-500">24h High</span>
                 <span className="text-zinc-300 font-mono">43,100.00</span>
              </div>
              <div className="flex flex-col leading-none gap-0.5 hidden sm:flex">
                 <span className="text-[10px] text-zinc-500">24h Low</span>
                 <span className="text-zinc-300 font-mono">41,200.00</span>
              </div>
              <div className="flex flex-col leading-none gap-0.5 hidden md:flex">
                 <span className="text-[10px] text-zinc-500">24h Vol</span>
                 <span className="text-zinc-300 font-mono">14,230M</span>
              </div>
           </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
           <div className="hidden lg:flex items-center gap-2 mr-2">
              <Button variant="ghost" size="sm" className="text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/50 h-8">
                Deposit
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/50 h-8">
                Orders
              </Button>
           </div>
           <Button size="sm" className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-medium h-8 rounded-sm">
             Connect Wallet
           </Button>
           <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-500 flex items-center justify-center text-xs font-bold border border-emerald-600/30">
             TP
           </div>
        </div>
      </header>

      {/* 2. Main Grid Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN: Chart & Order Management */}
        <div className="flex-1 flex flex-col min-w-0">
           
           {/* Chart Toolbar (Bitget Style - Text Only) */}
           <div className="h-10 border-b border-zinc-800/60 bg-[#0E0E10] flex items-center px-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
                  <span className="hover:text-emerald-500 cursor-pointer text-zinc-200">Time</span>
                  <span className="hover:text-emerald-500 cursor-pointer">15m</span>
                  <span className="text-emerald-500 cursor-pointer">1H</span>
                  <span className="hover:text-emerald-500 cursor-pointer">4H</span>
                  <span className="hover:text-emerald-500 cursor-pointer">1D</span>
                  <ChevronDown className="w-3 h-3 text-zinc-600" />
                </div>
                <Separator orientation="vertical" className="h-3 bg-zinc-700" />
                <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
                   <span className="hover:text-zinc-200 cursor-pointer">Indicators</span>
                   <span className="hover:text-zinc-200 cursor-pointer">Original</span>
                   <span className="text-zinc-200 cursor-pointer">TradingView</span>
                   <span className="hover:text-zinc-200 cursor-pointer">Depth</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <Maximize2 className="w-3 h-3 text-zinc-500 cursor-pointer hover:text-zinc-300" />
              </div>
           </div>

           {/* Chart Placeholder */}
           <div className="flex-[2] relative bg-[#0b0e11] p-1">
               {/* Grid Pattern for chart background */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ 
                  backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                  backgroundSize: '40px 40px' 
               }}></div>
               
               {/* Fake Candles */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-zinc-700 text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    TradingView Chart Integration
                  </div>
               </div>
           </div>

           {/* BOTTOM PANEL: Order Management */}
           <div className="flex-1 min-h-[280px] max-h-[350px]">
              <OrderManagement />
           </div>
        </div>

        {/* MIDDLE COLUMN: Orderbook & Recent Trades */}
        <div className="hidden lg:flex flex-col w-[280px] border-l border-zinc-800/60">
           <div className="h-[60%] border-b border-zinc-800/60">
              <OrderBook />
           </div>
           <div className="h-[40%]">
              <MarketTrades />
           </div>
        </div>

        {/* RIGHT COLUMN: Order Creation */}
        <div className="hidden xl:flex flex-col w-[280px] border-l border-zinc-800/60">
           <OrderForm />
        </div>

      </div>
    </div>
  );
}