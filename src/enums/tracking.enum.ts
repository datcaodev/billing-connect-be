export enum TrackingEventType {
  // Common
  IMPRESSION = "impression",
  CLICK = "click",
  ERROR = "error",

  // In-stream specific (video playback milestones)
  START = "start",
  FIRST_QUARTILE = "firstQuartile",
  MIDPOINT = "midpoint",
  THIRD_QUARTILE = "thirdQuartile",
  COMPLETE = "complete",
  SKIP = "skip",
  PAUSE = "pause",
  RESUME = "resume",
  MUTE = "mute",
  UNMUTE = "unmute",
  FULLSCREEN = "fullscreen",
  EXIT_FULLSCREEN = "exitFullscreen",

  // Out-stream specific (viewability, engagement, interaction)
  VIEWABLE = "viewable",          // khi ad đủ điều kiện viewable
  ENGAGEMENT = "engagement",      // hover / tap / swipe / scroll
  CLOSE = "close",                // user đóng ad (popup, interstitial)
  EXPAND = "expand",              // expandable banner mở rộng
  COLLAPSE = "collapse",          // expandable banner thu lại
}


export enum ADS_TYPE {
  INSTREAM = "INSTREAM",
  OUTSTREAM = "OUTSTREAM",
  ALL = "ALL"
}