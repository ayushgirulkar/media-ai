
import {
  CheckCircleIcon,
  ExternalLinkIcon,
  XIcon,
} from "lucide-react";
import { PLATFORMS } from "../../assets/assets";

interface PlatformPickerModalProps {
  connectedIds: string[];
  connecting: string | null;
  onClose: () => void;
  onConnect: (platformId: string) => void;
}

function PlatformPickerModal({
  connectedIds,
  connecting,
  onClose,
  onConnect,
}: PlatformPickerModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shadow">
          <h3 className="text-slate-700 font-semibold">
            Choose a Platform
          </h3>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <XIcon className="size-4" />
          </button>
        </div>

        {/* Platform List */}
        <div className="p-6 flex flex-col gap-2">
          {PLATFORMS.map((p) => {
            const isConnected = connectedIds.includes(p.id);
            const isConnecting = connecting === p.id;

            return (
              <button
                key={p.id}
                onClick={() => !isConnected && onConnect(p.id)}
                disabled={isConnected || isConnecting}
                className="flex items-center justify-between w-full p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="p-2 rounded-lg bg-slate-100">
                    <p.icon
                      className={`size-5 ${
                        isConnected
                          ? "text-red-600"
                          : "text-slate-500"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-left">
                    <div
                      className={`text-sm font-medium ${
                        isConnected
                          ? "text-red-700"
                          : "text-slate-800"
                      }`}
                    >
                      {p.name}
                    </div>

                    <div className="text-xs text-slate-500 truncate">
                      {isConnected
                        ? "Already connected"
                        : p.description}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  {isConnected ? (
                    <CheckCircleIcon className="size-4 text-red-500" />
                  ) : isConnecting ? (
                    <div className="size-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ExternalLinkIcon className="size-4 text-slate-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PlatformPickerModal;

