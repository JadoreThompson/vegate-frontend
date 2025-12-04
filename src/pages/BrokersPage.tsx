import { AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { useState, type FC } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
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

type Broker = {
  id: string;
  name: string;
  logo: string;
  description: string;
  authType: "oauth" | "api_key";
  oauthUrl?: string;
  status: "available" | "connected" | "coming_soon";
  connectedAccount?: {
    accountId: string;
    balance: number;
    lastSync: string;
  };
};

const BrokersPage: FC = () => {
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);

  const brokers: Broker[] = [
    {
      id: "alpaca",
      name: "Alpaca",
      logo: "🦙",
      description: "Commission-free trading API",
      authType: "oauth",
      oauthUrl: "https://app.alpaca.markets/oauth/authorize",
      status: "connected",
      connectedAccount: {
        accountId: "PAXXX12345",
        balance: 124580.32,
        lastSync: "2 minutes ago",
      },
    },
    {
      id: "ig",
      name: "IG Markets",
      logo: "🏦",
      description: "Global multi-asset broker",
      authType: "api_key",
      status: "available",
    },
    {
      id: "interactive",
      name: "Interactive Brokers",
      logo: "📊",
      description: "Professional trading platform",
      authType: "oauth",
      status: "coming_soon",
    },
    {
      id: "tradier",
      name: "Tradier",
      logo: "📈",
      description: "Cloud-based brokerage API",
      authType: "api_key",
      status: "coming_soon",
    },
    {
      id: "robinhood",
      name: "Robinhood",
      logo: "🪶",
      description: "Mobile-first trading",
      authType: "oauth",
      status: "coming_soon",
    },
    {
      id: "etrade",
      name: "E*TRADE",
      logo: "💼",
      description: "Full-service broker",
      authType: "oauth",
      status: "coming_soon",
    },
    {
      id: "schwab",
      name: "Charles Schwab",
      logo: "🏛️",
      description: "Investment services",
      authType: "oauth",
      status: "coming_soon",
    },
    {
      id: "fidelity",
      name: "Fidelity",
      logo: "💎",
      description: "Investment management",
      authType: "oauth",
      status: "coming_soon",
    },
  ];

  const handleBrokerClick = (broker: Broker) => {
    setSelectedBroker(broker);
    setConnectDialogOpen(true);
  };

  const handleOAuthConnect = () => {
    if (selectedBroker?.oauthUrl) {
      window.open(selectedBroker.oauthUrl, "_blank");
      setConnectDialogOpen(false);
    }
  };

  const handleApiKeyConnect = () => {
    // Handle API key connection
    setConnectDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Connect Your Broker
          </h2>
          <p className="text-muted-foreground mt-2">
            Choose a broker to start automated trading
          </p>
        </div>

        {/* Brokers Grid - Centered and grows outward */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {brokers.map((broker) => (
              <Button
                key={broker.id}
                onClick={() => handleBrokerClick(broker)}
                disabled={broker.status === "coming_soon"}
                className={`h-36 w-36 group relative flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 transition-all ${
                  broker.status === "connected"
                    ? "border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10"
                    : broker.status === "coming_soon"
                      ? "border-border bg-muted/20 cursor-not-allowed opacity-50"
                      : "border-border bg-card hover:bg-accent hover:border-emerald-500/50"
                }`}
              >
                {/* Connected Badge */}
                {broker.status === "connected" && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                )}

                {/* Coming Soon Badge */}
                {broker.status === "coming_soon" && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-muted rounded-full px-2 py-0.5 text-[10px] font-medium">
                      Soon
                    </span>
                  </div>
                )}

                {/* Logo */}
                <div className="text-5xl">{broker.logo}</div>

                {/* Broker Name */}
                <div className="text-center">
                  <p className="text-sm font-semibold">{broker.name}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="text-muted-foreground mx-auto max-w-2xl text-center text-sm">
          <p>
            Your API credentials are encrypted and stored securely. We never
            have access to withdraw funds from your accounts.
          </p>
        </div>
      </div>

      {/* Connection Dialog */}
      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-3xl">{selectedBroker?.logo}</span>
              <span>Connect {selectedBroker?.name}</span>
            </DialogTitle>
            <DialogDescription>{selectedBroker?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Already Connected */}
            {selectedBroker?.status === "connected" && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div className="flex-1 space-y-2">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Already Connected
                    </p>
                    {selectedBroker.connectedAccount && (
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          Account: {selectedBroker.connectedAccount.accountId}
                        </p>
                        <p className="text-muted-foreground">
                          Balance: $
                          {selectedBroker.connectedAccount.balance.toLocaleString()}
                        </p>
                        <p className="text-muted-foreground">
                          Last sync: {selectedBroker.connectedAccount.lastSync}
                        </p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-500/50"
                      >
                        Manage Connection
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/50 text-red-600 hover:bg-red-500/10 dark:text-red-400"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OAuth Connection */}
            {selectedBroker?.status === "available" &&
              selectedBroker?.authType === "oauth" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        <p className="font-medium">OAuth Authentication</p>
                        <p className="mt-1">
                          You'll be redirected to {selectedBroker.name} to
                          authorize vegate. We'll never have access to your
                          password.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleOAuthConnect}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Continue to {selectedBroker.name}
                  </Button>
                </div>
              )}

            {/* API Key Connection */}
            {selectedBroker?.status === "available" &&
              selectedBroker?.authType === "api_key" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      placeholder="Enter your API key"
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-secret">API Secret</Label>
                    <Input
                      id="api-secret"
                      placeholder="Enter your API secret"
                      type="password"
                    />
                  </div>

                  <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">
                        <p className="font-medium">Important:</p>
                        <p className="mt-1">
                          Make sure your API keys have trading permissions. We
                          recommend testing with paper trading first.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setConnectDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={handleApiKeyConnect}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              )}

            {/* Coming Soon */}
            {selectedBroker?.status === "coming_soon" && (
              <div className="border-border bg-muted/20 rounded-lg border p-4 text-center">
                <p className="font-semibold">Coming Soon</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {selectedBroker.name} integration is under development. Check
                  back soon!
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default BrokersPage;
