import { VaultTimeoutService } from "@bitwarden/common/abstractions/vaultTimeout.service";
import { Response, MessageResponse } from "@bitwarden/node";

export class LockCommand {
  constructor(private vaultTimeoutService: VaultTimeoutService) {}

  async run() {
    await this.vaultTimeoutService.lock();
    process.env.BW_SESSION = null;
    const res = new MessageResponse("Your vault is locked.", null);
    return Response.success(res);
  }
}
