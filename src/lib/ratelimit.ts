// Rate limiting utilities for QSol Analytics diagnostic tool
// Philosophy: Start generous, log behaviour, tighten if abuse appears
import { getServiceClient } from './supabase';

// ============================================
// Utility: Hash email for privacy
// ============================================

async function hashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================
// IP-based rate limiting (in-memory)
// ============================================

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// Separate maps for different rate limit types
const diagnosisRateLimitMap = new Map<string, RateLimitRecord>();
const unlockRateLimitMap = new Map<string, RateLimitRecord>();

// IP Rate Limits - GENEROUS for diagnosis, stricter for unlock
const IP_DIAGNOSIS_LIMIT = 50; // generous - instant classifications are cheap
const IP_DIAGNOSIS_WINDOW = 60 * 60 * 1000; // 1 hour

const IP_UNLOCK_LIMIT = 10; // per hour per IP - full reports cost more
const IP_UNLOCK_WINDOW = 60 * 60 * 1000; // 1 hour

export function checkDiagnosisRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = diagnosisRateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    diagnosisRateLimitMap.set(ip, { count: 1, resetAt: now + IP_DIAGNOSIS_WINDOW });
    return { allowed: true, remaining: IP_DIAGNOSIS_LIMIT - 1, resetAt: now + IP_DIAGNOSIS_WINDOW };
  }

  if (record.count >= IP_DIAGNOSIS_LIMIT) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count++;
  return { allowed: true, remaining: IP_DIAGNOSIS_LIMIT - record.count, resetAt: record.resetAt };
}

export function checkUnlockIpRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = unlockRateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    unlockRateLimitMap.set(ip, { count: 1, resetAt: now + IP_UNLOCK_WINDOW });
    return { allowed: true, remaining: IP_UNLOCK_LIMIT - 1, resetAt: now + IP_UNLOCK_WINDOW };
  }

  if (record.count >= IP_UNLOCK_LIMIT) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count++;
  return { allowed: true, remaining: IP_UNLOCK_LIMIT - record.count, resetAt: record.resetAt };
}

// ============================================
// Email-based rate limiting (database)
// Uses hashed email for privacy
// ============================================

// Generous limits to start - can tighten based on observed behaviour
const EMAIL_DAILY_LIMIT = 5; // full reports per 24 hours per email
const EMAIL_MONTHLY_LIMIT = 15; // full reports per 30 days per email

export interface EmailRateLimitResult {
  allowed: boolean;
  dailyRemaining: number;
  monthlyRemaining: number;
  reason?: string;
}

export async function checkEmailRateLimit(email: string): Promise<EmailRateLimitResult> {
  const supabase = getServiceClient();
  const emailHash = await hashEmail(email);

  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Count reports in last 24 hours using email hash
  const { count: dailyCount, error: dailyError } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('email_hash', emailHash)
    .gte('created_at', dayAgo.toISOString());

  if (dailyError) {
    console.error('Error checking daily rate limit:', dailyError);
    // Allow on error to not block users due to DB issues
    return { allowed: true, dailyRemaining: EMAIL_DAILY_LIMIT, monthlyRemaining: EMAIL_MONTHLY_LIMIT };
  }

  // Count reports in last 30 days
  const { count: monthlyCount, error: monthlyError } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('email_hash', emailHash)
    .gte('created_at', monthAgo.toISOString());

  if (monthlyError) {
    console.error('Error checking monthly rate limit:', monthlyError);
    return { allowed: true, dailyRemaining: EMAIL_DAILY_LIMIT, monthlyRemaining: EMAIL_MONTHLY_LIMIT };
  }

  const dailyUsed = dailyCount || 0;
  const monthlyUsed = monthlyCount || 0;

  const dailyRemaining = Math.max(0, EMAIL_DAILY_LIMIT - dailyUsed);
  const monthlyRemaining = Math.max(0, EMAIL_MONTHLY_LIMIT - monthlyUsed);

  // Friendly, non-punitive messaging
  if (dailyRemaining === 0) {
    return {
      allowed: false,
      dailyRemaining: 0,
      monthlyRemaining,
      reason: "You've generated a few project maps today. To keep the free tool useful for everyone, please try again tomorrow or send your project question directly to David."
    };
  }

  if (monthlyRemaining === 0) {
    return {
      allowed: false,
      dailyRemaining,
      monthlyRemaining: 0,
      reason: "You've been busy exploring project ideas! For additional assessments, please reach out to David directly - he'd be happy to help."
    };
  }

  return { allowed: true, dailyRemaining, monthlyRemaining };
}

// Generate email hash for storage
export async function getEmailHash(email: string): Promise<string> {
  return hashEmail(email);
}

// Clean up old entries periodically (call this occasionally)
export function cleanupRateLimitMaps(): void {
  const now = Date.now();

  for (const [ip, record] of diagnosisRateLimitMap.entries()) {
    if (now > record.resetAt) {
      diagnosisRateLimitMap.delete(ip);
    }
  }

  for (const [ip, record] of unlockRateLimitMap.entries()) {
    if (now > record.resetAt) {
      unlockRateLimitMap.delete(ip);
    }
  }
}
