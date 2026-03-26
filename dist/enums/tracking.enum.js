"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADS_TYPE = exports.TrackingEventType = void 0;
var TrackingEventType;
(function (TrackingEventType) {
    // Common
    TrackingEventType["IMPRESSION"] = "impression";
    TrackingEventType["CLICK"] = "click";
    TrackingEventType["ERROR"] = "error";
    // In-stream specific (video playback milestones)
    TrackingEventType["START"] = "start";
    TrackingEventType["FIRST_QUARTILE"] = "firstQuartile";
    TrackingEventType["MIDPOINT"] = "midpoint";
    TrackingEventType["THIRD_QUARTILE"] = "thirdQuartile";
    TrackingEventType["COMPLETE"] = "complete";
    TrackingEventType["SKIP"] = "skip";
    TrackingEventType["PAUSE"] = "pause";
    TrackingEventType["RESUME"] = "resume";
    TrackingEventType["MUTE"] = "mute";
    TrackingEventType["UNMUTE"] = "unmute";
    TrackingEventType["FULLSCREEN"] = "fullscreen";
    TrackingEventType["EXIT_FULLSCREEN"] = "exitFullscreen";
    // Out-stream specific (viewability, engagement, interaction)
    TrackingEventType["VIEWABLE"] = "viewable";
    TrackingEventType["ENGAGEMENT"] = "engagement";
    TrackingEventType["CLOSE"] = "close";
    TrackingEventType["EXPAND"] = "expand";
    TrackingEventType["COLLAPSE"] = "collapse";
})(TrackingEventType || (exports.TrackingEventType = TrackingEventType = {}));
var ADS_TYPE;
(function (ADS_TYPE) {
    ADS_TYPE["INSTREAM"] = "INSTREAM";
    ADS_TYPE["OUTSTREAM"] = "OUTSTREAM";
    ADS_TYPE["ALL"] = "ALL";
})(ADS_TYPE || (exports.ADS_TYPE = ADS_TYPE = {}));
//# sourceMappingURL=tracking.enum.js.map