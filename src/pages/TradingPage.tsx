import {
  ArrowUp,
  ChevronDown,
  Lock,
  LogOut,
  Mail,
  Menu,
  MoreHorizontal,
  Settings,
  User,
  X,
} from "lucide-react";
import { useState, type FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router";

const generateOrderBook = (
  count: number,
  startPrice: number,
  type: "ask" | "bid",
) => {
  return Array.from({ length: count }).map((_, i) => {
    const price =
      type === "ask"
        ? startPrice + i * 0.5 + Math.random()
        : startPrice - i * 0.5 - Math.random();
    const size = Math.random() * 2;
    return {
      price: price.toFixed(2),
      size: size.toFixed(4),
      total: (size * price).toFixed(2),
      depth: Math.floor(Math.random() * 90) + 10,
    };
  });
};

const generateTrades = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    price: (42000 + Math.random() * 100).toFixed(2),
    amount: (Math.random() * 0.5).toFixed(4),
    time: new Date(Date.now() - i * 1000).toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    side: Math.random() > 0.5 ? "buy" : "sell",
  }));
};

const mockOpenOrders = [
  {
    id: 1,
    time: "12:30:45",
    pair: "BTC/USDT",
    type: "Limit",
    side: "Buy",
    price: "41,500.00",
    amount: "0.500",
    filled: "0.00%",
    total: "20,750.00",
  },
  {
    id: 2,
    time: "11:15:20",
    pair: "ETH/USDT",
    type: "Market",
    side: "Sell",
    price: "2,250.00",
    amount: "12.000",
    filled: "45.00%",
    total: "27,000.00",
  },
];

// --- COMPONENT: SETTINGS DIALOG ---
const SettingsDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] rounded-lg border-zinc-800 bg-[#0E0E10] text-zinc-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Account Settings
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Manage your account credentials and preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Change Email Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-500">
              <Mail className="h-4 w-4" />
              Change Email
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-email" className="text-xs text-zinc-400">
                Current Email
              </Label>
              <Input
                id="current-email"
                defaultValue="trader@tradepulse.com"
                readOnly
                className="border-zinc-800 bg-zinc-900/50 text-zinc-500 focus-visible:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email" className="text-xs text-zinc-400">
                New Email
              </Label>
              <Input
                id="new-email"
                placeholder="Enter new email address"
                className="border-zinc-800 bg-zinc-900/50 text-white transition-colors placeholder:text-zinc-600 focus:border-emerald-600"
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                className="h-8 bg-zinc-800 text-xs text-white hover:bg-zinc-700"
              >
                Update Email
              </Button>
            </div>
          </div>

          <Separator className="bg-zinc-800" />

          {/* Change Password Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-500">
              <Lock className="h-4 w-4" />
              Change Password
            </div>
            <div className="space-y-2">
              <Label htmlFor="curr-pass" className="text-xs text-zinc-400">
                Current Password
              </Label>
              <Input
                id="curr-pass"
                type="password"
                placeholder="••••••••"
                className="border-zinc-800 bg-zinc-900/50 text-white transition-colors placeholder:text-zinc-600 focus:border-emerald-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-pass" className="text-xs text-zinc-400">
                New Password
              </Label>
              <Input
                id="new-pass"
                type="password"
                placeholder="Enter new password"
                className="border-zinc-800 bg-zinc-900/50 text-white transition-colors placeholder:text-zinc-600 focus:border-emerald-600"
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                className="h-8 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// --- COMPONENT 1: ORDER BOOK ---
const OrderBook = ({ mobileCompact = false }: { mobileCompact?: boolean }) => {
  // Show fewer rows on mobile compact view
  const rows = mobileCompact ? 6 : 14;
  const asks = generateOrderBook(rows, 42100, "ask").reverse();
  const bids = generateOrderBook(rows, 42090, "bid");

  const Row = ({ item, type }: { item: any; type: "ask" | "bid" }) => (
    <div className="group relative flex cursor-pointer items-center justify-between text-[11px] leading-4 hover:bg-zinc-800/40">
      <div
        className={`absolute top-0 bottom-0 ${type === "ask" ? "right-0 bg-rose-500/10" : "right-0 bg-emerald-500/10"} z-0`}
        style={{ width: `${item.depth}%` }}
      />
      <span
        className={`relative z-10 w-1/3 pl-3 text-left font-mono font-medium ${type === "ask" ? "text-rose-500" : "text-emerald-500"}`}
      >
        {item.price}
      </span>
      <span className="relative z-10 w-1/3 text-right font-mono text-zinc-400 group-hover:text-zinc-200">
        {item.size}
      </span>
      <span className="relative z-10 hidden w-1/3 pr-3 text-right font-mono text-zinc-500 xl:block">
        {item.total}
      </span>
    </div>
  );

  return (
    <div
      className={`flex h-full flex-col bg-[#0E0E10] ${!mobileCompact ? "border-l border-zinc-800/60" : ""}`}
    >
      {!mobileCompact && (
        <div className="flex items-center justify-between border-b border-zinc-800/60 px-3 py-2">
          <h3 className="text-xs font-semibold text-zinc-400">Order Book</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 rounded-sm hover:bg-zinc-800"
          >
            <MoreHorizontal className="h-3 w-3 text-zinc-500" />
          </Button>
        </div>
      )}

      <div className="flex px-3 py-1 text-[10px] font-medium text-zinc-500">
        <span className="w-1/3 text-left">Price</span>
        <span className="w-1/3 text-right">Amount</span>
        <span className="hidden w-1/3 text-right xl:block">Total</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div
          className={`flex-1 overflow-hidden ${mobileCompact ? "h-auto" : ""}`}
        >
          {asks.map((item, i) => (
            <Row key={i} item={item} type="ask" />
          ))}
        </div>

        <div className="my-0.5 flex items-center gap-3 border-y border-zinc-800/60 bg-zinc-900/30 px-3 py-2">
          <span className="font-mono text-sm font-bold tracking-tight text-emerald-500 sm:text-base">
            42,095.50
          </span>
          <ArrowUp className="h-3 w-3 text-emerald-500" />
        </div>

        <div
          className={`flex-1 overflow-hidden ${mobileCompact ? "h-auto" : ""}`}
        >
          {bids.map((item, i) => (
            <Row key={i} item={item} type="bid" />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 2: MARKET TRADES ---
const MarketTrades = () => {
  const trades = generateTrades(18);

  return (
    <div className="flex h-full flex-col border-l border-zinc-800/60 bg-[#0E0E10]">
      <div className="border-b border-zinc-800/60 px-3 py-2">
        <h3 className="text-xs font-semibold text-zinc-400">Market Trades</h3>
      </div>
      <div className="flex px-3 py-1 text-[10px] font-medium text-zinc-500">
        <span className="w-1/3 text-left">Price</span>
        <span className="w-1/3 text-right">Amount</span>
        <span className="w-1/3 text-right">Time</span>
      </div>
      <ScrollArea className="flex-1">
        {trades.map((trade, i) => (
          <div
            key={i}
            className="flex cursor-pointer items-center justify-between px-3 py-0.5 text-[11px] leading-4 hover:bg-zinc-800/40"
          >
            <span
              className={`w-1/3 text-left font-mono font-medium ${trade.side === "buy" ? "text-emerald-500" : "text-rose-500"}`}
            >
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

// --- COMPONENT 3: ORDER CREATION ---
const OrderForm = ({ mobile = false }: { mobile?: boolean }) => {
  const [side, setSide] = useState<"buy" | "sell">("buy");

  return (
    <div
      className={`flex h-full flex-col bg-[#0E0E10] ${!mobile ? "border-l border-zinc-800/60" : "border-t border-zinc-800/60"} px-4 py-4`}
    >
      <div className="mb-5 grid grid-cols-2 gap-0 rounded-sm bg-zinc-900/50 p-1">
        <Button
          variant="ghost"
          size="sm"
          className={`h-7 w-full rounded-sm text-xs font-bold transition-all ${side === "buy" ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          onClick={() => setSide("buy")}
        >
          Buy
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-7 w-full rounded-sm text-xs font-bold transition-all ${side === "sell" ? "bg-rose-600 text-white hover:bg-rose-700 hover:text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          onClick={() => setSide("sell")}
        >
          Sell
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <span className="cursor-pointer border-b-2 border-zinc-500 pb-0.5 text-xs font-medium text-zinc-100">
          Limit
        </span>
        <span className="cursor-pointer text-xs font-medium text-zinc-500 hover:text-zinc-300">
          Market
        </span>
        <span className="cursor-pointer text-xs font-medium text-zinc-500 hover:text-zinc-300">
          Stop
        </span>
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
              className="h-9 rounded-sm border-transparent bg-zinc-900/50 pr-10 text-right font-mono text-xs transition-colors hover:border-zinc-700 focus:border-emerald-600"
            />
            <span className="absolute top-2.5 right-3 text-[10px] font-bold text-zinc-500">
              USDT
            </span>
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
              className="h-9 rounded-sm border-transparent bg-zinc-900/50 pr-10 text-right font-mono text-xs transition-colors hover:border-zinc-700 focus:border-emerald-600"
            />
            <span className="absolute top-2.5 right-3 text-[10px] font-bold text-zinc-500">
              BTC
            </span>
          </div>
        </div>

        <div className="pt-2 pb-2">
          <Slider
            defaultValue={[25]}
            max={100}
            step={25}
            className={`w-full ${side === "buy" ? "text-emerald-600" : "text-rose-600"}`}
          />
        </div>

        <div className="space-y-1.5">
          <div className="relative">
            <Input
              type="text"
              placeholder="Total (USDT)"
              readOnly
              className="h-9 rounded-sm border-transparent bg-zinc-900/30 pr-10 text-right font-mono text-xs opacity-80"
            />
            <span className="absolute top-2.5 right-3 text-[10px] font-bold text-zinc-500">
              USDT
            </span>
          </div>
        </div>

        <div className="pt-4">
          <div className="mb-2 flex justify-between text-[11px] text-zinc-400">
            <span>Avail:</span>
            <span className="font-mono text-zinc-200">14,203.44</span>
          </div>

          {side === "buy" ? (
            <Button className="h-9 w-full rounded-sm bg-emerald-600 text-sm font-bold hover:bg-emerald-700">
              Buy BTC
            </Button>
          ) : (
            <Button className="h-9 w-full rounded-sm bg-rose-600 text-sm font-bold hover:bg-rose-700">
              Sell BTC
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 4: ORDER MANAGEMENT (Optimized for Mobile) ---
const OrderManagement = () => {
  return (
    <div className="flex h-full flex-col border-t border-zinc-800/60 bg-[#0E0E10]">
      <Tabs defaultValue="open-orders" className="flex h-full w-full flex-col">
        {/* SNACKBAR / FLOATING TABS DESIGN */}
        <div className="flex items-center justify-between px-2 py-3 sm:px-4">
          {/* Scrollable container for mobile tabs */}
          <div className="no-scrollbar inline-flex max-w-full items-center overflow-x-auto rounded-lg bg-zinc-900/80 p-1">
            <TabsList className="h-6 flex-shrink-0 gap-1 bg-transparent p-0 sm:h-7">
              <TabsTrigger
                value="open-orders"
                className="h-full rounded-md px-2 text-[10px] font-medium whitespace-nowrap text-zinc-400 transition-all data-[state=active]:bg-zinc-700 data-[state=active]:text-white sm:px-3 sm:text-[11px]"
              >
                Open Orders (2)
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="h-full rounded-md px-2 text-[10px] font-medium whitespace-nowrap text-zinc-400 transition-all data-[state=active]:bg-zinc-700 data-[state=active]:text-white sm:px-3 sm:text-[11px]"
              >
                History
              </TabsTrigger>
              <TabsTrigger
                value="assets"
                className="h-full rounded-md px-2 text-[10px] font-medium whitespace-nowrap text-zinc-400 transition-all data-[state=active]:bg-zinc-700 data-[state=active]:text-white sm:px-3 sm:text-[11px]"
              >
                Assets
              </TabsTrigger>
              <TabsTrigger
                value="bots"
                className="h-full rounded-md px-2 text-[10px] font-medium whitespace-nowrap text-zinc-400 transition-all data-[state=active]:bg-zinc-700 data-[state=active]:text-white sm:px-3 sm:text-[11px]"
              >
                Bots
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex cursor-pointer items-center gap-2 text-[11px] text-zinc-400 transition-colors hover:text-zinc-200">
              <div className="h-3 w-3 rounded-sm border border-zinc-600" />
              <span>Hide other pairs</span>
            </div>
          </div>
        </div>

        <TabsContent value="open-orders" className="m-0 flex-1 p-0">
          <div className="w-full overflow-auto">
            <table className="w-full text-left text-[10px] whitespace-nowrap sm:text-[11px]">
              <thead className="border-b border-zinc-800/40 text-zinc-500">
                <tr>
                  <th className="p-2 font-medium font-normal sm:p-3">Time</th>
                  <th className="p-2 font-medium font-normal sm:p-3">Pair</th>
                  <th className="p-2 font-medium font-normal sm:p-3">Side</th>
                  <th className="p-2 text-right font-medium font-normal sm:p-3">
                    Price
                  </th>
                  <th className="p-2 text-right font-medium font-normal sm:p-3">
                    Amount
                  </th>
                  <th className="p-2 text-right font-medium font-normal sm:p-3">
                    Filled
                  </th>
                  <th className="p-2 text-center font-medium font-normal sm:p-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                {mockOpenOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-zinc-800/20"
                  >
                    <td className="p-2 font-mono text-zinc-400 sm:p-3">
                      {order.time}
                    </td>
                    <td className="p-2 font-bold text-zinc-200 sm:p-3">
                      {order.pair}
                    </td>
                    <td
                      className={`p-2 font-semibold sm:p-3 ${order.side === "Buy" ? "text-emerald-500" : "text-rose-500"}`}
                    >
                      {order.side}
                    </td>
                    <td className="p-2 text-right font-mono sm:p-3">
                      {order.price}
                    </td>
                    <td className="p-2 text-right font-mono sm:p-3">
                      {order.amount}
                    </td>
                    <td className="p-2 text-right font-mono sm:p-3">
                      {order.filled}
                    </td>
                    <td className="p-2 text-center sm:p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 rounded-sm px-2 text-[10px] text-zinc-400 hover:bg-rose-950/20 hover:text-rose-500"
                      >
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
const TradingPage: FC = () => {
  const symbol = useParams() as {symbol: string};
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0b0e11] font-sans text-zinc-100">
      {/* Settings Modal Component */}
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />

      {/* 1. HEADER - Mobile Optimized */}
      <header className="z-50 flex h-12 flex-shrink-0 items-center justify-between border-b border-zinc-800/60 bg-[#0E0E10] px-4">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-zinc-400 lg:hidden" />
          <div className="flex cursor-pointer items-center gap-2 text-lg font-bold tracking-tight text-white">
            <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-emerald-500">
              <ArrowUp className="h-3 w-3 text-black" />
            </div>
            <span className="hidden sm:inline">TradePulse</span>
            <span className="text-base sm:hidden">TradePulse</span>
          </div>

          <nav className="ml-4 hidden items-center gap-5 text-sm font-medium text-zinc-400 lg:flex">
            <a href="#" className="text-white">
              Markets
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Spot
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Futures
            </a>
          </nav>
        </div>

        {/* User Actions - Popover Implementation */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <Button
              size="sm"
              className="h-8 rounded-sm border border-zinc-700 bg-zinc-800 text-xs font-medium text-white hover:bg-zinc-700"
            >
              Connect Wallet
            </Button>

            {/* User Menu Trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-600/20 text-xs font-bold text-emerald-500 transition-colors hover:bg-emerald-600/30">
                  TP
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-48 border-zinc-800 bg-[#0E0E10] p-1 shadow-xl"
              >
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="h-8 w-full justify-start px-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    <Settings className="mr-2 h-3.5 w-3.5 text-zinc-500" />
                    Settings
                  </Button>
                  <Separator className="my-1 bg-zinc-800/50" />
                  <Button
                    variant="ghost"
                    className="h-8 w-full justify-start px-2 text-xs font-medium text-rose-500 hover:bg-rose-950/20 hover:text-rose-400"
                  >
                    <LogOut className="mr-2 h-3.5 w-3.5" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile Connect (fallback) */}
          <div className="flex items-center gap-1 rounded-sm bg-zinc-800 px-2 py-1 text-xs font-medium sm:hidden">
            {/* Note: Mobile usually needs a different menu structure, but putting the Popover here as well for consistency if needed, or keeping the basic wallet connect */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 text-zinc-400" />
                  <span>Account</span>
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-48 border-zinc-800 bg-[#0E0E10] p-1 shadow-xl"
              >
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="h-8 w-full justify-start px-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    <Settings className="mr-2 h-3.5 w-3.5 text-zinc-500" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-8 w-full justify-start px-2 text-xs font-medium text-rose-500 hover:bg-rose-950/20 hover:text-rose-400"
                  >
                    <LogOut className="mr-2 h-3.5 w-3.5" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* 2. SUB-HEADER / TICKER - Responsive Wrapping */}
      {/* 2. SUB-HEADER / TICKER */}
      <div className="flex min-h-12 flex-wrap items-center gap-y-2 border-b border-zinc-800/60 bg-[#0E0E10] px-4 py-3">
        {/* TICKER DROPDOWN (Common) */}
        <div className="group mr-auto flex cursor-pointer items-center gap-2 rounded-sm p-1 transition-colors hover:bg-zinc-800/50 md:mr-4">
          <span className="text-lg font-bold text-white transition-colors group-hover:text-emerald-400">
            BTC/USDT
          </span>
          <ChevronDown className="h-3 w-3 text-zinc-500" />
        </div>

        {/* DESKTOP STATS (Row Layout - Hidden on Mobile) */}
        <div className="ml-2 hidden items-center gap-6 text-xs md:flex">
          <span className="font-mono text-lg font-bold text-emerald-500">
            42,095.50
          </span>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[10px] text-zinc-500">24h Change</span>
            <span className="font-mono font-medium text-emerald-500">
              +2.45%
            </span>
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[10px] text-zinc-500">24h High</span>
            <span className="font-mono text-zinc-300">43,100.00</span>
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[10px] text-zinc-500">24h Low</span>
            <span className="font-mono text-zinc-300">41,200.00</span>
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[10px] text-zinc-500">24h Vol</span>
            <span className="font-mono text-zinc-300">14,230M</span>
          </div>
        </div>

        {/* MOBILE STATS (Grid Layout - Hidden on Desktop) */}
        <div className="mt-1 flex w-full flex-col gap-2 md:hidden">
          {/* Big Price Display */}
          <div className="flex items-center justify-between border-b border-zinc-800/40 pb-2">
            <span className="font-mono text-2xl font-bold text-emerald-500">
              42,095.50
            </span>
            <span className="rounded-sm bg-emerald-500/10 px-2 py-1 font-mono text-xs font-bold text-emerald-500">
              +2.45%
            </span>
          </div>

          {/* Stats Grid - Justified Between */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {/* 24h Change (Percentage) */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-500">
                24h Change
              </span>
              <span className="font-mono text-xs text-emerald-500">
                +1,023.50
              </span>
            </div>

            {/* 24h High */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-500">
                24h High
              </span>
              <span className="font-mono text-xs text-zinc-200">43,100</span>
            </div>

            {/* 24h Low */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-500">
                24h Low
              </span>
              <span className="font-mono text-xs text-zinc-200">41,200</span>
            </div>

            {/* 24h Vol */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-500">
                24h Vol
              </span>
              <span className="font-mono text-xs text-zinc-200">14.2M</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT GRID */}
      {/* Mobile: Flex Column (Scrollable), Desktop: Flex Row (Fixed) */}
      <div className="flex flex-1 flex-col overflow-y-auto pb-20 lg:flex-row lg:overflow-hidden lg:pb-0">
        {/* LEFT COLUMN (Chart & Orders) - 100% width on mobile */}
        <div className="flex min-h-0 w-full flex-shrink-0 flex-col lg:flex-1">
          {/* Chart Toolbar */}
          <div className="flex h-9 flex-shrink-0 items-center justify-between border-b border-zinc-800/60 bg-[#0E0E10] px-2 sm:h-10 sm:px-4">
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto sm:gap-4">
              <div className="flex items-center gap-2 text-xs font-medium whitespace-nowrap text-zinc-500 sm:gap-3">
                <span className="text-zinc-200">Time</span>
                <span className="text-emerald-500">1H</span>
                <span>4H</span>
                <span className="hidden sm:inline">1D</span>
                <ChevronDown className="h-3 w-3 text-zinc-600" />
              </div>
              <Separator orientation="vertical" className="h-3 bg-zinc-700" />
              <div className="flex items-center gap-2 text-xs font-medium whitespace-nowrap text-zinc-500 sm:gap-3">
                <span className="text-zinc-200">Chart</span>
                <span className="inline sm:hidden">Orderbook</span>
                <span className="inline sm:hidden">Market trades</span>
              </div>
            </div>
          </div>

          {/* Chart Area - Fixed height on mobile, Flex on desktop */}
          <div className="relative h-[300px] flex-shrink-0 border-b border-zinc-800/60 bg-[#0b0e11] p-1 lg:flex-[2] lg:border-none">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                TV Chart
              </div>
            </div>
          </div>

          {/* MOBILE ONLY: Stacked Components (Modified) */}
          <div className="block lg:hidden">
            {/* Inline OrderForm REMOVED here */}

            {/* Order Book (Compact version) */}
            <div className="hidden h-[300px] sm:flex">
              <OrderBook mobileCompact={true} />
            </div>

            <div className="h-2 border-y border-zinc-800/60 bg-[#0b0e11] sm:hidden"></div>
          </div>

          {/* Order Management - Bottom of page on mobile, Bottom of left col on desktop */}
          <div className="min-h-[300px] flex-1 lg:max-h-[350px] lg:min-h-[280px]">
            <OrderManagement />
          </div>
        </div>

        {/* MIDDLE COLUMN (Orderbook/Trades) - Hidden on Mobile */}
        <div className="hidden w-[280px] flex-shrink-0 flex-col border-l border-zinc-800/60 lg:flex">
          <div className="h-[60%] border-b border-zinc-800/60">
            <OrderBook />
          </div>
          <div className="h-[40%]">
            <MarketTrades />
          </div>
        </div>

        {/* RIGHT COLUMN (Order Form) - Hidden on Mobile */}
        <div className="hidden w-[280px] flex-shrink-0 flex-col border-l border-zinc-800/60 xl:flex">
          <OrderForm />
        </div>
      </div>

      {/* --- MOBILE FIXED BOTTOM BAR --- */}
      <div className="safe-area-bottom fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-800 bg-[#0E0E10] p-3 lg:hidden">
        <Button
          onClick={() => setIsTradeModalOpen(true)}
          className="h-11 w-full rounded-md bg-emerald-600 text-base font-bold text-white hover:bg-emerald-700"
        >
          Trade
        </Button>
      </div>

      {/* --- MOBILE TRADE MODAL (BOTTOM SHEET) --- */}
      {isTradeModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="animate-in fade-in fixed inset-0 z-50 bg-black/80 transition-opacity duration-200 lg:hidden"
            onClick={() => setIsTradeModalOpen(false)}
          />

          {/* Bottom Sheet Card */}
          <div className="animate-in slide-in-from-bottom fixed right-0 bottom-0 left-0 z-50 flex h-[65%] flex-col overflow-hidden rounded-t-[24px] border-t border-zinc-800 bg-[#0E0E10] shadow-2xl duration-300 lg:hidden">
            {/* Handle / Header */}
            <div className="relative flex shrink-0 items-center justify-center pt-3 pb-2">
              <div className="h-1.5 w-12 rounded-full bg-zinc-700" />
              <button
                onClick={() => setIsTradeModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <OrderForm mobile={true} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TradingPage;
