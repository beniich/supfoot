// src/pages/Scanner.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stadium, Zap, FlipCameraIos, CheckCircle, XCircle, 
  ConfirmationNumber, Dashboard, QrCodeScanner, History,
  AlertCircle, TrendingUp, User, Clock, MapPin
} from 'lucide-react';
import { qrScanner } from '@/utils/qrScanner';
import { hapticFeedback } from '@/utils/haptics';
import { isNative } from '@/utils/platform';
import { getApiUrl } from '@/config/api';

// ============================================================
// TYPES
// ============================================================

interface ScanResult {
  id: string;
  status: 'success' | 'error' | 'duplicate' | 'expired';
  name: string;
  membershipNumber?: string;
  gate: string;
  ticketId: string;
  ticketType: 'VIP' | 'Standard' | 'EarlyBird';
  section?: string;
  row?: string;
  seat?: string;
  timestamp: Date;
  message: string;
  eventName?: string;
  photo?: string;
}

interface ScanStats {
  total: number;
  success: number;
  errors: number;
  successRate: number;
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Scanner() {
  const navigate = useNavigate();
  
  // State
  const [scanning, setScanning] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'front' | 'back'>('back');
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);
  const [stats, setStats] = useState<ScanStats>({
    total: 0,
    success: 0,
    errors: 0,
    successRate: 0,
  });
  const [showStats, setShowStats] = useState(false);
  const [autoScanEnabled, setAutoScanEnabled] = useState(true);

  // ============================================================
  // AUTO-START SCANNING
  // ============================================================

  useEffect(() => {
    if (isNative() && autoScanEnabled) {
      startContinuousScan();
    }

    return () => {
      qrScanner.stopScan();
    };
  }, [autoScanEnabled]);

  // ============================================================
  // CONTINUOUS SCANNING
  // ============================================================

  const startContinuousScan = async () => {
    let isActive = true;

    while (isActive && autoScanEnabled) {
      try {
        await startScan();
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Scan error:', error);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    return () => {
      isActive = false;
    };
  };

  // ============================================================
  // START SCAN
  // ============================================================

  const startScan = async () => {
    if (!isNative()) {
      alert('Le scanner fonctionne uniquement sur l\'application mobile');
      return;
    }

    try {
      setScanning(true);
      await hapticFeedback.medium();

      const qrData = await qrScanner.startScan();

      if (qrData) {
        await validateTicket(qrData);
      }
    } catch (error: any) {
      console.error('Scan error:', error);
      if (!error.message?.includes('cancelled')) {
        await hapticFeedback.notification('error');
      }
    } finally {
      setScanning(false);
    }
  };

  // ============================================================
  // VALIDATE TICKET
  // ============================================================

  const validateTicket = async (qrData: string) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await fetch(`${getApiUrl()}/api/tickets/validate-qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrCode: qrData,
          validatorId: userId,
        }),
      });

      const data = await response.json();

      let scanResult: ScanResult;

      if (data.success) {
        // SUCCESS ✅
        await hapticFeedback.notification('success');

        const member = data.ticket.member;
        const ticket = data.ticket;

        scanResult = {
          id: Date.now().toString(),
          status: 'success',
          name: `${member.firstName} ${member.lastName}`,
          membershipNumber: member.membershipNumber,
          gate: 'Gate 4',
          ticketId: ticket.ticketNumber,
          ticketType: ticket.ticketType,
          section: ticket.seating?.section,
          row: ticket.seating?.row,
          seat: ticket.seating?.seat,
          timestamp: new Date(),
          message: 'Access Granted',
          eventName: ticket.event?.title,
          photo: member.photo,
        };

        setStats(prev => ({
          total: prev.total + 1,
          success: prev.success + 1,
          errors: prev.errors,
          successRate: ((prev.success + 1) / (prev.total + 1)) * 100,
        }));
      } else {
        // ERROR ❌
        await hapticFeedback.notification('error');

        let errorStatus: 'error' | 'duplicate' | 'expired' = 'error';
        if (data.message?.includes('already') || data.message?.includes('used')) {
          errorStatus = 'duplicate';
        } else if (data.message?.includes('expired')) {
          errorStatus = 'expired';
        }

        scanResult = {
          id: Date.now().toString(),
          status: errorStatus,
          name: 'Invalid Ticket',
          gate: '-',
          ticketId: data.ticketNumber || '-',
          ticketType: 'Standard',
          timestamp: new Date(),
          message: data.message || 'Ticket Invalid',
        };

        setStats(prev => ({
          total: prev.total + 1,
          success: prev.success,
          errors: prev.errors + 1,
          successRate: (prev.success / (prev.total + 1)) * 100,
        }));
      }

      // Update scans
      setCurrentScan(scanResult);
      setRecentScans(prev => [scanResult, ...prev.slice(0, 49)]);

      // Clear current after 5 seconds
      setTimeout(() => {
        setCurrentScan(null);
      }, 5000);

    } catch (error: any) {
      console.error('Validation error:', error);
      await hapticFeedback.notification('error');

      const errorScan: ScanResult = {
        id: Date.now().toString(),
        status: 'error',
        name: 'Error',
        gate: '-',
        ticketId: '-',
        ticketType: 'Standard',
        timestamp: new Date(),
        message: error.message || 'Network Error',
      };

      setCurrentScan(errorScan);
      setRecentScans(prev => [errorScan, ...prev.slice(0, 49)]);
    }
  };

  // ============================================================
  // TOGGLE FLASH
  // ============================================================

  const toggleFlash = async () => {
    await hapticFeedback.light();
    setFlashEnabled(!flashEnabled);
    // TODO: Implement with native plugin
  };

  // ============================================================
  // FLIP CAMERA
  // ============================================================

  const flipCamera = async () => {
    await hapticFeedback.light();
    setCameraFacing(prev => prev === 'back' ? 'front' : 'back');
    // TODO: Implement with native plugin
  };

  // ============================================================
  // FORMAT TIME
  // ============================================================

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // ============================================================
  // GET STATUS COLORS
  // ============================================================

  const getStatusColors = (status: ScanResult['status']) => {
    switch (status) {
      case 'success':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
          text: 'text-green-500',
          iconBg: 'bg-green-500/20',
          accentText: 'text-green-400',
        };
      case 'duplicate':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20',
          text: 'text-yellow-500',
          iconBg: 'bg-yellow-500/20',
          accentText: 'text-yellow-400',
        };
      case 'expired':
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/20',
          text: 'text-orange-500',
          iconBg: 'bg-orange-500/20',
          accentText: 'text-orange-400',
        };
      default:
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
          text: 'text-red-500',
          iconBg: 'bg-red-500/20',
          accentText: 'text-red-400',
        };
    }
  };

  // ============================================================
  // GET STATUS ICON
  // ============================================================

  const getStatusIcon = (status: ScanResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={32} strokeWidth={2.5} />;
      case 'duplicate':
        return <AlertCircle size={32} strokeWidth={2.5} />;
      case 'expired':
        return <Clock size={32} strokeWidth={2.5} />;
      default:
        return <XCircle size={32} strokeWidth={2.5} />;
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="relative h-screen w-full bg-black flex flex-col overflow-hidden">
      {/* Camera Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-80"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1920')"
          }}
        />
        {/* Dark Overlay with Center Transparent */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            WebkitMask: 'radial-gradient(circle 160px at center, transparent 100%, black 100%)',
            mask: 'radial-gradient(circle 160px at center, transparent 100%, black 100%)',
          }}
        />
      </div>

      {/* Top App Bar */}
      <div className="relative z-20 flex items-center bg-black/20 backdrop-blur-md p-4 pb-2 justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Stadium className="text-primary" size={24} />
          </div>
          <div>
            <h2 className="text-white text-base font-bold leading-none tracking-tight">
              FootballHub+
            </h2>
            <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">
              Staff Access Pro
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Stats Badge */}
          <button
            onClick={() => {
              hapticFeedback.light();
              setShowStats(!showStats);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 rounded-lg backdrop-blur-sm hover:bg-black/60 transition-colors"
          >
            <TrendingUp size={16} className="text-green-400" />
            <span className="text-white text-xs font-bold">{stats.success}</span>
            <span className="text-white/50 text-xs">/</span>
            <span className="text-white text-xs font-bold">{stats.total}</span>
          </button>

          {/* Flash Toggle */}
          <button
            onClick={toggleFlash}
            className={`flex items-center justify-center rounded-full size-9 transition-colors ${
              flashEnabled 
                ? 'bg-primary/20 text-primary' 
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
          >
            <Zap size={18} />
          </button>

          {/* Flip Camera */}
          <button
            onClick={flipCamera}
            className="flex items-center justify-center rounded-full size-9 bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <FlipCameraIos size={18} />
          </button>
        </div>
      </div>

      {/* Stats Panel (Expandable) */}
      {showStats && (
        <div className="relative z-20 mx-4 mt-2 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 animate-in slide-in-from-top">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-white/60 mt-1">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.success}</div>
              <div className="text-xs text-white/60 mt-1">Granted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.errors}</div>
              <div className="text-xs text-white/60 mt-1">Denied</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Success Rate</span>
              <span className="text-white font-bold">
                {stats.successRate.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Scanning Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pb-32">
        {/* Scan Frame */}
        <div 
          className="relative w-64 h-64 rounded-xl flex items-center justify-center"
          style={{ border: '2px solid rgba(242, 185, 13, 0.3)' }}
        >
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />

          {/* Scan Line */}
          <div className="absolute inset-x-0 h-[2px] bg-primary/40 top-1/2 -translate-y-1/2 blur-[1px] animate-pulse" />
        </div>

        {/* Instruction Text */}
        <p className="mt-8 text-white/80 text-sm font-medium tracking-wide bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
          {scanning ? 'Scanning...' : 'Align QR code within the frame'}
        </p>

        {/* Manual Scan Button (if auto-scan disabled) */}
        {!autoScanEnabled && !scanning && (
          <button
            onClick={startScan}
            className="mt-6 px-8 py-3 bg-primary hover:bg-primary/90 text-black font-bold rounded-full transition-colors shadow-lg"
          >
            Start Scan
          </button>
        )}
      </div>

      {/* Bottom Sheet */}
      <div className="relative z-30 flex flex-col justify-end items-stretch">
        <div className="flex flex-col items-stretch bg-background-dark rounded-t-[2rem] shadow-2xl border-t border-white/10">
          {/* Handle */}
          <button className="flex h-6 w-full items-center justify-center">
            <div className="h-1.5 w-12 rounded-full bg-white/20" />
          </button>

          {/* Section Header */}
          <div className="flex items-center justify-between px-6 pt-2 pb-1">
            <h3 className="text-white text-lg font-bold leading-tight tracking-tight">
              Recent Scans
            </h3>
            <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded uppercase">
              Live Feed
            </span>
          </div>

          {/* Current Scan (Active) */}
          {currentScan && (
            <div className="px-4 pb-4 pt-2">
              <div 
                className={`flex items-center gap-4 border rounded-2xl px-4 py-3 ${
                  getStatusColors(currentScan.status).bg
                } ${getStatusColors(currentScan.status).border}`}
              >
                {/* Icon */}
                <div 
                  className={`flex items-center justify-center rounded-full shrink-0 size-14 ${
                    getStatusColors(currentScan.status).iconBg
                  } ${getStatusColors(currentScan.status).text}`}
                >
                  {getStatusIcon(currentScan.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-lg font-bold leading-tight">
                    {currentScan.message}
                  </p>
                  <p className="text-white/70 text-sm font-medium leading-normal mt-0.5">
                    {currentScan.name} <span className="mx-1">•</span>
                    <span className={getStatusColors(currentScan.status).accentText}>
                      {currentScan.gate}
                    </span>
                  </p>
                  {currentScan.section && (
                    <p className="text-white/50 text-xs mt-1">
                      Section {currentScan.section} • Row {currentScan.row} • Seat {currentScan.seat}
                    </p>
                  )}
                  <p className="text-white/40 text-[11px] font-normal mt-1 flex items-center gap-1">
                    <ConfirmationNumber size={14} />
                    ID: {currentScan.ticketId}
                  </p>
                </div>

                {/* Time & Badge */}
                <div className="shrink-0 self-start text-right pt-1">
                  <p className="text-white/50 text-xs font-medium mb-1">
                    {formatTime(currentScan.timestamp)}
                  </p>
                  <span 
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      currentScan.ticketType === 'VIP' 
                        ? 'bg-primary/20 text-primary'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {currentScan.ticketType}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Previous Scans */}
          <div className="px-4 pb-2 space-y-2 max-h-40 overflow-y-auto">
            {recentScans.slice(currentScan ? 1 : 0, 5).map((scan) => {
              const colors = getStatusColors(scan.status);
              return (
                <div
                  key={scan.id}
                  className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 opacity-50 hover:opacity-70 transition-opacity"
                >
                  <div className={`flex items-center justify-center rounded-lg shrink-0 size-10 ${colors.iconBg} ${colors.text}`}>
                    {scan.status === 'success' ? (
                      <CheckCircle size={18} />
                    ) : (
                      <XCircle size={18} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium line-clamp-1">
                      {scan.name} • {scan.gate}
                    </p>
                    <p className="text-white/50 text-xs">
                      {formatTime(scan.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}

            {recentScans.length === 0 && !currentScan && (
              <div className="text-center py-8">
                <p className="text-white/40 text-sm">No scans yet</p>
                <p className="text-white/30 text-xs mt-1">
                  Scan a QR code to get started
                </p>
              </div>
            )}
          </div>

          {/* Tab Bar Navigation */}
          <div className="flex items-center justify-around bg-black/40 backdrop-blur-xl border-t border-white/5 pt-3 pb-8 px-6">
            <button 
              onClick={() => {
                hapticFeedback.light();
                navigate('/dashboard');
              }}
              className="flex flex-col items-center gap-1 text-white/40 hover:text-white/60 transition-colors"
            >
              <Dashboard size={24} />
              <span className="text-[10px] font-medium">Dashboard</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-primary">
              <div className="bg-primary/20 px-4 py-1 rounded-full mb-1">
                <QrCodeScanner size={24} />
              </div>
              <span className="text-[10px] font-bold">Scanner</span>
            </button>

            <button 
              onClick={() => {
                hapticFeedback.light();
                navigate('/history');
              }}
              className="flex flex-col items-center gap-1 text-white/40 hover:text-white/60 transition-colors"
            >
              <History size={24} />
              <span className="text-[10px] font-medium">History</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
