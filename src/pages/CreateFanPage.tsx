import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PLATFORM_WALLET } from "@/data/mock";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export default function CreateFanPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "success">("form");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenInfo, setTokenInfo] = useState<{ name: string; symbol: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleTokenBlur = () => {
    if (tokenAddress.length > 10) {
      setTokenInfo({ name: name.toUpperCase() || "TOKEN", symbol: name.slice(0, 3).toUpperCase() || "TKN" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(PLATFORM_WALLET);
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === "success") {
    return (
      <div className="flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md text-center">
          <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
            <Check className="h-6 w-6 text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Fan page created!</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Send your {tokenInfo?.symbol || "tokens"} to the platform wallet below to fund rewards for your fans.
          </p>

          <div className="rounded-lg border bg-muted/50 p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">Platform wallet address</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs text-foreground break-all font-mono">{PLATFORM_WALLET}</code>
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button onClick={() => navigate("/artist/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Create Fan Page</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Fan page name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="My Fan Page" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your fan page..." rows={3} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="banner">Banner image</Label>
          <Input id="banner" type="file" accept="image/*" onChange={handleBannerChange} />
          {bannerPreview && (
            <img src={bannerPreview} alt="Banner preview" className="mt-2 h-32 w-full rounded-lg object-cover" />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="token">ERC20 token address</Label>
          <Input
            id="token"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            onBlur={handleTokenBlur}
            placeholder="0x..."
          />
          {tokenInfo && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {tokenInfo.name} / {tokenInfo.symbol}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full">
          Create Fan Page
        </Button>
      </form>
    </div>
  );
}
