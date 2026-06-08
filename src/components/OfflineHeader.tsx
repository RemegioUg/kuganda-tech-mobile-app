import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface OfflineHeaderProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  isSyncing: boolean;
  offlineCount: number;
}

export default function OfflineHeader({
  isOnline,
  onToggleOnline,
  isSyncing,
  offlineCount,
}: OfflineHeaderProps) {
  return (
    <div className="bg-white sticky top-0 z-40 shrink-0">
      {/* Main Bar - Vibrant Palette Theme Style */}
      <div className="bg-[#1E5E3A] px-5 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold border border-white/10 shadow-inner">
            K
          </div>
          <div>
            <span className="text-base font-bold tracking-tight block leading-tight">
              Kuganda Tech
            </span>
            <span className="text-[10px] text-white/70 font-medium uppercase tracking-wider block">
              Farmer First Finance
            </span>
          </div>
        </div>

        {/* Simulator Control Panel inside header */}
        <div className="flex items-center gap-2 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-amber-400'}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {isOnline ? 'Online' : 'Offline'}
          </span>
          <button
            onClick={onToggleOnline}
            className={`w-8 h-4.5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${
              isOnline ? 'bg-emerald-500' : 'bg-white/30'
            }`}
            aria-label="Simulate Network State Toggle"
          >
            <div
              className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-300 ${
                isOnline ? 'translate-x-3.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Offline/Online Mode Notification Banner derived from Design HTML */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between border-b transition-colors duration-300 ${
          isOnline
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
            : 'bg-amber-50 border-amber-100 text-amber-800'
        }`}
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              isOnline ? 'bg-emerald-500/20 text-emerald-600' : 'bg-amber-500/20 text-amber-700'
            }`}
          >
            {isOnline ? (
              <Wifi size={12} className={isSyncing ? 'animate-pulse' : ''} />
            ) : (
              <WifiOff size={12} className="animate-bounce" />
            )}
          </div>
          <span>
            {isOnline
              ? 'Secured network connection validated.'
              : 'Offline Ready: All changes will sync automatically.'}
          </span>
        </div>

        {/* Syncing State Indicator */}
        {isSyncing && (
          <div className="flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
            <RefreshCw size={11} className="animate-spin" />
            <span>Syncing {offlineCount > 0 ? `(${offlineCount})` : ''}...</span>
          </div>
        )}

        {!isSyncing && offlineCount > 0 && (
          <div className="bg-amber-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
            {offlineCount} queued
          </div>
        )}
      </div>
    </div>
  );
}
