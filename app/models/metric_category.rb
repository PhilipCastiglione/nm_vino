class MetricCategory < ActiveRecord::Base
  has_and_belongs_to_many :diseases
  has_many :metrics

  def max
    metrics.map do |m|
      m.metric_details.map do |md|
        md.score || md.metric_subdetails.pluck(:score).max
      end.max
    end.sum
  end

  validates :title, presence: true
end
