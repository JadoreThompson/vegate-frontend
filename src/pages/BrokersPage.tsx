import { AlertCircle, ExternalLink, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState, type FC } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAlpacaOAuthUrlQuery,
  useBrokerConnectionsQuery,
  useDeleteBrokerConnectionQuery,
} from "@/hooks/queries/broker-hooks";
import type { BrokerConnectionResponse } from "@/openapi";
type Broker = {
  id: string;
  name: string;
  logo: string;
  description: string;
  authType: "oauth" | "api_key";
  oauthUrl?: string;
  status: "available" | "coming_soon";
  connectedAccount?: {
    accountId: string;
    balance: number;
    lastSync: string;
  };
};

const BrokersPage: FC = () => {
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [connectionToDelete, setConnectionToDelete] = useState<string | null>(
    null,
  );

  const alpacaOAuthUrlQuery = useAlpacaOAuthUrlQuery();
  const brokerConnectionsQuery = useBrokerConnectionsQuery();
  const deleteBrokerConnectionMutation = useDeleteBrokerConnectionQuery();

  const connections =
    (brokerConnectionsQuery.data as BrokerConnectionResponse[] | undefined) ||
    [];

  const brokers: Broker[] = [
    {
      id: "alpaca",
      name: "Alpaca",
      logo: "🦙",
      description: "Commission-free trading API",
      authType: "oauth",
      oauthUrl: alpacaOAuthUrlQuery.data?.url,
      status: "available",
    },
    {
      id: "ig",
      name: "IG Markets",
      logo: "🏦",
      description: "Global multi-asset broker",
      authType: "api_key",
      status: "coming_soon",
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

  useEffect(() => {
    console.log("entered");
    console.log(alpacaOAuthUrlQuery.data);
    if (alpacaOAuthUrlQuery.data?.url) {
      brokers[0].oauthUrl = alpacaOAuthUrlQuery.data.url;
    }
  }, [alpacaOAuthUrlQuery.data]);

  const handleBrokerClick = (broker: Broker) => {
    setSelectedBroker(broker);
    setConnectDialogOpen(true);
  };

  const handleOAuthConnect = () => {
    if (selectedBroker?.id === "alpaca" && alpacaOAuthUrlQuery.data?.url) {
      window.open(alpacaOAuthUrlQuery.data.url, "_blank");
      setConnectDialogOpen(false);
    }
  };

  const handleApiKeyConnect = () => {
    // Handle API key connection
    setConnectDialogOpen(false);
  };

  const handleDeleteClick = (e: React.MouseEvent, connectionId: string) => {
    e.stopPropagation();
    setConnectionToDelete(connectionId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (connectionToDelete) {
      await deleteBrokerConnectionMutation.mutateAsync(connectionToDelete);
      setDeleteDialogOpen(false);
      setConnectionToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Broker Connections
          </h2>
          <p className="text-muted-foreground">
            Manage your broker connections for automated trading
          </p>
        </div>

        {/* Connected Brokers Table */}
        {connections.length > 0 && (
          <Card className="bg-transparent border-none">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-500">Broker</TableHead>
                    <TableHead className="text-gray-500">Account ID</TableHead>
                    <TableHead className="text-gray-500">
                      Connection ID
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connections.map((connection) => (
                    <TableRow key={connection.connection_id}>
                      <TableCell className="font-medium">
                        {connection.broker.charAt(0).toUpperCase() +
                          connection.broker.slice(1)}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {connection.broker_account_id}
                      </TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">
                        {connection.connection_id.substring(0, 16)}...
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-500/10 hover:text-red-700"
                          onClick={(e) =>
                            handleDeleteClick(e, connection.connection_id)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Add New Connection Section */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-center">Add New Connection</h3>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {brokers.map((broker) => (
                <Button
                  key={broker.id}
                  onClick={() => handleBrokerClick(broker)}
                  disabled={broker.status === "coming_soon"}
                  className={`group relative flex aspect-square h-36 w-36 flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 transition-all ${
                    broker.status === "coming_soon"
                      ? "border-border bg-muted/20 cursor-not-allowed opacity-50"
                      : "border-border bg-card hover:bg-accent hover:border-emerald-500/50"
                  }`}
                >
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
          <div className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-sm">
            <p>
              Your API credentials are encrypted and stored securely. We never
              have access to withdraw funds from your accounts.
            </p>
          </div>
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
            {/* OAuth Connection */}
            {selectedBroker?.status === "available" &&
              selectedBroker?.authType === "oauth" && (
                <div className="space-y-4">
                  {/* Show error if OAuth URL fetch failed */}
                  {selectedBroker.id === "alpaca" &&
                    alpacaOAuthUrlQuery.error && (
                      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />
                          <div className="text-sm text-red-600 dark:text-red-400">
                            <p className="font-medium">Connection Error</p>
                            <p className="mt-1">
                              Failed to load OAuth URL. Please try again later.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

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
                    disabled={
                      (selectedBroker.id === "alpaca" &&
                        (alpacaOAuthUrlQuery.isLoading ||
                          !alpacaOAuthUrlQuery.data?.url)) ||
                      (!selectedBroker.oauthUrl &&
                        selectedBroker.id !== "alpaca")
                    }
                  >
                    {selectedBroker.id === "alpaca" &&
                    alpacaOAuthUrlQuery.isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Continue to {selectedBroker.name}
                      </>
                    )}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Broker Connection</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this broker connection? This
              action cannot be undone and will stop any live deployments using
              this connection.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteBrokerConnectionMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteBrokerConnectionMutation.isPending}
            >
              {deleteBrokerConnectionMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default BrokersPage;
