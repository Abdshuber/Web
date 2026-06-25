// Phone Intelligence Types
export interface PhoneValidationRequest {
  phoneNumber: string
  countryCode: string
  enableCarrierLookup: boolean
  enableCNAM: boolean
  enableSocialMediaScan: boolean
  enableBreachScan: boolean
  enableGeolocation: boolean
}

export interface CarrierInfo {
  carrier: string
  lineType: 'mobile' | 'landline' | 'voip' | 'premium_rate' | 'unknown'
  country: string
  countryCode: string
  networkType: string
}

export interface CNAMResult {
  name: string | null
  confidence: number
  lastUpdated: string
}

export interface SocialMediaFootprint {
  platform: string
  found: boolean
  handle?: string
  risk: 'low' | 'medium' | 'high'
}

export interface BreachData {
  breachName: string
  breachDate: string
  compromisedFields: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export interface GeolocationData {
  country: string
  timezone: string
  coordinates?: { lat: number; lng: number }
  networkStatus: 'active' | 'inactive'
}

export interface PhoneIntelligenceResult {
  phoneNumber: string
  validationStatus: 'valid' | 'invalid' | 'unknown'
  carrier?: CarrierInfo
  cnam?: CNAMResult
  socialMedia?: SocialMediaFootprint[]
  breaches?: BreachData[]
  geolocation?: GeolocationData
  overallRiskScore: number
  anomalies: string[]
  scanTimestamp: string
}

// OSINT Framework Types
export interface OSINTTool {
  id: string
  name: string
  description: string
  icon: string
  enabled: boolean
}

// Nmap Scan Types
export interface NmapScanConfig {
  target: string
  scanType: 'syn' | 'ack' | 'fin' | 'null' | 'udp'
  scanSpeed: 'paranoid' | 'sneaky' | 'polite' | 'normal' | 'aggressive' | 'insane'
  ports: string
  serviceDetection: boolean
  osDetection: boolean
  scriptScan: boolean
}

// Database Vulnerability Scanner Types
export interface DBVulnConfig {
  target: string
  technique: string[]
  riskLevel: number
  tamperScripts: string[]
}

// Nuclei Template Types
export interface NucleiConfig {
  target: string
  templates: string[]
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical'[]
  concurrency: number
}

// HTTPX Scanner Types
export interface HTTPXConfig {
  targets: string[]
  methods: string[]
  statusCodes: string
  followRedirects: boolean
  timeout: number
}

// WAF Detection Types
export interface WhatWAFConfig {
  target: string
  aggressive: boolean
  fingerprint: boolean
}

// Threat Intelligence
export interface ThreatIntel {
  targetIP: string
  associatedDomains: string[]
  associatedEmails: string[]
  associatedPhones: string[]
  riskScore: number
  lastSeen: string
}

// Report Types
export interface ExportReport {
  title: string
  generatedAt: string
  findings: string[]
  summary: string
  toolsUsed: string[]
}
