(function (window) {
  window.env = window.env || {};

  window.env.production = '#{production}#';
  window.env.instrumentationKey = '#{instrumentationKey}#';
  window.env.enableApplicationInsights = '#{enableApplicationInsights}#';
  window.env.api = "#{api}#";

}(this));