import { Lock, Mail, User } from "lucide-react";
import { type FC, useState } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useChangeEmailMutation,
  useChangePasswordMutation,
  useChangeUsernameMutation,
  useCurrentUser,
} from "@/hooks/queries/auth-hooks";

type ModalType = "username" | "email" | "password" | null;

type VerificationModalState = {
  type: ModalType;
  showVerification: boolean;
  actionToken?: string;
};

type SettingRowProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

const SettingRow: FC<SettingRowProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div className="hover:bg-accent/50 flex flex-col items-start gap-3 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-start gap-4 sm:items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={onClick}
        className="w-full shrink-0 sm:w-auto"
      >
        {buttonText}
      </Button>
    </div>
  );
};

const SettingsPage: FC = () => {
  const { data: currentUser } = useCurrentUser();
  const changeUsernameMutation = useChangeUsernameMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const changeEmailMutation = useChangeEmailMutation();

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTab, setSelectedTab] = useState("general");
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
    // Reset form values
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
          await changeUsernameMutation.mutateAsync({ new_username: username });
          setShowSuccess(true);
          break;
        case "email":
          await changeEmailMutation.mutateAsync({ new_email: email });
          setShowSuccess(true);
          break;
        case "password":
          if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
          }
          await changePasswordMutation.mutateAsync({
            current_password: currentPassword,
            new_password: newPassword,
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Mail className="h-8 w-8" />
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            We've sent a verification email to your account. Please check your
            inbox to confirm the change.
          </p>
          <Button
            onClick={handleCloseModal}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Close
          </Button>
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-4">
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
            {error}
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !username}
                className="bg-emerald-600 hover:bg-emerald-700"
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !email}
                className="bg-emerald-600 hover:bg-emerald-700"
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal}>
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
                className="bg-emerald-600 hover:bg-emerald-700"
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
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Mobile Select Navigation */}
        <div className="md:hidden">
          <Select value={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tab" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Tabs Navigation */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="hidden md:block"
        >
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* Current User Info */}
            {currentUser && (
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <h3 className="mb-2 font-semibold">Current Account</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Username:</span>{" "}
                    {currentUser.username}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {currentUser.email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Verified:</span>{" "}
                    {currentUser.is_verified ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            )}

            {/* Setting Rows */}
            <div>
              <SettingRow
                icon={User}
                title="Username"
                description={`Current: ${currentUser?.username || "Not set"}`}
                buttonText="Change username"
                onClick={() => handleOpenModal("username")}
              />
              <Separator />
              <SettingRow
                icon={Mail}
                title="Email"
                description={`Current: ${currentUser?.email || "Not set"}`}
                buttonText="Change email"
                onClick={() => handleOpenModal("email")}
              />
              <Separator />
              <SettingRow
                icon={Lock}
                title="Password"
                description="Update your password"
                buttonText="Change password"
                onClick={() => handleOpenModal("password")}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile Tab Content (when using Select) */}
        {selectedTab === "general" && (
          <div className="md:hidden">
            {currentUser && (
              <div className="mb-4 rounded-lg bg-emerald-500/10 p-4">
                <h3 className="mb-2 font-semibold">Current Account</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Username:</span>{" "}
                    {currentUser.username}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {currentUser.email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Verified:</span>{" "}
                    {currentUser.is_verified ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            )}

            <SettingRow
              icon={User}
              title="Username"
              description={`Current: ${currentUser?.username || "Not set"}`}
              buttonText="Change username"
              onClick={() => handleOpenModal("username")}
            />
            <Separator />
            <SettingRow
              icon={Mail}
              title="Email"
              description={`Current: ${currentUser?.email || "Not set"}`}
              buttonText="Change email"
              onClick={() => handleOpenModal("email")}
            />
            <Separator />
            <SettingRow
              icon={Lock}
              title="Password"
              description="Update your password"
              buttonText="Change password"
              onClick={() => handleOpenModal("password")}
            />
          </div>
        )}

        {/* Modal Dialog */}
        <Dialog open={activeModal !== null} onOpenChange={handleCloseModal}>
          <DialogContent>{renderModalContent()}</DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
