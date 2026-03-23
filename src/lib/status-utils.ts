import { BacktestStatus, DeploymentStatus } from "@/openapi";

export const getBacktestStatusColor = (status: BacktestStatus) => {
  switch (status) {
    case BacktestStatus.completed:
      return "bg-primary/10 text-primary dark:text-primary border-primary/20";
    case BacktestStatus.running:
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case BacktestStatus.pending:
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
    case BacktestStatus.failed:
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
  }
};

export const getDeploymentStatusColor = (status: DeploymentStatus) => {
  switch (status) {
    case DeploymentStatus.running:
      return "bg-primary/10 text-primary dark:text-primary border-primary/20";
    case DeploymentStatus.pending:
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
    case DeploymentStatus.error:
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case DeploymentStatus.stopped:
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
  }
};

export const getDeploymentStatusBadgeVariant = (
  status: DeploymentStatus,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case DeploymentStatus.running:
      return "default";
    case DeploymentStatus.stopped:
      return "secondary";
    case DeploymentStatus.error:
      return "destructive";
    case DeploymentStatus.pending:
      return "outline";
    default:
      return "secondary";
  }
};
