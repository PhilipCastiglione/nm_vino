class MetricDetail < ActiveRecord::Base
  belongs_to :metric

  validates :description, :metric_id, :score, presence: true
end
