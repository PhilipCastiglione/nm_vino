class MetricSubdetail < ActiveRecord::Base
  belongs_to :metric_detail

  validates :description, :score, :metric_detail_id, presence: true
end
