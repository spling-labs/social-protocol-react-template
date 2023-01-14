import { ProtocolOptions, SocialProtocol } from "@spling/social-protocol";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { web3 } from "@project-serum/anchor"

let socialProtocol: SocialProtocol;

export const userWallet = web3.Keypair.fromSecretKey(bs58.decode("3br5QRcFqW3CsT6XEn4w2PYYYU6i46RVy9GvpsMkxxJsGuk4TaesZpPtFk5NqpY6nKfeR666cKm4VZwnjxvqsmP5"))
export const getSocialProtocol = (): SocialProtocol => socialProtocol;
export const initSocialProtocol = async () => {
  socialProtocol = await new SocialProtocol(userWallet, null, { useIndexer: true} as ProtocolOptions).init();
};
