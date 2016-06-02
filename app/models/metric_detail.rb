class MetricDetail < ActiveRecord::Base
  belongs_to :metric
  has_many :metric_subdetails

  validates :metric_id, :description, presence: true
end
