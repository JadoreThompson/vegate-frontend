import { AlertCircle, CheckCircle2, Lock, Mail, User } from "lucide-react";
import { type FC, useState } from "react";

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
import { Separator } from "@/components/ui/separator";
import {
  useChangeEmailMutation,
  useChangePasswordMutation,
  useChangeUsernameMutation,
  useCurrentUser,
} from "@/hooks/queries/auth-hooks";

type ModalType = "username" | "email" | "password" | null;

type SettingRowProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

const SettingRow: FC<SettingRowProps> = (props) => {
  const Icon = props.icon;
  return (
    <div className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-start gap-3 sm:items-center">
        <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
          <Icon className="text-muted-foreground h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium">{props.title}</h3>
          <p className="text-muted-foreground text-sm">{props.description}</p>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={props.onClick}
        className="w-full shrink-0 !bg-input/30 sm:w-auto"
      >
        {props.buttonText}
      </Button>
    </div>
  );
};

const SettingsPageNew: FC = () => {
  const { data: currentUser } = useCurrentUser();
  const changeUsernameMutation = useChangeUsernameMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const changeEmailMutation = useChangeEmailMutation();

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOpenModal = (type: ModalType) => {
    setActiveModal(type);
    setShowSuccess(false);
    setError(null);
    setUsername("");
    setEmail("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setShowSuccess(false);
    setError(null);
  };

  const handleSubmit = async () => {
    setError(null);

    try {
      switch (activeModal) {
        case "username":
          await changeUsernameMutation.mutateAsync({ username: username });
          setShowSuccess(true);
          break;
        case "email":
          await changeEmailMutation.mutateAsync({ email: email });
          setShowSuccess(true);
          break;
        case "password":
          if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
          }
          await changePasswordMutation.mutateAsync({
            password: newPassword,
          });
          setShowSuccess(true);
          break;
      }
    } catch (err: any) {
      setError(err?.error || "An error occurred. Please try again.");
    }
  };

  const isLoading =
    changeUsernameMutation.isPending ||
    changePasswordMutation.isPending ||
    changeEmailMutation.isPending;

  const renderModalContent = () => {
    if (showSuccess) {
      return (
        <div className="py-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">
            Verification Email Sent
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            We've sent a verification email to your account. Please check your
            inbox to confirm the change.
          </p>
          <Button
            onClick={handleCloseModal}
            className="!bg-primary hover:bg-primary"
          >
            Close
          </Button>
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-4">
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />
              <div className="text-sm text-red-600 dark:text-red-400">
                <p className="font-medium">Error</p>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setError(null)}
            variant="outline"
            className="w-full"
          >
            Try Again
          </Button>
        </div>
      );
    }

    switch (activeModal) {
      case "username":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Change Username</DialogTitle>
              <DialogDescription>
                Enter your new username below. You'll receive a verification
                email to confirm this change.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username">New Username</Label>
                <Input
                  id="username"
                  placeholder="Enter new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal} className="!bg-input/30">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !username}
                className="!bg-primary hover:bg-primary"
              >
                {isLoading ? "Processing..." : "Confirm"}
              </Button>
            </DialogFooter>
          </>
        );

      case "email":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Change Email</DialogTitle>
              <DialogDescription>
                Enter your new email address below. You'll receive a
                verification email to confirm this change.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">New Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter new email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal} className="!bg-input/30">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !email}
                className="!bg-primary hover:bg-primary"
              >
                {isLoading ? "Processing..." : "Confirm"}
              </Button>
            </DialogFooter>
          </>
        );

      case "password":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new one. You'll receive
                a verification email to confirm this change.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal} className="!bg-input/30">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  isLoading ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword
                }
                className="!bg-primary hover:bg-primary"
              >
                {isLoading ? "Processing..." : "Confirm"}
              </Button>
            </DialogFooter>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Account Settings */}
        <Card className="bg-secondary gap-0 overflow-hidden border p-1">
          <CardHeader className="p-3">
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="bg-secondary-foreground rounded-lg border p-4">
            <div className="space-y-4">
              <SettingRow
                icon={User}
                title="Username"
                description={`Current: ${currentUser?.username || "Not set"}`}
                buttonText="Change"
                onClick={() => handleOpenModal("username")}
              />
              <Separator />
              <SettingRow
                icon={Mail}
                title="Email"
                description="Update your email address"
                buttonText="Change"
                onClick={() => handleOpenModal("email")}
              />
              <Separator />
              <SettingRow
                icon={Lock}
                title="Password"
                description="Update your password"
                buttonText="Change"
                onClick={() => handleOpenModal("password")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Modal Dialog */}
        <Dialog open={activeModal !== null} onOpenChange={handleCloseModal}>
          <DialogContent>{renderModalContent()}</DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPageNew;
