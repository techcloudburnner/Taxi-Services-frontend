// src/routes/booking.confirm.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, Download } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/booking/confirm")({
  component: ConfirmPage,
});

interface BookingDetails {
  bookingId?: string;
  bookingNumber?: string;
  carName: string;
  customerName: string;
  customerPhone?: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengerCount: number;
  tripType: string;
  estimate: number;
}

function ConfirmPage() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    console.log('🔍 Confirm page loaded');
    
    // Try to get booking details
    const stored = sessionStorage.getItem('lastBookingDetails');
    console.log('📦 sessionStorage data:', stored);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('✅ Booking details found:', parsed);
        setBookingDetails(parsed);
      } catch (e) {
        console.error('❌ Parse error:', e);
        setNotFound(true);
      }
    } else {
      console.warn('⚠️ No booking details in sessionStorage');
      setNotFound(true);
    }
  }, []);

  const handleDownload = () => {
    if (!bookingDetails) return;
    setIsDownloading(true);
    
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Booking Receipt - ${BRAND.name}</title>
<style>
body{font-family:Arial,sans-serif;padding:20px;background:#f5f5f5;}
.receipt{max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);}
.header{background:#f97316;color:white;padding:25px;text-align:center;}
.header h1{margin:10px 0;}
.badge{display:inline-block;background:rgba(255,255,255,0.2);padding:5px 15px;border-radius:20px;font-size:12px;}
.body{padding:25px;}
.row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee;}
.label{color:#666;}
.value{font-weight:bold;}
.total{background:#f97316;color:white;padding:20px;border-radius:8px;margin-top:15px;display:flex;justify-content:space-between;}
.total-value{font-size:24px;font-weight:bold;}
.note{background:#fff3cd;padding:12px;border-radius:8px;margin-top:15px;font-size:12px;text-align:center;}
.footer{text-align:center;padding:20px;font-size:11px;color:#999;}
</style></head>
<body><div class="receipt">
<div class="header"><div>${BRAND.name}</div><h1>Booking Receipt</h1><div class="badge">✓ Confirmed</div></div>
<div class="body">
<div class="row"><span class="label">Reference</span><span class="value">#${bookingDetails.bookingNumber || bookingDetails.bookingId}</span></div>
<div class="row"><span class="label">Customer</span><span class="value">${bookingDetails.customerName}</span></div>
<div class="row"><span class="label">Phone</span><span class="value">${bookingDetails.customerPhone || 'N/A'}</span></div>
<div class="row"><span class="label">Vehicle</span><span class="value">${bookingDetails.carName}</span></div>
<div class="row"><span class="label">Pickup</span><span class="value">${bookingDetails.pickupLocation}</span></div>
<div class="row"><span class="label">Drop</span><span class="value">${bookingDetails.dropLocation}</span></div>
<div class="row"><span class="label">Date</span><span class="value">${new Date(bookingDetails.pickupDate).toLocaleDateString('en-IN')}</span></div>
<div class="row"><span class="label">Time</span><span class="value">${bookingDetails.pickupTime}</span></div>
<div class="total"><span>Estimated Fare</span><span class="total-value">₹${bookingDetails.estimate?.toLocaleString('en-IN')}</span></div>
<div class="note">📞 Our team will call you within 5 minutes. For help, call ${BRAND.phone}</div>
</div>
<div class="footer"><p><strong>${BRAND.name}</strong></p><p>📞 ${BRAND.phone}</p></div>
</div></body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Booking-${bookingDetails.bookingNumber || 'Receipt'}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setIsDownloading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl text-center w-full">
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight">Booking Confirmed!</h1>
        <p className="mt-4 text-foreground/75">Thank you for choosing {BRAND.name}.</p>

        {notFound && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm text-amber-800">📞 Our team will call you within 5 minutes to confirm your ride.</p>
          </div>
        )}

        {bookingDetails && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-2xl border-2 border-green-200 bg-green-50 p-6 text-left">
            <h3 className="font-bold text-green-700 mb-4">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Reference</span><span className="font-bold">#{bookingDetails.bookingNumber || bookingDetails.bookingId}</span></div>
              <div className="flex justify-between"><span>Pickup</span><span className="font-semibold">{bookingDetails.pickupLocation}</span></div>
              <div className="flex justify-between"><span>Drop</span><span className="font-semibold">{bookingDetails.dropLocation}</span></div>
              <div className="flex justify-between"><span>Date</span><span className="font-semibold">{new Date(bookingDetails.pickupDate).toLocaleDateString('en-IN')} at {bookingDetails.pickupTime}</span></div>
              <div className="flex justify-between"><span>Vehicle</span><span className="font-semibold">{bookingDetails.carName}</span></div>
              <div className="flex justify-between pt-2 mt-1 border-t"><span className="font-bold">Estimate</span><span className="font-bold text-xl text-primary">₹{bookingDetails.estimate?.toLocaleString('en-IN')}</span></div>
            </div>
          </motion.div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          {bookingDetails && (
            <button onClick={handleDownload} disabled={isDownloading} className="rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white hover:bg-orange-600 transition flex items-center justify-center gap-2">
              {isDownloading ? '⏳ Downloading...' : <><Download className="h-4 w-4" /> Download Receipt</>}
            </button>
          )}
          <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="rounded-full border-2 border-primary px-6 py-3.5 text-sm font-semibold text-primary flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" /> Call {BRAND.phone}
          </a>
          <Link to="/" className="rounded-full border px-6 py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}