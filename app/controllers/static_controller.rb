class StaticController < ApplicationController
  def index
    @diseases = Disease.all
    @metric_category = MetricCategory.all
    @metrics = Metric.all
    @metric_detail = MetricDetail.all
  end
end
